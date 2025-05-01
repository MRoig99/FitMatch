// src/components/Header.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import logo from '../assets/logo.png';
import '../App.css';


const Header = () => {
  return (
    
      <Container fluid className='bg-dark text-white'>
        <Row className='pt-4'>
          <Col className='m-0 mt-4 p-0'>
            <div className='text-center d-flex justify-content-center'>
              <div className=''>
                <a href="#">
                  <img className='logoFooter' src={logo} alt="FitMatch Logo"/>
                </a>          
              </div>       
            </div>
          </Col>
          <Col>
            <div className='text-center pb-4'>
                <h5 className='text-white'>Contacta'ns</h5>
            </div>
            <div className='d-flex justify-content-center'>
              <div className=' ps-4'>
                <p>+34 685647362</p>
                <p>P/ Vicent García Nº 34</p>
                <p>fitmatch@gmail.com</p>
              </div>         
            </div>
          </Col>
          <Col>
            <div className='text-center pb-4'>
                <h5 className='text-white'>Legal</h5>
            </div>
            <div className='d-flex justify-content-center '>
              <div className=' ps-4 d-flex flex-column gap-3'>
                <a className='text-decoration-none text-white' href='#'>Política de cookies</a>
                <a className='text-decoration-none text-white' href='#'>Condicions d'ús</a>
                <a className='text-decoration-none text-white' href='#'>Política de privacitat</a>
              </div>         
            </div>
          </Col>
        </Row>   
      </Container>
  );
};

export default Header;
