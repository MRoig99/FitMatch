import React, { useEffect, useState } from 'react';
import { Modal, Card, Button, Row, Col, Form } from 'react-bootstrap';
import axios from 'axios';
import ModalConfirmarReserva from './ModalConfirmarReserva';

const ModalUbicacions = ({ show, onHide, ciutat, idEsport, usuariId }) => {
  const [ubicacions, setUbicacions] = useState([]);
  const [dataSeleccionada, setDataSeleccionada] = useState(new Date().toISOString().split('T')[0]);
  const [pistaSeleccionada, setPistaSeleccionada] = useState(null);
  const [showConfirmarReserva, setShowConfirmarReserva] = useState(false);
  const [ubicacioSeleccionadaId, setUbicacioSeleccionadaId] = useState(null);

  useEffect(() => {
    setShowConfirmarReserva(false);
    setPistaSeleccionada(null);
  }, [dataSeleccionada]);

  useEffect(() => {
    if (show && ciutat && idEsport && dataSeleccionada) {
      axios.get('http://localhost:3000/ubicacions')
        .then((res) => {
          const filtrades = res.data.filter(
            u => u.ciutat.toLowerCase() === ciutat.toLowerCase()
          );

          const promeses = filtrades.map(async ubicacio => {
            const { data } = await axios.get('http://localhost:3000/pistas/disponibles', {
              params: {
                idUbicacio: ubicacio.id,
                idEsport: idEsport,
                data: dataSeleccionada,
              }
            });
            return { ...ubicacio, pistes: data };
          });

          Promise.all(promeses).then(setUbicacions);
        });
    }
  }, [show, ciutat, idEsport, dataSeleccionada]);

  const obrirConfirmarReserva = (pista, idUbicacio) => {
    setPistaSeleccionada(pista);
    setUbicacioSeleccionadaId(idUbicacio);
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

    axios.post('http://localhost:3000/partits', {
      id_usuari_creador: usuariId,
      id_esport: idEsport,
      id_ubicacio: ubicacioSeleccionadaId,
      nom: `Partit de ${pistaSeleccionada.nom}`,
      data_creacio: new Date().toISOString().slice(0, 19).replace('T', ' '),
      participants: 1,
      preu: pistaSeleccionada.preu_total,
      descripcio: 'PAPAFRITA'
    }).then((resPartit) => {
      const idPartitCreat = resPartit.data.id;

      axios.post('http://localhost:3000/reserves', {
        id_usuari: usuariId,
        id_partit: idPartitCreat,
        id_pista: pistaSeleccionada.id,
        data_reserva: dataSeleccionada,
        hora: pistaSeleccionada.hora || '00:00',
        id_estat_reserva: 1  
      }).then(() => {
        axios.patch(`http://localhost:3000/pistas/${pistaSeleccionada.id}`, {
          disponibilitat: false
        }).then(() => {
          axios.post('http://localhost:3000/usuariPartit', {
            id_usuari: usuariId,
            id_partit: idPartitCreat
          }).then(() => {
            alert('Reserva y partido creados correctamente!');
            tancarConfirmarReserva();
            onHide();
          }).catch(err => {
            console.error('Error asignando usuario al partido:', err);
            alert('Error al asignar el usuario al partido.');
          });
        }).catch(err => {
          console.error('Error actualizando disponibilidad:', err);
          alert('Error actualizando la disponibilidad de la pista.');
        });
      }).catch(err => {
        alert('Error al crear la reserva.');
        console.error(err);
      });

    }).catch(err => {
      alert('Error al crear el partido.');
      console.error(err);
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
              onChange={(e) => setDataSeleccionada(e.target.value)}
            />
          </Form.Group>

          {ubicacions.length === 0 ? (
            <p>No s'han trobat pistes disponibles.</p>
          ) : (
            <Row>
              {ubicacions.map(ubicacio => (
                ubicacio.pistes.map(pista => (
                  <Col xs={12} key={pista.id} className="mb-3">
                    <Card className='w-100'>
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
                            <Button variant="success" onClick={() => obrirConfirmarReserva(pista, ubicacio.id)}>Reservar pista</Button>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              ))}
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
