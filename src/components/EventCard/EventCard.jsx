import React from 'react';
import './EventCard.css';

import { Tooltip } from 'react-tooltip';

import { dateFormatDbToView } from '../../utils/stringFunctions';
import { Link } from 'react-router-dom';

const EventCard = ( {title, description, date, idEvent, buttonText, buttonLink} ) => {
    return (
        <article className='event-card'>
            <h2 className="event-card__title">{title.substring(0, 15)}...</h2>
            <p 
                className="event-card__description"
                data-tooltip-id={idEvent}
                data-tooltip-content={description}
                data-tooltip-place="top"
            >
                {description.substring(0, 15)}...
            </p>
            <Tooltip id={idEvent} className='tooltip' />
            <p className="event-card__description">{dateFormatDbToView(date)}</p>
            <Link to={buttonLink} className="event-card__connect-link">{buttonText}</Link>
        </article>
    );
};

export default EventCard;