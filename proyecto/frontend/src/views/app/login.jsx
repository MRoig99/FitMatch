import { useState } from 'react'
import '../../App.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [nom, setNom] = useState('');
  const [cognom, setCognom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [edat, setEdat] = useState('');
  const [success, setSuccess] = useState('');

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginErrors, setLoginErrors] = useState({});
  const [loginGeneralError, setLoginGeneralError] = useState('');

  const navigate = useNavigate();

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const loginSchema = yup.object().shape({
    email: yup.string().email("Email no vàlid").required("El correu és obligatori"),
    password: yup.string().required("La contrasenya és obligatòria"),
  });

  const registerSchema = yup.object().shape({
    nom: yup.string().required("El nom és obligatori"),
    cognom: yup.string().required("El cognom és obligatori"),
    edat: yup.number()
      .typeError("L'edat ha de ser un número")
      .required("L'edat és obligatòria")
      .min(18, "Has de tindre almenys 18 anys"),
    correu_electronic: yup
      .string()
      .email("Email no vàlid")
      .required("El correu electrònic és obligatori"),
    contrasenya: yup
      .string()
      .min(6, "La contrasenya ha de tindre almenys 6 caràcters")
      .required("La contrasenya és obligatòria"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('contrasenya'), null], "Les contrasenyes no coincideixen")
      .required("Confirma la contrasenya"),
  });



  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      nom,
      cognom,
      edat: parseInt(edat),
      contrasenya: password,
      correu_electronic: email,
      confirmPassword,
    };

    try {
      await registerSchema.validate(newUser, { abortEarly: false });

      axios.post('http://localhost:3000/usuarios', newUser)
        .then((response) => {
          setSuccess("Registre completat amb èxit!");
          setErrors({});
          setNom('');
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          setCognom('');
          setEdat('');
          setShowModal(false);
        })
        .catch((error) => {
          console.error("Error en el registre:", error.response?.data || error.message);
          setErrors("Error en el registre. Revisa les dades.");
        });

    } catch (validationError) {
      const fieldErrors = {};
      validationError.inner.forEach((err) => {
        fieldErrors[err.path] = err.message;
      });
      setErrors(fieldErrors);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const credentials = {
      email: loginEmail,
      password: loginPassword,
    };

    try {
      await loginSchema.validate(credentials, { abortEarly: false });

      axios.post('http://localhost:3000/usuarios/login', credentials)
        .then((response) => {
          console.log("Sessió iniciada:", response.data);
          localStorage.setItem('usuari', JSON.stringify(response.data.usuari));
          navigate('/busca'); 
          setLoginErrors({});
          setLoginGeneralError('');
        })
        .catch((error) => {
          console.error("Error iniciant sessió:", error.response?.data || error.message);
          setLoginGeneralError("Error iniciant sessió. Credencials incorrectes.");
        });

    } catch (validationError) {
      const fieldErrors = {};
      validationError.inner.forEach((err) => {
        fieldErrors[err.path] = err.message;
      });
      setLoginErrors(fieldErrors);
    }
  };



  return (
    <>
      <Container fluid className='fonsIniciSessio'>
        <Row className="d-flex align-items-center justify-content-center vh-100">
          <Col className='d-flex justify-content-center contenidorAmbFormulari'>
              <Form onSubmit={handleLoginSubmit} className='formulari'>
                <Card className='rounded-4 colorPrincipal colorText cardForm'>
                  <Card.Body>
                    <Card.Title className='text-center fs-2'>Inicia Sessió</Card.Title>

                    <Form.Group className="mb-3" controlId="loginEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                      />
                      {loginErrors.email && <small className="text-danger">{loginErrors.email}</small>}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="loginPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                      />
                      {loginErrors.password && <small className="text-danger">{loginErrors.password}</small>}
                    </Form.Group>

                    {loginGeneralError && <p className="text-danger text-center">{loginGeneralError}</p>}

                    <div className='d-flex justify-content-center'>
                      <Button className='boto mt-3' variant="primary" type="submit">
                        Inicia Sessió
                      </Button>
                    </div>

                    <a onClick={handleOpenModal} className='d-flex justify-content-center pt-2 colorText' style={{ cursor: 'pointer' }}>
                      No tens compte? Registrat
                    </a>
                  </Card.Body>
                </Card>
              </Form>
          </Col>
        </Row>
      </Container>

      
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton className='colorPrincipal colorText'>
          <Modal.Title className='fs-2 w-100 text-center'>Registra't</Modal.Title>
        </Modal.Header>
        <Modal.Body className='colorPrincipal colorText modalBodyResponsive'>
          {success && <p className="text-success text-center">{success}</p>}
          <Form onSubmit={handleRegisterSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                placeholder="Introdueix el teu nom"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
              />
              {errors.nom && <small className="text-danger">{errors.nom}</small>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicSurname">
              <Form.Label>Cognom</Form.Label>
              <Form.Control
                type="text"
                placeholder="Introdueix el teu cognom"
                value={cognom}
                onChange={(e) => setCognom(e.target.value)}
              />
              {errors.cognom && <small className="text-danger">{errors.cognom}</small>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicAge">
              <Form.Label>Edat</Form.Label>
              <Form.Control
                type="number"
                placeholder="Introdueix la teua edat"
                value={edat}
                onChange={(e) => setEdat(e.target.value)}
              />
              {errors.edat && <small className="text-danger">{errors.edat}</small>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmailRegister">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Introdueix el teu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.correu_electronic && <small className="text-danger">{errors.correu_electronic}</small>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPasswordRegister">
              <Form.Label>Contrasenya</Form.Label>
              <Form.Control
                type="password"
                placeholder="Contrasenya"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.contrasenya && <small className="text-danger">{errors.contrasenya}</small>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formConfirmPassword">
              <Form.Label>Confirma la contrasenya</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirma la contrasenya"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {errors.confirmPassword && <small className="text-danger">{errors.confirmPassword}</small>}
            </Form.Group>

            <div className='d-flex justify-content-center'>
              <Button variant="primary" type="submit" className='boto'>
                Registrar-se
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default App;
