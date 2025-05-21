import { useState, useEffect } from 'react';
import axios from 'axios';
import '../../App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Lateral from '../../components/lateral';
import ListGroup from 'react-bootstrap/ListGroup';
import ModalUbicacions from '../../components/ModalUbicacions';

function Inicio() {
  const [showModal, setShowModal] = useState(false);
  const [esports, setEsports] = useState([]);
  const [ubicacions, setUbicacions] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [esportSeleccionat, setEsportSeleccionat] = useState(null);
  const [ciutatSeleccionada, setCiutatSeleccionada] = useState(null);
  const [usuariId, setUsuariId] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/esports')
      .then(response => setEsports(response.data))
      .catch(error => console.error('Error carregant esports:', error));
  }, []);

  useEffect(() => {
    if (busqueda.length >= 2) {
      axios.get('http://localhost:3000/ubicacions')
        .then(res => {
          const filtrades = res.data.filter(u =>
            u.ciutat.toLowerCase().includes(busqueda.toLowerCase())
          );
          setSuggestions(filtrades);
        })
        .catch(error => console.error('Error carregant ubicacions:', error));
    } else {
      setSuggestions([]);
    }
  }, [busqueda]);

   useEffect(() => {
    const usuariString = localStorage.getItem('usuari');
    if (usuariString) {
      const usuari = JSON.parse(usuariString);
      setUsuariId(usuari.id); 
    }
  }, []);

  const handleUbicacioClick = (ubicacio) => {
    console.log('Seleccionada ciutat:', ubicacio.ciutat);
    setBusqueda(ubicacio.ciutat);
    setCiutatSeleccionada(ubicacio.ciutat);
    setSuggestions([]);
    setShowModal(true);
  };

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
                    Crea Partit
                  </Card.Title>

                  <Form.Group className="mb-3">
                    <Form.Label className='textApp'>Esport</Form.Label>
                    <Form.Select
                      aria-label="Selecciona un esport"
                      onChange={(e) => setEsportSeleccionat(Number(e.target.value))}
                      value={esportSeleccionat || ''}
                    >
                      <option value="">Selecciona un esport</option>
                      {esports.map((esport) => (
                        <option key={esport.id} value={esport.id}>
                          {esport.nom.charAt(0).toUpperCase() + esport.nom.slice(1)}
                        </option>
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
                            onClick={() => handleUbicacioClick(ubicacio)}
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

      {showModal && esportSeleccionat && ciutatSeleccionada && (
        <ModalUbicacions
          show={showModal}
          onHide={() => setShowModal(false)}
          ciutat={ciutatSeleccionada}
          idEsport={esportSeleccionat}
          usuariId={usuariId}
        />
      )}
    </>
  );
}

export default Inicio;
