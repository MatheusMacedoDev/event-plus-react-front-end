import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Title from '../../components/Title/Title';
import Commentary from '../../components/Commentary/Commentary';
import Container from '../../components/Container/Container';

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

            console.log(data);

            setCommentaries(data);
        }

        getCommentaries();
    }, []);

    return (
        <main>
            <div className='wrapper'>
                <Title text={`Comentários de "${nomeEvento}"`}/>
                <section className="commentaries__box">

                    {
                        commentaries.map(commentary => {
                            return (
                                <Commentary 
                                    id={commentary.idComentarioEvento}
                                    description={commentary.descricao}
                                    author={commentary.usuario.nome}
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