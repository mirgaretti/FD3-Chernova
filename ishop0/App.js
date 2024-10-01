import React from 'react';
import ReactDOM from 'react-dom';

import ShopBlock from './components/ShopBlock';

const shopText='Магазин осеннего настроения';

import itemsArr from './items.json';

ReactDOM.render(
  <ShopBlock className='ShopBlock'
    text={shopText}
    cards={itemsArr}
  />
  , document.getElementById('container') 
);
