import React from 'react';
import { BsSearch, BsPlusCircle, BsClockHistory, BsPerson, BsBoxArrowRight } from 'react-icons/bs';
import { Col } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';

const Lateral = () => {
  return (
    <>
      <Col xs="2" className='border border-black colorPrincipal p-0 d-md-block d-none'>
        <ListGroup className='menuLateral'>
          <a href="/busca" className='colorText text-decoration-none'>
            <ListGroup.Item className='colorPrincipal colorText border border-0 border-bottom elementoLista d-flex align-items-center'>
              <BsSearch className='me-2' />Busca partit
            </ListGroup.Item>
          </a>
          <a href="/crea" className='colorText text-decoration-none'>
            <ListGroup.Item className='colorPrincipal colorText border border-0 border-bottom elementoLista py-0 d-flex align-items-center'>
              <BsPlusCircle className='me-2' />Crear Partit
            </ListGroup.Item>
          </a>
          <a href="/historial" className='colorText text-decoration-none'>
            <ListGroup.Item className='colorPrincipal colorText border border-0 border-bottom elementoLista py-0 d-flex align-items-center'>
              <BsClockHistory className='me-2' />Historial
            </ListGroup.Item>
          </a>
          <a href="/perfil" className='colorText text-decoration-none'>
            <ListGroup.Item className='colorPrincipal colorText border border-0 border-bottom elementoLista py-0 d-flex align-items-center'>
              <BsPerson className='me-2' />Perfil
            </ListGroup.Item>
          </a>
          <a href="/login" className='colorText text-decoration-none'>
            <ListGroup.Item className='colorPrincipal colorText border border-0 border-bottom elementoLista py-0 d-flex align-items-center'>
              <BsBoxArrowRight className='me-2' />Tanca Sessió
            </ListGroup.Item>
          </a>
        </ListGroup>
      </Col>

      <div className='d-md-none d-flex justify-content-around align-items-center fixed-bottom menuMobil colorPrincipal py-2'>
        <a href="/busca" className='colorText d-flex flex-column align-items-center'>
          <BsSearch size={24} />
          <span className="menuText">Buscar</span>
        </a>
        <a href="/crea" className='colorText d-flex flex-column align-items-center'>
          <BsPlusCircle size={24} />
          <span className="menuText">Crear</span>
        </a>
        <a href="/historial" className='colorText d-flex flex-column align-items-center'>
          <BsClockHistory size={24} />
          <span className="menuText">Historial</span>
        </a>
        <a href="/perfil" className='colorText d-flex flex-column align-items-center'>
          <BsPerson size={24} />
          <span className="menuText">Perfil</span>
        </a>
        <a href="/login" className='colorText d-flex flex-column align-items-center'>
          <BsBoxArrowRight size={24} />
          <span className="menuText">Sortir</span>
        </a>
      </div>
    </>
  );
};

export default Lateral;
