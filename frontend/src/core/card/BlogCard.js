import React from "react"
import { API } from "../../utils/backend"
import { ImageLoading } from "../components/ImageLoading"

export const BlogCard = ({ blog }) => {
  const date = new Date(blog.createdAt)
  return (
    <div className='col-md-6 my-3'>
      <div className='card bg-dark text-white'>
        <ImageLoading
          imgUrl={`${API}/blog/picture/${blog._id}`}
          height={"100%"}
          width={"100%"}
        />
        <div className='card-img-overlay '>
          <h3 className='card-title'>{blog.title}</h3>

          <h5 className='card-title'>{blog.tagline}</h5>
          <p className='card-text'>{blog.content.slice(0, 100)}</p>
          <p className='badge badge-secondary'>{date.toDateString()}</p>
        </div>
      </div>
    </div>
  )
}
