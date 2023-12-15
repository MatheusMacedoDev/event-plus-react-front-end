import React, { useContext } from "react";
import iconeLogout from "../../assets/images/icone-logout.svg";

import { UserContext, userDecodeToken } from '../../context/AuthContext';

import "./UserProfile.css";

import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

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
        
                    <img
                        title="Deslogar"
                        className="perfil-usuario__icon"
                        src={iconeLogout}
                        alt="imagem ilustrativa de uma porta de saída do usuário "
                        onClick={logout}
                    />
                </>
            ) : (
                <Link to='/login' className='navbar__item--dark'>Login</Link>
            ) }
        </div>
    );
};

export default UserProfile;
