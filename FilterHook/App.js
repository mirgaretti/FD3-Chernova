import React from 'react';
import ReactDOM from 'react-dom';

import Filter from './components/Filter';

import wordsArr from './words.json';

ReactDOM.render(
  <Filter className='Filter'
    words={wordsArr}
  />
  , document.getElementById('container') 
);
