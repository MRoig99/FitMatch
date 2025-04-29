import { useState } from 'react'
import '../../App.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Header from '../../components/header';
import Footer from '../../components/footer'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Container fluid className='fons'>
        <Row className="d-flex align-items-center justify-content-center vh-100">
          <Col>
            <div className='d-flex justify-content-center'>
            <Header /> 
              <Card className='rounded-4 formulari' style={{ width: '25rem' }}>
                <Card.Body>
                  <Card.Title className='text-center fs-2'>FitMatch</Card.Title>
                  <div>
                    <Card.Text>
                    <Form>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                      </Form.Group>
                      <div className='d-flex justify-content-center'>
                      </div>     
                      <a href="#" className='d-flex justify-content-center pt-2 text-black'>No tens compte? Registrat</a> 
                      </Form>
                    </Card.Text>
                  </div>
                </Card.Body>
              </Card>
            </div>
            <Footer /> 
          </Col>
        </Row>
      </Container> 
    </>
  )
}

export default App
