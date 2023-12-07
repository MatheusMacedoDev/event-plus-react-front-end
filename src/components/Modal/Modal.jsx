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
  const [postedCommentaryText, setPostedCommentaryText] = useState("Não informado. Não informado. Não informado.");
  const [postedCommentaryId, setPostedCommentaryId] = useState('');

  async function getCommentary() {
    const commentaryData = await fnGet();
    
    setPostedCommentaryText(commentaryData.descricao);
    setPostedCommentaryId(commentaryData.idComentarioEvento);
  }

  useEffect(() => {

    getCommentary();
  }, []);

  return (
    <div className="modal">
      <article className="modal__box">
        
        <h3 className="modal__title">
          {modalTitle}
          <span className="modal__close" onClick={()=> showHideModal(true)}>x</span>
        </h3>

        <div className="comentary">
          <h4 className="comentary__title">Comentário</h4>
          <img
            src={trashDelete}
            className="comentary__icon-delete"
            alt="Ícone de uma lixeira"
            onClick={() => {
              fnDelete(postedCommentaryId)
              getCommentary();
            }}
          />

          <p className="comentary__text">{postedCommentaryText}</p>

          <hr className="comentary__separator" />
        </div>

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
          handleClick={() => {
            fnNewCommentary(newCommentaryText)
            getCommentary();
          }}
        />
      </article>
    </div>
  );
};

export default Modal;