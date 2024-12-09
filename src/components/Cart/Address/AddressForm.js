import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  addAddress,
  } from '../../../redux/reducers/userReducer';
import FormGroup from '../../../common/FormGroup';


class _AddressForm extends Component{
  constructor(){
    super();
    this.state = { street: '', addressToSave: '' };
    this.onSave = this.onSave.bind(this);
  }
  componentDidMount(){
      const input = document.getElementById('placePicker');
      const autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.addListener('place_changed', ()=> {
      const place = autocomplete.getPlace();
      const address = place.formatted_address;
      const position = new google.maps.LatLng(place.geometry.location.lat(), place.geometry.location.lng());
      this.setState({ street: address, addressToSave: address });
      input.value = '';
    });
  }
  onSave(ev){
    this.props.addAddress(this.props.user, this.state, this.props.cart)
      .then((address)=> {
        this.setState({ street: '', addressToSave: ''})
      })
  }
  render(){
    const { street, addressToSave } = this.state;
    return (
      <div className='well'>
        <input id='placePicker' className='form-control' />
        <FormGroup state={ this.state } name='street' value={ street } placeholder='enter street' component={ this } type='hidden'/>
        { addressToSave }
        <div className='form-group'>
          <button onClick={ this.onSave } className='btn btn-primary' disabled={ !street }>Save</button>
        </div>
      </div>
    );
  }
}

export default connect(
  ({ user })=>{
    const cart = user.orders.filter(order => order.state === 'CART');
    return {
      user,
      cart: cart.length ? cart[0] : null,
    }
  },
  (dispatch)=>{
    return {
      addAddress: (user, address, cart)=> dispatch(addAddress(user, address, cart))
    }
  }
)(_AddressForm)

