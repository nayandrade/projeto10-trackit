import { useState} from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Login";
import Signin from "./Signin";
import Habbits from "./Habbits";
import Today from "./Today";
import History from "./History";

import "../assets/css/reset.css"




export default function App() {  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Signin />} />
        <Route path="/habitos" element={<Habbits />} />
        <Route path="/hoje" element={<Today />} /> 
        <Route path="/historico" element={<History />} />   
      </Routes>
    </BrowserRouter>

  );
}


