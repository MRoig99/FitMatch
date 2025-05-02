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
          <img src={logo} alt="Logo de fitmach" />
        </Navbar.Brand>
        <Navbar.Toggle className='colorHamburguesa' aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto ">        
              <Nav.Link className='colorText' href="#">Inici</Nav.Link>
              <Nav.Link className='colorText' href="#">Producte</Nav.Link>
              <Nav.Link className='colorText' href="#">Resenyes</Nav.Link>
              <Nav.Link className='colorText' href="#">Sobre Nosaltres</Nav.Link>
              <Nav.Link className='colorText' href="#">Contacta</Nav.Link>
          </Nav>
          <div className="d-flex justify-content-lg-end mt-2 mt-lg-0">
            <Button className='boto'>Descarrega</Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
