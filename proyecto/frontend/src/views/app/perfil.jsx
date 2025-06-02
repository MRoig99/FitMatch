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

      axios.get(`http://localhost:3000/partits/historial/${usuariObj.id}`)
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
        <main className="flex-grow-1 d-flex justify-content-center align-items-center">
          <h4>Carregant perfil...</h4>
        </main>
      </Container>
    );
  }

  if (!usuari) {
    return (
      <Container fluid className="min-vh-100 d-flex p-0">
        <Lateral />
        <main className="flex-grow-1 d-flex flex-column justify-content-center align-items-center text-center px-3">
          <h5>No s'ha trobat informació de l'usuari.</h5>
          <Button href="/login" variant="primary" className="mt-3 px-4 py-2">
            Iniciar sessió
          </Button>
        </main>
      </Container>
    );
  }

  return (
    <Container fluid className="min-vh-100 d-flex p-0 mb-5 mb-md-0">
      <Lateral />
      <main className="flex-grow-1 d-flex justify-content-center align-items-center px-3 py-5">
        <Card className="shadow-lg rounded-4 p-4 w-100" style={{ maxWidth: '900px' }}>
          <h2 className="mb-4 text-center fw-bold display-5">
            Perfil d'usuari
          </h2>

          <Row className="gy-4">
            <Col xs={12} md={6} className="border-md-end pe-md-4">
              <h5 className="mb-3 fw-semibold">Informació personal</h5>
              <p className="fs-5"><strong>Nom:</strong> {usuari.nom || usuari.name || 'N/D'}</p>
              <p className="fs-5"><strong>Email:</strong> {usuari.correu_electronic || 'N/D'}</p>
              <p className="fs-5"><strong>Edat:</strong> {usuari.edat || 'N/D'}</p>
            </Col>

            <Col xs={12} md={6} className="ps-md-4">
              <h5 className="mb-3 fw-semibold">Estadístiques</h5>
              <p className="fs-5">
                <strong>Total partits disputats:</strong> {partitsDisputatsCount}
              </p>
            </Col>
          </Row>

          <div className="text-center mt-5">
            <Button
              variant="primary"
              size="lg"
              href="/editar-perfil"
              className="px-5 py-3 fw-semibold rounded-pill fs-5"
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
