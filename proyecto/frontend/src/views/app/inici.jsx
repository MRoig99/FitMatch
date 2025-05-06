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

  return (
    <>

      <Container fluid>
        <Row>
          <Lateral />
          <Col className='d-flex justify-content-center align-items-center'>
            <Form>
              <Card className='rounded-4 colorPrincipal colorText' style={{ width: '25rem' }}>
                <Card.Body>
                  <Card.Title className='text-center fs-2'>Busca Partit</Card.Title>

                  <Form.Group className="mb-3">
                    <Form.Label>Esport</Form.Label>
                    <Form.Select aria-label="Selecciona un esport">
                      <option>Selecciona un esport</option>
                      <option value="futbol">Futbol</option>
                      <option value="basquet">Bàsquet</option>
                      <option value="tenis">Tenis</option>
                      <option value="padel">Pàdel</option>
                      <option value="volei">Voleibol</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="loginPassword">
                    <Form.Label>Ubicació</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ubicació"
                    />
                  </Form.Group>
                  <div className='d-flex justify-content-center'>
                    <Button className='boto mt-3' variant="primary" type="submit">
                      Busca
                    </Button>
                  </div>

                  <a className='d-flex justify-content-center pt-2 colorText' style={{ cursor: 'pointer' }}>
                    No tens compte? Registrat
                  </a>
                </Card.Body>
              </Card>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default App;
