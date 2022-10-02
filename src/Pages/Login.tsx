import React, { useState } from "react";
import Main from "../Components/layout/Main";
import { Link } from "react-router-dom"
type Props = {
  login: (email: string, password: string) => void;
}

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
      props.login(user.email, user.password)
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
            You do not have an account? <Link to="/signup">Signup</Link>
          </p>
        </form>
      </div>
    </div>
  </Main>
  )
}

export default Login