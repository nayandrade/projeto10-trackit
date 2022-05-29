import { Link } from "react-router-dom";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import "../components/css/styles.css";
import styled from 'styled-components';

export default function Footer( {completePercentage} ) {
    
    return(
        <FooterArea>
            <section>
                <Link to='/habitos'><p>Hábitos</p></Link>
                <Link to='/hoje'><div>
                    <CircularProgressbar
                        value={completePercentage}
                        text={`Hoje`}
                        background
                        backgroundPadding={6}
                        styles={buildStyles({
                            backgroundColor: "#52B6FF",
                            textColor: "#fff",
                            pathColor: "#fff",
                            trailColor: "transparent"
                            })}
                    />
                </div></Link>
                <Link to='/historico'><p>Histórico</p></Link>
            </section>        
        </FooterArea>
    );
}

const FooterArea = styled.footer`
    width: 100%;
    height: 70px;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;

    section {
        font-family: 'Lexend Deca', sans-serif;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        padding: 0 10px;
    }

    a:-webkit-any-link {
        color: inherit;
        text-decoration: none;
    }

    p {
        color: #52B6FF;
    }

    div {
        width: 91px;
        height: 91px;
        display: flex;
        align-items: flex-end;
    }    
`