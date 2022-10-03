import React, { useState, useEffect } from "react";
import Axios from "axios";
import {
  setToken,
  deleteToken,
  getToken,
  initAxiosInterceptors,
} from "./Utils/auth-helpers";
import Nav from "./Components/Nav";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Main from "./Components/layout/Main";
import Loading from "./Components/Loading";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute";
import { IUser } from "./Types/user.type";

initAxiosInterceptors();

export default function App() {
  const [user, setUser] = useState<IUser | null>(null);
  const [loadingUser, setLoadingUser] = useState<boolean>(true);
  const login = async (email: string, password: string) => {
    const { data } = await Axios.post("/api/usuarios/login", {
      email,
      password,
    });
    setUser(data.usuario);
    setToken(data.token);
  };
  useEffect(() => {
    const fetchUser = async () => {
      if (!getToken()) {
        setLoadingUser(false);
        return;
      }
      try {
        const { data: user } = await Axios.get("/api/usuarios/whoami");
        setUser(user);
        setLoadingUser(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  const signup = async (user: IUser) => {
    const { data } = await Axios.post("/api/usuarios/signup", user);
    setUser(data.usuario);
    setToken(data.token);
  };
  const logout = () => {
    setUser(null);
    deleteToken();
  };
  if (loadingUser) {
    return (
      <Main center={true}>
        <Loading />
      </Main>
    );
  }
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        {/* <Route path="/" element={<Navigate to="/signup" />}></Route> */}
        <Route path="/" element={<ProtectedRoute user={user!} />}>
          <Route
            index
            element={<h1>Hola soy el componente feed temporáneo!</h1>}
          />
        </Route>
        <Route path="/login" element={<Login login={login} />} />
        <Route path="/signup" element={<SignUp signup={signup} />} />
        <Route path="*" element={<Navigate to="/signup" />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
