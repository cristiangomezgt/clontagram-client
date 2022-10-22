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
import Error from "./Components/Error";
import Upload from "./Pages/Upload";
import Feed from "./Pages/Feed";
import Post from "./Pages/Post";
import Explore from "./Pages/Explore";
import Profile from "./Pages/Profile";

initAxiosInterceptors();

export default function App() {
  const [user, setUser] = useState<IUser | null>(null);
  const [loadingUser, setLoadingUser] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  const showError = (message: string) => {
    setError(message);
  };

  const hideError = () => {
    setError(null);
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
      <Nav user={user!}/>
      <Error message={error} hideError={hideError}></Error>
      <Routes>
        <Route path="/" element={<ProtectedRoute user={user!} showError={showError} />}>
          <Route
            index
            element={<Feed user={user!} showError={showError} />}
          />
          <Route
            path="/upload"
            element={<Upload showError={showError} />}
          />
          <Route path="/post/:postId" element={<Post user={user!} showError={showError} />} />
          <Route path="/explore" element={<Explore showError={showError} />} />
          <Route path="/profile/:username" element={<Profile user={user!} showError={showError} />} />
        </Route>
        <Route path="/login" element={<Login login={login} showError={showError}/>} />
        <Route path="/signup" element={<SignUp signup={signup} showError={showError}/>} />
        <Route path="*" element={<Navigate to="/signup" />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
