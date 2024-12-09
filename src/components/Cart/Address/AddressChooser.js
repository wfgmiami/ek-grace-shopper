import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  addAddressToOrder,
  removeAddress,
  makeDefaultAddress
  } from '../../../redux/reducers/userReducer';


const _AddressChooser = ({ user, addresses, addAddressToOrder, cart, removeAddress, makeDefaultAddress })=> {
  let selector;
  if(addresses.length === 0){
    return null;
  }
  return (
    <div>
      <select ref={ (ref)=> selector = ref } defaultValue={cart.addressId} className='form-control' onChange={(ev)=>{addAddressToOrder(user, cart, { id: selector.value })} }>
        {
          addresses.map( address => <option value={ address.id } key={ address.id } selected={ cart.addressId === address.id}>{ address.street }{ 
            address.isDefault ? (' ( * default address * )') : (null)  
          }</option> )
        }
      </select>
      <button style={ { marginTop: '10px' }} className='btn btn-warning' onClick={ ()=> makeDefaultAddress(user, { id: selector.value }) }>Make Default</button>
      <button style={ { marginTop: '10px' }} className='btn btn-danger' onClick={ ()=> removeAddress(user, { id: selector.value }) }>Delete this Address</button>
    </div>
  )
};

export default connect(
  ({ user })=> {
    const cart = user.orders.filter(order => order.state === 'CART');
    return {
      user,
      cart: cart.length ? cart[0] : null,
      addresses: user.addresses
    }
  },
  (dispatch)=> {
    return {
      makeDefaultAddress: (user, address)=> dispatch(makeDefaultAddress( user, address )),
      addAddress: (user, address, cart)=> dispatch( addAddress(user, address, cart)),
      addAddressToOrder: (user, cart, address) => dispatch(addAddressToOrder(user, cart, address )),
      removeAddress: (user, address)=> dispatch(removeAddress(user, address))
    };
  }
)(_AddressChooser);
