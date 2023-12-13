import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import api from '../../services/apiAcessor';
import { CommentaryResource } from '../../services/apiResources';

import { UserContext } from "../../context/AuthContext";

import './EventCommentaryPage.css'

const EventCommentaryCommonPage = () => {
    const { idEvento } = useParams();
    const [commentaries, setCommentaries] = useState([]);
    const { userData, setUserData } = useContext(UserContext);

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
        <div>
            Página comum de comentários do evento
        </div>
    );
};

export default EventCommentaryCommonPage;