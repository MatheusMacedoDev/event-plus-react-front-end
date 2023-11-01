import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <header>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/event">Eventos</Link>
                <Link to="/event-type">Tipo de Eventos</Link>
                <Link to="/login">Login</Link>
                <Link to="/test">Test</Link>
            </nav>
        </header>
    );
};

export default Header;