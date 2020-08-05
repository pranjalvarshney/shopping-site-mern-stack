import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { Home } from "./core/Home"
import { Signup } from "./user/Signup"
import { Signin } from "./user/Signin"

export const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/signin' component={Signin} />
        <Route exact path='/cart' component={Home} />
        <Route exact path='/account' component={Home} />
      </Switch>
    </Router>
  )
}
