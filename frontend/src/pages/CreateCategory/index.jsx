import { useParams } from "react-router-dom"
import { useState } from "react"

function CreateCategory(){

    const {selectedCategory}=useParams()
    const [error, setError]=useState(null)

    function handleSubmit(e){
        e.preventDefault()
        try{
            tryFetchPost({parentCategoryId:selectedCategory, categoryName:e.target["inputNom"].value})
        }
        catch(err){
            setError(true)
            console.log(err)
        }
        e.target["inputNom"].value=null
    }

    async function tryFetchPost(reqBody){

        try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reqBody)
            };
            const response = await fetch('http://localhost:8000/categories/create',requestOptions)
            setError(await response.json().errorHasOccured)
        }catch(err){
            throw err;
        }
    }

    return(!error ?
        <main>
            <h1>Créez une nouvelle Catégorie</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="inputNom" id="" placeholder="nom de la catégorie" />
                <button type="submit">Valider</button>
            </form>
        </main>
        :
        <main>
            <p>La requète n'est pas passée</p>
        </main>
    )
}

export default CreateCategory