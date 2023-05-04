import { useParams } from "react-router-dom"

function ModifiyCategory(){
    const {selectedCategory}=useParams()
    return(
        <main>
            <h1>Modifier le nom</h1>
            <form action="">
                <input type="text" name="" id="" />
                <button type="submit">Valider</button>
            </form>
            <h1>Déplacer</h1>
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

export default ModifiyCategory