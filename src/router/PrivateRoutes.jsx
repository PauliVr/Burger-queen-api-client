import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import WaiterHome from '../components/waiterHome/WaiterHome';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/Firebase.js';
import Chef from '../components/chef/Chef';
import Registro from '../components/registro/Registro';
import AdminHome from '../components/adminHome/AdminHome';
import Platillo from '../components/platillo/Platillo';
import Menu from '../components/menu/Menu';
import Cart from '../components/menu/Cart';

const PrivateRoutes = () => {
  const [roleAdmin, setRoleAdmin] = useState(null);
  const [role, setRole] = useState(null);

  const [user, setUser] = useState(null);

  async function getRol(uid) {
    const docRef = doc(db, `users/${uid}`);
    const docu = await getDoc(docRef);
    const information = docu.data().rol;
    return information;
  }

  function setUserFirebaseRol(userFirebase) {
    getRol(userFirebase.uid).then((rol) => {
      const userData = {
        uid: userFirebase.uid,
        email: userFirebase.email,
        rol: rol,
      };
      setUser(userData);
      setRole(rol);
    });
  }

  onAuthStateChanged(auth, async (userFirebase) => {
    if (userFirebase && userFirebase.uid) {
      //funcion final
      if (!user) {
        setUserFirebaseRol(userFirebase);
      }
      // navigate('/registro');
      if (user.rol === 'administrador') {
        setRoleAdmin('admin');
      } else if (user.rol === 'mesero') {
        setRole('waiter');
      } else {
        setRole('chef');
      }
    }
  });

  if (roleAdmin === 'admin') {
    return (
      <Routes>
        <Route path='/' element={<AdminHome />} />
        <Route path='/home' element={<AdminHome />} />
        <Route path='/registro' element={<Registro />} />
        <Route path='/platillos' element={<Platillo />} />
        <Route path='/informacion-pedidos' element={<AdminHome />} />
      </Routes>
    );
  } else if (role === 'waiter') {
    return (
      <Routes>
        <Route path='/' element={<Menu />} />
        <Route path='/home' element={<WaiterHome />} />
        <Route path='/orden' element={<Menu />} />
        <Route path='/modal' element={<Cart />} />
      </Routes>
    );
  } else if (role === 'chef') {
    return (
      <Routes>
        <Route path='/' element={<Chef />} />
      </Routes>
    );
  }
};

export default PrivateRoutes;
