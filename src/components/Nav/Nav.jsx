import React from 'react';
import './Nav.css';

import LogoMobile from '../../assets/images/logo-white.svg';
import LogoDeskTop from '../../assets/images/logo-pink.svg';

const Nav = () => {
    return (
        <nav className='navbar'>
            <span className="navbar__close">x</span>

            <a href="" className="eventlogo">
                <img className='eventlogo__logo-image' src={LogoMobile} alt="" />
            </a>

            <div className="navbar__items-box">
                <a href="">Home</a>
                <a href="">Tipos de Evento</a>
                <a href="">Usuários</a>
            </div>
        </nav>
    );
};

export default Nav;