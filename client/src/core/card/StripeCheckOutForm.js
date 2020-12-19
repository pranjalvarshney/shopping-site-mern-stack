import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import React from "react"

export const StripeCheckOutForm = () => {
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
    )

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    })

    if (error) {
      console.log("[error]", error)
    } else {
      console.log("[PaymentMethod]", paymentMethod)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type='submit' disabled={!stripe}>
        Pay
      </button>
    </form>
  )
}
