import React from 'react';

import './ShopCard.css';

class ShopCard extends React.Component {

  render() {

    return (
      <div className='Card'>
        <img className='Image' src={this.props.image}/>
        <div className='CardInfo'>
            <span className='Name'>{this.props.name}</span>
            <span className='Cost'>Цена - {this.props.cost}</span>
            <span className='Balance'>Текущий остаток - {this.props.balance}шт.</span>
        </div>
      </div>
    );

  }

}

export default ShopCard;
