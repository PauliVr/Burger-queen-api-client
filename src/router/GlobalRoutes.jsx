import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';
import React from 'react';

const GlobalRouter = ({ isAuth }) => {
  return <>{isAuth ? <PrivateRoutes /> : <PublicRoutes />}</>;
};

export default GlobalRouter;
