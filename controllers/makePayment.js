const stripe = require("stripe")
const uuid = require("uuid")

exports.stripePayment = (req, res) => {
  //
  const { products, token } = req.body

  const payAmount = 0
  products.map((p) => {
    payAmount += p.price
  })

  const idempotencyKey = uuid()

  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges
        .create(
          {
            amount: payAmount,
            currency: "usd",
            customer: customer.id,
            receipt_email: token.email,
          },
          { idempotencyKey }
        )
        .then((result) => res.status(200).json(result))
        .catch((err) => console.log(err))
    })
}
