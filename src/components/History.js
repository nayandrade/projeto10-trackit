import { useContext } from "react"
import UserContext from "../contexts/UserContext";
import styled from 'styled-components';
import Footer from "./Footer"
import Header from "./Header"
//import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { TailSpin } from  'react-loader-spinner'

export default function History() {


    const { completePercentage } = useContext(UserContext);
    
    return (
        <>
            <Header />
            <Main>
                <section>
                    <h1>Histórico</h1>
                    <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
                </section>                            
            </Main>            
            <Footer completePercentage={completePercentage}/>
        </>  
    )
}

const Main = styled.main`
    min-height: calc(100vh - 140px);
    height: 100%;
    font-family: 'Lexend Deca', sans-serif;
    font-size: 22px;
    color: #126BA5;
    background-color: #F2F2F2;
    padding: 0 18px;
    padding-bottom: 80px;

    section {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        padding: 28px 0;  
    }

    p {
        font-size: 18px;
        color: #666666;
        margin-top: 20px;
    }
`