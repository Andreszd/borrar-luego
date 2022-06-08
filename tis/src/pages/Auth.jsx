import LoginUsr from '../Componentes/Login';
import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Login() {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) {
      console.log('redirect', location);
      let pathRedirect = '';
      if (user.esAdmin === 'yes') {
        pathRedirect = '/Home-admin';
      } else {
        pathRedirect = '/';
      }
      navigate(location.state?.from.pathname || pathRedirect);
    }
  }, [isAuthenticated, user]);

  return (
    <main className='inicio'>
      <div className='container' style={{ paddingTop: 30 + 'px' }}>
        <LoginUsr />
      </div>
    </main>
  );
}
