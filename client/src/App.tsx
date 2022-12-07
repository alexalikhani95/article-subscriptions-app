import React from "react";
import "./App.css";
import NavBar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import Dashboard from "./components/Dashboard";
import Articles from "./pages/Articles";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/articles" element={<Articles />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
