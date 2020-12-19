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
        <Typography variant="h6">Occasions to gift</Typography>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {oca.map((item, index) => {
            return (
              <div
                style={{
                  display: "flex",
                  width: "20%",
                  padding: "10px",
                }}
                key={index}
              >
                <Card
                onClick={()=>{
                  history.push(`/occasion/${item.name}`)
                }}
                  variant="elevation"
                  elevation={2}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    cursor:"pointer"
                  }}
                >
                  <img src={item.img} alt={item.name} width="100%" />
                  <p style={{ textTransform: "capitalize" }}>{item.name}</p>
                </Card>
              </div>
            )
          })}
        </div>
      </div>
    </Base>
  )
}
