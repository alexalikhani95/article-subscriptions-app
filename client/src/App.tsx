import React from "react";
import "./App.css";
import NavBar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
