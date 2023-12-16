import React, { useContext } from 'react';
import './Nav.css';

import { Link } from 'react-router-dom';

import LogoMobile from '../../assets/images/logo-white.svg';
import LogoDeskTop from '../../assets/images/logo-pink.svg';

import { UserContext, userDecodeToken } from '../../context/AuthContext';

import { motion } from 'framer-motion';

const Nav = ({ showMobileNavBar, toggleShowMobileNavBar }) => {
    const { userData } = useContext(UserContext);

    return (
        <nav className={`navbar ${showMobileNavBar ? 'exibeNavbar' : ''}`}>
            <span className="navbar__close" onClick={toggleShowMobileNavBar}>x</span>

            <Link to='/' className="eventlogo">
                <motion.img 
                    draggable='false'
                    initial={{ rotate: -3, opacity: 0.5 }}
                    animate={{ rotate: 3, opacity: 1 }}
                    transition={{ repeat: Infinity, repeatType: 'mirror', duration: 2 }}
                    whileHover={{ scale: 1.2 }} 
                    whileTap={{ scale: 0.9 }} 
                    className='eventlogo__logo-image' 
                    src={window.innerWidth >= 992 ? LogoDeskTop : LogoMobile} alt="" 
                />
            </Link>

            <div className="navbar__items-box">
                <motion.span whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} className='navbar__item'>
                    <Link to='/' className='navbar__item'>Home</Link>
                </motion.span>

                {
                    userData 
                        ? userData.role == "Administrador" ? (
                            <>
                                <motion.span whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} className='navbar__item'>
                                    <Link to='/tipo-eventos' className='navbar__item'>Tipos de Evento</Link>
                                </motion.span>
                                <motion.span whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} className='navbar__item'>
                                    <Link to='/eventos' className='navbar__item'>Eventos</Link>
                                </motion.span>
                            </>
                        ) : (
                            <motion.span whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} className='navbar__item'>
                                <Link to='/eventos-aluno' className='navbar__item'>Eventos</Link>
                            </motion.span>
                        )
                    : ''

                }
                {/* <Link to='/testes' className='navbar__item'>Testes</Link> */}
            </div>
        </nav>
    );
};

export default Nav;