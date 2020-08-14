import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { Home } from "./core/Home"
import { Signup } from "./user/Signup"
import { Signin } from "./user/Signin"
import { AdminRoutes } from "./auth/AdminRoutes"
import { PrivateRoutes } from "./auth/PrivateRoutes"
import { Profile } from "./user/Profile"
import { UserDashboard } from "./user/UserDashBoard"
import { AdminDashboard } from "./user/AdminDashboard"

export const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/signin' component={Signin} />
        <PrivateRoutes exact path='/user' component={UserDashboard} />
        <AdminRoutes exact path='/admin' component={AdminDashboard} />
        <Route exact path='/cart' component={Home} />
        <Route exact path='/account' component={Home} />
      </Switch>
    </Router>
  )
}
