import React, { useContext, useEffect, useState } from "react";
import Main from "../../components/Main/Main";
import Title from "../../components/Title/Title";
import Table from "./TableEvA/Table";
import Container from "../../components/Container/Container";
import { Select } from '../../components/FormComponents/FormComponents';
import Spinner from "../../components/Spinner/Spinner";
import Notification from '../../components/Notification/Notification';
import Modal from "../../components/Modal/Modal";
import api from "../../services/apiAcessor";
import { eventsResource, eventPresencesResource, CommentaryResource } from '../../services/apiResources';

import "./StudentEventPage.css";
import { UserContext } from "../../context/AuthContext";
import { all } from "axios";

const StudentEventPage = () => {
  // state do menu mobile
  const [exibeNavbar, setExibeNavbar] = useState(false);
  const [eventos, setEventos] = useState([]);
  // select mocado
  const [quaisEventos, setQuaisEventos] = useState([
    { value: 1, text: "Todos os eventos" },
    { value: 2, text: "Meus eventos" },
  ]);

  const [tipoEvento, setTipoEvento] = useState(1); //código do tipo do Evento escolhido
  const [showSpinner, setShowSpinner] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // recupera os dados globais do usuário
  const { userData, setUserData } = useContext(UserContext);

  // Evento Selecionado para a tela de comentário
  const [currentEventIdOnComment, setCurrentEventIdOnComment] = useState('');

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

  async function getAllEvents() {
    const eventsResponse = await api.get(eventsResource, {
      headers: {
          'Authorization': `bearer ${userData.token}`
      }
    });

    const allEvents = eventsResponse.data.map(event => {
      return {
          idEvento: event.idEvento,
          nomeEvento: event.nomeEvento,
          dataEvento: event.dataEvento.slice(0, 10),
      };
    });

    
    // await new Promise(resolve => setTimeout(resolve, 10000));


    const myEvents = await getMyEvents();

    const allEventsWithSituation = verifyPresence(allEvents, myEvents);

    return allEvents;
  }

  async function getMyEvents() {
    const myEventsResponse = await api.get(`${eventPresencesResource}/ListarMinhas/${userData.id}`);
    const events = myEventsResponse.data.map(presence => {
      const idEvento = presence.evento.idEvento;
      const nomeEvento = presence.evento.nomeEvento;
      const dataEvento = presence.evento.dataEvento;
      const idPresencaEvento = presence.idPresencaEvento;

      return {
        idEvento,
        nomeEvento,
        dataEvento,
        situacao: true,
        idPresencaEvento
      }
    })

    return events;
  }

  async function getEvents() {
    if (tipoEvento == 1) {
      const data = await getAllEvents();
      setEventos(data);
    } else {
      const data = await getMyEvents();
      setEventos(data);
    }
  } 

  useEffect(() => {
    getEvents();
  }, [tipoEvento]);

  const verifyPresence = (allEvents, userEvents) => {
    try {
      for (let x = 0; x < allEvents.length; x++) {
        allEvents[x].situacao = false;
        for (let y = 0; y < userEvents.length; y++) {
          if (allEvents[x].idEvento === userEvents[y].idEvento) {
            allEvents[x].situacao = true;
            allEvents[x].idPresencaEvento = userEvents[y].idPresencaEvento;
            break;
          }
        }
      }
  
      return allEvents;
    } catch(err) {
      notifyError('Erro na requisição. Verifique a sua conexão com a internet!')
    }
 
  }

  // toggle meus eventos ou todos os eventos
  function myEvents(tpEvent) {
    setTipoEvento(tpEvent);
  }

  async function loadMyCommentary() {
    setShowSpinner(true);

    try {
      const response = await api.get(`${CommentaryResource}/BuscarPorIdUsuario/${userData.id}/${currentEventIdOnComment}`);
      const commentary = response.data;
      setShowSpinner(false);
      
      return commentary;
    } catch(e) {
      notifyError('Erro na requisição. Verifique a sua conexão com a internet!')
    }
    
    setShowSpinner(false);
  }
  
  async function commentaryRemove(commentaryId) {
    setShowSpinner(true);

    try {
      console.log(commentaryId);
      await api.delete(`${CommentaryResource}/${commentaryId}`)
    } catch(e) {
      notifyError('Erro na requisição. Verifique a sua conexão com a internet!')
    }

    setShowSpinner(false);
  };

  async function postMyCommentary(commentaryText) {
    setShowSpinner(true);

    try {
      await api.post(CommentaryResource, {
        descricao: commentaryText,
        exibe: true,
        idUsuario: userData.id,
        idEvento: currentEventIdOnComment
      })
    } catch(e) {
      notifyError('Erro na requisição. Verifique a sua conexão com a internet!')
    }

    setShowSpinner(false);
  }

  const showHideModal = (eventId) => {
    setCurrentEventIdOnComment(eventId);
    setShowModal(showModal ? false : true);
  };


  async function handleConnect(eventId, situation, presenceId = null) {
    if (situation === false) {
      try {
        await api.post(eventPresencesResource, {
          situacao: true,
          idUsuario: userData.id,
          idEvento: eventId
        });

        getEvents();
      } catch(err) {
        notifyError('Erro na requisição. Verifique a sua conexão com a internet!')
      }
    } else {
      try {
        await api.delete(`${eventPresencesResource}/${presenceId}`);

        getEvents();
      } catch(err) {
        notifyError('Erro na requisição. Verifique a sua conexão com a internet!')
      }
    }
  }

  return (
    <>
      {<Notification {...notifyUser} setNotifyUser={setNotifyUser} />}
      <Main>
        <Container>
          <Title titleText={"Eventos"} className="custom-title" />

          <Select
            id="id-tipo-evento"
            name="tipo-evento"
            required={true}
            options={quaisEventos} // aqui o array dos tipos
            handleChange={(e) => {
              myEvents(e.target.value);
            }} // aqui só a variável state
            value={tipoEvento}
            additionalClassNmae="select-tp-evento"
          />
          <Table
            dados={eventos}
            fnConnect={handleConnect}
            fnShowModal={showHideModal}
          />
        </Container>
      </Main>

      {/* SPINNER -Feito com position */}
      {showSpinner ? <Spinner /> : null}

      {showModal ? (
        <Modal
          userId={userData.userId}
          showHideModal={showHideModal}
          fnGet={loadMyCommentary}
          fnNewCommentary={postMyCommentary}
          fnDelete={commentaryRemove}
        />
      ) : null}
    </>
  );
};

export default StudentEventPage;
