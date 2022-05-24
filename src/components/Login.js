import { useState} from "react"
import { Link } from "react-router-dom";
import styled from 'styled-components';

import Logo from "../assets/img/trackitlogo.JPG"


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function LoginUser(event) {
        event.preventDefault();

        const body = {
            email: email,
            password: password,
            
        }


    }






    return (
        <Container>
            <img src={Logo} alt="Logo icon" />
            <h1>TrackIt</h1>
            <Form onSubmit={LoginUser}>                
                <input type="email" id="email" value={email} placeholder="email" required onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" id="password" value={password} placeholder="senha" required onChange={(e) => setPassword(e.target.value)}/>       
                <div><button type="submit">Entrar</button></div>
            </Form>
            <Link to='/cadastro'>Não tem uma conta? Cadastre-se!</Link>            
        </Container>
    )

}

const Container = styled.div`
    font-family: 'Lexend Deca', sans-serif;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    margin-top: 68px;
    
    img {
        width: 180px;
    }

    h1 {
        font-family: 'Playball', cursive;
        font-size: 69px;
        color: #126BA5;
        margin-bottom: 36px;
    }

    a {
        font-size: 14px;
        color: #52B6FF;
        font-weight: 400px;
        margin: 25px 0;
            
    }

`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    padding: 0 36px;
    width: 100%;
    
    
    input {
        height: 45px;
        width: 100%;
        margin-bottom: 7px;
        border-radius: 5px;
        border: 1px solid #D4D4D4;            
    }

    input:focus {
        border: none
    }

    input::-webkit-input-placeholder { /* Edge */
        color: #DBDBDB;
        font-size: 20px;
        text-indent: 10px; 
    }

    input:-ms-input-placeholder { /* Internet Explorer 10-11 */
        color: #DBDBDB;
        font-size: 20px;
        text-indent: 10px;
    }

    input::placeholder {
        color: #DBDBDB;
        font-size: 20px;
        text-indent: 10px;
    }

    div {
        display: flex;
        justify-content: center;
    }

    button {
        width: 100%;
        height: 45px;
        text-align: center;
        background-color: #52B6FF;
        color: #FFFFFF;
        font-size: 21px;
        border: none;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;    
    }

    button a:-webkit-any-link {
        color: inherit;
        text-decoration: none;
    }
`