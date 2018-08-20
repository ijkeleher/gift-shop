import React from 'react';
import PropTypes from "prop-types";
import EditProduct from "./EditProduct";

import Thumb from '../Thumb';

import util from '../../util';

class Product extends React.Component {

  state = {
    showEditMenu: false
  }  

  editItemMenu = () => {
    if(this.state.showEditMenu === false){
      this.setState({
        showEditMenu: true 
      });
    }
    else{
      this.setState({
        showEditMenu: false 
      });
    }

  }

  render(){
    
    const product = this.props.product;
    // Um componente de input pode alterar a quantidade no futuro
    product.quantity = 1;

    let formattedPrice = util.formatPrice(this.props.product.price, this.props.product.currencyId);
    
    let productInstallment;
    
    if(!!product.installments) {
      const installmentPrice = (product.price / product.installments);

      productInstallment = (
        <div className="installment">
          <span>or {product.installments} x</span><b> {product.currencyFormat} {util.formatPrice(installmentPrice, product.currencyId)}</b>
        </div>
      );
    }
    return (
      <div className="shelf-item" data-sku={this.props.product.sku}>
        {this.props.product.isFreeShipping && 
          <div className="shelf-stopper">Free shipping</div>
        }
        <Thumb
          classes="shelf-item__thumb"
          src={require(`../../static/products/${this.props.product.sku}_1.jpg`)}
          alt={this.props.product.title}
        />
        <p className="shelf-item__title">{this.props.product.title}</p>
        <div className="shelf-item__price">
          <div className="val"><small>{this.props.product.currencyFormat}</small>
            <b>
              {formattedPrice.substr(0, formattedPrice.length - 3)}
            </b>
            <span>
              {formattedPrice.substr(formattedPrice.length - 3, 3)}
            </span>
          </div>
          {productInstallment}
        </div>
        <div onClick = {this.editItemMenu}>Edit</div>
        {this.state.showEditMenu ?
            <EditProduct id={this.props.product.id}/> :
            null
          }
        <div onClick={() => this.props.addProduct(this.props.product)} className="shelf-item__buy-btn">Add to cart</div>
      </div>
    );
  }

}



Product.propTypes = {
  product: PropTypes.object.isRequired,
  addProduct: PropTypes.func.isRequired,
};

export default Product;