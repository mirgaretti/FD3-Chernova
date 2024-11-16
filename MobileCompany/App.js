import React from 'react';
import ReactDOM from 'react-dom';

import ClientTable from './components/ClientTable';
import { Provider } from 'react-redux';
import { store } from './redux/store'; 

ReactDOM.render(
  <Provider store={store}>
    <ClientTable />
  </Provider>
  ,document.getElementById('container') 
);
