import React, { useState, useEffect } from 'react';

import api from '../../../services/apiAcessor';
import { eventsResource } from '../../../services/apiResources';

import {dateFormatDbToView } from '../../../utils/stringFunctions';

import EventImage from '../../../assets/images/event_image.svg';

import { motion } from 'framer-motion';

import './EventInfo.css';

const EventInfo = ({ eventId, notifyError, setShowSpinner }) => {
    const [event, setEvent] = useState({ nomeEvento: '', descricao: '', tiposEvento: { titulo: '' }, dataEvento: '' });

    useEffect(() => {
        async function getEvent() {
            setShowSpinner(true);

            try {
                const response = await api.get(`/${eventsResource}/${eventId}`)
                const data = response.data;
    
                setEvent(data);
            } catch(err) {
                notifyError('Erro no carregamento das informações. Verifique a sua conexão com a internet.');
            }

            setShowSpinner(false);
        }

        getEvent();
    }, []);

    return (
        <section className="event-info">
            <motion.img 
                initial={{ opacity: 0, x: -500 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                src={EventImage} 
                alt="Imagem que representa o evento." 
                className='event-info__image' 
            />
            <motion.div 
                initial={{ opacity: 0, x: 500 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="event-info__box"
            >
                <p className="event-info__text"><strong className='event-info__text--highlight'>Título:</strong> {event.nomeEvento}</p>
                <p className="event-info__text"><strong className='event-info__text--highlight'>Descrição:</strong> {event.descricao}</p>
                <p className="event-info__text"><strong className='event-info__text--highlight'>Tipo do Evento:</strong> {event.tiposEvento.titulo}</p>
                <p className="event-info__text"><strong className='event-info__text--highlight'>Data:</strong> {dateFormatDbToView(event.dataEvento)}</p>
            </motion.div>
        </section>
    );
};

export default EventInfo;