import Task from "../Task"
import React from "react"
import Category from "../Category"

function TasksTreeSection({data, page}){

    function afficherTask(task, niveau){
        const key="task"+task.id_task
        return(
          <Task key={key} id_task={task.id_task} title={task.title} description={task.description} end_date={task.end_date} duration={task.duration} task_category={task.task_category} completionDate={task.completionDate} niveau={niveau} page={page}/>
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

        return(afficherCat(data.firstCategory,0));

}

export default TasksTreeSection