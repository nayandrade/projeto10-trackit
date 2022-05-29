import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import axios from "axios";
import styled from 'styled-components';
import Footer from "./Footer"
import Header from "./Header"
import Day from "./Day";
import Checkmark from "../assets/img/VectorCheck.svg"
import { TailSpin } from  'react-loader-spinner'

function Cards ( {habit, setComplete, config, isDone} ) {
    const navigate = useNavigate();    
    function toggle () {
        const id = habit.id
        if (habit.done === false) {
            const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`, {}, config);
            promise.then((res) => {
                setComplete(true)
            });
            promise.catch((res) => {
                navigate("/")
            });
        } else if (habit.done === true) {
            const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`, {}, config);
            promise.then((res) => {
                setComplete(true)
            });
            promise.catch((res) => {
                navigate("/")
            });
        }
        
    }

    return (
        <Card>
            <Button>
                <h4>{habit.name}</h4>
                <div>
                    <p>Sequência atual: <Days isDone={isDone}>{habit.currentSequence} dias</Days></p>
                    <p>Seu recorde: <Record record={habit.currentSequence >= habit.highestSequence && habit.currentSequence > 0 ? true : false}>{habit.highestSequence} dias</Record></p>
                </div>
            </Button>
            <Button done={habit.done} onClick={toggle}><img src={Checkmark} alt="Checkmark"/></Button>                     
        </Card>        
    )
}

export default function Today() {    
    const navigate = useNavigate();
    const [todayHabits, setTodayHabits] = useState ([]);
    const [complete, setComplete] = useState(true);
    const [loading, setLoading] = useState(true);
    const { token, setCompletePercentage, completePercentage } = useContext(UserContext);
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }; 

    if (complete) {
        const promise = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today', config)

        promise.then((response) => {
            console.log(response.data)
            setTodayHabits(response.data);
            setComplete(false)
            setLoading(false)            
        })
        promise.catch((res) => {
            navigate('/')  
        })
    }

    function count() {
        let progressCount = 0;
        let length = todayHabits.length;

        todayHabits.forEach(habit => {
            if (habit.done) {
                progressCount++;
            }
            setCompletePercentage((progressCount / length ) * 100)
        });

        if (progressCount > 0) {
            return (
                <Done isDone={true}>{completePercentage.toFixed(0)}% dos hábitos concluídos</Done>
            )
        } else {
            return (
                <Done isDone={false}>Nenhum hábito concluído ainda</Done>
            )
        }    
    };

    function checkHabits() { 

        if(todayHabits.length <= 0) {
            return(
                <p>Você não tem nenhum hábito pra hoje. Adicione um hábito para começar a trackear!</p>
            )
        } else {
            return (
                todayHabits.map((habit, index) => (
                    <Cards 
                    key={index}
                    habit={habit}
                    setComplete={setComplete}
                    config={config}
                    isDone={habit.done}
                    />                                       
                )) 
            )
        }
    };


    return (
        <>
            <Header />
            <Main>
                <section>
                    <Day />                    
                    {
                        loading ? "Carregando..." : count()
                    }
                </section>                
                {                
                    loading ? <TailLoad><TailSpin ariaLabel="loading-indicator" color="#52B6FF" /></TailLoad> : checkHabits()
                }
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

    h4 {
        font-size: 20px;
        color: #666666;
        margin-bottom: 5px;
    }

    p {
        font-size: 13px;
        color: #666666;
    }
`

const TailLoad = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 100px; 
`

const Done = styled.h3`
    font-size: 18px;
    color: ${props => props.isDone ? "#8FC549" : "#BABABA"};
    margin-top: 5px;
`

const Card = styled.div`
    width: 100%;
    height: fit-content;
    min-height: 94px;
    background-color: #fff;
    border-radius: 5px;
    padding: 13px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: space-between;
`

const Button = styled.div`
    width: 69px;
    min-width: 69px;
    height: 69px;
    border: 1px solid ${props => props.done ? '#8FC549' : '#E7E7E7' };
    background-color: ${props => props.done ? '#8FC549' : '#EBEBEB' };
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;

    &:first-child {
    width: 100%;
    border: none;
    background-color: #FFFFFF;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: flex-start;
}
`

const Days = styled.span`
    color: ${props => props.isDone ? "#8FC549" : "#BABABA"};
    font-weight: 400;
`

const Record = styled.span`
    color: ${props => props.record ? "#8FC549" : "#BABABA"};
    font-weight: 400;
`