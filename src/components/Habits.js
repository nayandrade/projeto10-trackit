import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import axios from "axios";
import styled from 'styled-components';
import Footer from "./Footer";
import Header from "./Header";
import Cards from "./Cards";
import { TailSpin } from  'react-loader-spinner'

function WeekDay ( {day, name, habitDays, status, renderWeek, setRenderWeek, setHabitDays} ) {
    const [chosen, setChosen] = useState(false);

    useEffect(() => {
        if (habitDays.indexOf(day) !== -1) {
            setChosen(!chosen);
        }
    }, [false]) 

    function Chose() {

        if(!chosen) {
            setChosen(!chosen);
            setHabitDays([...habitDays, day]);
            
        } else if (chosen){         
            setHabitDays(habitDays.filter((e) => e !== day ));
            setChosen(!chosen);
        } 
    } 
    
    return (
        <DayButton chosen={chosen} onClick={Chose}>
            {name}
        </DayButton>
    )
}

export default function Habits() {
    const { token, completePercentage } = useContext(UserContext);
    const navigate = useNavigate();
    const [habitList, setHabitList] = useState([]);  
    const [habitName, setHabitName] = useState('');
    const [habitDays, setHabitDays] = useState([]);
    const [loadHabits, setLoadHabit] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const week =  [{weekday: 0, name: 'D', status: false},
                        {weekday: 1, name: 'S', status: false}, 
                        {weekday: 2, name: 'T', status: false}, 
                        {weekday: 3, name: 'Q', status: false}, 
                        {weekday: 4, name: 'Q', status: false}, 
                        {weekday: 5, name: 'S', status: false}, 
                        {weekday: 6, name: 'S', status: false}];
    const [renderWeek, setRenderWeek] = useState ({...week});
                                   
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    if (loadHabits) {
        const promise = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits', config);       
        
        promise.then((res) => {
            setHabitList(res.data)
            setLoadHabit(false)
            setLoading(false)
        });
    }
  
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
                    token={token}
                    config={config}
                    setLoadHabit={setLoadHabit}
                    />                                       
                )) 
            )
        }
    }

    function HabitForm() {

        return (
            <Form onSubmit={createHabit}>
                <input type="text" id="habito" value={habitName} placeholder="nome do hábito" required onChange={(e) => setHabitName(e.target.value)}></input>
                <div>
                {
                    week.map((day, index) => (
                        <WeekDay 
                        key={index}
                        day={day.weekday}
                        name={day.name}
                        status={day.status}
                        renderWeek={renderWeek}
                        setRenderWeek={setRenderWeek}
                        habitDays={habitDays}
                        setHabitDays={setHabitDays}
                        />
                    ))
                }
                </div>
                <Buttons><Cancel type="reset" value="Reset" onClick={() => setShowForm(false)}>Cancelar</Cancel><Save type="submit" value="Submit">Salvar</Save></Buttons>
            </Form>
        )
    }


    function createHabit(event) {
        event.preventDefault()
        const data = {            
                name: habitName,
                days: habitDays
        };

        const body = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        if (habitDays.length > 0) {
            const promise = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits', data, body);
            promise.then((res) => {
                setHabitName("");
                setHabitDays([]);
                setLoadHabit(true)
                setShowForm(false)
            });
            promise.catch((res) => {
                navigate("/")
            });

        }  else {
            alert("Selecione algum dia para esse habito")
        }
    }

    return (

        <>
        <Header />
        <Main>
            <section>
                <h2>Meus Hábitos</h2>
                <OpenForm onClick={() => setShowForm(true)}>+</OpenForm>
            </section>
            {
                showForm ? HabitForm() : null
            }       
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
        align-items: center;
        justify-content: space-between;
        padding: 28px 0;  
    }

    p {
        font-size: 18px;
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

const OpenForm = styled.div`
    width: 40px;
    height: 40px;
    background-color: #52B6FF;
    color: #fff;
    font-size: 27px;
    border: none;
    border-radius: 5px;
    outline: none;
    box-shadow: 0 2px 2px 0 #126BA5;
    display: flex;
    align-items: center;
    justify-content: center;   

    &:active {
        box-shadow: 0 1px 1px 0 #126BA5;
        transform: translateY(1px);        
    }
`


const Form = styled.form`
    width: 100%;
    height: 180px;
    background-color: #fff;
    border-radius: 5px;
    padding: 13px;
    margin-bottom: 10px;

    input {
        width: 100%;
        height: 45px;
        font-size: 20px;
        color: #666666;
        text-indent: 15px;
        border-radius: 5px;
        border: 1px solid #D4D4D4;
    }

    input:focus {
        border: none;
        outline: 1px solid #D4D4D4;
    }

    input::-webkit-input-placeholder { /* Edge */
        color: #DBDBDB;
        font-size: 20px; 
    }

    input:-ms-input-placeholder { /* Internet Explorer 10-11 */
        color: #DBDBDB;
        font-size: 20px;
    }

    input::placeholder {
        color: #DBDBDB;
        font-size: 20px;
    }

    div {
        display: flex;
        padding: 10px 0;
        align-items: center;
        text-align: center
    }

`
const DayButton = styled.div`
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin: 0.2rem;
    border-radius: 5px;
    font-size: 20px;
    color: ${props => props.chosen ? '#fff' : '#cfcfcf' };
    font-weight: 400px;
    text-align: center;
    border: 1px solid ${props => props.chosen ? '#fff' : '#cfcfcf' };
    background-color: ${props => props.chosen ? '#cfcfcf' : '#fff' };
`

const Buttons = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
`

const Cancel = styled.button`
    width: 84px;
    height: 35px;
    background-color: #fff;
    font-size: 16px;
    color: #52B6FF;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    outline: none;
    margin-right: 10px;

`

const Save = styled.button`
    width: 84px;
    height: 35px;
    background-color: #52B6FF;
    font-size: 16px;
    color: #ffF;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    outline: none;
    margin-left: 10px;
`