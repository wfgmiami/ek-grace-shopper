import React, { Component } from 'react';
import { connect } from 'react-redux';

import LineItem from './LineItem';

const _LineItems = ({ lineItems } )=> {
  return (
    <ul className='list-group'>
      {
        lineItems.length === 0 ? (
          <li className='list-group-item list-group-item-warning'>
            Put some items in cart...
          </li>
        ) : ( null )
      }
      {
        lineItems.map( lineItem => {
          return (
            <LineItem key={ lineItem.id } lineItem={ lineItem }/>
          )
        })
      }
    </ul>
  );
}

export default connect(
  ({ user })=> {
    const orders = user.orders;
    const cart = orders.filter(order => order.state === 'CART');
    return {
      lineItems: cart.length ? cart[0].lineItems : [],
    }
  }
)(_LineItems);
