import Header from './Componentes/Header'
import Inicio from './Componentes/Inicio';
import Home from './pages/Home'
import { Routes, Route  } from "react-router-dom";
import './App.css';
import Catalogos from './pages/Catalogos';
import Vista_formulario_aulas from './pages/Vista_formulario_aulas'
import Crud from './pages/Crud'
import ReservarAula from './pages/ReservarAula';
import LoginUsr from './pages/Login';
import Login from './pages/Login';
import Respuesta_Reserva from './pages/Respuesta_Reserva'


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} >
          <Route index element={<Inicio />}/>
          <Route path="vista-forma-aul" index element={<Vista_formulario_aulas/>}/>
          <Route path="reservar-aula/:id" element={<ReservarAula/>}/>
          <Route path="catalogo" element={<Catalogos/>}/>
          <Route path="iniciarSesion" element={<Crud/>}/>
          <Route path="crud" element={<Crud/>}/>
          <Route path="respuesta-reserva" element={<Respuesta_Reserva/>}/>
        </Route>
        <Route path="/login" element={()=> 'login_otro'} />
        <Route path="/register" element={()=> 'register'} />
      </Routes>
    </div>
  );
}

const Catalogo = () => <h1>catalogo</h1>
export default App;
