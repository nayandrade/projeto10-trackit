import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import styled from 'styled-components';

export default function Header() {
    const { userImage } = useContext(UserContext);
    const navigate = useNavigate();

    function logOut() {
         let confirmation = window.confirm('Você tem certeza que deseja desconectar?');
         if (confirmation) {
            localStorage.removeItem('LastUser');
            navigate("/");
         }
    }

    return (
        <HeaderArea userImage={userImage}>
            <h1 onClick={logOut}>TrackIt</h1>
            <div></div>            
        </HeaderArea>
    )
}

const HeaderArea = styled.header`
    width: 100%;
    height: 70px;
    font-family: 'Playball', cursive;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #126BA5;
    color: #fff;
    font-size: 39px;
    padding: 0 18px;

    div {
        width: 51px;
        height: 51px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        overflow: hidden;
        background-image: url(${props => props.userImage});
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover
    }
`