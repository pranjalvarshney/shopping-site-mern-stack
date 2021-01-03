import React from "react"
import CheckCircleIcon from "@material-ui/icons/CheckCircle"
export const PaymentSuccess = () => {
  return (
    <div className="my-5 pt-5">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <CheckCircleIcon
          style={{ color: "#3DBE29", fontSize: "100px", marginBottom: "10px" }}
        />
        <h6>
          <b>Your order has been placed successfully</b>
        </h6>
        <h6>Thank you for ordering!</h6>
      </div>
      <div className="jumbotron py-3 my-3">
        <div className="row">
          <div className="col-4">
            <div style={{display: "flex", flexDirection:"column"}}>
            <b>Amount paid</b>
            <h6>123</h6>
            </div>
          </div>
          <div className="col-4">Date</div>
          <div className="col-4">Payment method</div>
        </div>
      </div>
    </div>
  )
}
