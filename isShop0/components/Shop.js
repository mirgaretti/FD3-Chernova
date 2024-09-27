import React from 'react';

import './Shop.css';

class Shop extends React.Component {

  render() {
    return (
      <div className='Shop'>
        <p className='Shop_Name'>
          {this.props.name}
        </p>
        <p className='Shop_Address'>
          {this.props.address}
        </p>
      </div>
    );
  }
}

export default Shop;
