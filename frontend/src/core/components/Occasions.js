import React from "react"
import { OccasionCard } from "../card/OccasionCard"

const oca = [
  {
    name: "birthday",
    img:
      "https://static.archiesonline.com/public/images/product/medium/MT4092.jpg",
  },
  {
    name: "birthday",
    img:
      "https://static.archiesonline.com/public/images/product/medium/MT4092.jpg",
  },
  {
    name: "birthday",
    img:
      "https://static.archiesonline.com/public/images/product/medium/MT4092.jpg",
  },
  {
    name: "birthday",
    img:
      "https://static.archiesonline.com/public/images/product/medium/MT4092.jpg",
  },
  {
    name: "birthday",
    img:
      "https://static.archiesonline.com/public/images/product/medium/MT4092.jpg",
  },
  {
    name: "birthday",
    img:
      "https://static.archiesonline.com/public/images/product/medium/MT4092.jpg",
  },
  {
    name: "birthday",
    img:
      "https://static.archiesonline.com/public/images/product/medium/MT4092.jpg",
  },
  {
    name: "birthday",
    img:
      "https://static.archiesonline.com/public/images/product/medium/MT4092.jpg",
  },
  {
    name: "birthday",
    img:
      "https://static.archiesonline.com/public/images/product/medium/MT4092.jpg",
  },
  {
    name: "birthday",
    img:
      "https://static.archiesonline.com/public/images/product/medium/MT4092.jpg",
  },
]

export const Occasions = () => {
  return (
    <div className='Occasions container'>
      <h4>Occasions</h4>
      <div className='occasions-wrap'>
        {oca.map((item, index) => {
          return <OccasionCard key={index} item={item} />
        })}
      </div>
    </div>
  )
}
