import { useState, useEffect, useContext } from "react"
import styled from 'styled-components';
import axios from "axios";
import Data from "./data/Data";

export default function Cards ( {habit, token, config, setLoadHabit } ) {
    const [days, setDays] = useState (habit.days);
    const [week, setWeek] = useState (Data);
    const id = habit.id
   
    days.forEach((e, i) => {week.map((day, index) => { if(day.weekday === e) {day.status = true}})});
    
    function deleteHabit() {
        let confirmation = window.confirm("Você tem certeza disso?");
        if (confirmation) {
            const promise = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`, config);
            promise.then((res) => {
                setLoadHabit(true)
                console.log('apaguei')
            });
            promise.catch((res) => {
                console.log(res.message)
            });
            
        }
        

    }


    return (
        <Card>
            <CardTitle>
                <p>{habit.name}</p>
                <ion-icon name="trash-outline" onClick={deleteHabit}></ion-icon>
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

const Day = styled.div`
    width: 30px;
    height: 30px;
    border: 1px solid ${props => props.status ? '#fff' : '#cfcfcf' };
    color: ${props => props.status ? '#fff' : '#cfcfcf' };
    background-color: ${props => props.status ? '#cfcfcf' : '#fff' };
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 4px;
`
