import { Typography } from "@material-ui/core"
import React from "react"
import { Base } from "../core/Base"
import { OccasionCard } from "../core/card/OccasionCard"
import { oca } from "../core/components/ocaList"

export const Occasion = () => {
 

  return (
    <Base className="container pt-5">
      <div className="pt-5 my-3">
        <Typography variant="h6">Occasions to gift</Typography>
        <div style={{display: "flex",flexWrap:"wrap"}}>
          {oca.map((item,index)=>{
            return <OccasionCard item={item} key={index}/>
          })}
        </div>
      </div>
    </Base>
  )
}
