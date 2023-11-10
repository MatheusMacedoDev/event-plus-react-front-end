import React, { useEffect, useState } from 'react';
import './HomePage.css';

import Banner from '../../components/Banner/Banner';
import VisionSection from '../../components/VisionSection/VisionSection';
import ContactSection from '../../components/ContactSection/ContactSection';
import NextEvent from '../../components/NextEvent/NextEvent';
import Title from '../../components/Title/Title';
import Container from '../../components/Container/Container';

import api from '../../services/apiAcessor';
import { ListNextEventsResource } from '../../services/apiResources';

const HomePage = () => {
    const [nextEvents, setNextEvents] = useState([]);

    const getNextEvents = async () => {
        try {
            const promise = await api.get(ListNextEventsResource);
            const data = promise.data;

            setNextEvents(data);
        }
        catch(error) {
            alert(error);
        }
    }

    useEffect(() => {
        getNextEvents();
    }, []);

    return (
        <main>
            <Banner />
            <section className='proximos-eventos'>
                <Container>
                    <Title text='Próximos Eventos' />

                    <div className="events-box">
                        { nextEvents.map(nextEvent => {
                            return (
                                <NextEvent key={ nextEvent.idEvento }
                                           title={ nextEvent.nomeEvento } 
                                           description={ nextEvent.descricao } 
                                           date={ nextEvent.dataEvento } 
                                           idEvent={ nextEvent.idEvento } />
                            )
                        })}
                    </div>
                </Container>
            </section>
            <VisionSection />
            <ContactSection />
        </main>
    );
};

export default HomePage;