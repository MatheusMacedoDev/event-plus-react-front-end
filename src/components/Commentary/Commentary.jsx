import React from 'react';

import './Commentary.css'

const Commentary = ({ description, author }) => {
    return (
        <article className='commentary__box'>
            <p className="commentary__description">"{description}"</p>
            <p className="commentary__author">{author}</p>
        </article>
    );
};

export default Commentary;