import { Button, Grid, Typography } from "@material-ui/core"
import React from "react"
import { Base } from "../core/Base"

export const OccasionType = ({ match }) => {

  return (
    <Base className="pt-5 container">
      <div className="products-section container pt-5 my-3">
        <Grid
          className="mb-3"
          container
          justify="space-between"
          alignItems="center"
        >
          <Typography variant="h5">{match.params.otype}</Typography>
        </Grid>
      </div>
    </Base>
  )
}
