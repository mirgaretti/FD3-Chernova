import React, { useEffect, useState } from 'react';
import Controls from './Controls';
import List from './List';
import './Filter.css';

const Filter = ({ words }) => {
    const [sort, setSort] = useState(false);
    const [filter, setFilter] = useState('');
    const [filteredWords, setFilteredWords] = useState(words);

    useEffect(() => {
        const newWords = words.filter(word => word.includes(filter));
        setFilteredWords(sort ? newWords.sort() : newWords);
        console.log(filteredWords);
    }, [sort, filter]);

    const onSortChange = () => {
        setSort(!sort);
    };

    const onFilterChange = (value) => {
        setFilter(value);
    };

    const onReset = () => {
        setFilter('');
        setSort(false);
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
