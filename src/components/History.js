import { useState, useEffect, useContext } from "react"
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";

import Footer from "./Footer"
import Header from "./Header"
import Day from "./Day"

export default function History() {
    const { token, setCompletePercentage, completePercentage } = useContext(UserContext);
    const navigate = useNavigate();
    return (
        <>
            <Header />
            <Day />
            <h1>eu sou histórico</h1>
            <Footer completePercentage={completePercentage}/>
        </>  
    )
}
