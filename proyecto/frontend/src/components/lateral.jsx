// Header.jsx
import React from 'react';
import { BsSearch, BsPlusCircle, BsClockHistory, BsPerson, BsBoxArrowRight } from 'react-icons/bs';
import { Col } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';

const Header = () => {
  return (
    <>
      {/* Versió Desktop */}
      <Col xs="2" className='border border-black colorPrincipal p-0 d-md-block d-none'>
        <ListGroup className='menuLateral'>
          <ListGroup.Item className='colorPrincipal colorText border border-0 border-bottom elementoLista d-flex align-items-center'>
            <a href="#" className='colorText text-decoration-none'><BsSearch className='me-2' />Busca partit</a>
          </ListGroup.Item>
          <ListGroup.Item className='colorPrincipal colorText border border-0 border-bottom elementoLista py-0 d-flex align-items-center'>
            <a href="#" className='colorText text-decoration-none'><BsPlusCircle className='me-2' />Crear Partit</a>
          </ListGroup.Item>
          <ListGroup.Item className='colorPrincipal colorText border border-0 border-bottom elementoLista py-0 d-flex align-items-center'>
            <a href="#" className='colorText text-decoration-none'><BsClockHistory className='me-2' />Historial</a>
          </ListGroup.Item>
          <ListGroup.Item className='colorPrincipal colorText border border-0 border-bottom elementoLista py-0 d-flex align-items-center'>
            <a href="#" className='colorText text-decoration-none'><BsPerson className='me-2' />Perfil</a>
          </ListGroup.Item>
          <ListGroup.Item className='colorPrincipal border border-0 border-bottom elementoLista py-0 d-flex align-items-center'>
            <a href="#" className='colorText text-decoration-none'><BsBoxArrowRight className='me-2' />Tanca Sessió</a>
          </ListGroup.Item>
        </ListGroup>
      </Col>

      <div className='d-md-none d-flex justify-content-around align-items-center fixed-bottom menuMobil colorPrincipal py-2'>
        <a href="#" className='colorText d-flex flex-column align-items-center'>
          <BsSearch size={24} />
          <span className="menuText">Buscar</span>
        </a>
        <a href="#" className='colorText d-flex flex-column align-items-center'>
          <BsPlusCircle size={24} />
          <span className="menuText">Crear</span>
        </a>
        <a href="#" className='colorText d-flex flex-column align-items-center'>
          <BsClockHistory size={24} />
          <span className="menuText">Historial</span>
        </a>
        <a href="#" className='colorText d-flex flex-column align-items-center'>
          <BsPerson size={24} />
          <span className="menuText">Perfil</span>
        </a>
        <a href="#" className='colorText d-flex flex-column align-items-center'>
          <BsBoxArrowRight size={24} />
          <span className="menuText">Sortir</span>
        </a>
      </div>
    </>
  );
};

export default Header;
