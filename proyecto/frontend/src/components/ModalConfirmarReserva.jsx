import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalConfirmarReserva = ({ show, onHide, pista, data, hora, onConfirmar }) => {
  return (
    <Modal show={show} onHide={onHide} backdrop="static" keyboard={false} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar reserva</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Estàs segur que vols reservar la pista <strong>{pista.nom}</strong> per al dia <strong>{data}</strong> a les <strong>{hora}</strong>?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancel·lar</Button>
        <Button variant="primary" onClick={onConfirmar}>Confirmar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalConfirmarReserva;
