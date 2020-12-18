import { Card, Grid, Typography } from "@material-ui/core"
import React from "react"
import { Base } from "../core/Base"

export const Occasion = () => {
  return (
    <Base className="container pt-5">
      <div className="pt-5 my-3">
        <Typography variant="h6">Occasions to gift</Typography>
        <Grid container spacing={3} justify="center" className="my-3">
          <Grid item xs={6} md={4} lg={3}>
            <Card id="hover-card"><img  src={"bday.jpg"} alt="birthday"  width="100%" /><p>Birthday</p></Card>
          </Grid>
          <Grid item xs={6} md={4} lg={3}>
            <Card id="hover-card"><img  src={"anniversary.jpg"} alt="birthday"  width="100%" /><p>Anniversary</p></Card>
          </Grid>
          <Grid item xs={6} md={4} lg={3}>
            <Card id="hover-card"><img  src={"love.jpg"} alt="birthday"  width="100%" /><p>Love </p></Card>
          </Grid>
          <Grid item xs={6} md={4} lg={3}>
            <Card id="hover-card"><img  src={"wedding.jpg"} alt="birthday"  width="100%" /><p>Wedding</p></Card>
          </Grid>
          <Grid item xs={6} md={4} lg={3}>
            <Card id="hover-card"><img  src={"sorry.jpg"} alt="birthday"  width="100%" /><p>Sorry</p></Card>
          </Grid>
          <Grid item xs={6} md={4} lg={3}>
            <Card id="hover-card"><img  src={"thankyou.jpg"} alt="birthday"  width="100%" /><p>Thank you</p></Card>
          </Grid>
          <Grid item xs={6} md={4} lg={3}>
            <Card id="hover-card"><img  src={"getwellsoon.jpg"} alt="birthday"  width="100%" /><p>Get Well Soon</p></Card>
          </Grid>
          <Grid item xs={6} md={4} lg={3}>
            <Card id="hover-card"><img  src={"congratulations.jpg"} alt="birthday"  width="100%" /><p>Congratulations</p></Card>
          </Grid>
          <Grid item xs={6} md={4} lg={3}>
            <Card id="hover-card"><img  src={"goodluck.jpg"} alt="birthday"  width="100%" /><p>Goodluck</p></Card>
          </Grid>
          <Grid item xs={6} md={4} lg={3}>
            <Card id="hover-card"><img  src={"housewarming.jpg"} alt="birthday"  width="100%" /><p>Housewarming Gifts</p></Card>
          </Grid>
        </Grid>
      </div>
    </Base>
  )
}
