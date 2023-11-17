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

import Notification from '../../components/Notification/Notification';

const EventTypePage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState('');
    const [eventTypes, setEventTypes] = useState([]);
    const [editingEventType, setEditingEventType] = useState({})
    const [notifyUser, setNotifyUser] = useState()

    function scrollToTable() {
        const table = document.querySelector('table');
        table.scrollIntoView({behavior: 'smooth', block: 'start'});
    }

    async function loadEventTypes() {
        try {
            const response = await api.get(eventTypesResource);
            setEventTypes(response.data);
        } catch(error) {
            console.log(error);
        }
    }
    
    useEffect(() => {
        loadEventTypes();
    }, []);

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

            loadEventTypes();
            notifySuccess('Evento criado com sucesso');
            scrollToTable();
            // setEventTypes(eventTypes.push(response.data)); 

        } catch (error) {
            alert(error)
        }

        setTitle('');
    }
    
    function handleUpdate(e) {
        e.preventDefault();
        
        if (title.trim().length < 3) {
            alert('O título deve conter ao menos 3 caractéres')
            return;
        }

        async function update() {
            try {
                await api.put(`${eventTypesResource}/${editingEventType.id}`, {
                    titulo: editingEventType.title
                });

                loadEventTypes();
                notifySuccess('Evento atualizado com sucesso');
                editActionAbort();
                scrollToTable();
            } catch(error) {
                console.log(error);
            }
        }

        update();
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
            setEventTypes(eventTypes.filter(type => type.idTipoEvento !== id))
            notifySuccess('Evento excluído com sucesso')
            // setEventTypes([]);
        } catch(err) {
            console.log(err);
        }
    }
    
    /**
     * Entra em modo de edição
     */
    function showUpdateForm(elementId, elementTitle) {
        console.log(elementId, elementTitle);
        setIsEditing(true);
        setTitle(elementTitle);
        setEditingEventType({
            id: elementId,
            title: elementTitle
        })
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    /**
     * Cancela as alterações feitas
     */
    function editActionAbort() {
        setIsEditing(false);
        setTitle('');
    }

    function notifySuccess(textNote) {
        setNotifyUser({
            titleNote: "Sucesso",
            textNote,
            imgIcon: 'success',
            imgAlt: 'Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.',
            showMessage: true
        });
    }
    

    return (
        <>
            {<Notification {...notifyUser} setNotifyUser={setNotifyUser} />}
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
                                                id='TitleCreate'
                                                placeholder='Título'
                                                name='titleCreate'
                                                type='text'
                                                value={title}
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
                                                id='TitleUpdate'
                                                placeholder='Título'
                                                name='titleUpdate'
                                                type='text'
                                                value={title}
                                                required='required'
                                                handleChange={event => {
                                                    setTitle(event.target.value);
                                                    setEditingEventType({
                                                        id: editingEventType.id,
                                                        title: event.target.value
                                                    })
                                                }}
                                            />
                                            <div className="buttons-editbox">
                                                <Button
                                                    textButton='Atualizar'
                                                    name='atualizar'
                                                    id='atualizar'
                                                    additionalClassName='button-component--middle'
                                                />
                                                <Button
                                                    textButton='Cancelar'
                                                    name='SendButton'
                                                    id='SendButton'
                                                    handleClick={editActionAbort}
                                                    additionalClassName='button-component--middle'
                                                />
                                            </div>

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
        </>
    );
};

export default EventTypePage;