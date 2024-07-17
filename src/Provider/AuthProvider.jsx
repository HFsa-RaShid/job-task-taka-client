


import  { createContext, useContext, useState, useEffect } from 'react';
import useAxiosPublic from '../hooks/useAxiosPublic';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
     
      setIsLoggedIn(true); 
    
      fetchUserData(token);
    } else {
      setIsLoading(false); 
    }
  }, []);

  const fetchUserData = (token) => {
    axiosPublic.get('/user', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      setCurrentUser(response.data.user); 
      setIsLoading(false); 
    })
    .catch(error => {
      console.error('Fetch user error:', error);
      setIsLoading(false); 
    });
  };

  const login = (userData) => {
    setCurrentUser(userData);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('token'); 
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ currentUser, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

