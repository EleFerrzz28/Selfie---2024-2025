import React from 'react';
import './Theme.css';

const ThemeToggler = ({handleChange, isChecked }) => {


  return (
    <div className='theme-toggler'>
      <input 
      type='checkbox'
      id='check'
      className='toggle'
      onChange={handleChange}
      checked={isChecked}
      />
      <label htmlFor='check'>  </label>

    </div>
  );
}

export default ThemeToggler;
