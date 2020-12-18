import { Card, Grid } from "@material-ui/core"
import React from "react"
import { Base } from "../core/Base"

export const Occasion = () => {
  return (
    <Base className="container pt-5">
      <div className="pt-5 my-3">
        <h2>Occasions to gift</h2>
        <Grid container spacing={3} justify="center" className="my-3">
          <Grid item xs={6} md={4} lg={3}>
            <Card><img src={"bday.jpg"} alt="birthday" height="200px" width="100%" /></Card>
          </Grid>
          <Grid item xs={6} md={4} lg={3}>
            <Card><img src={"anniversary.jpg"} alt="birthday" height="200px" width="100%" /></Card>
          </Grid>
          <Grid item xs={6} md={4} lg={3}>
            <Card><img src={"love.jpg"} alt="birthday" height="200px" width="100%" /></Card>
          </Grid>
          <Grid item xs={6} md={4} lg={3}>
            <Card><img src={"wedding.jpg"} alt="birthday" height="200px" width="100%" /></Card>
          </Grid>
          <Grid item xs={6} md={4} lg={3}>
            <Card><img src={"sorry.jpg"} alt="birthday" height="200px" width="100%" /></Card>
          </Grid>
          <Grid item xs={6} md={4} lg={3}>
            <Card><img src={"thankyou.jpg"} alt="birthday" height="200px" width="100%" /></Card>
          </Grid>
          <Grid item xs={6} md={4} lg={3}>
            <Card><img src={"getwellsoon.jpg"} alt="birthday" height="200px" width="100%" /></Card>
          </Grid>
          <Grid item xs={6} md={4} lg={3}>
            <Card><img src={"congratulations.jpg"} alt="birthday" height="200px" width="100%" /></Card>
          </Grid>
          <Grid item xs={6} md={4} lg={3}>
            <Card><img src={"goodluck.jpg"} alt="birthday" height="200px" width="100%" /></Card>
          </Grid>
          <Grid item xs={6} md={4} lg={3}>
            <Card><img src={"housewarming.jpg"} alt="birthday" height="200px" width="100%" /></Card>
          </Grid>
        </Grid>
      </div>
    </Base>
  )
}
