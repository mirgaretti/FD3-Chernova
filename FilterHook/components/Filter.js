import React, { useState } from 'react';
import Controls from './Controls';
import List from './List';
import './Filter.css';

const Filter = ({ words }) => {
    const [sort, setSort] = useState(false);
    const [filter, setFilter] = useState('');
    const [filteredWords, setFilteredWords] = useState(words);

    const onSortChange = () => {
        setSort(!sort);
        updateFilteredWords(filter, !sort);
    };

    const onFilterChange = (e) => {
        const value = e.target.value;
        setFilter(value);
        updateFilteredWords(value, sort);
    };

    const onReset = () => {
        setFilter('');
        setSort(false);
        setFilteredWords(words);
    };

    const updateFilteredWords = (filterValue, isSort) => {
        const newWords = words.filter(word => word.includes(filterValue));
        setFilteredWords(isSort ? newWords.sort() : newWords);
        console.log(filteredWords);

    };

    return (
        <div className='Filter'>
            <Controls
                sort={sort}
                filter={filter}
                onSortChange={onSortChange}
                onFilterChange={onFilterChange}
                onReset={onReset}
            />
            <List words={filteredWords} />
        </div>
    );
};

export default Filter;
