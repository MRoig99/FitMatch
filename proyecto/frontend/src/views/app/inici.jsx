import { useState, useEffect } from 'react';
import axios from 'axios';
import '../../App.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Lateral from '../../components/lateral'

function Inicio() {
  const [showModal, setShowModal] = useState(false);
  const [esports, setEsports] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/esports') 
      .then(response => setEsports(response.data))
      .catch(error => console.error('Error carregant esports:', error));
  }, []);

  return (
    <>
      <Container fluid>
        <Row className="full-height">
          <Lateral />
          <Col xs="12" md="10" className='d-flex justify-content-center align-items-center contenidorAmbFormulari'>
            <Form className='formulari'>
              <Card className='rounded-5 pt-2 colorPrincipal colorText cardForm'>
                <Card.Body>
                  <Card.Title className='text-center fs-2 mb-4 textApp'>
                    Busca Partit
                  </Card.Title>

                  <Form.Group className="mb-3">
                    <Form.Label className='textApp'>Esport</Form.Label>
                    <Form.Select aria-label="Selecciona un esport">
                      <option value="">Selecciona un esport</option>
                      {esports.map((esport) => (
                        <option key={esport.id} value={esport.nom}>
                          {esport.nom.charAt(0).toUpperCase() + esport.nom.slice(1)}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="loginPassword">
                    <Form.Label className='textApp'>Ubicació</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ubicació"
                    />
                  </Form.Group>
                  <div className='d-flex justify-content-center'>
                    <Button className='boto mt-3 w-100' type="submit">
                      Busca
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

export default Inicio;
