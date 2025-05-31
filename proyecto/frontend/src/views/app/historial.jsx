import React, { useState, useEffect } from 'react';
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
  const ITEMS_PER_PAGE = 5;

  const [usuariId, setUsuariId] = useState(null);
  const [tabActivo, setTabActivo] = useState('disputados');
  const [partidosDisputados, setPartidosDisputados] = useState([]);
  const [partidosCreados, setPartidosCreados] = useState([]);
  const [page, setPage] = useState(1);

  const [showModalResultat, setShowModalResultat] = useState(false);
  const [partitSeleccionado, setPartitSeleccionado] = useState(null);
  const [resultatInput, setResultatInput] = useState('');

  const formatDate = (dateString) => {
    const d = new Date(dateString);
    return d.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  // Leer usuariId del localStorage
  useEffect(() => {
    const usuariString = localStorage.getItem('usuari');
    if (usuariString) {
      try {
        setUsuariId(JSON.parse(usuariString).id);
      } catch {}
    }
  }, []);

  // Carga datos cuando cambian pestaña o usuario
  useEffect(() => {
    if (!usuariId) return;
    setPage(1);

    if (tabActivo === 'disputados') {
      axios
        .get(`http://localhost:3000/partits/historial/${usuariId}`)
        .then((res) => setPartidosDisputados(res.data))
        .catch(() => setPartidosDisputados([]));
    } else {
      // Usamos la ruta "mis-partidos"
      axios
        .get(`http://localhost:3000/partits/mis-partidos/${usuariId}`)
        .then((res) => setPartidosCreados(res.data))
        .catch(() => setPartidosCreados([]));
    }
  }, [usuariId, tabActivo]);

  const cancelarPartido = async (p) => {
    try {
      if (p.id_usuari_creador === usuariId) {
        const { data: [reserva] } = await axios.get(
          `http://localhost:3000/reserves/partit/${p.id}`
        );
        if (!reserva) throw new Error();

        await axios.patch(
          `http://localhost:3000/reserves/${reserva.id}`,
          { estat: 'cancelada' }
        );
        // 2. Actualitzar estat del partit a "cancelado"
        await axios.patch(
          `http://localhost:3000/partits/${p.id}`,
          { estat: 'cancelado' }
        );
        console.log(p);
        
        if (p.id_pista) {
          await axios.patch(
            `http://localhost:3000/pistas/${p.id_pista}`,
            { disponibilitat: true }
          );
        }
        alert('Partit cancel·lat correctament i pista disponible.');
        // 4. Refrescar llista de "Mis partidos"
        const { data } = await axios.get(
          `http://localhost:3000/partits/mis-partidos/${usuariId}`
        );
        setPartidosCreados(data);
      } else {
        // Usuario normal se "da de baja"
        await axios.delete('http://localhost:3000/usuariPartit', {
          params: { id_usuari: usuariId, id_partit: p.id },
        });
        // Decrementar participants
        await axios.post(
          `http://localhost:3000/partits/${p.id}/decrementParticipants`
        );
        alert('T’has donat de baixa del partit.');
        // Refrescar “Mis partidos”
        const { data } = await axios.get(
          `http://localhost:3000/partits/mis-partidos/${usuariId}`
        );
        setPartidosCreados(data);
      }
    } catch (e) {
      console.error(e);
      alert('Error al processar la cancel·lació o baixa.');
    }
  };

  // Abrir modal para introducir resultado
  const abrirModalResultado = (p) => {
    setPartitSeleccionado(p);
    setResultatInput('');
    setShowModalResultat(true);
  };

  // Confirmar resultado (sólo creador)
  const confirmarResultado = async () => {
    if (!resultatInput.trim()) {
      return alert('Introdueix un resultat vàlid.');
    }
    try {
      await axios.patch(
        `http://localhost:3000/partits/${partitSeleccionado.id}`,
        { resultat: resultatInput.trim(), estat: 'finalizado' }
      );
      alert('Resultat guardat correctament.');
      setShowModalResultat(false);
      // Refrescar “Mis partidos”
      const { data } = await axios.get(
        `http://localhost:3000/partits/mis-partidos/${usuariId}`
      );
      setPartidosCreados(data);
    } catch {
      alert('Error guardant el resultat.');
    }
  };

  // Paginación
  const lista = tabActivo === 'disputados' ? partidosDisputados : partidosCreados;
  const totalPages = Math.ceil(lista.length / ITEMS_PER_PAGE);
  const startIdx = (page - 1) * ITEMS_PER_PAGE;
  const paged = lista.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  return (
    <Container fluid className="pb-5">
      <Row className="full-height">
        <Lateral />
        <Col md={1} />
        <Col xs={12} md={8}>
          {/* Pestañas */}
          <div className="d-flex mb-3">
            <Button
              className="me-2 flex-fill"
              variant={tabActivo === 'disputados' ? 'primary' : 'outline-secondary'}
              onClick={() => setTabActivo('disputados')}
            >
              Historial
            </Button>
            <Button
              className="flex-fill"
              variant={tabActivo === 'creados' ? 'primary' : 'outline-secondary'}
              onClick={() => setTabActivo('creados')}
            >
              Mis partidos
            </Button>
          </div>

          {/* Listado paginado */}
          <Row className="gy-3">
            {paged.length === 0 && (
              <Col xs={12}>
                <p className="p-3 text-center">
                  {tabActivo === 'disputados'
                    ? 'No hi ha partits disputats.'
                    : 'No has creat ni t’has unit a partits pendents.'}
                </p>
              </Col>
            )}
            {paged.map((p) => {
              const ts = new Date(p.fecha).getTime();
              const now = Date.now();

              // Determinar si el current user es creador
              const isCreator = p.id_usuari_creador === usuariId;
              // Solo creador puede cancelar si es futuro
              const canCancel = isCreator && p.estat === 'pendent' && ts > now;
              // Solo creador puede finalizar si han pasado ≥ 1.5h
              const canFinish =
                isCreator && p.estat === 'pendent' && now - ts >= 1.5 * 3600e3;
              // Si no es creator y está pendiente, puede "darse de baja"
              const canUnjoin = !isCreator && p.estat === 'pendent';

              return (
                <Col xs={12} key={p.id}>
                  <Card className="w-100 shadow-sm">
                    <Card.Body className="d-flex flex-column flex-md-row justify-content-between">
                      <div>
                        {tabActivo === 'disputados' && (
                          <p>
                            <strong>Nom:</strong> {p.nom}
                          </p>
                        )}
                        <p>
                          <strong>Data:</strong> {formatDate(p.fecha)}
                        </p>
                        {tabActivo === 'disputados' ? (
                          <p>
                            <strong>Resultat:</strong> {p.resultado}
                          </p>
                        ) : (
                          <>
                            <p>
                              <strong>Resultat:</strong> {p.resultado || 'Pendents'}
                            </p>
                            <p>
                              <strong>Esport:</strong> {p.deporte}
                            </p>
                          </>
                        )}
                      </div>
                      {tabActivo === 'creados' && (
                        <div className="mt-3 mt-md-0">
                          {canCancel && (
                            <Button
                              variant="danger"
                              className="me-2"
                              onClick={() => cancelarPartido(p)}
                            >
                              Cancelar
                            </Button>
                          )}
                          {canFinish && (
                            <Button
                              variant="success"
                              onClick={() => abrirModalResultado(p)}
                            >
                              Finalizar
                            </Button>
                          )}
                          {canUnjoin && (
                            <Button
                              variant="warning"
                              onClick={() => cancelarPartido(p)}
                            >
                              Donar-me de baixa
                            </Button>
                          )}
                        </div>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>

          {/* Paginación (móvil, completa ancho) */}
          {totalPages > 1 && (
            <Row className="mt-4 mb-5">
              <Col xs={4} className="px-1">
                <Button
                  className="w-100"
                  variant="outline-primary"
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                >
                  Anterior
                </Button>
              </Col>
              <Col xs={4} className="px-1">
                <Button className="w-100" variant="light" disabled>
                  {page} / {totalPages}
                </Button>
              </Col>
              <Col xs={4} className="px-1">
                <Button
                  className="w-100"
                  variant="outline-primary"
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                >
                  Següent
                </Button>
              </Col>
            </Row>
          )}

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
                  placeholder="3-1"
                  value={resultatInput}
                  onChange={(e) => setResultatInput(e.target.value)}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowModalResultat(false)}
              >
                Cancelar
              </Button>
              <Button variant="primary" onClick={confirmarResultado}>
                Guardar
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
        <Col md={1} />
      </Row>
    </Container>
  );
}

export default Historial;
