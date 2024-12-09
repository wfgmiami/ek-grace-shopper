import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  addCreditCardToOrder,
  removeCreditCard,
  makeDefaultCreditCard
  } from '../../../redux/reducers/userReducer';


const _CreditCardChooser = ({ user, creditCards, addCreditCardToOrder, cart, removeCreditCard, makeDefaultCreditCard })=> {
  let selector;
  if(creditCards.length === 0){
    return null;
  }
  return (
    <div>
      <select ref={ (ref)=> selector = ref } defaultValue={cart.creditCardId} className='form-control' onChange={(ev)=>{addCreditCardToOrder(user, cart, { id: selector.value })} }>
        {
          creditCards.map( creditCard => <option value={ creditCard.id } key={ creditCard.id } selected={ cart.creditCardId === creditCard.id}>{ creditCard.brand }{ 
            creditCard.isDefault ? (' ( * default card * )') : (null)  
          }</option> )
        }
      </select>
      <button style={ { marginTop: '10px' }} className='btn btn-warning' onClick={ ()=> makeDefaultCreditCard(user, { id: selector.value }) }>Make Default</button>
      <button style={ { marginTop: '10px' }} className='btn btn-danger' onClick={ ()=> removeCreditCard(user, { id: selector.value }) }>Delete this credit card</button>
    </div>
  )
};

export default connect(
  ({ user })=> {
    const cart = user.orders.filter(order => order.state === 'CART');
    return {
      user,
      cart: cart.length ? cart[0] : null,
      creditCards: user.creditCards
    }
  },
  (dispatch)=> {
    return {
      makeDefaultCreditCard: (user, creditCard)=> dispatch(makeDefaultCreditCard( user, creditCard )),
      addCreditCard: (user, creditCard, cart)=> dispatch( addCreditCard(user, creditCard, cart)),
      addCreditCardToOrder: (user, cart, creditCard) => dispatch(addCreditCardToOrder(user, cart, creditCard )),
      removeCreditCard: (user, creditCard)=> dispatch(removeCreditCard(user, creditCard))
    };
  }
)(_CreditCardChooser);
