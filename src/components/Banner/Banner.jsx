import './Banner.css';

import { motion } from 'framer-motion'

const Banner = () => {
    return (
        <motion.article 
            initial={{ opacity: 0, scale: 0.5, y: -100 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            className='banner'
        ></motion.article>
    );
};

export default Banner;