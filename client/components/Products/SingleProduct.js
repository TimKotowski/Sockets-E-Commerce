import React from 'react'
import {connect} from 'react-redux'
import {fetchProduct} from '../../store/singleProduct'
import Axios from 'axios'
import Product from './Product'
import ErrorPage from '../Utility/ErrorPage'

/*
parent SingleProduct component to render each individual product when you click from the products page. Connects to the child functional component Product.
*/

export class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      addedToCart: false
    }

    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    const {productId} = this.props.match.params
    this.props.fetchProduct(productId)
  }

  async handleClick() {
    if (this.props.user.id) {
      this.setState({addedToCart: true})
      const {data} = await Axios.put(`/api/users/orders/cart`, {
        productId: this.props.product.id,
        userId: this.props.user.id
      })
    } else {
      console.log("You're not a user!")
    }
  }

  render() {
    return (
      <div>
        {this.state.addedToCart ? (
          <div>
            <h1>successfully added to cart!</h1>
          </div>
        ) : (
          <div />
        )}
        {this.props.product ? (
          <Product product={this.props.product} />
        ) : (
          <ErrorPage />
        )}
        <button type="button" onClick={this.handleClick}>
          Add To Cart
        </button>
      </div>
    )
  }
}

const mapState = state => {
  return {
    product: state.singleProduct,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    fetchProduct: productId => dispatch(fetchProduct(productId))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)