function Task({id_task, title, description, end_date, duration, task_category, completionDate}){
    return(
        <div>
            <br />
            <p>id de task : {id_task}</p>
            <p>titre : {title}</p>
            <p>description : {description}</p>
            <p>date limite : {end_date}</p>
            <p>durée estimée : {duration}</p>
            <p>catégorie : {task_category}</p>
            {completionDate && <p>date de complétion : {completionDate}</p>}
            <br />
        </div>
    )
}

export default Task