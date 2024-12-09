import React from 'react';

import CreditCardForm from './CreditCardForm';
import CreditCardChooser from './CreditCardChooser';


export default ()=> {
  return (
    <div>
      <h3>Credit Cards</h3>
      <div className='row'>
        <div className='col-xs-6'>
          <CreditCardForm />
        </div>
        <div className='col-xs-6'>
          <CreditCardChooser />
        </div>
      </div>
    </div>
  );
};
