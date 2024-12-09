import axios from 'axios';

const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

const loginUserSuccess = (user)=> {
  return {
    type: LOGIN_SUCCESS,
    user,
  };
};


const logoutSuccess = ()=> ({
  type: LOGOUT_SUCCESS
});


const getUser = ()=> {
  return (dispatch)=> {
    if(!localStorage.getItem('token'))
      return Promise.reject('no local storage token');
    return axios.get(`/api/auth/${localStorage.getItem('token')}`)
      .then(response => response.data)
      .then(user => {
        dispatch(loginUserSuccess(user))
        return user;
      })
  }
};


const logout = ()=> {
  return (dispatch)=> {
    localStorage.removeItem('token');
    dispatch(logoutSuccess());
    return Promise.resolve();
  }
}

const addItemToCart = (user, cart, product)=> {
  return (dispatch)=> {
    return axios.post(`/api/users/${user.id}/orders/${cart.id}/lineItems`,
      {
        productId: product.id
      }
    )
      .then(response => dispatch(getUser()));
  };
};

const addRating = (user, lineItem, rating)=> {
  return (dispatch)=> {
    return axios.post(`/api/users/${user.id}/reviews/`,
      {
        rating,
        lineItemId: lineItem.id
      }
    )
      .then(response => dispatch(getUser()));
  };
};

const checkout = (user, cart)=> {
  return (dispatch)=> {
    return axios.put(`/api/users/${user.id}/orders/${cart.id}`,
      {
        state: 'ORDER' 
      }
    )
      .then(response => dispatch(getUser()));
  };
};

const addCreditCardToOrder = (user, cart, creditCard)=> {
  return (dispatch)=> {
    return axios.put(`/api/users/${user.id}/orders/${cart.id}`,
      {
        creditCardId: creditCard.id 
      }
    )
      .then(response => dispatch(getUser()));
  };
};

const addCreditCard = (user, creditCard, cart)=> {
  return (dispatch)=> {
    return axios.post(`/api/users/${user.id}/creditCards`,
      creditCard
    )
      .then(response => dispatch(addCreditCardToOrder( user, cart, response.data )));
  };
};

const makeDefaultCreditCard = (user, creditCard)=> {
  return (dispatch)=> {
    return axios.put(`/api/users/${user.id}/creditCards/${creditCard.id}`, {
      isDefault: true
    })
      .then(response => dispatch(getUser()));
  };
};

const removeCreditCard = (user, creditCard)=> {
  return (dispatch)=> {
    return axios.delete(`/api/users/${user.id}/creditCards/${creditCard.id}`)
      .then(response => dispatch(getUser()));
  };
};

const addAddressToOrder = (user, cart, address)=> {
  return (dispatch)=> {
    return axios.put(`/api/users/${user.id}/orders/${cart.id}`,
      {
        addressId: address.id 
      }
    )
      .then(response => dispatch(getUser()));
  };
};

const addAddress = (user, address, cart)=> {
  return (dispatch)=> {
    return axios.post(`/api/users/${user.id}/addresses`,
      address
    )
    .then(response => {
      const address = response.data;
      dispatch(addAddressToOrder( user, cart, address ))
      return address;
    });
  };
};

const makeDefaultAddress = (user, address)=> {
  return (dispatch)=> {
    return axios.put(`/api/users/${user.id}/addresses/${address.id}`, {
      isDefault: true
    })
      .then(response => dispatch(getUser()));
  };
};

const removeAddress = (user, address)=> {
  return (dispatch)=> {
    return axios.delete(`/api/users/${user.id}/addresses/${address.id}`)
      .then(response => dispatch(getUser()));
  };
};

const removeItemFromCart = (user, cart, lineItem)=> {
  return (dispatch)=> {
    return axios.delete(`/api/users/${user.id}/orders/${cart.id}/lineItems/${lineItem.id}`)
      .then(response => dispatch(getUser()));
  };
};

const login = (credentials)=> {
  return (dispatch)=> {
    return axios.post('/api/auth', credentials)
      .then(response => response.data)
      .then(data => localStorage.setItem('token', data.token))
      .then( ()=> dispatch(getUser()))
      .catch((er)=> {
        localStorage.removeItem('token');
        throw er;
      });
  };
};


export {
  login,
  getUser,
  logout,
  addItemToCart,
  addCreditCard,
  removeCreditCard,
  removeItemFromCart,
  checkout,
  addRating,
  addCreditCardToOrder,
  makeDefaultCreditCard,
  addAddress,
  removeAddress,
  makeDefaultAddress,
  addAddressToOrder,
};


const userReducer = (state={ orders: [], creditCards: [] }, action)=> {
  switch(action.type){
    case LOGIN_SUCCESS:
      state = Object.assign({}, state, action.user); 
      break;
    case LOGOUT_SUCCESS:
      state = { orders: [], creditCards: []}; 
      break;
  }
  return state;
};


export default userReducer;
