import React from "react"

export const OccasionCard = ({ item }) => {
  return (
    <div className=''>
      <div className=' occasion-card card'>
        <img className='card-img-top' src={item.img} alt='Card cap' />

        <div className='card-body'>
          <h6>{item.name}</h6>
        </div>
      </div>
    </div>
  )
}
