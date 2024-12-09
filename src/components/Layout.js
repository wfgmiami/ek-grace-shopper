import React from 'react';
import { Link, hashHistory } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../redux/reducers/userReducer';

const Layout = ({ children, products, user, logout, orders, cart })=> (
  <div className='container'>
    <h1>EK Grace Shopper</h1>
    <div className='container'>
    <Link to='/'>Home</Link>
    { ' | ' }
    <Link to='/products'>Products ({ products.length})</Link>
    { ' | ' }
    {
      !user.id ? (
        <Link to='/login'>Login</Link>
      ):(
        <span>
          {
            orders.length ? (
              <span>
                <Link to='/orders'>Orders ({ orders.length})</Link>
                { ' | ' }
              </span>
            ): (null) 
          }
        <Link to='/cart'>Cart ({ cart ? cart.lineItems.length : 0 })</Link>
        { ' | ' }
        <a onClick={ logout }>Logout ({ user.name })</a>
        </span>
      )
    }
    </div>
    { children }
  </div> 
);

const mapStateToProps = ({ user,  products })=>{
  const cart = user.orders.filter(order => order.state === 'CART');
  return {
    products,
    user,
    orders: user.orders.filter( order => order.state !== 'CART'),
    cart: cart.length ? cart[0]: null 
  }
};

const mapDispatchToProps = (dispatch)=> {
  return {
    logout: ()=> dispatch(logout())
                    .then(()=> hashHistory.push('/'))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
