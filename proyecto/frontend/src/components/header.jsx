// src/components/Header.jsx
import React from 'react';
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Para navegación interna
import logo from '../assets/logo.png';

const Header = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary header py-0">
      <Container fluid className='headerifooter'>
        <Navbar.Brand href="#home">
          <img src={logo} className='logo' alt="Logo de fitmach" />
        </Navbar.Brand>
        <Navbar.Toggle className='colorHamburguesa' aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto ">        
              <Nav.Link className='enllaçNav' href="#">Inici</Nav.Link>
              <Nav.Link className='enllaçNav' href="#">Producte</Nav.Link>
              <Nav.Link className='enllaçNav' href="#">Resenyes</Nav.Link>
              <Nav.Link className='enllaçNav' href="#">Sobre Nosaltres</Nav.Link>
              <Nav.Link className='enllaçNav' href="#">Contacta</Nav.Link>
          </Nav>
          <div className="d-flex justify-content-lg-end mt-2 mt-lg-0">
            <Button className='boto mb-4 mb-md-0'>Descarrega</Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
