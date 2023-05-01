import { useState } from "react"
import React from "react"

function Task({id_task, title, description, end_date, duration, task_category, completionDate, niveau}){
    const [showAll, setShowAll]=useState(false)

    function handleClick(e){
        setShowAll(!showAll)
    } 

    return(
        <div data-parentcat={task_category} onClick={handleClick}>
            <br />
            <p>titre : {title}</p>
            {
                showAll && (
                    <React.Fragment>
                        <p>Niveau : {niveau}</p>
                        <p>id de task : {id_task}</p>
                        <p>description : {description}</p>
                        <p>date limite : {end_date}</p>
                        <p>durée estimée : {duration}</p>
                        <p>catégorie : {task_category}</p>
                        {completionDate && <p>date de complétion : {completionDate}</p>}
                    </React.Fragment>
                )
            }
            
            <br />
        </div>
    )
}

export default Task