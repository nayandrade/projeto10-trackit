import { useState} from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import Login from "./Login";
import Signin from "./Signin";
import Habits from "./Habits";
import Today from "./Today";
import History from "./History";
import "../assets/css/reset.css";

export default function App() { 
  const [token, setToken] = useState('');
  const [userImage, setUserImage] = useState('');
  const [completePercentage, setCompletePercentage] = useState(0);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ token, setToken, userImage, setUserImage, completePercentage, setCompletePercentage }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Signin />} />
          <Route path="/habitos" element={<Habits />} />
          <Route path="/hoje" element={<Today />} /> 
          <Route path="/historico" element={<History />} />   
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>

  );
}