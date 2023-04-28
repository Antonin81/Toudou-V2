import { useFetch } from "../../utils/hooks"
import Task from "../../components/Task"

function Complete(){

    const { data, isLoading, error } = useFetch('http://localhost:8000/tasks/complete')

    if(error){
        return <p>Oups... Désolés pour l'erreur!</p>
    }

    return (
      <main>
      {
      !isLoading 
        ? data.tasksList.map((task)=>{
          return(
          <Task key={task.id_task} id_task={task.id_task} title={task.title} description={task.des
          } end_date={task.end_date} duration={task.duration} task_category={task.task_category} completionDate={task.completionDate}/>
          )
        })
        :(
        <p>Chargement</p>
        )
      }
    </main>
    )
}

export default Complete