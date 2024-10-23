import React from 'react';

const withRainbowFrame = (colors) => (WrappedComponent) => {
  return (props) => {
    return (
      <div>
        {colors.reduceRight((acc, color) => (
          <div style={{ border: `10px solid ${color}`, padding: '10px' }}>
            {acc}
          </div>
        ), <WrappedComponent {...props} />)}
      </div>
    );
  };
};

export default withRainbowFrame;
