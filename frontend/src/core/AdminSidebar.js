import React from "react"
import { Link } from "react-router-dom"

export const AdminSidebar = () => {
  return (
    <div className='card text-left '>
      <h6 className='card-header px-4 bg-info text-white border-0'>
        Admin Navigation
      </h6>
      <ul className='list-group'>
        <li className='list-group-item py-1 my-0 border-0'>
          <Link to='/admin/create/blog' className=' nav-link'>
            Create Blog
          </Link>
        </li>
        <li className='list-group-item py-1 my-0 border-0'>
          <Link to='/admin/manage/blogs' className=' nav-link'>
            Manage Blogs
          </Link>
        </li>
        <li className='list-group-item py-1 my-0 border-0'>
          <Link to='/admin/create/category' className=' nav-link'>
            Create Category
          </Link>
        </li>
        <li className='list-group-item py-1 my-0 border-0'>
          <Link to='/admin/manage/categories' className=' nav-link'>
            Manage Categories
          </Link>
        </li>
        <li className='list-group-item py-1 my-0 border-0'>
          <Link to='/admin/create/product' className='nav-link'>
            Create Product
          </Link>
        </li>
        <li className='list-group-item py-1 my-0 border-0'>
          <Link to='/admin/manage/products' className='nav-link'>
            Manage Products
          </Link>
        </li>
        <li className='list-group-item py-1 my-0 border-0'>
          <Link to='/admin/manage/orders' className='nav-link'>
            Manage Orders
          </Link>
        </li>
        <li className='list-group-item py-1 my-0 border-0'>
          <Link to='/admin/manage/users' className='nav-link'>
            Manage Users
          </Link>
        </li>
      </ul>
    </div>
  )
}
