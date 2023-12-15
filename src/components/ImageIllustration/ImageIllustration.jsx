import React from 'react';
import './ImageIllustration.css';
import DefaultImage from '../../assets/images/default-image.jpeg';

import { motion } from 'framer-motion';

const ImageIllustration = ({ altText, image = DefaultImage, additionalClass = '' }) => {
    return (
        <figure className='illustrator-box'>
            <motion.img 
                initial={{ x: -500, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                src={image}
                alt={altText}
                className={`illustrator-box__image ${additionalClass}`}    
            />
        </figure>
    );
};

export default ImageIllustration;