import React, { useContext, useState } from 'react';
import './EventCard.css';

import Notification from '../../components/Notification/Notification'
import { Tooltip } from 'react-tooltip';

import { dateFormatDbToView } from '../../utils/stringFunctions';
import { Link } from 'react-router-dom';

import { UserContext } from '../../context/AuthContext';

import { motion } from 'framer-motion';

const EventCard = ( {title, description, date, idEvent, buttonText, buttonLink} ) => {
    const { userData } = useContext(UserContext);

    // Notification
    const [notifyUser, setNotifyUser] = useState({});

    function verifyIsLoggedIn() {
        if (!userData && buttonText === 'Conectar') {
            notifyWarning('Por favor, entre em sua conta para acessar esse recurso.')
        }
    }

    function verifyIsAdmin() {
        if (userData && userData.role === 'Administrador') {
            notifyWarning('Essa página é acessível somente usuários comuns.')
        }
    }

    function verify() {
        verifyIsLoggedIn();
        verifyIsAdmin();
    }

    function notifyWarning(textNote) {
        setNotifyUser({
            titleNote: "Aviso",
            textNote,
            imgIcon: 'warning',
            imgAlt: 'Imagem de ilustração de aviso. Mulher em frente a um grande ponto de exclamação.',
            showMessage: true
        });
    }

    return (
        <>
            { <Notification {...notifyUser} setNotifyUser={setNotifyUser} /> }
            <motion.article 
                whileHover={{ scale: 1.1 }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className='event-card'
            >
                <h2 
                    className="event-card__title"
                    data-tooltip-id={idEvent}
                    data-tooltip-content={title}
                    data-tooltip-place="top"
                >{title.substring(0, 15)}...</h2>
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
                <motion.span 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="event-card__connect-link" 
                    onClick={verify}
                >
                    <Link style={{pointerEvents: !userData && buttonText === 'Visualizar' || userData && !(userData.role == 'Administrador' && buttonText == 'Conectar') ? '' : 'none'}} to={buttonLink} className="event-card__connect-link">{buttonText}</Link>
                </motion.span>
            </motion.article>
        </>
    );
};

export default EventCard;