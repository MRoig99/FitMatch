import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Lateral from '../../components/lateral';

function Perfil() {
  const [usuari, setUsuari] = useState(null);
  const [partitsDisputatsCount, setPartitsDisputatsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const usuariString = localStorage.getItem('usuari');
    if (!usuariString) {
      setLoading(false);
      return;
    }

    try {
      const usuariObj = JSON.parse(usuariString);
      setUsuari(usuariObj);

      axios.get(`https://api.alu14.daw.iesevalorpego.es/partits/historial/${usuariObj.id}`)
        .then(res => {
          setPartitsDisputatsCount(res.data.length);
          setLoading(false);
        })
        .catch(() => {
          setPartitsDisputatsCount(0);
          setLoading(false);
        });
    } catch {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <Container fluid className="min-vh-100 d-flex p-0">
        <Lateral />
        <main className="flex-grow-1 d-flex justify-content-center align-items-center bg-light">
          <h4 className="text-secondary">Carregant perfil...</h4>
        </main>
      </Container>
    );
  }

  if (!usuari) {
    return (
      <Container fluid className="min-vh-100 d-flex p-0">
        <Lateral />
        <main className="flex-grow-1 d-flex flex-column justify-content-center align-items-center text-center px-3 bg-light">
          <h5 className="mb-3 text-danger">No s'ha trobat informació de l'usuari.</h5>
          <Button href="/login" variant="success" className="mt-3 px-4 py-2 rounded-pill fw-semibold">
            Iniciar sessió
          </Button>
        </main>
      </Container>
    );
  }

  return (
    <Container fluid className="min-vh-100 d-flex p-0 mb-5 mb-md-0 bg-light">
      <Lateral />
      <main className="flex-grow-1 d-flex justify-content-center align-items-center px-3 py-5">
        <Card
          className="shadow-lg rounded-4 p-5 w-100"
          style={{ maxWidth: '900px'}}
          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.02)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <h2 className="mb-4 text-center fw-bold display-5 text-primary">
            Perfil d'usuari
          </h2>

          <Row className="gy-4">
            <Col xs={12} md={6} className="border-md-end pe-md-4">
              <h5 className="mb-3 fw-semibold text-secondary border-bottom pb-2">Informació personal</h5>
              <p className="fs-5"><strong>Nom:</strong> {usuari.nom || 'N/D'}</p>
              <p className="fs-5"><strong>Email:</strong> {usuari.correu_electronic || 'N/D'}</p>
              <p className="fs-5"><strong>Edat:</strong> {usuari.edat || 'N/D'}</p>
            </Col>

            <Col xs={12} md={6} className="ps-md-4">
              <h5 className="mb-3 fw-semibold text-secondary border-bottom pb-2">Estadístiques</h5>
              <p className="fs-5"><strong>Total partits disputats:</strong> {partitsDisputatsCount}</p>
            </Col>
          </Row>

          <div className="text-center mt-5">
            <Button
              variant="success"
              size="lg"
              href="/editar-perfil"
              className="px-5 py-3 fw-semibold rounded-pill fs-5 shadow-sm"
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#7AE2CF')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = '')}
            >
              Editar Perfil
            </Button>
          </div>
        </Card>
      </main>
    </Container>
  );
}

export default Perfil;
