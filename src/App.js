import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import routes from "./routing/routes";
import "./App.css";
import ProtectedRoute from "./componenets/ProtectedRoute";
import Login from "./Views/Login";
import Banner from "./Views/Banner";
import Registration from "./Views/Registration";
import Navbar from "./componenets/Navbar";


function App() {
  return (
    <>
      <Router>
        <Routes>
          {routes.map((route) => 
            route.isProtected ? (
              <Route
                key={route.name}
                path={route.path}
                element={
                  <ProtectedRoute roles={route.roles}>
                    <header className="bg-primary text-white text-center">
                      <Navbar />
                    </header>
                    {route.element}
                  </ProtectedRoute>
                }
              />
            ) : (
              <Route 
                key={route.name} 
                path={route.path} 
                element={route.name === "Login" ? <Login /> 
                : route.name === "Registration" ? <Registration /> : <Banner /> } />
            )
          )}
        </Routes>
      </Router>
    </>
  );
}

export default App;