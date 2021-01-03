import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { Home } from "./core/Home"
import { Signup } from "./user/Signup"
import { Signin } from "./user/Signin"
import { AdminRoutes } from "./auth/AdminRoutes"
import { PrivateRoutes } from "./auth/PrivateRoutes"
import { UserDashboard } from "./user/UserDashBoard"
import { AdminDashboard } from "./user/AdminDashboard"
import { CreateCategory } from "./admin/CreateCategory"
import { CreateProduct } from "./admin/CreateProduct"
import { ManageCategories } from "./admin/ManageCategories"
import { ManageProducts } from "./admin/ManageProducts"
import { ManageOrders } from "./admin/ManageOrders"
import { UpdateProduct } from "./admin/UpdateProduct"
import { ProductPage } from "./core/components/ProductPage"
import { Blog } from "./user/Blog"
import { Cart } from "./user/Cart"
import { Occasion } from "./user/Occasion"
import { CreateBlog } from "./admin/CreateBlog"
import { ManageBlog } from "./admin/ManageBlog"
import { AllProducts } from "./user/AllProducts"
import { OccasionType } from "./user/OccasionType"
import { PaymentSuccess } from "./user/PaymentSuccess"
import { UserTransactions } from "./user/UserTransactions"

export const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/blogs' component={Blog} />
        <Route exact path='/cart' component={Cart} />
        <Route exact path='/occasions' component={Occasion} />
        <Route exact path='/occasion/:otype' component={OccasionType} />
        <Route exact path='/product/:productId' component={ProductPage} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/signin' component={Signin} />
        <Route exact path='/products' component={AllProducts} />
        <PrivateRoutes exact path='/user' component={UserDashboard} />
        <PrivateRoutes exact path='/user/transactions' component={UserTransactions} />
        <PrivateRoutes exact path='/payment-success' component={PaymentSuccess} />
        <AdminRoutes exact path='/admin' component={AdminDashboard} />
        <AdminRoutes exact path='/admin/manage/blogs' component={ManageBlog} />
        <AdminRoutes exact path='/admin/create/blog' component={CreateBlog} />
        <AdminRoutes
          exact
          path='/admin/create/category'
          component={CreateCategory}
        />
        <AdminRoutes
          exact
          path='/admin/create/product'
          component={CreateProduct}
        />

        <AdminRoutes
          exact
          path='/admin/manage/categories'
          component={ManageCategories}
        />
        <AdminRoutes
          exact
          path='/admin/manage/category/:categoryId'
          component={ManageCategories}
        />

        <AdminRoutes
          exact
          path='/admin/manage/products'
          component={ManageProducts}
        />
        <AdminRoutes
          exact
          path='/admin/product/update/:productId'
          component={UpdateProduct}
        />
        <AdminRoutes
          exact
          path='/admin/manage/orders'
          component={ManageOrders}
        />
        <AdminRoutes
          exact
          path='/admin/manage/users'
          component={ManageOrders}
        />
        <Route exact path='/cart' component={Home} />
      </Switch>
    </Router>
  )
}
