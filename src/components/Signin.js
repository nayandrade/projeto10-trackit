import { useState} from "react"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from 'styled-components';
import Logo from "../assets/img/trackitlogo.JPG"
import { ThreeDots } from  'react-loader-spinner'

export default function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [loadingButton, setLoadingButton] = useState(false)
    const navigate = useNavigate();

    function CreateUser(event) {   
        event.preventDefault();
        setLoadingButton(true);
        const body = {
            email: email,
            password: password,
            name: name,
            image: image
        }        

        const promise = axios.post(
            "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", body);

            promise.then((res) => {
                navigate("/", { replace: true })
                setLoadingButton(false);
            });
            promise.catch((res) => {
                alert('Erro!');
                setLoadingButton(false);
            })                
    }

    return (
        <Container>
            <img src={Logo} alt="Logo icon" />
            <h1>TrackIt</h1>
            <Form onSubmit={CreateUser}>                
                <input type="email" id="email" value={email} placeholder="email" required onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" id="password" value={password} placeholder="senha" required onChange={(e) => setPassword(e.target.value)}/>       
                <input type="text" id="nome" value={name} placeholder="nome" required onChange={(e) => setName(e.target.value)}/> 
                <input type="url" name="image" id="image" pattern="/([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif))/i" value={image} placeholder="foto" required onChange={(e) => setImage(e.target.value)}/>
                <div>
                    {
                        loadingButton ? <button type="submit"><ThreeDots color="#FFFFFF" /></button> : <button type="submit">Cadastrar</button>
                    }
                    
                    
                </div>
            </Form>
            <Link to='/'>Já tem uma conta? Faça login!</Link>  
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