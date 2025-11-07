// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Login from "./Login";
import Register from "./Register";
import Tarifler from "./Tarifler";
import TarifEkle from "./TarifEkle"; 
import TarifDetay from "./TarifDetay";
import Favoriler from './Favoriler';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tarifler" element={<Tarifler />} />
        <Route path="/tarif-ekle" element={<TarifEkle />} />
        <Route path="/tarifler/:id" element={<TarifDetay />} />
        <Route path="/favoriler" element={<Favoriler />} />
      </Routes>
    </Router>
  );
}

export default App;








