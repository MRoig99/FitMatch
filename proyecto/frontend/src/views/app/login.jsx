import { useState } from 'react'
import '../../App.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Lateral from '../../components/lateral'

function App() {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
    <Container fluid className='fonsIniciSessio'>
      <Row className="d-flex align-items-center justify-content-center vh-100">
        <Col>
          <div className='d-flex justify-content-center'>
            <Card className='rounded-4 colorPrincipal colorText' style={{ width: '25rem' }}>
              <Card.Body>
                <Card.Title className='text-center fs-2'>Inicia Sessió</Card.Title>
                <div>
                  <Card.Text>
                    <Form>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                      </Form.Group>
                      <div className='d-flex justify-content-center'>
                        <Button className='boto mt-3' variant="primary" type="submit">
                          Inicia Sessió
                        </Button>
                      </div>     
                      <a onClick={handleOpenModal} className='d-flex justify-content-center pt-2 colorText' style={{ cursor: 'pointer' }}>
                        No tens compte? Registrat
                      </a> 
                    </Form>
                  </Card.Text>
                </div>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
    </Container> 

    {/* Modal de Registro */}
    <Modal show={showModal} onHide={handleCloseModal} centered>
      <Modal.Header closeButton className='colorPrincipal colorText'>
        <Modal.Title className='fs-2 w-100 text-center'>Registra't</Modal.Title>
      </Modal.Header>
      <Modal.Body className='colorPrincipal colorText'>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Nom</Form.Label>
            <Form.Control type="text" placeholder="Introdueix el teu nom" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Edat</Form.Label>
            <Form.Control type="number" placeholder="Introdueix la teva edat" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmailRegister">
            <Form.Label>Correu Electronic</Form.Label>
            <Form.Control type="email" placeholder="Introdueix el teu email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPasswordRegister">
            <Form.Label>Contrasenya</Form.Label>
            <Form.Control type="password" placeholder="Contrasenya" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formConfirmPassword">
            <Form.Label>Confirma la contrasenya</Form.Label>
            <Form.Control type="password" placeholder="Confirma la contrasenya" />
          </Form.Group>

          <div className='d-flex justify-content-center'>
            <Button variant="primary" type="submit" className='boto'>
              Registrar-se
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
    </>
  )
}

export default App;
