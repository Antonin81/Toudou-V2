import { useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../utils/hooks";
import React from "react";

function ModifyTask(){
    const {selectedTask} = useParams()

    const[error, setError] = useState(false)

    const results = useFetch('http://localhost:8000/categories')  
    const taskResults = useFetch(`http://localhost:8000/tasks/${selectedTask}`)

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
        const link=`http://localhost:8000/tasks/parent`
        try {
            tryFetchPatch({id_task:selectedTask,newParent:e.target["inputNewPlace"].value},link)
        } catch (err) {
            console.log(err)
            setError(true)
        }
    }

    function handlerSubmitModifyTitle(e){
        e.preventDefault()
        const link=`http://localhost:8000/tasks/title`
        try {
            tryFetchPatch({id_task:selectedTask,newTitle:e.target["inputNewTitle"].value.replace(/'/g, "\\'")},link)
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

    function calculateDuration(du){
        var d=parseInt(du)
        let days=Math.floor(d/(60*24));
        d-=(60*24*days);
        let hours=Math.floor(d/(60));
        d-=60*hours;
        return [days,hours,d];
    }

    function utcToLocal(date){
        let utcDate=new Date(Date.parse(date));
        const localDate = new Date();
        localDate.setUTCFullYear(utcDate.getUTCFullYear());
        localDate.setUTCMonth(utcDate.getUTCMonth());
        localDate.setUTCDate(utcDate.getUTCDate());
        localDate.setUTCHours(utcDate.getUTCHours());
        const day = ('0' + localDate.getDate()).slice(-2);
        const month = ('0' + (localDate.getMonth() + 1)).slice(-2);
        const year = localDate.getFullYear();
        return `${year}-${month}-${day}`;
        
    }

    function handlerSubmitModifyEndDate(e){
        e.preventDefault()
        const link=`http://localhost:8000/tasks/endDate`
        console.log(e.target["inputNewDate"].value)
        try {
            tryFetchPatch({id_task:selectedTask,newDate:e.target["inputNewDate"].value},link)
        } catch (err) {
            console.log(err)
            setError(true)
        }
    }

    function handlerSubmitModifyDescription(e){
        e.preventDefault()
        const link=`http://localhost:8000/tasks/description`
        try {
            tryFetchPatch({id_task:selectedTask,newDescription:e.target["inputNewDescription"].value.replace(/'/g, "\\'")},link)
        } catch (err) {
            console.log(err)
            setError(true)
        }
    }

    function handlerSubmitModifyDuration(e){
        e.preventDefault()
        const link=`http://localhost:8000/tasks/duration`
        if(e.target["inputNewDays"].value!==null && e.target["inputNewHours"].value!==null && e.target["inputNewMinutes"].value!==null ){
            const duration=(parseInt(e.target["inputNewDays"].value)*24*60)+(parseInt(e.target["inputNewHours"].value)*60)+parseInt(e.target["inputNewMinutes"].value)
            try {
                tryFetchPatch({id_task:selectedTask,newDuration:duration},link)
            } catch (err) {
                console.log(err)
                setError(true)
            }
        }else{
            setError(true)
        }
    }

    function handlerSubmitModify(e){
        handlerSubmitModifyTitle(e)
        handlerSubmitModifyDescription(e)
        handlerSubmitModifyDuration(e)
        handlerSubmitModifyEndDate(e)
        handlerSubmitModifyParent(e)
    }

    return(
        (!results.isLoading && !taskResults.isLoading) ?
            ((!error && !results.error && !taskResults.error) ?
                <main>
                    <form onSubmit={handlerSubmitModify}>
                        <h1>Modifier l'intitulé</h1>
                        <input type="text" name="inputNewTitle" id="inputNewTitle" defaultValue={taskResults.data.task[0].title}/>
                        <h1>Modifier la description</h1>
                        <textarea name="inputNewDescription" id="inputNewDescription" cols="30" rows="10" defaultValue={taskResults.data.task[0].description}></textarea>
                        <h1>Modifier la durée estimée</h1>
                        <input type="number" min={0} name="inputNewDays" id="inputNewDays" defaultValue={calculateDuration(taskResults.data.task[0].duration)[0]} />
                        <input type="number" min={0} name="inputNewHours" id="inputNewHours" defaultValue={calculateDuration(taskResults.data.task[0].duration)[1]} />
                        <input type="number" min={0} name="inputNewMinutes" id="inputNewMinutes" defaultValue={calculateDuration(taskResults.data.task[0].duration)[2]} />
                        <h1>Modifier la date limite</h1>
                        <input type="date" name="inputNewDate" id="inputNewDate" defaultValue={utcToLocal(taskResults.data.task[0].end_date)} />
                        <h1>Déplacer la Tâche</h1>
                        <select name="inputNewPlace" id="inputNewPlace" defaultValue={taskResults.data.task[0].task_category} >
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