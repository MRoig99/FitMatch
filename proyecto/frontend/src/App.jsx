import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './views/app/login'; 
import Inici from './views/app/inici'; 
import Home from './views/corporativa/home';  
import RutaProtegida from './components/rutaProtegida';
import Crea from './views/app/crea'
import Historial from './views/app/historial'
import Perfil from './views/app/perfil'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/crea" element={<Crea />} />
        <Route path="/historial" element={<Historial />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route
          path="/busca"
          element={
            <RutaProtegida>
              <Inici />
            </RutaProtegida>
          }
        /> 
      </Routes>
    </Router>
  );
}

export default App;
