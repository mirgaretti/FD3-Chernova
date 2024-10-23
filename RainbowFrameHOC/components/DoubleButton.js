import React from 'react';

const DoubleButton = ({ caption1, caption2, cbPressed, children }) => {
  return (
    <div>
      <input type="button" value={caption1}onClick={() => cbPressed(1)}/>

      {children}
      
      <input type="button" value={caption2} onClick={() => cbPressed(2)}/>
    </div>
  );
};

export default DoubleButton;
