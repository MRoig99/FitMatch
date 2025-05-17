import { useState, useEffect } from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios';
import '../../App.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Lateral from '../../components/lateral';
import ModalUbicacions from '../../components/ModalUbicacions';


function Crea() {
  const [esports, setEsports] = useState([]);
  const [ubicacions, setUbicacions] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [esportSeleccionat, setEsportSeleccionat] = useState(null);
  const [ciutatSeleccionada, setCiutatSeleccionada] = useState(null);
  const [showUbicacioModal, setShowUbicacioModal] = useState(false);


  useEffect(() => {
    axios.get('http://localhost:3000/esports')
      .then((res) => setEsports(res.data))
      .catch((err) => console.error('Error al carregar esports:', err));
  }, []);

  useEffect(() => {
    if (busqueda.length >= 2) {
      axios.get('http://localhost:3000/ubicacions')
        .then((res) => {
          const filtrades = res.data.filter((u) =>
            u.nom.toLowerCase().includes(busqueda.toLowerCase()) ||
            u.ciutat.toLowerCase().includes(busqueda.toLowerCase())
          );
          setSuggestions(filtrades);
        })
        .catch((err) => console.error('Error al carregar ubicacions:', err));
    } else {
      setSuggestions([]);
    }
  }, [busqueda]);



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
                    <Form.Select
                      aria-label="Selecciona un esport"
                      onChange={(e) => setEsportSeleccionat(Number(e.target.value))}
                    >
                      <option>Selecciona un esport</option>
                      {esports.map((esport) => (
                        <option key={esport.id} value={esport.id}>{esport.nom}</option>
                      ))}
                    </Form.Select>

                  </Form.Group>

                  <Form.Group className="mb-3" controlId="ubicacioInput">
                    <Form.Label className='textApp'>Ubicació</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ubicació"
                      value={busqueda}
                      onChange={(e) => setBusqueda(e.target.value)}
                      autoComplete="off"

                    />
                    {suggestions.length > 0 && (
                      <ListGroup style={{ position: 'absolute', zIndex: 10, width: '100%' }}>
                        {suggestions.map((ubicacio) => (
                          <ListGroup.Item
                            key={ubicacio.id}
                            action
                            onClick={() => {
                              setBusqueda(ubicacio.ciutat);
                              setCiutatSeleccionada(ubicacio.ciutat);
                              setSuggestions([]);
                              if (esportSeleccionat) setShowUbicacioModal(true);
                            }}

                          >
                            {ubicacio.ciutat}
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    )}
                  </Form.Group>
                </Card.Body>
              </Card>
            </Form>
          </Col>
        </Row>
      </Container>
      <ModalUbicacions
        show={showUbicacioModal}
        onHide={() => setShowUbicacioModal(false)}
        ciutat={ciutatSeleccionada}
        idEsport={esportSeleccionat}
      />

    </>
  )
}

export default Crea;
