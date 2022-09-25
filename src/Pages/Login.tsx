import React, { useState } from "react";
import Axios from "axios";
import Main from "../Components/layout/Main";

type Props = {}

const Login = (props: Props) => {

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data } = await Axios.post('/api/usuarios/login', user);
      console.log(data)
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <Main center>
    <div className="FormContainer">
      <h1 className="Form__titulo">Clontagram 😎</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="Form__field"
            required
            onChange={handleInputChange}
            value={user.email}
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            className="Form__field"
            required
            onChange={handleInputChange}
            value={user.password}
          />
          <button type="submit" className="Form__submit">
            Login
          </button>
          <p className="FormContainer__info">
            You do not have an account? <a href="/signup">Signup</a>
          </p>
        </form>
      </div>
    </div>
  </Main>
  )
}

export default Login