// React Imports

import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// Internal Components

import Title from '../../components/Title/Title';
import Commentary from '../../components/Commentary/Commentary';
import EventInfo from './EventInfo/EventInfo';

// API

import api from '../../services/apiAcessor';
import { CommentaryResource } from '../../services/apiResources';

// Context

import { UserContext } from "../../context/AuthContext";

// CSS

import './EventCommentaryPage.css'

const EventCommentaryCommonPage = () => {
    const { idEvento, nomeEvento } = useParams();

    const [commentaries, setCommentaries] = useState([]);

    const { userData } = useContext(UserContext);

    useEffect(() => {
        async function getCommentaries() {
            const route = userData.role == 'Comum' ? 'GetForCommomByEvent' : 'GetForAdminByEvent';
            const response = await api.get(`/${CommentaryResource}/${route}/${idEvento}`)
            const data = response.data;

            setCommentaries(data);
        }

        getCommentaries();
    }, []);

    return (
        <main>
            <div className='wrapper'>
                <Title text={`Evento: "${nomeEvento}"`} />
                <EventInfo eventId={idEvento} />

                <Title text='Comentários' />
                <section className="commentaries__box">
                    {
                        commentaries.map(commentary => (
                            <Commentary 
                                key={commentary.idComentarioEvento}
                                id={commentary.idComentarioEvento}
                                description={commentary.descricao}
                                author={commentary.usuario.nome}
                                isDanger={!commentary.exibe}
                            />
                        ))
                    }
                </section>
            </div>
        </main>
    );
};

export default EventCommentaryCommonPage;