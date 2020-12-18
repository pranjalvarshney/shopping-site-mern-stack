import { Card, Grid, Typography } from "@material-ui/core"
import React from "react"
import { useHistory } from "react-router-dom"
import { Base } from "../core/Base"

export const Occasion = () => {
  const history = useHistory()
  const handleOnClick = (type) => {
    history.push(`/occasion/${type}`)
  }
  return (
    <Base className="container pt-5">
      <div className="pt-5 my-3">
        <Typography variant="h6">Occasions to gift</Typography>
        <Grid container spacing={3} justify="center" className="my-3">
          <Grid item xs={6} md={4} lg={3}>
            <Card id="hover-card" onClick={()=>handleOnClick("birthday")}><img  src={"bday.jpg"} alt="birthday"  width="100%" /><p>Birthday</p></Card>
          </Grid>
          <Grid item xs={6} md={4} lg={3}>
            <Card id="hover-card" onClick={()=>handleOnClick("anniversary")}><img  src={"anniversary.jpg"} alt="anniversary"  width="100%" /><p>Anniversary</p></Card>
          </Grid>
          <Grid item xs={6} md={4} lg={3}>
            <Card id="hover-card" onClick={()=>handleOnClick("love")}><img  src={"love.jpg"} alt="love"  width="100%" /><p>Love </p></Card>
          </Grid>
          <Grid item xs={6} md={4} lg={3}>
            <Card id="hover-card" onClick={()=>handleOnClick("wedding")}><img  src={"wedding.jpg"} alt="wedding"  width="100%" /><p>Wedding</p></Card>
          </Grid>
          <Grid item xs={6} md={4} lg={3}>
            <Card id="hover-card" onClick={()=>handleOnClick("sorry")}><img  src={"sorry.jpg"} alt="sorry"  width="100%" /><p>Sorry</p></Card>
          </Grid>
          <Grid item xs={6} md={4} lg={3}>
            <Card id="hover-card" onClick={()=>handleOnClick("thankyou")}><img  src={"thankyou.jpg"} alt="thankyou"  width="100%" /><p>Thank you</p></Card>
          </Grid>
          <Grid item xs={6} md={4} lg={3}>
            <Card id="hover-card" onClick={()=>handleOnClick("getwellsoon")}><img  src={"getwellsoon.jpg"} alt="getwellsoon"  width="100%" /><p>Get Well Soon</p></Card>
          </Grid>
          <Grid item xs={6} md={4} lg={3}>
            <Card id="hover-card" onClick={()=>handleOnClick("congratulations")}><img  src={"congratulations.jpg"} alt="congratulations"  width="100%" /><p>Congratulations</p></Card>
          </Grid>
          <Grid item xs={6} md={4} lg={3}>
            <Card id="hover-card" onClick={()=>handleOnClick("goodluck")}><img  src={"goodluck.jpg"} alt="goodluck"  width="100%" /><p>Goodluck</p></Card>
          </Grid>
          <Grid item xs={6} md={4} lg={3}>
            <Card id="hover-card" onClick={()=>handleOnClick("housewarming")}><img  src={"housewarming.jpg"} alt="housewarming"  width="100%" /><p>Housewarming Gifts</p></Card>
          </Grid>
        </Grid>
      </div>
    </Base>
  )
}
