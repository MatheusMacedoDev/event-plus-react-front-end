import { useEffect, useState } from 'react';

import api from '../../services/apiAcessor';
import { eventTypesResource, eventsResource } from '../../services/apiResources';

import Title from '../../components/Title/Title';
import Container from '../../components/Container/Container';
import ImageIllustration from '../../components/ImageIllustration/ImageIllustration';
import { Button, Input, Select } from '../../components/FormComponents/FormComponents';
import Table from './Table/Table';

import EventImage from '../../assets/images/evento.svg';

// Constraints
const INSTITUTION_ID = '6bbd863e-5f50-4834-b2b6-7afc6f2ceec5';

const EventPage = () => {
    const [isEditing, setIsEditing] = useState(false);

    const [eventId, setEventId] = useState('');
    const [eventTypeId, setEventTypeId] = useState('');
    const [eventTitle, setEventTitle] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [eventDate, setEventDate] = useState('');

    const [eventTypes, setEventTypes] = useState([]);
    const [events, setEvents] = useState([]);

    // Create

    async function register(event) {
        event.preventDefault();
        
        // Make the validations

        try {
            await api.post(eventsResource, {
                dataEvento: eventDate,
                nomeEvento: eventTitle,
                descricao: eventDescription,
                idTipoEvento: eventTypeId,
                idInstituicao: INSTITUTION_ID
            })

            await loadEvents();
            resetForm();
        } catch(err) {

        }
    }

    // Read

    async function loadEventTypes() {
        try {
            const response = await api.get(eventTypesResource);
            const data = response.data.map(eventType => { 
                return { value: eventType.idTipoEvento, text: eventType.titulo } 
            })
            setEventTypes(data);
        } catch(err) {

        }
    }

    async function loadEvents() {
        try {
            const eventsResponse = await api.get(eventsResource);
            const data = eventsResponse.data.map(event => {
                return {
                    id: event.idEvento,
                    title: event.nomeEvento,
                    description: event.descricao,
                    date: new Date(event.dataEvento).toISOString().slice(0, 10),
                    eventTypeId: event.idTipoEvento,
                    eventTypeTitle: event.tiposEvento.titulo
                };
            });
            setEvents(data);
        } catch(err) {

        }
    }

    // Update

    async function update(event) {
        event.preventDefault();
        alert('Updating...');
        resetForm();
    }

    function showEditForm(eventElement) {
        alert('Editing...');
        setIsEditing(true);

        setEventId(eventElement.id);
        setEventTitle(eventElement.title);
        setEventDescription(eventElement.description);
        setEventDate(eventElement.date);
        setEventTypeId(eventElement.eventTypeId);
    }

    // Delete

    async function deleteById(id) {
        if(!window.confirm("Deseja realmente excluir esse tipo de evento?"))
            return;

        try {
            api.delete(`${eventsResource}/${id}`);
            setEvents(events.filter(event => event.id != id));
        } catch(err) {

        }
    }

    // Utils

    function resetForm() {
        setIsEditing(false);

        // Reseting event properties
        setEventId('');
        setEventTitle('');
        setEventDescription('');
        setEventDate('');
        setEventTypeId('');
    }

    // On Mount
    useEffect(() => {
        loadEventTypes();
        loadEvents();
    }, []);

    return (
        <main>
            <section className="cadastro-evento-section">
                <Container>
                    <div className="cadastro-evento__box">
                        <Title text='Cadastro de evento' />

                        <ImageIllustration 
                            image={EventImage}
                            altText='Imagem ilustrativa de evento.'
                        />

                        <form className='ftipo-evento' onSubmit={isEditing ? update : register}>
                            <Input 
                                id='event-title'
                                name='event-title'
                                type='text'
                                value={eventTitle}
                                required={true}
                                placeholder='Nome'
                                handleChange={e => {
                                    setEventTitle(e.target.value)
                                }}
                                />

                            <Input 
                                id='event-description'
                                name='event-description'
                                type='text'
                                value={eventDescription}
                                placeholder='Descrição'
                                required={true}
                                handleChange={e => {
                                    setEventDescription(e.target.value)
                                }}
                            />

                            <Select
                                id='event-type-selector'
                                name='event-type-selector'
                                options={eventTypes}
                                value={eventTypeId}
                                handleChange={e => {
                                    setEventTypeId(e.target.value)
                                }}
                            />

                            <Input 
                                id='event-date'
                                name='event-date'
                                type='date'
                                value={eventDate}
                                required={true}
                                handleChange={e => {
                                    setEventDate(e.target.value)
                                }}
                            />

                            {
                                !isEditing ? 
                                (
                                    <Button 
                                        id='sendButton'
                                        name='sendButton'
                                        textButton='Cadastrar'
                                    />
                                    ) : (
                                        <>
                                        <div className="buttons-editbox">
                                            <Button 
                                                id='updateButton'
                                                name='updateButton'
                                                textButton='Atualizar'
                                                additionalClassName='button-component--middle'
                                            />
                                            <Button 
                                                id='cancelButton'
                                                name='cancelButton'
                                                textButton='Cancelar'
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
                        text='Lista de Eventos'
                        color='white'
                    />
                    <Table 
                        data={events}
                        deleteFn={deleteById}
                        showEditFormFn={showEditForm}
                    />
                </Container>
            </section>
        </main>
    );
};

export default EventPage;