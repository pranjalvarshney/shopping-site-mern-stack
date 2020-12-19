import React from "react"
import { OccasionCard } from "../card/OccasionCard"
import { oca } from "./ocaList"


export const OccasionsSection = () => {
  return (
    <div className="Occasions container">
      <h4>Occasions</h4>
      <div
        className="occasion-wrapper"
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          overflowX: "auto",
        }}
      >
        {oca.map((item, index) => {
          return <OccasionCard key={index} item={item} />
        })}
      </div>
    </div>
  )
}
