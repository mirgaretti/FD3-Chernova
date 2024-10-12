import React from 'react';

import './Filter.css';

class Filter extends React.Component {

    state = {
        sort: false,
        filter: '',
        words: this.props.words,
    };
  
    onSortClick = () => {
        const filteredWords = this.props.words.filter(word => word.includes(this.state.filter));
        const newWords = !this.state.sort ? filteredWords.sort() : filteredWords;
        this.setState( {sort: !this.state.sort, words: newWords} );
    };

    onFilterInput = (e) => {
        const filteredWords = this.props.words.filter(word => word.includes(e.target.value));
        const newWords = this.state.sort ? filteredWords.sort() : filteredWords;
        this.setState( {filter: e.target.value, words: newWords} );
    };

    onResetClick = () => {
        this.setState( {filter: '', sort: false, words: this.props.words} );
    };

    render() {
        const words = this.state.words.map( word => 
            <p key={word}>{word}</p>
        );

        return (
            <div className='Filter'>
                <div className='FilterSettings'>
                    <input type="checkbox" checked={this.state.sort} onClick={this.onSortClick}/>
                    <input type='text' value={this.state.filter} placeholder='Введите символ' onChange={this.onFilterInput}/>
                    <button className='FilterButton' onClick={this.onResetClick}>Сброс</button>
                </div>
                <div className='FilterBlock'>{words}</div>
            </div>
        );
    }
}

export default Filter;
