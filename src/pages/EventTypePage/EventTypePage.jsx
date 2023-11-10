import React from 'react';
import './EventTypePage.css';

import Title from '../../components/Title/Title';
import Container from '../../components/Container/Container';
import ImageIllustration from '../../components/ImageIllustration/ImageIllustration';

const EventTypePage = () => {
    return (
        <main>
            <section className="cadastro-evento-section">
                <Container>
                    <Title text='Cadastro de Tipos de Evento'/>
                    <ImageIllustration />
                    <form className="ftipo-evento">
                        <p>Formulário</p>
                    </form>
                </Container>
            </section>
        </main>
    );
};

export default EventTypePage;