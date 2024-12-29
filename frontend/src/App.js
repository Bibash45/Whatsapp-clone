import React, { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import { useSelector } from "react-redux";

// socket io
import io from "socket.io-client";
import SocketContext from "./context/SocketContext";
const socket = io(process.env.REACT_APP_API_ENDPOINT.split("/api/v1")[0]);

const App = () => {
  const { user } = useSelector((state) => state.user);

  const { token } = user;

  return (
    <div className="dark">
      <SocketContext.Provider value={socket}>
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
      </SocketContext.Provider>
    </div>
  );
};

export default App;
