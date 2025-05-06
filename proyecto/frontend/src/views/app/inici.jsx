import { useState } from 'react'
import '../../App.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Lateral from '../../components/lateral'




function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>

      <Container fluid>
        <Row>
          <Lateral/>
          
        </Row>
      </Container>
    </>
  )
}

export default App;
