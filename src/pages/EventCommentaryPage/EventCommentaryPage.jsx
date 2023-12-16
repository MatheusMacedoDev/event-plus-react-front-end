// React Imports

import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// Internal Components

import Title from '../../components/Title/Title';
import Commentary from '../../components/Commentary/Commentary';
import EventInfo from './EventInfo/EventInfo';
import Notification from '../../components/Notification/Notification';
import Spinner from '../../components/Spinner/Spinner';
import Carousel from '../../components/Carousel/Carousel';

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

    const [notifyUser, setNotifyUser] = useState()
    const [showSpinner, setShowSpinner] = useState(false);

    const { userData } = useContext(UserContext);

    function scrollUp() {
        window.scrollTo({ top: 0 });
    }

    useEffect(() => {
        async function getCommentaries() {
            setShowSpinner(true);

            try {
                let route;
                
                if (userData) {
                    route = userData.role == 'Comum' ? 'GetForCommomByEvent' : 'GetForAdminByEvent';
                } else {
                    route = 'GetForCommomByEvent';
                }

                const response = await api.get(`/${CommentaryResource}/${route}/${idEvento}`)
                const data = response.data;
    
                setCommentaries(data);
            } catch(err) {
                notifyError('Erro no carregamento das informações. Verifique a sua conexão com a internet.')
            }

            setShowSpinner(false);
        }

        scrollUp()
        getCommentaries();
    }, []);

    function notifyError(textNote) {
        setNotifyUser({
            titleNote: "Erro",
            textNote,
            imgIcon: 'danger',
            imgAlt: 'Imagem de ilustração de erro. Homem segurando um balão com símbolo de X.',
            showMessage: true
        });
    }

    return (
        <>
            {<Notification {...notifyUser} setNotifyUser={setNotifyUser} />}
            {showSpinner ? <Spinner /> : null}
            <main>
                <div className='wrapper'>
                    <Title text={`Evento: "${nomeEvento}"`} />
                    <EventInfo 
                        eventId={idEvento} 
                        notifyError={notifyError}
                        setShowSpinner={setShowSpinner}
                    />

                    <Title text='Comentários' />
                    <Carousel id='commentaries-carousel'>
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
                    </Carousel>
                </div>
            </main>
        </>
    );
};

export default EventCommentaryCommonPage;