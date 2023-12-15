import React from 'react';

import { motion } from 'framer-motion';

import './Title.css';

const Title = ( {text, color = '', additionalClassName} ) => {
    return (
        <motion.h1 
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className={ `title ${additionalClassName || ''}` } 
            style={ {color: color} }
        >
            {text}
            <hr 
                className='title__underscore'
                style={ { borderColor: color } }
            />
        </motion.h1>
    );
};

export default Title;