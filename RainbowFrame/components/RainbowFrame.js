import React from 'react';
import './RainbowFrame.css';

const RainbowFrame = ({ colors, children }) => {
  let content = children;

  for (let i = colors.length - 1; i >= 0; i--) {
    content = (
      <div style={{ border: `10px solid ${colors[i]}`, padding: '10px' }} key={i}>
        {content}
      </div>
    );
  }

  return <div>{content}</div>; 
};

export default RainbowFrame;
