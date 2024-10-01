import React from 'react';
import PropTypes from 'prop-types';

import './ShopText.css';

class ShopText extends React.Component {

  static propTypes = {
    text: PropTypes.string.isRequired,
  };
  
  render() {
    return <div className='ShopText'>{this.props.text}</div>;
  }

}

export default ShopText;