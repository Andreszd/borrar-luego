import { Navigate, Route, Outlet, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../store/user';

export const PrivateRoutes = ({ children, roles = [] }) => {
  const { isAuthenticated, user } = useContext(AuthContext);
  let location = useLocation();

  if (!user || !isAuthenticated) return <Navigate to='/auth' state={{ from: location }} replace />;

  const userRol = user.esAdmin === 'yes' ? 'admin' : 'teacher';
  console.log(roles, userRol);
  return roles.includes(userRol) ? children : <Navigate to='/auth' />;
};
