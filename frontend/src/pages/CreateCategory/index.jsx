import { useParams } from "react-router-dom"

function CreateCategory(){

    const {selectedCategory}=useParams()

    function handleSubmit(e){
        e.preventDefault()
        console.log("il me faut donc dire au backend de créer la catégorie portant le nom de :")
        console.log(e.target["inputNom"].value)
        e.target["inputNom"].value=null
    }

    return(
        <main>
            <h1>Créez une nouvelle Catégorie</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="inputNom" id="" placeholder="nom de la catégorie" />
                <button type="submit">Valider</button>
            </form>
        </main>
    )
}

export default CreateCategory