import { createContext, useState, useEffect } from 'react';
import { auth } from '../services/auth';
import { get } from '../services/user';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    const userId = window.localStorage.getItem('userId');
    if (!token && !userId) {
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
      get(userId)
        .then(setUser)
        .catch((err) => console.error(err));
    }
  }, []);

  const authenticate = (user) => {
    const { id, fullName, email, esAdmin } = user;
    setUser({ id, fullName, email, esAdmin });
    setIsAuthenticated(true);

    window.localStorage.setItem('userId', id);
    window.localStorage.setItem('token', user.access_token);
  };

  const signIn = async (body) => {
    //fakeLogin();
    try {
      const res = await auth(body);
      if (res.status !== 1) throw new Error(res?.message);
      authenticate(res);
    } catch (err) {
      console.error(err);
    }
  };

  const signUp = () => {
    setIsAuthenticated(false);
  };

  const logout = () => {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('userId');
    setUser(null);
    setIsAuthenticated(false);
  };

  const vars = {
    isAuthenticated,
    user,
    signIn,
    signUp,
    logout,
    user,
  };
  return <AuthContext.Provider value={vars}>{children}</AuthContext.Provider>;
};
