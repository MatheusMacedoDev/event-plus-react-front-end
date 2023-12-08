import React, { useEffect, useState } from "react";
import trashDelete from "../../assets/images/trash-delete-red.png";

import { Button, Input } from "../FormComponents/FormComponents";
import "./Modal.css";

const Modal = ({
  modalTitle = "Feedback",
  userId = null,
  showHideModal = false,
  fnGet = null,
  fnDelete = null,
  fnNewCommentary = null
}) => {
  const [newCommentaryText, setNewCommentaryText] = useState('');
  const [postedCommentaryText, setPostedCommentaryText] = useState('');
  const [postedCommentaryId, setPostedCommentaryId] = useState('');

  const [haveCommentary, setHaveCommentary] = useState(false);

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
    <div className="modal">
      <article className="modal__box" style={haveCommentary ? {justifyContent: 'flex-start'} : {}}>
        
        <h3 className="modal__title">
          {modalTitle}
          <span className="modal__close" onClick={()=> showHideModal(true)}>x</span>
        </h3>

        <div className="comentary">
          <h4 className="comentary__title">Comentário</h4>
          
          {
            haveCommentary ? (
              <img
                src={trashDelete}
                className="comentary__icon-delete"
                alt="Ícone de uma lixeira"
                onClick={async () => {
                  await fnDelete(postedCommentaryId)
                  await getCommentary();
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
                buttonText="Comentar"
                additionalClassName="comentary__button"
                handleClick={async () => {
                  await fnNewCommentary(newCommentaryText)
                  await getCommentary();

                  setNewCommentaryText('');
                }}
              />
            </>
          ) : ''
        }

      </article>
    </div>
  );
};

export default Modal;