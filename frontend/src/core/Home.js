import React, { useEffect, useState } from "react"
import { Base } from "./Base"
import { SectionHello } from "./components/SectionHello"
import { Occasions } from "./components/Occasions"
import { ShowProducts } from "./components/ShowProducts"
import { getProducts } from "./helper/mainAPICalls"

export const Home = () => {
  const [products, setProducts] = useState([])
  const [errors, setErrors] = useState([])

  const loadData = async () => {
    try {
      const response = await getProducts()
      console.log(response.data)

      if (response) {
        setProducts(response.data)
        setErrors("")
      }
    } catch (error) {
      // setErrors(error.response.data.errormsg)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <Base>
      <div className='Home'>
        <div className='main-wrapper '>
          <SectionHello />
        </div>
        <ShowProducts products={products} />
        <Occasions />
      </div>
    </Base>
  )
}
