import { useState } from 'react'
import '../../App.css'
import { Container, Row, Col, Button, Carousel } from 'react-bootstrap';

import Header from '../../components/header';
import Footer from '../../components/footer'
import Futbol from '../../assets/futbol.jpg'
import Basket from '../../assets/basket.jpg'
import Paddel from '../../assets/paddel.jpg'
import Tenis from '../../assets/tenis.jpg'
import fons from '../../assets/fotoPrincipal.png'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>   
    <Header />  

    <Container className='fons contenedorPrincipal'>    
      <Row className="d-flex">        
        <Col className='p-0'>
          <div className='pt-5 me-2 d-flex justify-content-end'>
            <div className='bg-black p-5 tamanyInici rounded-4'>
              <h6 className='text-white lh-lg pb-5'>
                Descobreix partits a prop teu, crea esdeveniments esportius personalitzats i connecta amb altres apassionats de l'esport
                de tots els nivells. No importa si ets un expert o estàs començant, amb FitMatch sempre trobaràs un lloc per jugar.
              </h6>
              <div className='pt-5'>
                <Button className='boto mb-4' variant="secondary" type="submit">
                  Comença ara!
                </Button>
              </div>
            </div>         
          </div>
        </Col>
        <Col className='p-0'>
          <div className='ps-4 pt-5'>
            <div>
              <img className='rounded-4 tamanyInici' src={fons} alt="FitMatch Logo"/>
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
          <div className='d-flex justify-content-center align-items-center'>
            <Carousel className='d-flex justify-content-center'>
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
    </Container> 

      
      
    </>
  )
}

export default App
