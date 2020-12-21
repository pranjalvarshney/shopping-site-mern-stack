import { Card, Typography } from "@material-ui/core"
import React from "react"
import { useHistory } from "react-router-dom"
import { Base } from "../core/Base"
import { oca } from "../core/components/ocaList"

export const Occasion = () => {
  const history = useHistory()
  return (
    <Base className="container pt-5">
      <div className="pt-5 my-3">
        <Typography variant="h6">
          <b>Occasions to gift</b>
        </Typography>
        <div className="row pt-3 d-flex justify-content-center">
          {oca.map((item, index) => {
            return (
              <div className="col-6 col-md-4 col-lg-3 my-2" key={index}>
                <Card
                  onClick={() => {
                    history.push(`/occasion/${item.name}`)
                  }}
                  variant="outlined"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    cursor: "pointer",
                  }}
                >
                  <img src={item.img} alt={item.name} width="100%" />
                  <p
                    style={{ textTransform: "capitalize", fontWeight: "bold" }}
                  >
                    {item.name}
                  </p>
                </Card>
              </div>
            )
          })}
        </div>
      </div>
    </Base>
  )
}
