import React, { useEffect, useState } from 'react';
import { Modal, Card, Button, Row, Col, Form } from 'react-bootstrap';
import axios from 'axios';

const ModalBuscarPartits = ({ show, onHide, ciutat, idEsport }) => {
  const [dataSeleccionada, setDataSeleccionada] = useState(new Date().toISOString().split('T')[0]);
  const [pistesReservades, setPistesReservades] = useState([]);

  useEffect(() => {
    if (show && ciutat && idEsport && dataSeleccionada) {
      axios.get('http://localhost:3000/pistas/reservades', {
        params: {
          ciutat,
          idEsport,
          data: dataSeleccionada
        }
      }).then((res) => {
        setPistesReservades(res.data);
      }).catch(err => {
        console.error('Error carregant pistes reservades:', err);
      });
    }
  }, [show, ciutat, idEsport, dataSeleccionada]);

  return (
    <Modal show={show} onHide={onHide} size="lg" centered backdrop="static" keyboard={false}>
      <Modal.Header closeButton className="headerifooter">
        <Modal.Title className="textApp">Partits disponibles a {ciutat}</Modal.Title>
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
              <Col xs={12} key={pista.id} className="mb-3">
                <Card className='w-100'>
                  <Card.Body>
                    <Card.Title>{pista.nom}</Card.Title>
                    <Card.Text>
                      <strong>Ubicació:</strong> {pista.nom_ubicacio}<br />
                      <strong>Direcció:</strong> {pista.direccio}<br />
                      <strong>Preu:</strong> {pista.preu_total} €<br />
                      <strong>Jugadors necessaris:</strong> {pista.jugadors_necessaris}<br />
                      <strong>Hora:</strong> {pista.hora || 'No especificada'}
                    </Card.Text>
                    <Button variant="success">Unir-se al partit</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ModalBuscarPartits;
