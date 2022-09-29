import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { setToken, deleteToken, getToken, initAxiosInterceptors } from './Utils/auth-helpers';
import Nav from './Components/Nav';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Main from './Components/layout/Main';
import Loading from './Components/Loading';

initAxiosInterceptors();
export interface User {
  email: string;
  nombre: string;
  username: string;
  password: string;
  bio: string;
}

function App() {

  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState<boolean>(true);
  const login = async (email: string, password: string) => {
    const { data } = await Axios.post('/api/usuarios/login', {
      email,
      password
    });
    setUser(data.usuario);
    setToken(data.token)
  } 
  useEffect(() => {
    const fetchUser = async ()  => {
      if(!getToken()) {
        setLoadingUser(false);
        return
      }
      try {
        const {data: user} = await Axios.get('/api/usuarios/whoami');        
        setUser(user);
        setLoadingUser(false);
      } catch (error){
        console.log(error);
      }
    }
    fetchUser();
  }, []);
  
  const signup = async (user: User) => {
    const { data } = await Axios.post('/api/usuarios/signup', user
    );
    setUser(data.usuario);
    setToken(data.token)
  } 
  const logout = () => {
    setUser(null);
    deleteToken();
  }
  if(loadingUser) {
    return (
      <Main center={true}>
        <Loading />
      </Main>
    )
  }
  return (
    <React.Fragment>
      <Nav />
      {/* <SignUp signup={signup}/> */}
      <Login login={login} />
      <p>{JSON.stringify(user)}</p>
    </React.Fragment>
  );
}

export default App;
