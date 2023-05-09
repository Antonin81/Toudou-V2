import { useState } from "react"
import { useParams } from "react-router-dom"

function CreateTask(){

    const {selectedCategory}=useParams()
    const [error, setError]=useState(false)

    async function tryFetchPost(reqBody){

        try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reqBody)
            };
            const response = await fetch('http://localhost:8000/tasks/create',requestOptions)
            setError(await response.json().errorHasOccured)
        }catch(err){
            console.log(err)
            setError(true)
        } 
    }

    function convertTimeToMinutes(days, hours, minutes){
        let durationInMinutes=0;
        if(days!==""){
            durationInMinutes+=parseInt(days)*24*60;
        }
        if(hours!==""){
            durationInMinutes+=parseInt(hours)*24;
        }
        if(minutes!==""){
            durationInMinutes+=parseInt(minutes);
        }
        if(durationInMinutes===0){
            durationInMinutes=null;
        }
        return durationInMinutes;
    }

    function testDate(date){
        let newDate;
        if(date===""){
            newDate=null;
        }else{
            newDate=date;
        }
        return newDate;
    }

    function handleSubmit(e){
        e.preventDefault()
        console.log("youpi")
        console.log(e.target["taskTitle"].value.replace(/'/g, "\\'"))
        console.log(e.target["taskDetails"].value.replace(/'/g, "\\'"))
        console.log(e.target["taskEndDate"].value)
        console.log(e.target["days"].value)
        console.log(e.target["hours"].value)
        console.log(e.target["minutes"].value)

        tryFetchPost({title:e.target["taskTitle"].value.replace(/'/g, "\\'"),description:e.target["taskDetails"].value.replace(/'/g, "\\'"),end_date:testDate(e.target["taskEndDate"].value),duration:convertTimeToMinutes(e.target["days"].value,e.target["hours"].value,e.target["minutes"].value), task_category:selectedCategory})
        e.target["taskTitle"].value=null
        e.target["taskDetails"].value=null
        e.target["taskEndDate"].value=null
        e.target["days"].value=null
        e.target["hours"].value=null
        e.target["minutes"].value=null
    }

    return(!error ?
        <main>
            <h1>Créez une nouvelle Tâche</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="taskTitle">Nom de la tâche</label>
                <input type="text" name="taskTitle" placeholder="intitulé de la tâche" id="taskTitle" required />
                <label htmlFor="taskDetails">Description</label>
                <textarea name="taskDetails" cols="30" rows="10" placeholder="Description" id="taskDetails"></textarea>
                <label htmlFor="taskEndDate">Date limite</label>
                <input type="date" name="taskEndDate" id="taskEndDate" />
                <label htmlFor="days">jours</label>
                <input type="number" name="days" id="days" />
                <label htmlFor="hours">heures</label>
                <input type="number" name="hours" id="hours"/>
                <label htmlFor="minutes">minutes</label>
                <input type="number" name="minutes" id="minutes" />
                <button type="submit">Valider</button>
            </form>
        </main>
        :
        <main>
            <p>la requête n'est pas passée</p>
        </main>

    )
}

export default CreateTask