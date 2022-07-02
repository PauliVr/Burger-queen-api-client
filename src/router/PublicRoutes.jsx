import Login from '../components/login/Login';
import { Routes, Route } from 'react-router-dom';
import React from 'react';

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
    </Routes>
  );
};

export default PublicRoutes;
