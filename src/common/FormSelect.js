import React from 'react';

export default ({ value, name, component, options, placeholder } ) => {
  const onChange = (ev) => {
    let change = {};
    change[ev.target.name] = ev.target.value;
    component.setState(change);
  }
  return (
    <div className='form-group'>
      <label>{ placeholder }</label>
      <select className='form-control' name={ name } value={ value } onChange= {onChange }>
        { options.map( option => {
          if(typeof option === 'object'){
            return <option key={option.value} value={ option.value }>{ option.text }</option>
          }
          else {
            return <option key={option}>{ option }</option>
          }
        }) }
      </select>
    </div>
  );
}
