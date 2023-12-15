import React from 'react';

import AvatarImage1 from '../../assets/images/avatar_1.svg';
import AvatarImage2 from '../../assets/images/avatar_2.svg';

import { Tooltip } from 'react-tooltip';

import { motion } from 'framer-motion';

import './Commentary.css'

const Commentary = ({ id, description, author, isDanger }) => {
    const avatarImages = [
        AvatarImage1,
        AvatarImage2
    ]

    const chosenImageIndex = Math. floor(Math. random() * (1 + 1));

    return (
        <motion.article 
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
            className={`commentary ${isDanger ? 'commentary--danger' : ''}`}
        >
            <img src={avatarImages[chosenImageIndex]} alt="Imagem do usuário" className='commentary__image' />
            <p 
                className="commentary__description"
                data-tooltip-id={id}
                data-tooltip-content={`"${description}"`}
                data-tooltip-place="bottom"
            >{description.length > 36 ? `"${description.substring(0, 36)}...` : `"${description}"`}</p>
            <Tooltip id={id} className='tooltip' />
            <p className="commentary__author">{author}</p>
        </motion.article>
    );
};

export default Commentary;