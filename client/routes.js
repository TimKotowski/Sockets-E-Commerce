import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome} from './components'
import {me} from './store'
import AllProducts from './components/Products/AllProducts'
import OrderPage from './components/Orders/OrderPage'
import SingleProduct from './components/Products/SingleProduct'
import Cart from './components/Cart/Cart'
import CheckoutPage from './components/Checkout/CheckoutPage'
import ConfirmationPage from './components/Checkout/ConfirmationPage'
import Dashboard from './components/Dashboard/Dashboard'
import AddProduct from './components/Products/AddProduct'
import AdminUsers from './components/Dashboard/AdminUsers'
import AdminProducts from './components/Dashboard/AdminProducts'
/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/products/:productId" component={SingleProduct} />
        <Route exact path="/users/orders/cart" component={Cart} />
        <Route exact path="/orders" component={OrderPage} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route
          path="/dashboard/admin"
          render={props => (
            <div>
              <AddProduct />
              <AdminUsers />
              <AdminProducts />
            </div>
          )}
        />
        <Route path="/products" component={AllProducts} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/checkout" component={CheckoutPage} />
        <Route path="/confirmation" component={ConfirmationPage} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
