import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import { useSelector } from "react-redux";

const App = () => {
  const { user } = useSelector((state) => state.user);

  const { token } = user;

  return (
    <div className="dark">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={token ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="login"
            element={!token ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/register"
            element={!token ? <Register /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
