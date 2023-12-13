import React from 'react';

import './Commentary.css'

const Commentary = ({ id, description, author }) => {
    return (
        <article key={id} className='commentary__box'>
            <p className="commentary__description">{description}</p>
            <p className="commentary__author">{author}</p>
        </article>
    );
};

export default Commentary;