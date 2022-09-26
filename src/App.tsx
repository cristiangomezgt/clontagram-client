import React, { useState } from 'react';
import Axios from 'axios';
import { setToken, deleteToken } from './Utils/auth-helpers';
import Nav from './Components/Nav';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';

export interface User {
  email: string;
  nombre: string;
  username: string;
  password: string;
  bio: string;
}

function App() {

  const [user, setUser] = useState(null)

  const login = async (email: string, password: string) => {
    const { data } = await Axios.post('/api/usuarios/login', {
      email,
      password
    });
    setUser(data.usuario);
    setToken(data.token)
  } 
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

  return (
    <React.Fragment>
      <Nav />
      <SignUp signup={signup}/>
      {/* <Login login={login} /> */}
      <p>{JSON.stringify(user)}</p>
    </React.Fragment>
  );
}

export default App;
