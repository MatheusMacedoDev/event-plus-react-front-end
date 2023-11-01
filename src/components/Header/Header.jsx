import React from 'react';
import './Header.css';

import { Container } from '../Container/Container';
import Nav from '../Nav/Nav';
import UserProfile from '../UserProfile/UserProfile';

import MenuBarImage from '../../assets/images/menubar.png';

const Header = () => {
    return (
        <header className='header-page'>
            <Container>
                <div className="header-page__flex">
                    <img 
                        src={MenuBarImage} 
                        alt="Imagem de menu de barras que ao clicar exibe ou esconde o menu em dispositivos móveis." 
                    />

                    <Nav/>
                    <UserProfile/>
                </div>
            </Container>
        </header>
    );
};

export default Header;