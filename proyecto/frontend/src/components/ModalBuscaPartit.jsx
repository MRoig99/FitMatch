import React, { useEffect, useState } from 'react';
import { Modal, Card, Button, Row, Col, Form, Container } from 'react-bootstrap';
import axios from 'axios';
import ModalConfirmarReserva from './ModalConfirmarReserva';

const ModalBuscarPartits = ({ show, onHide, ciutat, idEsport, usuariId }) => {
  const [dataSeleccionada, setDataSeleccionada] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [pistesReservades, setPistesReservades] = useState([]);
  
  // Map que emmagatzema: { [id_pista]: nombre_de_participants }
  const [participantsMap, setParticipantsMap] = useState({});
  
  const [showConfirm, setShowConfirm] = useState(false);
  const [pistaSeleccionada, setPistaSeleccionada] = useState(null);

  // 1) Quan s’obre el modal o canvia la data/ciutat/esport → fem GET a pistes/reservades
  useEffect(() => {
    if (show && ciutat && idEsport && dataSeleccionada) {
      axios
        .get('http://localhost:3000/pistas/reservades', {
          params: { ciutat, idEsport, data: dataSeleccionada },
        })
        .then((res) => {
          const arrPistes = res.data;
          setPistesReservades(arrPistes);
          // Després de carregar-les, hi a afegir el nombre de participants per a cada pista
          // 2) Fem una petició per cada pista per obtenir el `partit` i extreure `participants`
          const promeses = arrPistes.map((pista) =>
            axios
              .get(`http://localhost:3000/partits/pista/${pista.id}`)
              .then((resPartit) => {
                // Suposem que la petició retorna { id, participants, ... }
                const partit = resPartit.data;
                return { id_pista: pista.id, participants: partit.participants || 0 };
              })
              .catch(() => {
                // Si no existeix cap partit (o error), considerem participants = 0
                return { id_pista: pista.id, participants: 0 };
              })
          );
          Promise.all(promeses).then((arr) => {
            // Convertim l’array a un objecte { [id_pista]: participants }
            const nouMap = {};
            arr.forEach(({ id_pista, participants }) => {
              nouMap[id_pista] = participants;
            });
            setParticipantsMap(nouMap);
          });
        })
        .catch((err) => console.error('Error carregant partits:', err));
    } else {
      // Si tanquem el modal, netegem les dades
      setPistesReservades([]);
      setParticipantsMap({});
    }
  }, [show, ciutat, idEsport, dataSeleccionada]);

  const handleReservar = (pista) => {
    // Ara comprovem si el nombre actual de participants < màxim de la pista
    const actualParticipants = participantsMap[pista.id] || 0;
    if (actualParticipants < pista.jugadors_necessaris) {
      setPistaSeleccionada(pista);
      setShowConfirm(true);
    } else {
      alert('El partit ja està complet.');
    }
  };

  const confirmarReserva = async () => {
    if (!usuariId) {
      alert('Usuari no autenticat');
      return;
    }
    try {
      // 1) Obtenim el partit associat a aquesta pista
      const { data: partit } = await axios.get(
        `http://localhost:3000/partits/pista/${pistaSeleccionada.id}`
      );
      const idPartit = partit.id;

      // 2) Comprovem que l’usuari no sigui el creador
      if (partit.id_usuari_creador === usuariId) {
        alert('No pots unir-te al teu propi partit.');
        setShowConfirm(false);
        return;
      }

      // 3) Comprovem si ja està unit a aquest partit
      const { data: up } = await axios.get(
        'http://localhost:3000/usuariPartit/filter',
        { params: { id_usuari: usuariId, id_partit: idPartit } }
      );
      if (up.length) {
        alert('Ja estàs unit a aquest partit.');
        setShowConfirm(false);
        return;
      }

      // 4) Creem la reserva
      await axios.post('http://localhost:3000/reserves', {
        id_usuari: usuariId,
        id_partit: idPartit,
        id_pista: pistaSeleccionada.id,
        data_reserva: dataSeleccionada,
        hora: pistaSeleccionada.hora || '00:00',
        id_estat_reserva: 1,
      });

      // 5) Afegim l’usuari a la taula usuariPartit
      await axios.post('http://localhost:3000/usuariPartit', {
        id_usuari: usuariId,
        id_partit: idPartit,
      });

      // 6) Incrementem el camp participants del partit
      await axios.post(
        `http://localhost:3000/partits/${idPartit}/incrementParticipants`
      );

      alert(
        "T'has unit correctament al partit i s'ha actualitzat el nombre de participants!"
      );
      setShowConfirm(false);
      onHide();
    } catch (err) {
      console.error('Error en reserva/unió/increment:', err.response || err.message);
      const msg = err.response?.data?.message || err.message || 'Error desconegut';
      alert(`Error realitzant la reserva: ${msg}`);
      setShowConfirm(false);
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        fullscreen="sm-down"
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton className="headerifooter">
          <Modal.Title className="textApp">
            Partits disponibles a {ciutat}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalBodyResponsive colorPrincipal colorText">
          <Container fluid>
            <Form.Group className="mb-3">
              <Form.Label>Selecciona una data</Form.Label>
              <Form.Control
                type="date"
                value={dataSeleccionada}
                onChange={(e) => setDataSeleccionada(e.target.value)}
              />
            </Form.Group>

            {pistesReservades.length === 0 ? (
              <p>No s'han trobat partits per a aquesta data.</p>
            ) : (
              <Row className="gy-3">
                {pistesReservades.map((pista) => {
                  // Obtenim el nombre actual de participants per a aquesta pista
                  const actualParticipants = participantsMap[pista.id] || 0;
                  return (
                    <Col xs={12} key={pista.id}>
                      <Card className="w-100 h-100 shadow-sm">
                        <Card.Body className="d-flex flex-column">
                          <Card.Title className="mb-2">{pista.nom}</Card.Title>
                          <Card.Text className="flex-grow-1">
                            <strong>Ubicació:</strong> {pista.nom_ubicacio}
                            <br />
                            <strong>Direcció:</strong> {pista.direccio}
                            <br />
                            <strong>Preu:</strong> {pista.preu_total} €
                            <br />
                            <strong>Jugadors:</strong> {actualParticipants} / {pista.jugadors_necessaris}
                            <br />
                            <strong>Hora:</strong> {pista.hora || 'No especificada'}
                          </Card.Text>
                          <Button
                            variant="success"
                            className="mt-auto"
                            onClick={() => handleReservar(pista)}
                          >
                            Unir-se al partit
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            )}
          </Container>
        </Modal.Body>
      </Modal>

      {pistaSeleccionada && (
        <ModalConfirmarReserva
          show={showConfirm}
          onHide={() => setShowConfirm(false)}
          pista={pistaSeleccionada}
          data={dataSeleccionada}
          hora={pistaSeleccionada?.hora || '00:00'}
          onConfirmar={confirmarReserva}
        />
      )}
    </>
  );
};

export default ModalBuscarPartits;
