import { useParams } from "react-router-dom"

function ModifyTask(){
    const {selectedTask} = useParams()
    return(
        <main>
            <h1>Modifier l'intitulé</h1>
            <form action="">
                <input type="text" name="" id="" />
                <button type="submit">Valider</button>
            </form>
            <h1>Modifier la description</h1>
            <form action="">
                <textarea name="" id="" cols="30" rows="10"></textarea>
                <button type="submit">Valider</button>
            </form>
            <h1>Modifier la durée estimée</h1>
            <form action="">
                <input type="number" name="" id="" />
                <input type="number" name="" id="" />
                <input type="number" name="" id="" />
                <button type="submit">Valider</button>
            </form>
            <h1>Modifier la date limite</h1>
            <form action="">
                <input type="date" name="" id="" />
                <button type="submit">Valider</button>
            </form>
            <h1>Déplacer la Tâche</h1>
            <form action="">
                <select name="" id="">
                    <option value="">rien</option>
                    <option value="">encore rien</option>
                    <option value="">toujours rien</option>
                </select>
                <button type="submit">Valider</button>
            </form>
        </main>
    )
}

export default ModifyTask