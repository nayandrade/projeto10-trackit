import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from 'styled-components';

function Cards ( {habit} ) {
    const [days, setDays] = useState (habit.days)
    const [week, setWeek] = useState ([{weekday: 7, status: false, name: 'D'},
                                        {weekday: 1, status: false, name: 'S'}, 
                                        {weekday: 2, status: false, name: 'T'}, 
                                        {weekday: 3, status: false, name: 'Q'}, 
                                        {weekday: 4, status: false, name: 'Q'}, 
                                        {weekday: 5, status: false, name: 'S'}, 
                                        {weekday: 6, status: false, name: 'S'}]); 
   
    days.forEach((e, i) => {week.map((day, index) => { if(day.weekday === e) {day.status = true}})})
    
    return (
        <Card>
            <CardTitle>
                <p>{habit.name}</p>
                <ion-icon name="trash-outline"></ion-icon>
            </CardTitle>  
            <WeekDays>
                {
                    week.map((day) => (
                        <Day status={day.status}>{day.name}</Day>
                    ))                    
                }
            </WeekDays>          
        </Card>        
    )
}

export default function Habits( {token, userImage} ) {
    const [habitList, setHabitList] = useState([])  
    const [habitName, setHabitNane] = useState('')
    const [habitDays, setHabitDays] = useState([])                               
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
    }, []);
        
    function checkHabits() {
        if(habitList.length <= 0) {
            return(
                <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
            )
        } else {
            return (
                habitList.map((habit, index) => (
                    <Cards 
                    key={index}
                    habit={habit}
                    />                                       
                )) 
            )
        }
    }

    function createHabit() {
        const data = {            
                name: habitName,
                days: habitDays
        };

        const body = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        const promise = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits', data, body);
        promise.then((res) => {
        });
    }

    return (

        <>
        <Header userImage={userImage}>
            <h1>TrackIt</h1>
            <div></div>            
        </Header>
        <Main>
            <section>
                <h2>Meus Hábitos</h2>
                <button>+</button>
            </section>       
            {
                checkHabits()
            }  
        </Main>
        <Footer>

        </Footer>          
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
        background-image: url(${props => props.userImage});
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover
    }
`

const Main = styled.main`
    height: calc(100vh - 140px);
    font-family: 'Lexend Deca', sans-serif;
    font-size: 22px;
    color: #126BA5;
    background-color: #F2F2F2;
    padding: 0 18px;

    section {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 28px 0;  
    }

    button {
        width: 40px;
        height: 40px;
        background-color: #52B6FF;
        color: #fff;
        font-size: 27px;
        border: none;
        border-radius: 5px;
        outline: none;
        box-shadow: 0 2px 2px 0 #126BA5;
    }   

    button:active {
        box-shadow: 0 1px 1px 0 #126BA5;
        transform: translateY(1px)        
    }

    p {
        font-size: 18px;
        color: #666666;
    }

`
const Card = styled.div`
    width: 100%;
    height: 91px;
    background-color: #fff;
    border-radius: 5px;
    padding: 13px;
    margin-bottom: 10px;

    div ion-icon {
        font-size: 15px;
        color: #666666;
    }
`

const CardTitle = styled.div`
        display: flex;
        align-items: center;
        justify-content: space-between; 
`

const WeekDays = styled.div`
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin-top: 13px;
`

const Footer = styled.footer`
    width: 100%;
    height: 70px;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 1;
`

const Day = styled.div`
    width: 30px;
    height: 30px;
    border: 1px solid ${props => props.status ? '#fff' : '#cfcfcf' };
    color: ${props => props.status ? '#fff' : '#cfcfcf' };;
    background-color: ${props => props.status ? '#cfcfcf' : '#fff' };
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 4px;
`

