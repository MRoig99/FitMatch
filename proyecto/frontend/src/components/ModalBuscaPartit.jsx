import React, { useEffect, useState } from 'react';
import { Modal, Card, Button, Row, Col, Form } from 'react-bootstrap';
import axios from 'axios';
import ModalConfirmarReserva from './ModalConfirmarReserva';

const ModalBuscarPartits = ({ show, onHide, ciutat, idEsport, usuariId }) => {
  const [dataSeleccionada, setDataSeleccionada] = useState(new Date().toISOString().split('T')[0]);
  const [pistesReservades, setPistesReservades] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pistaSeleccionada, setPistaSeleccionada] = useState(null);

  useEffect(() => {
    if (show && ciutat && idEsport && dataSeleccionada) {
      axios.get('http://localhost:3000/pistas/reservades', {
        params: { ciutat, idEsport, data: dataSeleccionada }
      })
      .then(res => setPistesReservades(res.data))
      .catch(err => console.error('Error carregant partits:', err));
    }
  }, [show, ciutat, idEsport, dataSeleccionada]);

  const handleReservar = (pista) => {
    if (pista.jugadors_necessaris > 0) {
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
      // 0. Obtenir el partit relacionat via ruta
      const resPartit = await axios.get(`http://localhost:3000/partits/pista/${pistaSeleccionada.id}`);
      const partit = resPartit.data;
      const idPartit = partit.id;

      // 0.5 Comprovar si l'usuari és creador
      if (partit.id_usuari_creador === usuariId) {
        alert('No pots unir-te al teu propi partit.');
        setShowConfirm(false);
        return;
      }

      // 0.6 Comprovar si l'usuari ja està unit (ruta GET /usuariPartit?)
      const resUsuariPartit = await axios.get('http://localhost:3000/usuariPartit/filter', {
        params: { id_usuari: usuariId, id_partit: idPartit }
      });
      if (resUsuariPartit.data && resUsuariPartit.data.length > 0) {
        alert('Ja estàs unit a aquest partit.');
        setShowConfirm(false);
        return;
      }

      // 1. Crear reserva
      await axios.post('http://localhost:3000/reserves', {
        id_usuari: usuariId,
        id_partit: idPartit,
        id_pista: pistaSeleccionada.id,
        data_reserva: dataSeleccionada,
        hora: pistaSeleccionada.hora || '00:00',
        id_estat_reserva: 1
      });

      // 2. Assignar usuari al partit
      await axios.post('http://localhost:3000/usuariPartit', {
        id_usuari: usuariId,
        id_partit: idPartit
      });

      // 3. Incrementar participants al backend
      await axios.post(`http://localhost:3000/partits/${idPartit}/incrementParticipants`);

      alert("T'has unit correctament al partit i s'ha actualitzat el nombre de participants!");
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
            <Row>
              {pistesReservades.map((pista) => (
                <Col xs={12} key={pista.id} className='mb-3'>
                  <Card className='w-100'>
                    <Card.Body>
                      <Card.Title>{pista.nom}</Card.Title>
                      <Card.Text>
                        <strong>Ubicació:</strong> {pista.nom_ubicacio}<br />
                        <strong>Direcció:</strong> {pista.direccio}<br />
                        <strong>Preu:</strong> {pista.preu_total} €<br />
                        <strong>Places disponibles:</strong> {pista.jugadors_necessaris}<br />
                        <strong>Hora:</strong> {pista.hora || 'No especificada'}
                      </Card.Text>
                      <Button variant="success" onClick={() => handleReservar(pista)}>
                        Unir-se al partit
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
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
