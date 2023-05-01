import { useFetch } from "../../utils/hooks"
import Task from "../../components/Task"
import React from "react"
import Category from "../../components/Category"

function Complete(){

  const { data, isLoading, error } = useFetch('http://localhost:8000/tasks/complete')

  function afficherTask(task, niveau){
    const key="task"+task.id_task
    return(
      <Task key={key} id_task={task.id_task} title={task.title} description={task.des} end_date={task.end_date} duration={task.duration} task_category={task.task_category} completionDate={task.completionDate} niveau={niveau}/>
    )
  }

  function afficherCat(cat,niveau){
    const key="cat"+cat.id_category
    return(
      <React.Fragment key={key}>
        <Category cat={cat} niveau={niveau}/>
        {data.tasksMap[cat.id_category] && data.tasksMap[cat.id_category].map((childrenTask)=>{
          return(afficherTask(childrenTask, niveau+1))
        })}
        {data.categoriesMap[cat.id_category] && data.categoriesMap[cat.id_category].map((children)=>{
          return(afficherCat(children,niveau+1))
        })}
      </React.Fragment>
    )
  }

  if(error){
    return <p>Oups... Désolés pour l'erreur!</p>
  }

  return (
    <main>
      {
      !isLoading 
        ? (afficherCat(data.firstCategory,0))
        :(
        <p>Chargement</p>
        )
      }
    </main>
  );
}

export default Complete