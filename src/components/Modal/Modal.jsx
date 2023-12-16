import React, { useEffect, useState } from "react";
import trashDelete from "../../assets/images/trash-delete-red.png";

import Notification from '../Notification/Notification';

import { Button, Input } from "../FormComponents/FormComponents";

import { motion, AnimatePresence } from 'framer-motion'

import "./Modal.css";

const Modal = ({
  modalTitle = "Feedback",
  userId = null,
  shouldShow = false,
  showHideModal = false,
  fnGet = null,
  fnDelete = null,
  fnNewCommentary = null
}) => {
  const [newCommentaryText, setNewCommentaryText] = useState('');
  const [postedCommentaryText, setPostedCommentaryText] = useState('');
  const [postedCommentaryId, setPostedCommentaryId] = useState('');

  const [haveCommentary, setHaveCommentary] = useState(false);

  const [notifyUser, setNotifyUser] = useState()

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

  async function getCommentary() {
    const commentaryData = await fnGet();
    
    console.log(`Commentary updated: ${commentaryData}`);

    setPostedCommentaryText(commentaryData.descricao);
    setPostedCommentaryId(commentaryData.idComentarioEvento);

    if (commentaryData.descricao) {
      setHaveCommentary(true);
    } else {
      setHaveCommentary(false);
    }
  }

  useEffect(() => {
    getCommentary();
  }, []);

  return (
    <>
      {<Notification {...notifyUser} setNotifyUser={setNotifyUser} />}
      <motion.div 
        className="modal"
      >
        <AnimatePresence>
          { showHideModal && (
            <motion.article 
              initial={{ opacity: 0, scale: 0.5, y: -50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: -50 }}
              transition={{ duration: 0.5 }}
              className="modal__box" 
              style={haveCommentary ? {justifyContent: 'flex-start'} : {}}
            >
              
              <h3 className="modal__title">
                {modalTitle}
                <motion.span 
                  initial={{ opacity: 0, x: 20, y: -20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="modal__close" 
                  onClick={() => {
                    showHideModal(true)}
                  }
                >x</motion.span>
              </h3>

              <div className="comentary">
                <h4 className="comentary__title">Comentário</h4>
                
                {
                  haveCommentary ? (
                    <motion.img
                      initial={{ opacity: 0, x: 20, y: -20 }}
                      whileInView={{ opacity: 1, x: 0, y: 0 }}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                      src={trashDelete}
                      className="comentary__icon-delete"
                      alt="Ícone de uma lixeira"
                      onClick={async () => {
                        await fnDelete(postedCommentaryId)
                        await getCommentary();

                        notifySuccess('Comentário removido com sucesso.')
                      }}
                    />
                  ) : ''
                }

                <p className="comentary__text">{!haveCommentary ? 'Nenhum comentário para exibir. Faça seu comentário' : postedCommentaryText}</p>

                <hr className="comentary__separator" />
              </div>

              {
                !haveCommentary ? (
                  <>
                    <Input
                      placeholder="Escreva seu comentário..."
                      className="comentary__entry"
                      handleChange={e => {
                        setNewCommentaryText(e.target.value);
                      }}
                      value={newCommentaryText}
                    />
            
                    <Button
                      textButton="Comentar"
                      additionalClassName="comentary__button"
                      handleClick={async () => {
                        if (newCommentaryText.length < 3) {
                          notifyWarning('Digite um comentário mais extenso!');
                          return;
                        }

                        await fnNewCommentary(newCommentaryText)
                        await getCommentary();

                        setNewCommentaryText('');

                        notifySuccess('Comentário registrado com sucesso.')
                      }}
                    />
                  </>
                ) : ''
              }
            </motion.article>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default Modal;