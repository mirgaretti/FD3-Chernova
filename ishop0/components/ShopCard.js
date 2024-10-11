import React from 'react';

import './ShopCard.css';

class ShopCard extends React.Component {
  state = {
    confirmDelete: false,
  }

  onCardClick = () => {
    this.props.onCardClick(this.props.code); 
  }

  onDeleteClick = (e) => {
    e.stopPropagation();
    this.props.onDeleteClick(this.props.code); 
  }

  onOpenConfirmDelete = (e) => {
    e.stopPropagation();
    this.setState({confirmDelete: true});
  };

  onCloseConfirmDelete = (e) => {
    e.stopPropagation();
    this.setState({confirmDelete: false});
  };

  render() {

    return (
      <div className='Card' onClick={this.onCardClick} style={{boxShadow: this.props.isSelected ? "0px 2px 14px rgba(255, 0, 0, 1)" : ""}}>
        <img className='Image' src={this.props.image}/>
        <div className='CardInfo'>
            <span className='Name'>{this.props.name}</span>
            <span className='Cost'>Цена - {this.props.cost}</span>
            <span className='Balance'>Текущий остаток - {this.props.balance}шт.</span>
            {!this.state.confirmDelete ? <span className='Button' onClick={this.onOpenConfirmDelete}>Удалить</span> : (
              <div className='Confirm'>
                <span className='Button' onClick={this.onCloseConfirmDelete} style={{backgroundColor: "white", border: "1px solid rgba(239, 118, 19, 1)", color: "rgba(239, 118, 19, 1)", fontSize: "18px", boxSizing: "border-box"}}>Отмена</span>
                <span className='Button' onClick={this.onDeleteClick} style={{fontSize: "18px"}}>Удалить</span>
              </div>
            )}
        </div>
      </div>
    );
  }
}

export default ShopCard;
