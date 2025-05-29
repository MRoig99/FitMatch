import React, { useEffect, useState } from 'react';
import { Modal, Card, Button, Row, Col, Form } from 'react-bootstrap';
import axios from 'axios';
import ModalConfirmarReserva from './ModalConfirmarReserva';

const ModalUbicacions = ({ show, onHide, ciutat, idEsport, usuariId }) => {
  const [ubicacions, setUbicacions] = useState([]);
  const [dataSeleccionada, setDataSeleccionada] = useState(new Date().toISOString().split('T')[0]);
  const [pistaSeleccionada, setPistaSeleccionada] = useState(null);
  const [showConfirmarReserva, setShowConfirmarReserva] = useState(false);

  // Restableix selecció quan canvies data
  useEffect(() => {
    setShowConfirmarReserva(false);
    setPistaSeleccionada(null);
  }, [dataSeleccionada]);

  // Carrega ubicacions + pistes disponibles
  useEffect(() => {
    if (show && ciutat && idEsport && dataSeleccionada) {
      axios.get('http://localhost:3000/ubicacions')
        .then(res => {
          const filtrades = res.data.filter(u => u.ciutat.toLowerCase() === ciutat.toLowerCase());
          return Promise.all(filtrades.map(async ubicacio => {
            const { data: pistes } = await axios.get('http://localhost:3000/pistas/disponibles', {
              params: { idUbicacio: ubicacio.id, idEsport, data: dataSeleccionada }
            });
            return { ...ubicacio, pistes };
          }));
        })
        .then(setUbicacions)
        .catch(err => console.error('Error carregant pistes disponibles:', err));
    }
  }, [show, ciutat, idEsport, dataSeleccionada]);

  const obrirConfirmarReserva = (pista) => {
    setPistaSeleccionada(pista);
    setShowConfirmarReserva(true);
  };

  const tancarConfirmarReserva = () => {
    setShowConfirmarReserva(false);
    setPistaSeleccionada(null);
  };

  const confirmarReserva = () => {
    if (!usuariId) {
      alert('Usuari no autenticat');
      return;
    }

    let idPartitCreat;
    axios.post('http://localhost:3000/partits', {
      id_usuari_creador: usuariId,
      id_esport: idEsport,
      id_pista: pistaSeleccionada.id,
      nom: `Partit de ${pistaSeleccionada.nom}`,
      data_creacio: dataSeleccionada,
      participants: 1,
      preu: pistaSeleccionada.preu_total,
      descripcio: 'PAPAFRITA'
    })
    .then(resPartit => {
      idPartitCreat = resPartit.data.id;
      // Afegeix el patch per marcar la pista com a no disponible
      return axios.patch(`http://localhost:3000/pistas/${pistaSeleccionada.id}`, {
        disponibilitat: false
      });
    })
    .then(() => {
      // Creem la reserva després d'actualitzar disponibilitat
      return axios.post('http://localhost:3000/reserves', {
        id_usuari: usuariId,
        id_partit: idPartitCreat,
        id_pista: pistaSeleccionada.id,
        id_estat_reserva: 1,
        data_reserva: dataSeleccionada,
        hora: pistaSeleccionada.hora || '00:00'
      });
    })
    .then(() => {
      console.log(idPartitCreat);
      // Assigna usuari al partit
      return axios.post('http://localhost:3000/usuariPartit', {
        id_usuari: usuariId,
        id_partit: idPartitCreat
      });
    })
    .then(resUsuariPartit => {
      console.log('Resposta usuariPartit:', resUsuariPartit.data);
      alert('Reserva, partit i disponibilitat actualitzats correctament!');
      tancarConfirmarReserva();
      onHide();
    })
    .catch(err => {
      console.error('Error creant partida i reserva:', err);
      alert('Sha produit un error al crear la reserva.');
    });
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
        dialogClassName="modal-dialog-centered-custom modal-no-bg"
        backdropClassName="modal-backdrop-custom"
      >
        <Modal.Header closeButton className="headerifooter">
          <Modal.Title className="textApp">
            Instal·lacions esportives a {ciutat}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalBodyResponsive colorPrincipal colorText">
          <Form.Group className="mb-3">
            <Form.Label>Selecciona una data</Form.Label>
            <Form.Control
              type="date"
              value={dataSeleccionada}
              onChange={e => setDataSeleccionada(e.target.value)}
            />
          </Form.Group>

          {ubicacions.length === 0 ? (
            <p>No s'han trobat pistes disponibles.</p>
          ) : (
            <Row>
              {ubicacions.map(ubicacio =>
                ubicacio.pistes.map(pista => (
                  <Col xs={12} key={pista.id} className="mb-3">
                    <Card className="w-100">
                      <Card.Body>
                        <Row className="align-items-center">
                          <Col>
                            <Card.Title>{pista.nom}</Card.Title>
                            <Card.Text>
                              <strong>Instal·lació:</strong> {ubicacio.nom}<br />
                              <strong>Direcció:</strong> {ubicacio.direccio}<br />
                              <strong>Preu total:</strong> {pista.preu_total} €<br />
                              <strong>Jugadors:</strong> {pista.jugadors_necessaris}<br />
                              <strong>Hora:</strong> {pista.hora || 'No disponible'}
                            </Card.Text>
                            <Button variant="success" onClick={() => obrirConfirmarReserva(pista)}>
                              Reservar pista
                            </Button>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              )}
            </Row>
          )}
        </Modal.Body>
      </Modal>

      {pistaSeleccionada && (
        <ModalConfirmarReserva
          show={showConfirmarReserva}
          onHide={tancarConfirmarReserva}
          pista={pistaSeleccionada}
          data={dataSeleccionada}
          hora={pistaSeleccionada?.hora || '00:00'}
          onConfirmar={confirmarReserva}
        />
      )}
    </>
  );
};

export default ModalUbicacions;
