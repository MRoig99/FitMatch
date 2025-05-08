import { useState } from 'react'
import '../../App.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Lateral from '../../components/lateral'

function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Container fluid>
        <Row className="full-height">
          <Lateral />   
          <Col xs="12" md="10" className='d-flex justify-content-center align-items-center contenidorAmbFormulari border border-black'>
            <Form className=' formulari'>
              <Card className='rounded-5 pt-2 colorPrincipal colorText cardForm'>
                <Card.Body>
                  <Card.Title className='text-center fs-2 mb-4 textApp'>
                    Crear una partida
                  </Card.Title>

                  <Form.Group className="mb-3">
                    <Form.Label className='textApp'>Esport</Form.Label>
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
                    <Form.Label className='textApp'>Ubicació</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ubicació"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="loginPassword">
                    <Form.Label className='textApp'>Nº de jugadors</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Numero de jugadors requerit"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="loginPassword">
                    <Form.Label className='textApp'>Preu</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Preu de la partida"
                    />
                  </Form.Group>
                  <div className='d-flex justify-content-center'>
                    <Button className='boto mt-3 w-100' type="submit">
                      Crea
                    </Button>
                  </div>
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
