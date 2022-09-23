import React from 'react'
import Main from '../Components/layout/Main'
import imageSignup from '../images/signup.png'

type Props = {}

const SignUp = (props: Props) => {

  interface User {
    email:string;
    nombre:string;
    username:string;
    password:string;
    bio:string;
  }
  const user : User = {
    email: '',
    nombre: '',
    username: '',
    password: '',
    bio: '',
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    user[e.target.name as keyof typeof user] = e.target.value;
    console.log(user)
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
          <form>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="Form__field"
              required
              onChange={handleInputChange}
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
            />
            <input
              type="text"
              name="bio"
              placeholder="Tell us about yourself..."
              className="Form__field"
              required
              maxLength={150}
              onChange={handleInputChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="Form__field"
              required
              onChange={handleInputChange}
            />
            <button className="Form__submit" type="submit">
              Sign up
            </button>
            <p className="FormContainer__info">
            Do you already have an account? <a href="/login">Login</a>
            </p>
          </form>
        </div>
      </div>
    </Main>
  )
}

export default SignUp