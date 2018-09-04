import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { loadCart, removeProduct } from '../../store/actions/floatCartActions';
import { updateCart } from '../../store/actions/updateCartActions';

import CartProduct from './CartProduct';

import persistentCart from "../../persistentCart";

import util from '../../util';


class FloatCart extends Component {

  state = {
    isOpen: false,
    coupSuccess: false,
  };

  componentWillMount() {
    this.props.loadCart( JSON.parse(persistentCart().get()) || [] );
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.updateCart(this.props.cartProducts);
    }, 0);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.newProduct !== this.props.newProduct) {
      this.addProduct(nextProps.newProduct);
    }

    if (nextProps.productToRemove !== this.props.productToRemove) {
      this.removeProduct(nextProps.productToRemove);
    }
  }

  openFloatCart = () => {
    this.setState({ isOpen: true });
  }

  closeFloatCart = () => {
    this.setState({ isOpen: false });
  }

  addProduct = (product) => {
    const { cartProducts, updateCart } = this.props;
    let productAlreadyInCart = false;

    cartProducts.forEach(cp => {
      if (cp.id === product.id) {
        cp.quantity += product.quantity;
        productAlreadyInCart = true;
      }
    });

    if (!productAlreadyInCart) {
      cartProducts.push(product);
    }

    updateCart(cartProducts);
    this.openFloatCart();
  }

  removeProduct = (product) => {
    const { cartProducts, updateCart } = this.props;

    const index = cartProducts.findIndex(p => p.id === product.id);
    if (index >= 0) {
      cartProducts.splice(index, 1);
      updateCart(cartProducts);
    }
  }

  proceedToCheckout = () => {
    const { totalPrice, productQuantity, currencyFormat, currencyId } = this.props.cartTotals;
    const { cartProducts, updateCart } = this.props;
    if (!productQuantity) {
      alert("Add some products to the cart!");
    }
    else {
      this.writeToFile();
      alert(`Checkout - Subtotal: ${currencyFormat} ${util.formatPrice(totalPrice, currencyId)}`);      
      cartProducts.length = 0;
      updateCart(cartProducts);
    }
  }

  writeToFile = () => {

    var productDetails = '\n';
    for(var i = 0; i<this.props.cartProducts.length; i++){
      productDetails = productDetails + this.props.cartProducts[i].title + ','; 
    }
    productDetails = productDetails + this.props.cartTotals.totalPrice;
    fetch(`http://localhost:8001/api/products/write/${productDetails}`);

  }

  applyDiscount = (event) => {
    const { totalPrice, twentyoffDiscount } = this.props.cartTotals;
    event.preventDefault();

    if (this.state.value === "20OFF" && !twentyoffDiscount) {
      this.props.cartTotals.twentyoffDiscount = true;
      this.setState({
        coupSuccess: true
      })
      //this.state.coupSuccess = true;
      this.props.cartTotals.totalPrice = totalPrice*0.80;
      this.setState({totalPrice});
    } else if  (this.state.value === "20OFF" && twentyoffDiscount) {
      alert("Code has already been entered!");
    } else {
      alert("Invalid code!");
    }
  }

  handleChange = (event) =>
    this.setState({value: event.target.value});


  render() {
    const { cartTotals, cartProducts, removeProduct } = this.props;

    const products = cartProducts.map(p => {
      return (
        <CartProduct
          product={p}
          removeProduct={removeProduct}
          key={p.id}
        />
      );
    });

    let classes = ['float-cart'];

    if (!!this.state.isOpen) {
      classes.push('float-cart--open');
    }

    return (
      <div className={classes.join(' ')}>
        {/* If cart open, show close (x) button */}
        {this.state.isOpen && (
          <div
            onClick={() => this.closeFloatCart()}
            className="float-cart__close-btn"
          >
          X
          </div>
        )}

        {/* If cart is closed, show bag with quantity of product and open cart action */}
        {!this.state.isOpen && cartTotals.productQuantity<99 &&(
          <span
            onClick={() => this.openFloatCart()}
            className="bag bag--float-cart-closed"
          >
            <span className="bag__quantity">{cartTotals.productQuantity}</span>
          </span>
        )}


		{!this.state.isOpen && cartTotals.productQuantity>99 &&(
          <span
            onClick={() => this.openFloatCart()}
            className="bag bag--float-cart-closed"
          >
            <span className="bag__quantity">{99}+</span>
          </span>
        )}


        <div className="float-cart__content">
		{cartTotals.productQuantity<99 &&(
		  <div className="float-cart__header">
            <span className="bag">
              <span className="bag__quantity">
                {cartTotals.productQuantity}
              </span>
            </span>
            <span className="header-title">Bag</span>
          </div>
		)}

		{cartTotals.productQuantity>99 &&(
		  <div className="float-cart__header">
            <span className="bag">
              <span className="bag__quantity">
                {99}+
              </span>
            </span>
            <span className="header-title">Bag</span>
          </div>
		)}

          <div className="float-cart__shelf-container">
            {products}
            {!products.length && (
              <p className="shelf-empty">
                Your cart is empty, try adding something to cart<br />
              </p>
            )}
          </div>

          <div className="float-cart__footer">
            <div className="sub">SUBTOTAL</div>
            <div className="sub-price">
              <p className="sub-price__val">
                {`${cartTotals.currencyFormat} ${util.formatPrice(cartTotals.totalPrice, cartTotals.currencyId)}`}
              </p>
              <small className="sub-price__installment">
                {!!cartTotals.installments && (
                  <span>
                    {`OR UP TO ${cartTotals.installments} x ${cartTotals.currencyFormat} ${util.formatPrice(cartTotals.totalPrice / cartTotals.installments, cartTotals.currencyId)}`}
                  </span>
                )}
              </small>
            </div>
            <div className="coup-btn">
              <form onSubmit={this.applyDiscount}>
                <input className="coup-text" type="text" name="coupon" onChange={this.handleChange}></input>
                <input className="coup-submit" type="submit" value="Enter Coupon"></input>
              </form>
            </div>
            {this.state.coupSuccess &&(
              <div className="coup-msg">
                <p>
                  Coupon accepted, 20% has been taken off your price.
                </p>
              </div>
            )}
            <div onClick={() => this.proceedToCheckout()} className="buy-btn">
              Checkout
            </div>
          </div>
        </div>
      </div>
    );
  }
}

FloatCart.propTypes = {
  loadCart: PropTypes.func.isRequired,
  updateCart: PropTypes.func.isRequired,
  cartProducts: PropTypes.array.isRequired,
  newProduct: PropTypes.object,
  removeProduct: PropTypes.func,
  productToRemove: PropTypes.object,
};

const mapStateToProps = state => ({
  cartProducts: state.cartProducts.items,
  newProduct: state.cartProducts.item,
  productToRemove: state.cartProducts.itemToRemove,
  cartTotals: state.cartTotals.item,
});

export default connect(mapStateToProps, { loadCart, updateCart, removeProduct})(FloatCart);
