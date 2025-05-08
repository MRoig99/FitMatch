import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import logo from '../assets/logo.png';
import '../App.css';


const Footer = () => {
  return (
    
      <Container fluid className='headerifooter text-white'>
        <Row className='pt-4'>
          <Col md="4" className='m-0 mt-4 p-0'>
            <div className='text-center d-flex justify-content-center'>
              <div className=''>
                <a href="#">
                  <img className='logoFooter' src={logo} alt="FitMatch Logo"/>
                </a>          
              </div>       
            </div>
          </Col>
          <Col md="4">
            <div className='text-center pb-4'>
                <h5 className='colorText'>Contacta'ns</h5>
            </div>
            <div className='d-flex justify-content-center ps-md-4'>
              <div className='colorText ps-md-4 text-center text-md-start'>
                <p>+34 685647362</p>
                <p>P/ Vicent García Nº 34</p>
                <p>fitmatch@gmail.com</p>
              </div>         
            </div>
          </Col>
          <Col md="4">
            <div className='text-center pb-4 mt-4 mt-lg-0'>
                <h5 className='colorText'>Legal</h5>
            </div>
            <div className='d-flex justify-content-center ps-md-5 pb-5 pb-md-0'>
              <div className='text-center text-md-start ps-md-5 d-flex flex-column gap-3'>
                <a className='text-decoration-none enllaçNav' href='#'>Política de cookies</a>
                <a className='text-decoration-none enllaçNav' href='#'>Condicions d'ús</a>
                <a className='text-decoration-none enllaçNav' href='#'>Política de privacitat</a>
              </div>         
            </div>
          </Col>
        </Row>   
      </Container>
  );
};

export default Footer;
