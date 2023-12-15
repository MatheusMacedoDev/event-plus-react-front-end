import './Footer.css';

import React from 'react';

import { motion } from 'framer-motion'

const Footer = ({ textRights = "Escola SENAI de Informática - 2023" }) => {
    return (
        <motion.footer 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className='footer-page'
        >
            <p className="footer-page__rights">{textRights}</p>
        </motion.footer>
    );
};

export default Footer;