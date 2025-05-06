// src/components/Header.jsx
import React from 'react';
import {Col} from 'react-bootstrap';
import { BsSearch, BsPlusCircle, BsClockHistory, BsPerson, BsBoxArrowRight } from 'react-icons/bs';

import { Link } from 'react-router-dom'; // Para navegación interna
import ListGroup from 'react-bootstrap/ListGroup';

const Header = () => {
  return (
     
        <Col xs="2" className='border border-black colorPrincipal p-0'>
        <ListGroup className='menuLateral'>
          <ListGroup.Item className='colorPrincipal colorText border border-0 border-bottom elementoLista d-flex align-items-center'>
            <a href="#" className='colorText text-decoration-none'>
              <BsSearch className='me-2' />Busca partit
            </a>      
          </ListGroup.Item>
          <ListGroup.Item className='colorPrincipal colorText border border-0 border-bottom elementoLista py-0 d-flex align-items-center '> 
            <a href="#" className='colorText text-decoration-none'>
              <BsPlusCircle className='me-2' />Crear Partit
            </a>        
          </ListGroup.Item>
          <ListGroup.Item className='colorPrincipal colorText border border-0 border-bottom elementoLista py-0 d-flex align-items-center'>
            <a href="#" className='colorText text-decoration-none'>
              <BsClockHistory className='me-2' />Historial
            </a>        
          </ListGroup.Item>
          <ListGroup.Item className='colorPrincipal colorText border border-0 border-bottom elementoLista py-0 d-flex align-items-center'>
            <a href="#" className='colorText text-decoration-none'>
              <BsPerson className='me-2' />Perfil
            </a>
          </ListGroup.Item>
          <ListGroup.Item className='colorPrincipal border border-0 border-bottom elementoLista py-0 d-flex align-items-center'>
            <a href="#" className='colorText text-decoration-none'>
              <BsBoxArrowRight className='me-2' />Tanca Sessió
            </a>        
          </ListGroup.Item>
        </ListGroup>
        </Col>
      
    
  );
};

export default Header;
