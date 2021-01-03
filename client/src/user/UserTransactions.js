import { Divider, Grid, Paper, Typography } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { isAuthenticated } from "../auth/helper"
import { Base } from "../core/Base"
import { getAllOrdersByUser } from "../core/helper/orderHelper"
import { UserSidebar } from "../core/UserSidebar"
import { API } from "../utils/backend"

export const UserTransactions = () => {
  const [allOrders, setAllOrders] = useState([])

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const token_auth = isAuthenticated() && isAuthenticated().data.token
  const userId = isAuthenticated() && isAuthenticated().data.user._id

  const fetchAllOrders = async () => {
    try {
      setLoading(true)
      const response = await getAllOrdersByUser(userId, token_auth)
      if (response) {
        // console.log(response)
        setAllOrders(response)
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      setError(error.response.data.errormsg)
      console.log(error.response)
    }
  }
  useEffect(() => {
    fetchAllOrders()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

  return (
    <Base className="container py-5">
      <div className="row my-5 pt-5">
        <div className="col-lg-3">
          <UserSidebar />
        </div>
        <div className="col-lg-9">
          <div className="card p-3">
            <h3>All Transactions</h3>
            <h6>My orders and transactions </h6>
            <div className="container">
              {allOrders.map((order, index) => {
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
                          <Grid item key={index} className="py-3">
                            <Grid
                              container
                              justify="center"
                              alignItems="center"
                              direction="row"
                              spacing={3}
                            >
                              <Grid item>{`# ${index + 1} `}</Grid>

                              <Grid item>
                                <img
                                  height="100px"
                                  alt="product"
                                  src={`${API}/product/photo/${prod._id}`}
                                />
                              </Grid>

                              <Grid item>
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
            </div>
          </div>
        </div>
        {!loading && allOrders.length === 0 && (
          <div className="text-center">
            <h6>No orders found!</h6>
          </div>
        )}
        {showLoading()}
        {errorMsg()}
      </div>
    </Base>
  )
}
