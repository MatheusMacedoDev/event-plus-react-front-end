import React, { useContext, useEffect, useState } from "react";
import ImageIllustrator from "../../components/ImageIllustration/ImageIllustration";
import logo from "../../assets/images/logo-pink.svg";
import { Input, Button } from "../../components/FormComponents/FormComponents";

import "./LoginPage.css";

import LoginImage from '../../assets/images/login.svg';

import api from '../../services/apiAcessor';
import { loginResource } from '../../services/apiResources';

import { useNavigate } from 'react-router-dom';

import { userDecodeToken, UserContext } from '../../context/AuthContext';

const LoginPage = () => {
    const [user, setUser] = useState({email: 'admin@gmail.com', senha: ''})
    const {userData, setUserData} = useContext(UserContext);

    const navigate = useNavigate();

    function isLoggedInVerification() {
        if (userData) navigate('/');
    }

    useEffect(() => {
        isLoggedInVerification();
    }, [])

    async function handleSubmit(e) {
        e.preventDefault();

        if (user.email.length < 3 || user.senha.length < 3) {
            return;
        }

        try {
            const response = await api.post(loginResource, user);
            const token = response.data.token;
            const decodedToken = userDecodeToken(token);

            setUserData(decodedToken);

            localStorage.setItem('token', JSON.stringify(decodedToken));

            navigate('/');
        } catch(err) {
            alert('Dados inválidos')
        }
    }

    return (
        <div className="layout-grid-login">
        <div className="login">
            <div className="login__illustration">
            <div className="login__illustration-rotate"></div>
            <ImageIllustrator
                image={LoginImage}
                altText="Imagem de um homem em frente de uma porta de entrada"
                additionalClass="login-illustrator "
            />
            </div>

            <div className="frm-login">
            <img src={logo} className="frm-login__logo" alt="" />

            <form className="frm-login__formbox" onSubmit={handleSubmit}>
                <Input
                    additionalClassName="frm-login__entry"
                    type="email"
                    id="login"
                    name="login"
                    required={true}
                    value={user.email}
                    handleChange={(e) => {
                        setUser({ ...user, email: e.target.value.trim() })
                    }}
                    placeholder="E-mail:"
                />
                <Input
                    additionalClassName="frm-login__entry"
                    type="password"
                    id="senha"
                    name="senha"
                    required={true}
                    value={user.senha}
                    handleChange={(e) => {
                        setUser({ ...user, senha: e.target.value.trim() })
                    }}
                    placeholder="Senha:"
                />

                <a href="" className="frm-login__link">
                    Esqueceu a senha?
                </a>

                <Button
                    textButton="Login"
                    id="btn-login"
                    name="btn-login"
                    additionalClassName="frm-login__button"
                />
            </form>
            </div>
        </div>
        </div>
    );
};

export default LoginPage;