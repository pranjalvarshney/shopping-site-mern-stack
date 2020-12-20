import { Card } from "@material-ui/core"
import React from "react"
import { useHistory } from "react-router-dom"

export const OccasionCard = ({ item }) => {
  const history = useHistory()
  const handleOnClick = (type) => {
    history.push(`/occasion/${type}`)
  }
  return (
    <div style={{display:"flex" , flex:"0 0 auto ",width: "260px",margin:"10px"}}>
      <Card id="hover-card" onClick={() => handleOnClick(item.name)}>
        <img src={item.img} alt="item.name" width="100%" />
        <p style={{ textTransform: "capitalize" }}>{item.name}</p>
      </Card>
    </div>
  )
}
