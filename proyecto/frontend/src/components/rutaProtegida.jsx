import { Navigate } from 'react-router-dom';

const RutaProtegida = ({ children }) => {
  const usuari = localStorage.getItem('usuari');

  return usuari ? children : <Navigate to="/login" replace />;
};

export default RutaProtegida;
