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
    const [editingEventType, setEditingEventType] = useState({})

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
    }, [eventTypes]);

    async function handleSubmit(e) {
        e.preventDefault();

        if (title.trim().length < 3) {
            alert('O título deve conter ao menos 3 caractéres')
            return;
        }

        try {
            const response = await api.post(eventTypesResource, {
                titulo: title
            });

            // setEventTypes(eventTypes.push(response.data)); 

        } catch (error) {
            alert(error)
        }

        setTitle('');
    }
    
    function handleUpdate(e) {
        alert('Updating...');
    }

    /**
     * Apaga um elemento com tal id
     * @param {Element id} id 
     */
    async function handleDelete(id) {
        if(!window.confirm("Deseja realmente excluir esse tipo de evento?"))
            return;

        try {
            const response = await api.delete(`${eventTypesResource}/${id}`)
            // setEventTypes(eventTypes.filter(type => type.idTipoEvento !== id))
        } catch(err) {
            console.log(err);
        }
    }
    
    /**
     * Entra em modo de edição
     */
    function showUpdateForm(elementId, elementTitle) {
        alert(`Entrando em modo de edição...`)
        setTitle(elementTitle);
        setIsEditing(true)
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
                                    <>
                                        <Input 
                                            id='Title'
                                            placeholder='Título'
                                            name='title'
                                            type='text'
                                            required='required'
                                            handleChange={event => {
                                                setTitle(event.target.value);
                                            }}
                                        />
                                        <Button
                                            textButton='Atualizar'
                                            name='SendButton'
                                            id='SendButton'
                                        />
                                        <Button
                                            textButton='Cancelar'
                                            name='SendButton'
                                            id='SendButton'
                                        />

                                    </>
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