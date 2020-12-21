import React, { useEffect, useState } from "react"
import { Base } from "./Base"
import { OccasionsSection } from "./components/OccasionsSection"
import { ShowProducts } from "./components/ShowProducts"
import {getProductsHome } from "./helper/mainAPICalls"
import { loadCart } from "./helper/addToCartHelper"
import { Carousel } from "react-bootstrap"

export const Home = () => {
  const [products, setProducts] = useState([])
  // const [errors, setErrors] = useState([])

  const loadData = async () => {
    try {
      const response = await getProductsHome()
      // console.log(response.data)

      if (response) {
        setProducts(response.data)
        // setErrors("")
      }
    } catch (error) {
      // setErrors(error)
    }
  }

  useEffect(() => {
    loadData()
    loadCart()
  }, [])

  return (
    <Base>
      <div className="Home">
      <Carousel >
          <Carousel.Item>
            <img id="resp-img" className="d-block w-100" src="slide1.jpg" alt="First slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img id="resp-img" className="d-block w-100" src="slide2.png" alt="First slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img id="resp-img" className="d-block w-100" src="christmas.gif" alt="First slide" />
          </Carousel.Item>
        </Carousel>
        <ShowProducts products={products} />
       
        <OccasionsSection />
      </div>
    </Base>
  )
}
