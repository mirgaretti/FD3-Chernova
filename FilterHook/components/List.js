import React from 'react';

const List = ({ words }) => (
    <div className='FilterBlock'>
        {words.map(word => <p key={word}>{word}</p>)}
    </div>
);

export default List;