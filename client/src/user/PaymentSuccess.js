import { Button, Grid } from "@material-ui/core"
import React from "react"
import { useHistory } from "react-router-dom"
// import CheckCircleIcon from "@material-ui/icons/CheckCircle"
export const PaymentSuccess = ({ successInfo }) => {
  const history = useHistory()
  return (
    <div className="py-5 ">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <img src="orderplaced.gif" alt="orderplaced" height="300px" />
        {/* <CheckCircleIcon
          style={{ color: "#3DBE29", fontSize: "100px", marginBottom: "10px" }}
        /> */}
        <h3>
          <b>Your order has been placed successfully</b>
        </h3>
        <h5>Thank you for ordering!</h5>
        <Grid container spacing={3} justify="center">
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              onClick={() => {
                window.open(`${successInfo.receipt_url}`)
              }}
            >
              Payment Receipt
            </Button>
          </Grid>
          <Grid item>
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                history.push("/user")
              }}
            >
              My orders
            </Button>
          </Grid>
        </Grid>
      </div>

      {/* <div className="jumbotron py-3 my-3">
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
      </div> */}
    </div>
  )
}
