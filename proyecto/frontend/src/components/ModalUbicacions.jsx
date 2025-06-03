import React, { useEffect, useState } from 'react';
import { Modal, Card, Button, Row, Col, Form } from 'react-bootstrap';
import axios from 'axios';
import ModalConfirmarReserva from './ModalConfirmarReserva';

const ModalUbicacions = ({ show, onHide, ciutat, idEsport, usuariId }) => {
  const [ubicacions, setUbicacions] = useState([]);
  const [dataSeleccionada, setDataSeleccionada] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [pistaSeleccionada, setPistaSeleccionada] = useState(null);
  const [showConfirmarReserva, setShowConfirmarReserva] = useState(false);

  useEffect(() => {
    setShowConfirmarReserva(false);
    setPistaSeleccionada(null);
  }, [dataSeleccionada]);

  useEffect(() => {
    if (show && ciutat && idEsport && dataSeleccionada) {
      axios.get('https://api.alu14.daw.iesevalorpego.es/ubicacions')
        .then(res => {
          const filtrades = res.data.filter(u => u.ciutat.toLowerCase() === ciutat.toLowerCase());
          return Promise.all(
            filtrades.map(async ubicacio => {
              const { data: pistes } = await axios.get(
                'https://api.alu14.daw.iesevalorpego.es/pistas/disponibles',
                {
                  params: {
                    idUbicacio: ubicacio.id,
                    idEsport,
                    data: dataSeleccionada
                  }
                }
              );
              return { ...ubicacio, pistes };
            })
          );
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
    axios.post('https://api.alu14.daw.iesevalorpego.es/partits', {
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
      return axios.patch(`https://api.alu14.daw.iesevalorpego.es/pistas/${pistaSeleccionada.id}`, {
        disponibilitat: false
      });
    })
    .then(() => {
      return axios.post('https://api.alu14.daw.iesevalorpego.es/reserves', {
        id_usuari: usuariId,
        id_partit: idPartitCreat,
        id_pista: pistaSeleccionada.id,
        id_estat_reserva: 1,
        data_reserva: dataSeleccionada,
        hora: pistaSeleccionada.hora || '00:00'
      });
    })
    .then(() => {
      return axios.post('https://api.alu14.daw.iesevalorpego.es/usuariPartit', {
        id_usuari: usuariId,
        id_partit: idPartitCreat
      });
    })
    .then(() => {
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
        fullscreen="sm-down"
        centered
        backdrop="static"
        keyboard={false}
        dialogClassName="modal-dialog-centered-custom"
        backdropClassName="modal-backdrop-custom"
        className="modal-no-bg"
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
            <Row xs={1} md={1} className="g-3">
              {ubicacions.map(ubicacio =>
                ubicacio.pistes.map(pista => (
                  <Col key={pista.id}>
                    <Card className="w-100 h-100 shadow-sm">
                      <Card.Body className="d-flex flex-column">
                        <Card.Title className="mb-2">{pista.nom}</Card.Title>
                        <Card.Text className="flex-grow-1">
                          <strong>Instal·lació:</strong> {ubicacio.nom}<br />
                          <strong>Direcció:</strong> {ubicacio.direccio}<br />
                          <strong>Preu total:</strong> {pista.preu_total} €<br />
                          <strong>Jugadors:</strong> {pista.jugadors_necessaris}<br />
                          <strong>Hora:</strong> {pista.hora || 'No disponible'}
                        </Card.Text>
                        <Button variant="success" onClick={() => obrirConfirmarReserva(pista)} className="mt-auto">
                          Reservar pista
                        </Button>
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
