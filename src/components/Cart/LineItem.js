import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  removeItemFromCart,
  addItemToCart } from '../../redux/reducers/userReducer';


const _LineItem = ({ user, cart, lineItem, addItemToCart, removeItemFromCart })=> {
  return (
      <li key={ lineItem.id } className='list-group-item'>
        { lineItem.product.name }
        <span
          onClick={()=> addItemToCart(user, cart, lineItem.product) }
          style={ { marginLeft: '10px' } }
          className='label label-default'>
            { lineItem.quantity }
        </span>
        <button className='btn btn-warning pull-right' onClick={ ()=> removeItemFromCart(user, cart, lineItem)}>x</button>
        <br style={ { clear: 'both' }} />
      </li>
  );
}

export default connect(
  ({ user })=> {
    const cart = user.orders.filter(order => order.state === 'CART');
    return {
      cart: cart.length ? cart[0] : null,
      user,
    }
  },
  (dispatch)=> {
    return {
      removeItemFromCart: (user, cart, lineItem)=> {
        return dispatch(removeItemFromCart(user, cart, lineItem));
      },
      addItemToCart: ( user, cart, product )=> dispatch(addItemToCart( user, cart, product)),
    };
  }
)(_LineItem);
