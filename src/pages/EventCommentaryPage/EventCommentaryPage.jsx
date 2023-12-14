import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Title from '../../components/Title/Title';
import Commentary from '../../components/Commentary/Commentary';
import EventInfo from './EventInfo/EventInfo';

import api from '../../services/apiAcessor';
import { CommentaryResource } from '../../services/apiResources';

import { UserContext } from "../../context/AuthContext";

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
                        commentaries.map(commentary => {
                            return (
                                <Commentary 
                                    id={commentary.idComentarioEvento}
                                    key={commentary.idComentarioEvento}
                                    description={commentary.descricao}
                                    author={commentary.usuario.nome}
                                    isDanger={!commentary.exibe}
                                />
                            )
                        })
                    }
                </section>
            </div>
        </main>
    );
};

export default EventCommentaryCommonPage;