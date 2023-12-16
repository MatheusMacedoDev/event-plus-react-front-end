import React, { useEffect, useState } from 'react';
import './HomePage.css';

import Banner from '../../components/Banner/Banner';
import VisionSection from '../../components/VisionSection/VisionSection';
import ContactSection from '../../components/ContactSection/ContactSection';
import EventCard from '../../components/EventCard/EventCard';
import Title from '../../components/Title/Title';
import Container from '../../components/Container/Container';
import Carousel from '../../components/Carousel/Carousel'

import api from '../../services/apiAcessor';
import { listNextEventsResource, listPreviousEventsResource } from '../../services/apiResources';

import Notification from '../../components/Notification/Notification';

import { motion } from 'framer-motion'

const HomePage = () => {
    const [nextEvents, setNextEvents] = useState([]);
    const [previousEvents, setPreviousEvents] = useState([])

    const [notifyUser, setNotifyUser] = useState();

    const getNextEvents = async () => {
        try {
            const promise = await api.get(listNextEventsResource);
            const data = promise.data;

            setNextEvents(data);
        } catch(error) {
            notifyError('Houve um error no carregamento de informações. Verifique a sua conexão com a internet!');
        }
    }
    
    const getPreviousEvents = async () => {
        try {
            const promise = await api.get(listPreviousEventsResource);
            const data = promise.data;

            setPreviousEvents(data);
        } catch(error) {
            notifyError('Houve um error no carregamento de informações. Verifique a sua conexão com a internet!');
        }
    }

    useEffect(() => {
        getNextEvents();
        getPreviousEvents();
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
            <main>
                <Banner />
                <section className='home-events'>
                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        className='proximos-eventos'
                    >
                        <Container>
                            <Title text='Próximos Eventos' />

                            <Carousel id='next-events-carousel'>
                                <div className="events-box">
                                    { nextEvents.map(nextEvent => {
                                        return (
                                            <EventCard 
                                                key={ nextEvent.idEvento }
                                                title={ nextEvent.nomeEvento } 
                                                description={ nextEvent.descricao } 
                                                date={ nextEvent.dataEvento } 
                                                idEvent={ nextEvent.idEvento } 
                                                buttonText='Conectar'
                                                buttonLink='/eventos-aluno'
                                            />
                                        )
                                    })}
                                </div>
                            </Carousel>
                        </Container>
                    </motion.div>
                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className='proximos-eventos'
                    >
                        <Container>
                            <Title text='Eventos Anteriores' />
                            <Carousel id='previous-events-carousel'>
                                <div className="events-box">
                                    { previousEvents.map(previousEvent => {
                                        return (
                                            <EventCard 
                                                key={ previousEvent.idEvento }
                                                title={ previousEvent.nomeEvento } 
                                                description={ previousEvent.descricao } 
                                                date={ previousEvent.dataEvento } 
                                                idEvent={ previousEvent.idEvento } 
                                                buttonText='Visualizar'
                                                buttonLink={`/comentarios/${previousEvent.idEvento}/${previousEvent.nomeEvento}`}
                                            />
                                        )
                                    })}
                                </div>
                            </Carousel>
                        </Container>
                    </motion.div>
                </section>
                <VisionSection />
                <ContactSection />
            </main>
        </>
    );
};

export default HomePage;