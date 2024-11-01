import React from 'react';

const Controls = ({ sort, filter, onSortChange, onFilterChange, onReset }) => (
    <div className='FilterSettings'>
        <input type="checkbox" checked={sort} onChange={onSortChange} />
        <input type='text' value={filter} placeholder='Введите символ' onChange={(e) => onFilterChange(e.target.value)} />
        <button className='FilterButton' onClick={onReset}>Сброс</button>
    </div>
);

export default Controls;