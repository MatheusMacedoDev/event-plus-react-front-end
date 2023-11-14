import React, { useEffect, useState } from 'react';
import './EventTypePage.css';

import Title from '../../components/Title/Title';
import Container from '../../components/Container/Container';
import ImageIllustration from '../../components/ImageIllustration/ImageIllustration';

import EventTypeImage from '../../assets/images/tipo-evento.svg';

import { Input, Button } from '../../components/FormComponents/FormComponents';

import api from '../../services/apiAcessor';
import { eventTypesResource } from '../../services/apiResources';

import Table from './Table/Table';

const EventTypePage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState('');
    const [eventTypes, setEventTypes] = useState([]);

    useEffect(() => {
        async function loadEventType() {
            try {
                const response = await api.get(eventTypesResource);
                setEventTypes(response.data);
            } catch(error) {
                console.log(error);
            }
        }

        loadEventType();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();

        if (title.trim().length < 3)
            alert('O título deve conter ao menos 3 caractéres')

        try {
            const response = await api.post(eventTypesResource, {
                titulo: title
            });
        } catch (error) {
            alert(error)
        }

        setTitle('');
    }
    
    function handleUpdate(e) {
        e.preventDefault();
        alert('Update');
    }

    /**
     * Apaga um elemento com tal id
     * @param {Element id} id 
     */
    function handleDelete(id) {
        alert(`Apagando o elemento com id: ${id}`)
    }
    
    /**
     * Entra em modo de edição
     */
    function showUpdateForm() {
        alert(`Entrando em modo de edição...`)
    }
    
    /**
     * Cancela as alterações feitas
     */
    function editActionAbort() {
        alert(`Cancelando alteração...`)
    }
    

    return (
        <main>
            <section className="cadastro-evento-section">
                <Container>
                    <div className="cadastro-evento__box">
                        <Title text='Cadastro de Tipos de Evento'/>
                        
                        <ImageIllustration 
                            image={EventTypeImage} 
                            altText='Imagem ilustrativa de tipo de evento.'
                        />

                        <form className="ftipo-evento" onSubmit={isEditing ? handleUpdate : handleSubmit}>
                            {
                                !isEditing ? 
                                (
                                    <>
                                        <Input 
                                            id='Title'
                                            placeholder='Título'
                                            name='title'
                                            type='text'
                                            required='required'
                                            value={title}
                                            handleChange={event => {
                                                setTitle(event.target.value);
                                            }}
                                        />
                                        <Button
                                            textButton='Cadastrar'
                                            name='SendButton'
                                            id='SendButton'
                                        />
                                    </>
                                ) : (
                                    <p>Edição</p>
                                )
                            }
                        </form>

                        
                    </div>
                </Container>
            </section>

            <section className="lista-eventos-section">
                <Container>
                    <Title 
                        text='Lista de Tipos de Eventos'
                        color='white'
                    />
                    <Table 
                        data={eventTypes}
                        updateFn={showUpdateForm}
                        deleteFn={handleDelete}
                    />
                </Container>
            </section>
        </main>
    );
};

export default EventTypePage;