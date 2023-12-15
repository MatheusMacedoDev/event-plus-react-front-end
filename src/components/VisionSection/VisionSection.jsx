import React from 'react';

import './VisionSection.css';

import Title from '../Title/Title';

import { motion } from 'framer-motion'

const VisionSection = () => {
    return (
        <section className='vision'>
            <div className="vision__box">
                <Title text='Visão' additionalClassName='vision__title' color='white' />
                <motion.p 
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="vision__text"
                >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, sed hic quas non fugiat cupiditate tenetur dicta placeat nihil animi reiciendis nostrum, asperiores, sequi dolores modi aspernatur consequatur rerum accusamus?
                </motion.p>
            </div>
        </section>
    );
};

export default VisionSection;