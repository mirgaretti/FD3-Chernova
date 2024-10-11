import React from 'react';

import './ShopBlock.css';

import ShopText from './ShopText';
import ShopCard from './ShopCard';

class ShopBlock extends React.Component {
  state = {
    selectedCardCode: null,
    cards: this.props.cards,
  };

  onCardSelect = (code) => {
    this.setState({selectedCardCode: code});
  }

  onCardDelete = (code) => {
    this.setState({
      selectedCardCode: code === this.state.selectedCardCode ? null : this.state.selectedCardCode, 
      cards: this.state.cards.filter( s => s.code !== code)
    });
  }

  render() {

    const cardsCode=this.state.cards.map( s =>
      <ShopCard 
          key={s.code} 
          code={s.code} 
          name={s.name} 
          cost={s.cost} 
          balance={s.balance} 
          image={s.image} 
          isSelected={this.state.selectedCardCode === s.code}
          onCardClick={this.onCardSelect}
          onDeleteClick={this.onCardDelete}
      />
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
