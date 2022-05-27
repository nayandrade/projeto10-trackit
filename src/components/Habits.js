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

function WeekDay ( {day, name, habitDays, setHabitDays} ) {
    const [chosen, setChosen] = useState('')
    console.log(habitDays)

    function Chose() {
        if(!chosen) {
            setChosen(!chosen)
            setHabitDays([...habitDays, day])
            
        } else if (chosen){         
            setHabitDays(habitDays.filter((e) => e !== day ))
            setChosen(!chosen)
        } 
    } 
    
    return (
        <DayButton chosen={chosen} onClick={Chose}>
            {name}
        </DayButton>
    )
}

export default function Habits( {token, userImage} ) {
    const [habitList, setHabitList] = useState([])  
    const [habitName, setHabitName] = useState('')
    const [habitDays, setHabitDays] = useState([])
    const [showForm, setShowForm] = useState(false)
    console.log(habitName)
    console.log(habitDays)                               
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

    function HabitForm() {
        const week =  [{weekday: 7, name: 'D'},
                        {weekday: 1, name: 'S'}, 
                        {weekday: 2, name: 'T'}, 
                        {weekday: 3, name: 'Q'}, 
                        {weekday: 4, name: 'Q'}, 
                        {weekday: 5, name: 'S'}, 
                        {weekday: 6, name: 'S'}]; 

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
                        habitDays={habitDays}
                        setHabitDays={setHabitDays}
                        />
                    ))
                }
                </div>
                <Buttons><Cancel type="reset" value="Reset">Cancelar</Cancel><Save type="submit" value="Submit">Salvar</Save></Buttons>
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
            });
        }  else {
            alert("Selecione algum dia para esse habito")
        }
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
                <OpenForm onClick={() => setShowForm(!showForm)}>+</OpenForm>
            </section>
            {
                showForm ? HabitForm() : null
            }       
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
    color: ${props => props.status ? '#fff' : '#cfcfcf' };
    background-color: ${props => props.status ? '#cfcfcf' : '#fff' };
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 4px;
`

const Form = styled.form`
    width: 340px;
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

