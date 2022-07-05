import { Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import LogOut from '../botones/logOut/LogOut';
import { Navbar } from '../navbar/Navbar';
import './AdminHome.scss';

export default function AdminHome() {
  const navigate = useNavigate();

  return (
    <section className='container__home'>
      <Navbar active='home' type='admin'></Navbar>
      <div className='dashboard__home'>
        <h1 className='dashboard__home--title'>{'bienvenido'.toUpperCase()}</h1>
        <div className='dashboard__home--opciones'>
          <button className='opcion' onClick={() => navigate('/registro')}>
            <img src='/assets/registro-empleados.svg' alt='' />
            <h3 className='opcion__text'>{'administrar empleados'.toUpperCase()}</h3>
          </button>
          <button className='opcion' onClick={() => navigate('/platillos')}>
            <img src='/assets/platillos.svg' alt='' />
            <h3 className='opcion__text'>{'administrar platillos'.toUpperCase()}</h3>
          </button>
          <button className='opcion' onClick={() => navigate('/informacion-pedidos')}>
            <img src='/assets/info-pedidos.svg' alt='' />
            <h3 className='opcion__text'>{'información pedidos'.toUpperCase()}</h3>
          </button>
        </div>
      </div>
    </section>
  );
}
