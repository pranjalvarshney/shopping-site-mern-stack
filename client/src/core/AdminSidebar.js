import { Button } from "@material-ui/core"
import React from "react"
import { useHistory } from "react-router-dom"

export const AdminSidebar = () => {
  const history = useHistory()
  return (
    <div className="card text-left ">
      <h6 className="card-header px-4 bg-primary text-white border-0">
        Admin Navigation
      </h6>
      <ul className="list-group">
        <li className="list-group-item py-2 my-0 border-0">
          <Button
            onClick={() => {
              history.push("/admin/create/blog")
              window.location.reload()
            }}
          >
            Create Blog
          </Button>
        </li>
        <li className="list-group-item py-2 my-0 border-0">
          <Button
            onClick={() => {
              history.push("/admin/manage/blogs")
              window.location.reload()
            }}
          >
            Manage Blogs
          </Button>
        </li>
        <li className="list-group-item py-2 my-0 border-0">
          <Button
            onClick={() => {
              history.push("/admin/create/category")
              window.location.reload()
            }}
          >
            Create Category
          </Button>
        </li>
        <li className="list-group-item py-2 my-0 border-0">
          <Button
            onClick={() => {
              history.push("/admin/manage/categories")
              window.location.reload()
            }}
          >
            Manage Categories
          </Button>
        </li>
        <li className="list-group-item py-2 my-0 border-0">
          <Button
            onClick={() => {
              history.push("/admin/create/product")
              window.location.reload()
            }}
          >
            Create Product
          </Button>
        </li>
        <li className="list-group-item py-2 my-0 border-0">
          <Button
            onClick={() => {
              history.push("/admin/manage/products")
              window.location.reload()
            }}
            className="nav-link"
          >
            Manage Products
          </Button>
        </li>
        <li className="list-group-item py-2 my-0 border-0">
          <Button
            onClick={() => {
              history.push("/admin/manage/orders")
              window.location.reload()
            }}
            className="nav-link"
          >
            Manage Orders
          </Button>
        </li>
        {/* <li className="list-group-item py-2 my-0 border-0">
          <Button
            onClick={() => {
              history.push("/admin/manage/users")
              window.location.reload()
            }}
            className="nav-link"
          >
            Manage Users
          </Button>
        </li> */}
      </ul>
    </div>
  )
}
