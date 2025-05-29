import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Modal,
  Form,
} from 'react-bootstrap';
import Lateral from '../../components/lateral';

function Historial() {
  const [usuariId, setUsuariId] = useState(null);
  const [tabActivo, setTabActivo] = useState('disputados');
  const [partidosDisputados, setPartidosDisputados] = useState([]);
  const [partidosCreados, setPartidosCreados] = useState([]);
  const [showModalResultat, setShowModalResultat] = useState(false);
  const [partitSeleccionado, setPartitSeleccionado] = useState(null);
  const [resultatInput, setResultatInput] = useState('');

  // Leer usuariId de localStorage
  useEffect(() => {
    const usuariString = localStorage.getItem('usuari');
    if (usuariString) {
      try {
        const usuariObj = JSON.parse(usuariString);
        setUsuariId(usuariObj.id);
      } catch (e) {
        console.error('Error parsejant usuari de localStorage', e);
      }
    }
  }, []);

  // Cargar partits según tabActivo y usuariId
  useEffect(() => {
    if (!usuariId) return;

    if (tabActivo === 'disputados') {
      axios
        .get(`http://localhost:3000/partits/historial/${usuariId}`)
        .then((res) => setPartidosDisputados(res.data))
        .catch(() => setPartidosDisputados([]));
    } else {
      axios
        .get(`http://localhost:3000/partits/creados/${usuariId}`)
        .then((res) => setPartidosCreados(res.data))
        .catch(() => setPartidosCreados([]));
    }
  }, [usuariId, tabActivo]);

  // Cancel·lar partit: alliberar reserva, pista i posar estat a cancel·lat
  const cancelarPartido = async (partit) => {
    try {
      const resReserva = await axios.get(`http://localhost:3000/reserves/partit/${partit.id}`);
      const reserva = resReserva.data[0];
      if (!reserva) throw new Error('Reserva no trobada');
      await axios.patch(`http://localhost:3000/reserves/${reserva.id}`, { estat: 'cancelada' });
      await axios.patch(`http://localhost:3000/partits/${partit.id}`, { estat: 'cancelado' });

      alert('Partit cancel·lat correctament.');
      const res = await axios.get(`http://localhost:3000/partits/creados/${usuariId}`);
      setPartidosCreados(res.data);
    } catch (error) {
      console.error('Error cancel·lant partit:', error);
      alert('Error al cancel·lar el partit.');
    }
  };

  const abrirModalResultado = (partit) => {
    setPartitSeleccionado(partit);
    setResultatInput('');
    setShowModalResultat(true);
  };

  const confirmarResultado = async () => {
    if (!resultatInput.trim()) {
      alert('Introdueix un resultat vàlid.');
      return;
    }
    try {
      await axios.patch(`http://localhost:3000/partits/${partitSeleccionado.id}`, {
        resultat: resultatInput.trim(),
        estat: 'finalizado',
      });
      alert('Resultat actualitzat correctament.');
      setShowModalResultat(false);

      const res = await axios.get(`http://localhost:3000/partits/creados/${usuariId}`);
      setPartidosCreados(res.data);
    } catch (error) {
      console.error('Error actualitzant resultat:', error);
      alert('Error al actualitzar el resultat.');
    }
  };
  
  // Renderizar partidos creados con lógica de fecha y estado
  const renderPartidosCreados = () => {
    if (partidosCreados.length === 0)
      return <p className="p-3 text-center">No has creat partits encara.</p>;

    const now = new Date();
    // Filtrar solo los partidos que el usuario puede cancelar o finalizar
    const relevantes = partidosCreados.filter((partit) => {
      
      const matchDate = new Date(partit.fecha);
      // Pendientes y con fecha futura para cancelar
      if (partit.estat === 'pendent' &&  matchDate > now) return true;
      // En curso, creador y con al menos 1.5h transcurridas para finalizar
      if (
        partit.estat === 'en curs' &&
        (now.getTime() - matchDate.getTime()) >= 1.5 * 60 * 60 * 1000) return true;
      
      return false;
    });

    if (relevantes.length === 0)
      return <p className="p-3 text-center">No hi ha partits pendents o en curs per gestionar.</p>;
  
    return relevantes.map((partit) => {
      console.log(partit);
      const matchDate = new Date(partit.fecha);
      const showCancel = partit.estat === 'en curs';
      const showFinish = partit.estat === 'pendent';

      return (
        <Card
          key={partit.id}
          className="m-3 p-3 shadow-sm w-100 d-flex flex-column flex-md-row justify-content-between align-items-center"
        >
          <div style={{ flex: '1 1 auto' }}>
            <p><strong>Data:</strong> {partit.fecha}</p>
            <p><strong>Pista:</strong> {partit.pista}</p>
            <p><strong>Resultat:</strong> {partit.resultado || 'Pendents'}</p>
            <p><strong>Esport:</strong> {partit.deporte}</p>
          </div>

          <div style={{ minWidth: '180px', marginTop: '1rem' }}>
            {showCancel && (
              <Button variant="danger" onClick={() => cancelarPartido(partit)}>
                Cancelar Partido
              </Button>
            )}
            {showFinish && (
              <Button variant="success" onClick={() => abrirModalResultado(partit)}>
                Finalizar Partido
              </Button>
            )}
          </div>
        </Card>
      );
    });
  };

  return (
    <>
      <Container fluid>
        <Row className="full-height">
          <Lateral />
          <Col md="1"></Col>
          <Col xs="12" md="8">
            <Row className="mt-5">
              <Col>
                <Card
                  className="p-3 d-flex justify-content-center align-items-center"
                  style={{ width: '100%', height: '90%' }}
                >
                  <div className="botones-historial">
                    <Button
                      variant={tabActivo === 'disputados' ? 'primary' : 'secondary'}
                      onClick={() => setTabActivo('disputados')}
                    >
                      Historial
                    </Button>
                    <Button
                      variant={tabActivo === 'creados' ? 'primary' : 'secondary'}
                      onClick={() => setTabActivo('creados')}
                    >
                      Mis partidos
                    </Button>
                  </div>
                </Card>
              </Col>
            </Row>

            <Row className="mt-4">
              <Col>
                <Card
                  style={{
                    width: '100%',
                    minHeight: '300px',
                    maxHeight: '600px',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                  }}
                >
                  {tabActivo === 'disputados' ? (
                    partidosDisputados.length === 0 ? (
                      <p className="p-3 text-center">No hi ha partits disputats.</p>
                    ) : (
                      partidosDisputados.map(({ id, fecha, pista, resultado, deporte }) => (
                        <Card key={id} className="m-3 p-3 shadow-sm">
                          <Row>
                            <Col xs={3}><strong>Data:</strong> {fecha}</Col>
                            <Col xs={3}><strong>Pista:</strong> {pista}</Col>
                            <Col xs={3}><strong>Resultat:</strong> {resultado || 'Pendents'}</Col>
                            <Col xs={3}><strong>Esport:</strong> {deporte}</Col>
                          </Row>
                        </Card>
                      ))
                    )
                  ) : (
                    renderPartidosCreados()
                  )}
                </Card>
              </Col>
            </Row>
          </Col>
          <Col md="1"></Col>
        </Row>

        {/* Modal para introducir resultado */}
        <Modal
          show={showModalResultat}
          onHide={() => setShowModalResultat(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Finalizar Partido</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Resultado</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ejemplo: 3-1"
                value={resultatInput}
                onChange={(e) => setResultatInput(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModalResultat(false)}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={confirmarResultado}>
              Guardar Resultado
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}

export default Historial;