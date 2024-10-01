import React from 'react';

import './ShopBlock.css';

import ShopText from './ShopText';
import ShopCard from './ShopCard';

class ShopBlock extends React.Component {

  render() {

    const cardsCode=this.props.cards.map( s =>
      <ShopCard key={s.code} name={s.name} cost={s.cost} balance={s.balance} image={s.image} />
    );

    return (
      <div className='ShopBlock'>
        <ShopText text={this.props.text}/>
        <div className='ShopCards'>{cardsCode}</div>
      </div>
    );

  }

}

export default ShopBlock;
