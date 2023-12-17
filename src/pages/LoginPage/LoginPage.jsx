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

import { motion } from 'framer-motion'

import Notification from '../../components/Notification/Notification';
import Spinner from '../../components/Spinner/Spinner';

const LoginPage = () => {
    const [user, setUser] = useState({email: '', senha: ''})
    const {userData, setUserData} = useContext(UserContext);

    const navigate = useNavigate();

    const [notifyUser, setNotifyUser] = useState();

    // Sppiner
    const [showSpinner, setShowSpinner] = useState(false);

    function isLoggedInVerification() {
        if (userData) navigate('/');
    }

    useEffect(() => {
        isLoggedInVerification();
    }, [])

    function notifySuccess(textNote) {
        setNotifyUser({
            titleNote: "Sucesso",
            textNote,
            imgIcon: 'success',
            imgAlt: 'Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.',
            showMessage: true
        });
    }

    function notifyError(textNote) {
        setNotifyUser({
            titleNote: "Erro",
            textNote,
            imgIcon: 'danger',
            imgAlt: 'Imagem de ilustração de erro. Homem segurando um balão com símbolo de X.',
            showMessage: true
        });
    }

    function notifyWarning(textNote) {
        setNotifyUser({
            titleNote: "Aviso",
            textNote,
            imgIcon: 'warning',
            imgAlt: 'Imagem de ilustração de aviso. Mulher em frente a um grande ponto de exclamação.',
            showMessage: true
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        setShowSpinner(true);

        if (user.email.length < 3 || user.senha.length < 3) {
            setShowSpinner(false);
            notifyWarning('Dados inválidos!');
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
            notifyWarning('Dados inválidos!');
        }

        setShowSpinner(false);
    }

    return (
        <>
            {<Notification {...notifyUser} setNotifyUser={setNotifyUser} />}
            {showSpinner ? <Spinner /> : null}
            <div className="layout-grid-login">
                <div className="login">
                    <motion.div 
                        initial={{ x: -500, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delayChildren: 2 }}
                        className="login__illustration"
                    >
                        <div className="login__illustration-rotate"></div>
                        <ImageIllustrator
                            image={LoginImage}
                            altText="Imagem de um homem em frente de uma porta de entrada"
                            additionalClass="login-illustrator "
                        />
                    </motion.div>

                    <motion.div 
                        initial={{ x: 400, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ type: "spring" }}
                        className="frm-login"
                    >
                        <motion.img
                            initial={{ scale: 0.8 }}
                            whileHover={{ scale: 0.9 }}
                            transition={{ duration: 0.5 }}
                            src={logo}
                            className="frm-login__logo"
                            alt=""
                        />

                        <motion.form
                            className="frm-login__formbox" 
                            onSubmit={handleSubmit}
                        >
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

                            {/* <a href="" className="frm-login__link">
                                Esqueceu a senha?
                            </a> */}

                            <Button
                                textButton="Login"
                                id="btn-login"
                                name="btn-login"
                                additionalClassName="frm-login__button"
                            />
                        </motion.form>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;