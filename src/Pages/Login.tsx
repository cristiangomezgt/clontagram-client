import React, { useState } from "react";
import Axios from "axios";
import Main from "../Components/layout/Main";

type Props = {}

const Login = (props: Props) => {
  return (
    <Main center>
    <div className="FormContainer">
      <h1 className="Form__titulo">Clontagram 😎</h1>
      <div>
        <form>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="Form__field"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            className="Form__field"
            required
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