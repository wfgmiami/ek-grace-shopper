import React from 'react';

import AddressForm from './AddressForm';
import AddressChooser from './AddressChooser';


export default ()=> {
  return (
    <div>
      <h3>Addresses</h3>
      <div className='row'>
        <div className='col-xs-12'>
          <AddressForm />
        </div>
        <div className='col-xs-12'>
          <AddressChooser />
        </div>
      </div>
    </div>
  );
};
