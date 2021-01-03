import { Divider, Grid, Paper, Typography } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { isAuthenticated } from "../auth/helper"
import { AdminContent } from "../core/AdminContent"
import { getAllOrders } from "../core/helper/orderHelper"
import { API } from "../utils/backend"

export const ManageOrders = () => {
  const [dataOrders, setDataOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const auth_token = isAuthenticated() && isAuthenticated().data.token

  const userId = isAuthenticated() && isAuthenticated().data.user._id

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const response = await getAllOrders(userId, auth_token)
      if (response) {
        setLoading(false)
        setDataOrders(response)
        console.log(response)
      }
    } catch (error) {
      setLoading(false)
      setError(error.response.data.errormsg)
      console.log(error.response)
    }
  }
  const showLoading = () => (
    <div className="d-flex justify-content-center ">
      <div
        className="spinner-border"
        role="status"
        style={{ display: loading ? "" : "none" }}
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )

  const errorMsg = () => {
    return (
      <div
        className="alert py-1 text-center alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    )
  }

  useEffect(() => {
    fetchOrders()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AdminContent>
      <div>
        <h4>Manage all orders</h4>
        {dataOrders &&
          dataOrders.map((order, index) => {
            return (
              <Paper
                elevation={3}
                variant="elevation"
                key={index}
                className="my-3 p-3"
              >
                <Grid container justify="space-between">
                  <Grid item>
                    <Typography variant="caption">
                      <b>Order ID -</b> {order._id}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="button" style={{ color: "green" }}>
                      <b>{order.status}</b>
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="caption">
                      {new Date(order.createdAt).toDateString()}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container justify="space-between">
                  <Grid item>
                    <Typography variant="caption">
                      <b>User - </b> {order.user.name}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle2" color="textSecondary">
                      <b>{order.user.email}</b>
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <Grid item>
                    <Typography variant="caption">
                      <b>Transactions ID:</b> <br /> {order.transaction_id}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="caption">
                      {order.products.length} Qty
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="caption">
                      Total
                      <br />
                      <b>Rs {order.amount}</b>
                    </Typography>
                  </Grid>
                </Grid>
                <Typography className="my-3" variant="button">
                  Items
                </Typography>

                <Divider />
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                  
                >
                  {order.products.map((prod, index) => {
                    return (
                      <Grid item key={index}>
                        <Grid
                          container
                          justify="center"
                          className="py-3"
                          alignItems="center"
                          direction="row"
                          spacing={3}
                        >
                          <Grid item >
                            {`# ${index + 1} `}
                          </Grid>

                          <Grid item >
                            <img
                              height="100px"
                              alt="product"
                              src={`${API}/product/photo/${prod._id}`}
                            />
                          </Grid>

                          <Grid item >
                            <Typography variant="caption">
                              ID - {prod._id} <br /> {prod.name}
                            </Typography>
                            <Typography variant="caption">
                              <br />
                              <b>Rs. {prod.price}</b>{" "}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    )
                  })}
                </Grid>
              </Paper>
            )
          })}
        {!loading && dataOrders.length === 0 && (
          <div className="text-center">
            <h6>No orders found!</h6>
          </div>
        )}
        {showLoading()}
        {errorMsg()}
      </div>
    </AdminContent>
  )
}
