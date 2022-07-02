// import './App.css';
// import { Routes, Route } from 'react-router-dom';
// import LogIn from './components/login/Login.js';
// import Registro from './components/registro/Registro.js';
// import AdminHome from './components/adminHome/AdminHome.jsx';
// import Menu from './components/menu/Menu';
// import Platillo from './components/platillo/Platillo';
// import Loader from './components/loader/Loader.jsx';
// import Cart from './components/menu/Cart';
// import GeneralHome from './components/GeneralHome';

// function App({ user }) {
//   return (
//     <div className='App'>
//       <Routes>
//         <Route path='/' element={<LogIn />} />
//         <Route path='/general-home' element={<GeneralHome  />} />
//         <Route path='/home' element={<AdminHome />}></Route>
//         <Route path='/platillos' element={<Platillo />}></Route>
//         <Route path='/registro' element={<Registro />} />
//         <Route path='/informacion-pedidos' element={<AdminHome />}></Route>
//         <Route path='/menu' element={<Menu />}></Route>
//         <Route path='/pruebas' element={<Cart />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;

import './App.css';
import React, { useState } from 'react';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import GlobalRouter from './router/GlobalRoutes';

function App() {
  const [isAuth, setIsAuth] = useState(null);
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsAuth(user);
    } else {
      setIsAuth(null);
    }
  });
  return (
    <section>
      <GlobalRouter isAuth={isAuth} />
    </section>
  );
}

export default App;
//
