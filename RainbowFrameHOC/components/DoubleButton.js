import React from 'react';
import './DoubleButton.css';

const DoubleButton = ({ caption1, caption2, cbPressed, children }) => {
  return (
    <div className='DoubleButton'>
      <input type="button" value={caption1}onClick={() => cbPressed(1)}/>

      {children}
      
      <input type="button" value={caption2} onClick={() => cbPressed(2)}/>
    </div>
  );
};

export default DoubleButton;
