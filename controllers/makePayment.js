const stripe = require("stripe")(
  "sk_key"
)
const uuid = require("uuid")

exports.stripePayment = (req, res) => {
  
  const { products, token } = req.body
  let payAmount = 0
  products.map((p) => {
    payAmount += p.price
  })

  const idempotencyKey = uuid.v1() // used so that the user is charged only once

  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      console.log(customer, "+")
      stripe.charges
        .create(
          {
            amount: payAmount*100,
            currency: "inr",
            customer: customer.id,
            receipt_email: token.email,
            description: "Test data ok!",
            shipping: {
              name: token.card.name,
              address: {
                line1: token.card.address_line1,
                line2: token.card.address_line2,
                city: token.card.address_city,
                country: token.card.address_country,
                postal_code: token.card.address_zip,
              },
            },
          },
          { idempotencyKey }
        )
        .then((result) => {
          console.log(result)
          res.status(200).json(result)})
        .catch((err) => console.log(err))
    })
}
