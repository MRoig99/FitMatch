import React from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

import Header from '../../components/header';
import Footer from '../../components/footer';
import paddelImg from '../../assets/paddel.jpg';
import futbolImg from '../../assets/futbol.jpg';
import basketImg from '../../assets/basket.jpg';
import tenisImg from '../../assets/tenis.jpg';

function Home() {
  return (
    <>
      <Header />

      <main className="bg-light text-dark min-vh-100 d-flex flex-column">

        <div className="bg-primary text-light py-5 text-center">
          <Container>
            <Row className="justify-content-center">
              <Col xs={12} md={10} lg={8}>
                <h1 className="fw-bold display-5 mb-3">
                  Connecta amb esportistes com tu i crea partits fàcilment
                </h1>
                <p className="lead mb-4">
                  Troba esdeveniments esportius prop de tu o crea els teus propis amb FitMatch. Tant si ets expert com si acabes de començar, sempre hi ha un lloc per a tu.
                </p>
                <div className="d-flex justify-content-center">
                  <Button variant="success" size="lg" className="rounded-pill px-4 fw-semibold btn-fitmatch">
                    Comença ara!
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </div>

        <div className="py-5">
          <Container>
            <Row className="justify-content-center">
              <Col xs={12} md={10} lg={8} className="text-center">
                <h2 className="fw-bold mb-4 text-primary">Què és FitMatch?</h2>
                <p className="fs-5 mx-auto mb-3">
                  FitMatch és la plataforma definitiva per a esportistes que volen connectar, organitzar i gaudir d'esdeveniments esportius de manera fàcil i flexible. Tant si busques unir-te a un partit de futbol, un torneig de bàsquet o provar esports nous, FitMatch t'ofereix totes les eines perquè puguis fer-ho sense complicacions.
                </p>
                <p className="fs-5 mx-auto">
                  La nostra missió és fomentar una comunitat esportiva activa i diversa, on qualsevol persona pugui trobar un espai per practicar i gaudir de l'esport en companyia.
                </p>
              </Col>
            </Row>
          </Container>
        </div>

        <div className="py-5 bg-white">
          <Container>
            <h2 className="fw-bold mb-5 text-center text-primary">Beneficis d'utilitzar FitMatch</h2>
            <Row className="gy-4 justify-content-center">
              <Col xs={12} md={4}>
                <div className="p-4 rounded-3 shadow-sm h-100 bg-light d-flex flex-column align-items-center">
                  <div className="fs-1 mb-3">⚡</div>
                  <h3 className="fw-bold mb-2 text-success">Ràpid i senzill</h3>
                  <p className="text-muted text-center">
                    Crear partits, fer reserves i gestionar el teu historial esportiu mai ha estat tan fàcil. Amb FitMatch, tot està a només uns clics de distància, sense complicacions ni tràmits interminables.
                  </p>
                </div>
              </Col>
              <Col xs={12} md={4}>
                <div className="p-4 rounded-3 shadow-sm h-100 bg-light d-flex flex-column align-items-center">
                  <div className="fs-1 mb-3">🤝</div>
                  <h3 className="fw-bold mb-2 text-success">Per a tothom</h3>
                  <p className="text-muted text-center">
                    Tant si ets un atleta experimentat com si només comences, FitMatch t'ajuda a trobar partits i esdeveniments adaptats al teu nivell i interessos, sense importar el tipus d'esport que prefereixis.
                  </p>
                </div>
              </Col>
              <Col xs={12} md={4}>
                <div className="p-4 rounded-3 shadow-sm h-100 bg-light d-flex flex-column align-items-center">
                  <div className="fs-1 mb-3">📅</div>
                  <h3 className="fw-bold mb-2 text-success">Gestió completa</h3>
                  <p className="text-muted text-center">
                    Organitza la teva agenda esportiva, fes seguiment de les teves partides, i comunica't amb els altres participants de manera àgil i eficient des d'una única plataforma.
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>

        <div className="py-5">
          <Container>
            <h2 className="fw-bold mb-5 text-center text-primary">Com funciona FitMatch?</h2>
            <Row className="gy-4 justify-content-center">
              <Col xs={12} md={4}>
                <h4 className="fw-semibold text-success mb-3 text-center">1. Explora Esports</h4>
                <p className="text-muted text-center">
                  Navega entre múltiples disciplines esportives, descobreix partits i esdeveniments propers a la teva ubicació.
                </p>
              </Col>
              <Col xs={12} md={4}>
                <h4 className="fw-semibold text-success mb-3 text-center">2. Crea o Uneix-te</h4>
                <p className="text-muted text-center">
                  Organitza el teu propi partit o inscriu-te en qualsevol esdeveniment que t'interessi. Controla qui hi participa i mantingues la teva agenda actualitzada.
                </p>
              </Col>
              <Col xs={12} md={4}>
                <h4 className="fw-semibold text-success mb-3 text-center">3. Gaudeix i Connecta</h4>
                <p className="text-muted text-center">
                  Comparteix moments esportius amb altres apassionats, crea noves amistats i participa en la comunitat activa de FitMatch.
                </p>
              </Col>
            </Row>
          </Container>
        </div>

        <div className="py-5 bg-info bg-opacity-10">
          <Container>
            <h2 className="text-center text-success fw-bold mb-5">Esports Destacats</h2>
            <Row xs={1} sm={2} md={4} className="g-4 justify-content-center">

              <Col className="d-flex">
                <div className="card shadow-sm rounded-3 border-0 cursor-pointer card-fitmatch flex-fill">
                  <img
                    src={futbolImg}
                    alt="Futbol"
                    className="card-img-top"

                  />
                  <div className="card-body p-3">
                    <h5 className="card-title text-dark fw-semibold">Futbol</h5>
                    <p className="card-text text-secondary">
                      Partits amistosos i tornejos locals de futbol 7 i futbol 11.
                    </p>
                  </div>
                </div>
              </Col>

              <Col className="d-flex">
                <div className="card shadow-sm rounded-3 border-0 cursor-pointer card-fitmatch flex-fill">
                  <img
                    src={basketImg}
                    alt="Bàsquet"
                    className="card-img-top"

                  />
                  <div className="card-body p-3">
                    <h5 className="card-title text-dark fw-semibold">Bàsquet</h5>
                    <p className="card-text text-secondary">
                      Unió amb altres aficionats per a entrenaments i competicions.
                    </p>
                  </div>
                </div>
              </Col>

              <Col className="d-flex">
                <div className="card shadow-sm rounded-3 border-0 cursor-pointer card-fitmatch flex-fill">
                  <img
                    src={paddelImg}
                    alt="Pàdel"
                    className="card-img-top"

                  />
                  <div className="card-body p-3">
                    <h5 className="card-title text-dark fw-semibold">Pàdel</h5>
                    <p className="card-text text-secondary">
                      Organitza partits ràpids i reserva pistes a prop teu.
                    </p>
                  </div>
                </div>
              </Col>

              <Col className="d-flex">
                <div className="card shadow-sm rounded-3 border-0 cursor-pointer card-fitmatch flex-fill">
                  <img
                    src={tenisImg}
                    alt="Tenis"
                    className="card-img-top"

                  />
                  <div className="card-body p-3">
                    <h5 className="card-title text-dark fw-semibold">Tenis</h5>
                    <p className="card-text text-secondary">
                      Connecta amb jugadors del teu nivell i gaudeix del joc.
                    </p>
                  </div>
                </div>
              </Col>

            </Row>
          </Container>
        </div>

        <div className="py-5 bg-white">
          <Container>
            <h2 className="fw-bold mb-5 text-center text-primary">Opinions dels usuaris</h2>
            <Row className="gy-4 justify-content-center">

              <Col xs={12} md={4}>
                <div className="p-4 rounded-3 shadow-sm h-100 bg-light">
                  <p className="fst-italic text-secondary">
                    &quot;FitMatch m’ha ajudat a connectar amb gent per jugar a bàsquet cada setmana. Molt fàcil d’utilitzar!&quot;
                  </p>
                  <p className="fw-semibold text-primary mb-0 text-end">— Laura P.</p>
                </div>
              </Col>

              <Col xs={12} md={4}>
                <div className="p-4 rounded-3 shadow-sm h-100 bg-light">
                  <p className="fst-italic text-secondary">
                    &quot;Organitzar partits de pàdel és ara més senzill que mai. Recomanat 100%.&quot;
                  </p>
                  <p className="fw-semibold text-primary mb-0 text-end">— Marc S.</p>
                </div>
              </Col>

              <Col xs={12} md={4}>
                <div className="p-4 rounded-3 shadow-sm h-100 bg-light">
                  <p className="fst-italic text-secondary">
                    &quot;M’encanta descobrir esports nous i trobar companys amb qui practicar.&quot;
                  </p>
                  <p className="fw-semibold text-primary mb-0 text-end">— Núria R.</p>
                </div>
              </Col>

            </Row>
          </Container>
        </div>

        <div className="py-5">
          <Container>
            <Row className="justify-content-center">
              <Col xs={12} md={8} lg={6} className="text-center">
                <h2 className="fw-bold mb-3">Uneix-te a la comunitat FitMatch</h2>
                <p className="text-secondary mb-4">
                  Rep novetats, ofertes i esdeveniments exclusius directament al teu correu.
                </p>
                <Form>
                  <Row className="g-2 justify-content-center">
                    <Col xs={8}>
                      <Form.Control type="email" placeholder="El teu correu electrònic" />
                    </Col>
                    <Col xs={4}>
                      <Button type="submit" variant="success" className="w-100 fw-semibold btn-fitmatch">
                        Subscriu-te
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Home;
