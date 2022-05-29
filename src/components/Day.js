export default function Day() {
    const dayjs = require('dayjs');
    const weekday = dayjs().day();
    let myWeek = "";
    let myDay = ("0" + dayjs().date()).slice(-2);
    let myMonth = ("0" + dayjs().month()).slice(-2);
   
    function myWeekDay() {
        if (weekday === 0) {
            myWeek = "Domingo"
        }
        if (weekday === 1) {
            myWeek = "Segunda"
        }
        if (weekday === 2) {
            myWeek = "Terça"
        }
        if (weekday === 3) {
            myWeek = "Quarta"
        }
        if (weekday === 4) {
            myWeek = "Quinta"
        }
        if (weekday === 5) {
            myWeek = "Sexta"
        }
        if (weekday === 6) {
            myWeek = "Sábado"
        }      
    };

    return (
        <>
            {
                weekday !== null ? myWeekDay() : null
            }
            <h2>{myWeek}, {myDay}/{myMonth}</h2>        
        </> 
    );
}
