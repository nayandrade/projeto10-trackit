import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from 'styled-components';

export default function Habits( {token, userImage} ) {
    const [habitList, setHabitList] = useState([])
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    useEffect(() => {
        const promise = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits', config);
        promise.then((res) => {
            setHabitList(res.data)
        });
    }, [])   
    
    function checkHabits() {
        if(habitList.length <= 0) {
            return(
                <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
            )
        } else {
            return (
                habitList.map((habit, index) => {
                    <p>{habit.name}</p>
                })
            )
        }
    }


    return (

        <>
        <Header>
            <h1>TrackIt</h1>
            <div>
                <img src={userImage}></img>
            </div>            
        </Header>
        {
            checkHabits()
        }
        
        </>
       
        
    )

}

const Header = styled.header`
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
    }

    img {
        width: auto;
        height: 51px;   
    }


`