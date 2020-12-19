import React from "react"
import { Route, Redirect } from "react-router-dom"
import { isAuthenticated } from "./helper"

export const AdminRoutes = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() && isAuthenticated().data.user.role === 1 ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  )
}
