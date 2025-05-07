import { useState } from 'react'
import '../../App.css'
import { Container, Row, Col, Button, Carousel, Card } from 'react-bootstrap';

import Header from '../../components/header';
import Footer from '../../components/footer'
import Futbol from '../../assets/futbol.jpg'
import Basket from '../../assets/basket.jpg'
import Paddel from '../../assets/paddel.jpg'
import Tenis from '../../assets/tenis.jpg'
import fons from '../../assets/fotoPrincipal.png'
import facil from '../../assets/facil.png'
import tots from '../../assets/perTots.png'
import gestio from '../../assets/gestio total.jpg'
import nous from '../../assets/Esports nous.jpg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>   
    <Header />  

    <Container className='fons contenedorPrincipal'>    
      <Row className="d-flex">        
        <Col xs="12" md="6"  className='p-lg-0'>
          <div className='me-lg-2 d-flex justify-content-xs-center justify-content-lg-end'>
            <div className='p-4 p-lg-5 tamanyInici rounded-4 fonsTexts'>
              <h6 className='lh-lg pb-lg-4'>
                Descobreix partits a prop teu, crea esdeveniments esportius personalitzats i connecta amb altres apassionats de l'esport
                de tots els nivells. No importa si ets un expert o estàs començant, amb FitMatch sempre trobaràs un lloc per jugar.
              </h6>
              <div className='pt-4 pt-lg-5'>
                <Button className='boto' variant="secondary" type="submit">
                  Comença ara!
                </Button>
              </div>
            </div>         
          </div>
        </Col>
        <Col xs="12" lg="6">
          <div className='pb-5 mt-3 mt-md-0'>
            <div>
              <img className='rounded-4 tamanyFotos' src={fons} alt="FitMatch Logo"/>
            </div>
          </div>
        </Col>     
      </Row>
      <Row>
        <Col>
          <h2 className='text-center py-5'>Esports Destacats</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className='d-flex justify-content-center align-items-center '>
            <Carousel className='d-flex justify-content-center '>
              <Carousel.Item>
                <img className='rounded-4 tamanyFotosCarrusel' src={Futbol} alt="Grup de xiques celebrant un gol de futbol"/>
                <Carousel.Caption>
                  <h3>Futbol</h3>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img className='rounded-4 tamanyFotosCarrusel' src={Basket} alt="Xics fent un servei de bàsquet"/>
                <Carousel.Caption>
                  <h3>Bàsquet</h3>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img className='rounded-4 tamanyFotosCarrusel' src={Paddel} alt="Xic fent un remat de pàdel"/>
                <Carousel.Caption>
                  <h3>Pàdel</h3>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img className='rounded-4 tamanyFotosCarrusel' src={Tenis} alt="Persona fent un servei de tenis"/>
                <Carousel.Caption>
                  <h3>Tenis</h3>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2 className='text-center py-5'>Beneficis d'utilitzar FitMatch</h2>
        </Col>
      </Row>
      <Row>
        <Col className='d-flex justify-content-center'>
          <div>
            <Card className='p-0 border border-black fonsTexts card'>
              <Card.Img variant="top" src={facil} />
              <Card.Body className='fonsTexts'>
                <Card.Title className='text-center'>Fàcil i ràpid</Card.Title>
                <Card.Text className='text-center px-4'>
                  Crea partits, fes reserves i porta el teu historial esportiu.
                </Card.Text>
              </Card.Body>
            </Card>     
          </div>    
        </Col>
        <Col className='d-flex justify-content-center'>
          <div>
            <Card className='p-0 border border-black card mt-4 mt-md-0'>
              <Card.Img variant="top" src={tots} />
              <Card.Body className='fonsTexts'>
                <Card.Title className='text-center'>Per a tots</Card.Title>
                <Card.Text className='text-center px-4'>
                  Crea partits, fes reserves i porta el teu historial esportiu.
                </Card.Text>
              </Card.Body>
            </Card>     
          </div> 
        </Col>
        <Col className='d-flex justify-content-center'>
          <div>
            <Card className='p-0 border border-black card mt-4 mt-md-0'>
              <Card.Img variant="top" src={gestio} />
              <Card.Body className='fonsTexts'>
                <Card.Title className='text-center'>Gestió total</Card.Title>
                <Card.Text className='text-center px-4'>
                  Crea partits, fes reserves i porta el teu historial esportiu.
                </Card.Text>
              </Card.Body>
            </Card>    
          </div> 
        </Col>
      </Row>

      <Row>
        <Col>
          <h2 className='text-center py-5'>Descobreix esports nous</h2>
        </Col>
      </Row>

      <Row>
        <Col xs="12" lg="6" className='p-md-0'>
          <div className='me-md-2 d-flex justify-content-end'>
            <div className='p-md-5 tamanyInici rounded-4 p-3 fonsTexts h-auto'>
              <h6 className='lh-lg px-4 pb-5'>
              A FitMatch, no només podràs unir-te als teus esports preferits, sinó també descobrir noves disciplines que podrien apassionar-te. Amb la nostra plataforma, tindràs l’oportunitat de connectar amb altres persones que comparteixen els teus interessos, ja sigui per trobar companys d’entrenament, formar equips o simplement gaudir d’una activitat física en bona companyia. 
              </h6>
            </div>         
          </div>
        </Col>
        <Col xs="12" lg="6">
          <div className='pb-5 mt-3 mt-md-0'>
            <div>
              <img className='rounded-4 tamanyFotos' src={nous} alt="FitMatch Logo"/>
            </div>
          </div>
        </Col>
      </Row>
    </Container> 

    <Footer />
      
    </>
  )
}

export default App
