import React, { Component } from 'react';
import { hashHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import { checkout } from '../../redux/reducers/userReducer';

import CreditCardManager from './CreditCard/CreditCardManager';
import AddressManager from './Address/AddressManager';
import LineItems from './LineItems';

const CartPage = ({ cart, user, checkout})=> {
  if(!cart){
    return null;
  }

  return (
    <div>
      {
        cart.creditCard ? (
          <div className='alert alert-success'>
            Your { cart.creditCard.brand } Card will be used for this order.
          </div>
        ): (null)
      }
      {
        cart.address ? (
          <div className='alert alert-success'>
            Your { cart.address.street } Address will be used for this order.
          </div>
        ): (null)
      }
      <LineItems />
      <div style={{ marginBottom: '10px'}} >
      <button disabled={ !cart.creditCardId || !cart.addressId || !cart.lineItems.length } onClick={ ()=> checkout(user, cart)} className='btn btn-primary'>
        Checkout
      </button>
      <Link to='/products' className='btn btn-default'>Shop More!</Link>
      </div>
      <div className='row well'>
        <div className='col-xs-6'>
          <CreditCardManager />
        </div>
        <div className='col-xs-6'>
          <AddressManager />
        </div>
      </div>
    </div>
 );
};

const mapDispatchToProps = (dispatch)=> (
  {
    checkout: (user, cart)=> {
      return dispatch(checkout(user, cart))
        .then(()=> hashHistory.push('orders'))
    },
  }
);

const mapStateToProps = ({ user })=> {
  const orders = user.orders;
  const cart = orders.filter(order => order.state === 'CART');
  return {
    cart: cart.length ? cart[0] : null,
    user
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
