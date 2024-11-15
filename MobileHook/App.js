import React from 'react';
import ReactDOM from 'react-dom';

import ClientTable from './components/ClientTable';
import clients from './clients.json';
console.log(clients);
ReactDOM.render(
  <ClientTable clients={clients} />
  ,document.getElementById('container') 
);
