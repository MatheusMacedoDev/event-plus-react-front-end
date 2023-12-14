import React, { useState, useEffect } from 'react';

import api from '../../../services/apiAcessor';
import { eventsResource } from '../../../services/apiResources';

import {dateFormatDbToView } from '../../../utils/stringFunctions';

import EventImage from '../../../assets/images/event_image.svg';

import './EventInfo.css';

const EventInfo = ({ eventId }) => {
    const [event, setEvent] = useState({ nomeEvento: '', descricao: '', tiposEvento: { titulo: '' }, dataEvento: '' });

    useEffect(() => {
        async function getEvent() {
            const response = await api.get(`/${eventsResource}/${eventId}`)
            const data = response.data;

            setEvent(data);
        }

        getEvent();
    }, []);

    return (
        <section className="event-info">
            <img src={EventImage} alt="Imagem que representa o evento." className='event-info__image' />
            <div className="event-info__box">
                <p className="event-info__text"><strong className='event-info__text--highlight'>Título:</strong> {event.nomeEvento}</p>
                <p className="event-info__text"><strong className='event-info__text--highlight'>Descrição:</strong> {event.descricao}</p>
                <p className="event-info__text"><strong className='event-info__text--highlight'>Tipo do Evento:</strong> {event.tiposEvento.titulo}</p>
                <p className="event-info__text"><strong className='event-info__text--highlight'>Data:</strong> {dateFormatDbToView(event.dataEvento)}</p>
            </div>
        </section>
    );
};

export default EventInfo;