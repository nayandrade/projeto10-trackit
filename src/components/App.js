import { useState} from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Signin from "./Signin";
import Habits from "./Habits";
import Today from "./Today";
import History from "./History";
import "../assets/css/reset.css"

export default function App() { 
  const [token, setToken] = useState('');
  const [userImage, setUserImage] = useState('')

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login token={token} setToken={setToken} userImage={userImage} setUserImage={setUserImage} />} />
        <Route path="/cadastro" element={<Signin />} />
        <Route path="/habitos" element={<Habits token={token} userImage={userImage} />} />
        <Route path="/hoje" element={<Today />} /> 
        <Route path="/historico" element={<History />} />   
      </Routes>
    </BrowserRouter>

  );
}


