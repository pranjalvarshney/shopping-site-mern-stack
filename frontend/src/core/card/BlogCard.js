import React from "react"
import { API } from "../../utils/backend"

export const BlogCard = ({ blog }) => {
  const date = new Date(blog.createdAt)
  return (
    <div className='col-md-6'>
      <div class='card my-3 mx-1'>
        <img
          class='card-img-top blog-picture'
          src={`${API}/blog/picture/${blog._id}`}
          alt='Card cap'
        />
        <div class='card-body'>
          <h5 class='card-title'>{blog.title}</h5>
          <h6 class='card-title'>{blog.tagline}</h6>
          <p class='card-text'>{blog.content}</p>
          <p class='card-text'>
            <small class='text-muted'>{date.toDateString()}</small>
          </p>
        </div>
      </div>
    </div>
  )
}
