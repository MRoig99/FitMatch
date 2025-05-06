// src/components/Header.jsx
import React from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Para navegación interna
import ListGroup from 'react-bootstrap/ListGroup';

const Header = () => {
  return (
     
        <Col xs="2" className='border border-black colorPrincipal p-0'>
        <ListGroup className='menuLateral'>
          <ListGroup.Item className='colorPrincipal colorText border border-0 border-bottom elementoLista '>
            Busca partit
          </ListGroup.Item>
          <ListGroup.Item className='colorPrincipal colorText border border-0 border-bottom elementoLista'> 
            Crear Partit
          </ListGroup.Item>
          <ListGroup.Item className='colorPrincipal colorText border border-0 border-bottom elementoLista'>
            Historial
          </ListGroup.Item>
          <ListGroup.Item className='colorPrincipal colorText border border-0 border-bottom elementoLista'>
            Perfil
          </ListGroup.Item>
          <ListGroup.Item className='colorPrincipal colorText border border-0 border-bottom elementoLista'>
            Tanca Sessió
          </ListGroup.Item>
        </ListGroup>
        </Col>
      
    
  );
};

export default Header;
