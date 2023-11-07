import React from 'react';

import './VisionSection.css';

import Title from '../Title/Title';

const VisionSection = () => {
    return (
        <section className='vision'>
            <div className="vision__box">
                <Title text='Visão' additionalClassName='vision__title' color='white' />
                <p className="vision__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, sed hic quas non fugiat cupiditate tenetur dicta placeat nihil animi reiciendis nostrum, asperiores, sequi dolores modi aspernatur consequatur rerum accusamus?</p>
            </div>
        </section>
    );
};

export default VisionSection;