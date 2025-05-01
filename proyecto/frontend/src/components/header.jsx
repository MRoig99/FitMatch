// src/components/Header.jsx
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Para navegación interna
import logo from '../assets/logo.png';

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" fixed="top">
      <Container fluid>
        <Navbar.Brand className='d-flex'>
            <img src={logo} alt="FitMatch Logo"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto ">
                    <Nav.Link className='text-white fs-6' as={Link} to="/">Inici</Nav.Link>
                    <Nav.Link className='text-white fs-6' as={Link} to="/producte">Producte</Nav.Link>
                    <Nav.Link className='text-white fs-6' as={Link} to="/contact">Resenyes</Nav.Link>
                    <Nav.Link className='text-white fs-6' as={Link} to="/login">Sobre nosaltres</Nav.Link>
                    <Nav.Link className='text-white fs-6' as={Link} to="/app/dashboard">Contacte</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar.Brand>
        <Navbar.Brand className='d-flex'>
            <button className='bg-primary rounded-2 fs-6'>Descarregar</button>
        </Navbar.Brand>    
      </Container>
    </Navbar>
  );
};

export default Header;
