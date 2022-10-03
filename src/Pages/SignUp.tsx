import React, { useState } from "react";
import Main from "../Components/layout/Main";
import imageSignup from "../images/signup.png";
import { Link } from "react-router-dom";
type Props = {
  signup: (obj: 
    {
      email: string;
      nombre: string;
      username: string;
      password: string;
      bio: string;
    }) => void,
    showError: (message: string) => void
};

const SignUp = (props: Props) => {

  const [user, setUser] = useState({
    email: "",
    nombre: "",
    username: "",
    password: "",
    bio: "",
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
      await props.signup(user)
    }
    catch (error:any) {
      props.showError(error?.response?.data?.message || error.response.data)
    }
  }
  return (
    <Main center={true}>
      <div className="Signup">
        <img src={imageSignup} alt="" className="Signup__img" />
        <div className="FormContainer">
          <h1 className="Form__titulo">Clontagram 😎</h1>
          <p className="FormContainer__info">
            Sign up to see the Instagram clone
          </p>
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
              type="text"
              name="nombre"
              placeholder="Name y Last name"
              className="Form__field"
              required
              minLength={3}
              maxLength={100}
              onChange={handleInputChange}
              value={user.nombre}
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="Form__field"
              required
              minLength={3}
              maxLength={30}
              onChange={handleInputChange}
              value={user.username}
            />
            <input
              type="text"
              name="bio"
              placeholder="Tell us about yourself..."
              className="Form__field"
              required
              maxLength={150}
              onChange={handleInputChange}
              value={user.bio}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="Form__field"
              required
              onChange={handleInputChange}
              value={user.password}
            />
            <button className="Form__submit" type="submit">
              Sign up
            </button>
            <p className="FormContainer__info">
              Do you already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </Main>
  );
};

export default SignUp;
