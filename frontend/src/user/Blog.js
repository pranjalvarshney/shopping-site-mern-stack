import React, { useEffect, useState } from "react"
import { Base } from "../core/Base"
import { getBlogs } from "../core/helper/mainAPICalls"
import { BlogCard } from "../core/card/BlogCard"

export const Blog = () => {
  const [dataBlog, setDataBlog] = useState([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const fetchBlogs = async () => {
    try {
      setLoading(true)
      setError("")
      const response = await getBlogs()
      if (response) {
        setDataBlog(response.data)
        setLoading(false)
        setError("")
      }
    } catch (error) {
      setLoading(false)
      // setError(error.response.data.errorMsg)
    }
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  const showLoading = () => (
    <div className='d-flex justify-content-center'>
      <div
        className='spinner-border'
        role='status'
        style={{ display: loading ? "" : "none" }}
      >
        <span className='sr-only'>Loading...</span>
      </div>
    </div>
  )

  const errorMsg = () => {
    return (
      <div
        className='alert  text-center alert-danger'
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    )
  }
  return (
    <Base className='container pt-5'>
      <div className='pt-5 my-3'>
        <h2>Blogs</h2>
        <div>
          {showLoading()}
          {errorMsg()}
        </div>
        <div className='showBlogsCardsSection'>
          {dataBlog.map((blog, index) => {
            return <BlogCard key={index} blog={blog} />
          })}
        </div>
      </div>
    </Base>
  )
}
