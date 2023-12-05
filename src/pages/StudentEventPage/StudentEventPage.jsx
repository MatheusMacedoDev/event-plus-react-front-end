import React, { useContext, useEffect, useState } from "react";
import Main from "../../components/Main/Main";
import Title from "../../components/Title/Title";
import Table from "./TableEvA/Table";
import Container from "../../components/Container/Container";
import { Select } from '../../components/FormComponents/FormComponents';
import Spinner from "../../components/Spinner/Spinner";
import Modal from "../../components/Modal/Modal";
import api from "../../services/apiAcessor";
import { eventsResource, eventPresencesResource } from '../../services/apiResources';

import "./StudentEventPage.css";
import { UserContext } from "../../context/AuthContext";

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

  async function getAllEvents() {
    const eventsResponse = await api.get(eventsResource, {
      headers: {
          'Authorization': `bearer ${userData.token}`
      }
    });
    return eventsResponse.data.map(event => {
      return {
          idEvento: event.idEvento,
          nomeEvento: event.nomeEvento,
          dataEvento: event.dataEvento.slice(0, 10),
      };
    });
  }

  async function getMyEvents() {
    const myEventsResponse = await api.get(`${eventPresencesResource}/ListarMinhas/${userData.id}`);
    const events = myEventsResponse.data.map(presence => {
      const idEvento = presence.evento.idEvento;
      const nomeEvento = presence.evento.nomeEvento;
      const dataEvento = presence.evento.dataEvento;

      return {
        idEvento,
        nomeEvento,
        dataEvento
      }
    })
    
    return events;
  }

  useEffect(() => {
    async function getEvents() {
      if (tipoEvento == 1) {
        const data = await getAllEvents();
        setEventos(data);
      } else {
        const data = await getMyEvents();
        setEventos(data);
      }
    }    

    getEvents();
  }, [tipoEvento]);

  const verifyPresence = (allEvents, userEvents) => {
    for (let x = 0; allEvents.length; x++) {
      for (let y = 0; userEvents.length; y++) {
        if (allEvents[x].idEvento === userEvents[y].idEvento) {
          allEvents[x].situacao = true;
          break;
        }
      }
    }
  }

  // toggle meus eventos ou todos os eventos
  function myEvents(tpEvent) {
    setTipoEvento(tpEvent);
  }

  async function loadMyComentary(idComentary) {
    return "????";
  }

  const showHideModal = () => {
    setShowModal(showModal ? false : true);
  };

  const commentaryRemove = () => {
    alert("Remover o comentário");
  };

  function handleConnect() {
    // alert("Desenvolver a função conectar evento");
  }
  return (
    <>
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
            fnShowModal={() => {
              showHideModal();
            }}
          />
        </Container>
      </Main>

      {/* SPINNER -Feito com position */}
      {showSpinner ? <Spinner /> : null}

      {showModal ? (
        <Modal
          userId={userData.userId}
          showHideModal={showHideModal}
          fnDelete={commentaryRemove}
        />
      ) : null}
    </>
  );
};

export default StudentEventPage;
