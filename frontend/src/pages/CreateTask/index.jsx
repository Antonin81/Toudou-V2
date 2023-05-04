import { useParams } from "react-router-dom"

function CreateTask(){

    const {selectedCategory}=useParams()

    function handleSubmit(e){
        e.preventDefault()
        console.log("youpi")
        console.log(e.target["taskTitle"].value)
        console.log(e.target["taskDetails"].value)
        console.log(e.target["taskEndDate"].value)
        console.log(e.target["days"].value)
        console.log(e.target["hours"].value)
        console.log(e.target["minutes"].value)
        e.target["taskTitle"].value=null
        e.target["taskDetails"].value=null
        e.target["taskEndDate"].value=null
        e.target["days"].value=null
        e.target["hours"].value=null
        e.target["minutes"].value=null
    }

    return(
        <main>
            <h1>Créez une nouvelle Tâche</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="taskTitle" placeholder="intitulé de la tâche" />
                <textarea name="taskDetails" cols="30" rows="10" placeholder="Description"></textarea>
                <input type="date" name="taskEndDate" />
                <input type="number" name="days" />
                <input type="number" name="hours" />
                <input type="number" name="minutes" />
                <button type="submit">Valider</button>
            </form>
        </main>
    )
}

export default CreateTask