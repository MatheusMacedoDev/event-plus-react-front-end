import React from 'react';
import './ImageIllustration.css';
import EventTypeImage from '../../assets/images/tipo-evento.svg';
import DefaultImage from '../../assets/images/default-image.jpeg';

const ImageIllustration = ({ altText, imageName, additionalClass }) => {
    let imageResource;
    switch (imageName) {
        case 'tipo-evento':
            imageResource = EventTypeImage;
            break;
        default:
            imageResource = DefaultImage;
    }


    return (
        <figure className='illustrator-box'>
            <img 
                src={imageResource}
                alt={altText}
                className={`illustrator-box__image ${additionalClass}`}    
            />
        </figure>
    );
};

export default ImageIllustration;