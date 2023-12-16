import React, { useContext } from "react";
import iconeLogout from "../../assets/images/icone-logout.svg";

import { UserContext, userDecodeToken } from '../../context/AuthContext';

import "./UserProfile.css";

import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { motion } from 'framer-motion'

const UserProfile = () => {
    const { userData, setUserData } = useContext(UserContext);

    const navigate = useNavigate();

    function logout() {
        localStorage.removeItem('token');
        setUserData(null);
        navigate('/');
    }

    return (
        <div className="perfil-usuario">
            { userData ? (
                <>
                    <span className="perfil-usuario__menuitem">{userData.nome}</span>
        
                    <motion.img
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        draggable='false'
                        title="Deslogar"
                        className="perfil-usuario__icon"
                        src={iconeLogout}
                        alt="imagem ilustrativa de uma porta de saída do usuário "
                        onClick={logout}
                    />
                </>
            ) : (
                <motion.span
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >     
                    <Link to='/login' className='navbar__item--dark'>Login</Link>
                </motion.span>
            ) }
        </div>
    );
};

export default UserProfile;
