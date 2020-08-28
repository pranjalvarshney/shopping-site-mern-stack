import React from "react"
import { API } from "../../utils/backend"
import { ImageLoading } from "../components/ImageLoading"

export const BlogCard = ({ blog }) => {
  const date = new Date(blog.createdAt)
  return (
    <div className='col-md-6 my-3'>
      <div class='card bg-dark text-white'>
        <ImageLoading
          imgUrl={`${API}/blog/picture/${blog._id}`}
          height={"100%"}
          width={"100%"}
        />
        <div class='card-img-overlay '>
          <h3 class='card-title'>{blog.title}</h3>

          <h5 class='card-title'>{blog.tagline}</h5>
          <p class='card-text'>{blog.content.slice(0, 100)}</p>
          <p class='badge badge-secondary'>{date.toDateString()}</p>
        </div>
      </div>
    </div>
  )
}
