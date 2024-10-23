import React from 'react';
import './BR2JSX.css';	

const BR2JSX = ({ text }) => {
  const lines = text.split(/<br\s*\/?>/i); 
  console.log(lines);

  return (
    <div className='BR2JSX'>
      {
        lines.reduce((acc, line, index) => {
          acc.push(line); 
          if (index < lines.length - 1) acc.push(<br key={index} />); 
          return acc;
        }, [])
      }
    </div>
  );
};

export default BR2JSX;