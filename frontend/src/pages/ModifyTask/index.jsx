import { useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../utils/hooks";
import React from "react";

function ModifyTask(){
    const {selectedTask} = useParams()

    const[error, setError] = useState(false)

    const results = useFetch('http://localhost:8000/categories')  

    async function tryFetchPatch(reqBody,url){

        try {
            const requestOptions = {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reqBody)
            };
            const response = await fetch(url,requestOptions)
            const infos=await response.json()
            setError(infos.errorHasOccured)
        }catch(err){
            throw err;
        }
    }

    function handlerSubmitModifyParent(e){
        e.preventDefault()
        const link=`http://localhost:8000/tasks/modifyParent`
        try {
            tryFetchPatch({id_task:selectedTask,newParent:e.target["inputNewPlace"].value},link)
        } catch (err) {
            console.log(err)
            setError(true)
        }
    }

    function afficherOption(cat,stringBuilder){
        const key="option"+cat.id_category
        stringBuilder+=`/${cat.name}`
        return(
            <React.Fragment key={key}>
                <option value={cat.id_category}>{stringBuilder}</option>
                {results.data.categoriesMap[cat.id_category] && results.data.categoriesMap[cat.id_category].map((children)=>{
                    if(children.id_category!==cat.id_category){
                        return(afficherOption(children,stringBuilder))
                    }
                })}
            </React.Fragment>
        )
    }

    return(
        !results.isLoading ?
            ((!error && !results.error) ?
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
                    <form onSubmit={handlerSubmitModifyParent}>
                        <select name="inputNewPlace" id="inputNewPlace">
                            {afficherOption(results.data.firstCategory[0],"")}
                        </select>
                        <button type="submit">Valider</button>
                    </form>
                </main>
            :
                <main>
                    <p>La requête n'est pas passée</p>
                </main>)
        :
            <p>Chargement</p>        
    )
}

export default ModifyTask