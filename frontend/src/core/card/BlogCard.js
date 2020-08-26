import React from "react"
import { API } from "../../utils/backend"

export const BlogCard = ({ blog }) => {
  const date = new Date(blog.createdAt)
  return (
    <div className='col-md-6'>
      <div className='card my-3 mx-1'>
        <img
          className='card-img-top blog-picture'
          src={`${API}/blog/picture/${blog._id}`}
          alt='Card cap'
        />
        <div className='card-body'>
          <h5 className='card-title'>{blog.title}</h5>
          <h6 className='card-title'>{blog.tagline}</h6>
          <p className='card-text'>{blog.content}</p>
          <p className='card-text'>
            <small className='text-muted'>{date.toDateString()}</small>
          </p>
        </div>
      </div>
    </div>
  )
}
