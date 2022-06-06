import './App.css';
import { Routes, Route } from 'react-router-dom';
import LogIn from './components/login/Login.js';
import Registro from './components/registro/Registro.js';
import AdminHome from './components/adminHome/AdminHome.jsx';
import EliminarRegistro from './components/registro/EliminarRegistro';
import Menu from './components/menu/Menu';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<LogIn />} />
        <Route path='/home' element={<AdminHome />}></Route>
        {/* <Route path='/platillos' element={<EliminarRegistro />}></Route> */}
        <Route path='/registro' element={<Registro />} />
        <Route path='/informacion-pedidos' element={<AdminHome />}></Route>
        <Route path='/menu' element={<Menu />}></Route>
      </Routes>
    </div>
  );
}

export default App;
