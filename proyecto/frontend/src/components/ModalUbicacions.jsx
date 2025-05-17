import React, { useEffect, useState } from 'react';
import { Modal, Card, Button, Row, Col, Form } from 'react-bootstrap';
import axios from 'axios';

const ModalUbicacions = ({ show, onHide, ciutat, idEsport }) => {
  const [ubicacions, setUbicacions] = useState([]);
  const [dataSeleccionada, setDataSeleccionada] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    if (show && ciutat && idEsport && dataSeleccionada) {
      axios.get('http://localhost:3000/ubicacions')
        .then((res) => {
          const filtrades = res.data.filter(
            u => u.ciutat.toLowerCase().includes(ciutat.toLowerCase())
          );
          const promeses = filtrades.map(async ubicacio => {
            try {
              const { data } = await axios.get('http://localhost:3000/pistas/disponibles', {
                params: {
                  idUbicacio: ubicacio.id,
                  idEsport: idEsport,
                  data: dataSeleccionada
                }
              });
              return { ...ubicacio, pistes: data };
            } catch (error) {
              console.error('Error en pista:', ubicacio.id, error);
              return { ...ubicacio, pistes: [] };
            }
          });

          Promise.all(promeses).then(results => {
            console.log('Ubicacions amb pistes:', results);
            setUbicacions(results);
          });
        });
    }
  }, [show, ciutat, idEsport, dataSeleccionada]);


  return (
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
                <Col xs={12} key={`${ubicacio.id}-${pista.id}`} className="mb-3">
                  <Card className='w-100'>
                    <Card.Body>
                      <Row className="align-items-center">
                        <Col>
                          <Card.Title>{pista.nom}</Card.Title>
                          <Card.Text>
                            <strong>Instal·lació:</strong> {ubicacio.nom}<br />
                            <strong>Direcció:</strong> {ubicacio.direccio}<br />
                            <strong>Preu total:</strong> {pista.preu_total} €<br />
                            <strong>Jugadors:</strong> {pista.jugadors_necessaris}
                          </Card.Text>
                          <Button variant="success">Reservar pista</Button>
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
    
  );
};

export default ModalUbicacions;
