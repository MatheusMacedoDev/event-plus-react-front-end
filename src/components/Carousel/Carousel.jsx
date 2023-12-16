import React, { useEffect, useRef, useState } from 'react'

import { motion } from 'framer-motion'

import './Carousel.css'

export default function Carousel({ id, maxWidth = 900, children }) {
    const carousel = useRef(null);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        setWidth(carousel.current?.scrollWidth - carousel.current?.offsetWidth + 65)
    }, [width]);

    return (
        <motion.div
            id={id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            ref={carousel}
            whileTap={{ cursor: 'grabbing' }}
            className='carousel'
            style={{ maxWidth }}    
        >
            <motion.div 
                initial={{ x: 200 }}
                whileInView={{ x: 0 }}
                transition={{ duration: 0.5 }}
                drag='x'
                dragConstraints={{ right: 0, left: -width }}
                className="carousel__content"
            >
                { children }
            </motion.div>
        </motion.div>
    )
}
