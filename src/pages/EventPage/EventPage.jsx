import { useEffect, useState } from 'react';

import api from '../../services/apiAcessor';
import { eventTypesResource } from '../../services/apiResources';

import Title from '../../components/Title/Title';
import Container from '../../components/Container/Container';
import ImageIllustration from '../../components/ImageIllustration/ImageIllustration';
import { Button, Input, Select } from '../../components/FormComponents/FormComponents';

import EventImage from '../../assets/images/evento.svg';

const EventPage = () => {
    const [isEditing, setIsEditing] = useState(false);

    const [eventId, setEventId] = useState('')
    const [eventTypeId, setEventTypeId] = useState('')
    const [eventTitle, setEventTitle] = useState('')
    const [eventDescription, setEventDescription] = useState('')
    const [eventDate, setEventDate] = useState('')

    const [eventTypes, setEventTypes] = useState([])

    async function loadEventTypes() {
        const response = await api.get(eventTypesResource);
        const data = response.data.map(eventType => { 
            return { value: eventType.idTipoEvento, text: eventType.titulo } 
        })
        setEventTypes(data);
    }

    useEffect(() => {
        loadEventTypes()
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

                        <form className='ftipo-evento'>
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
                </Container>
            </section>
        </main>
    );
};

export default EventPage;