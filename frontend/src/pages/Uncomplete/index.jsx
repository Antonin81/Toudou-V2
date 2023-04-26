import { useFetch } from "../../utils/hooks";

function Uncomplete() {
  const { data, isLoading, error } = useFetch('http://localhost:8000/tasks/incomplete')

  if(error){
    return <p>Oups... Désolés pour l'erreur!</p>
  }

  return (
    <div>
      {
      !isLoading 
        ? data.tasksList.map((task)=>{
          return(
          <div key={task.id_task} >
            <br />
            <p>id de task : {task.id_task}</p>
            <p>{task.title}</p>
            <p>{task.is_done}</p>
            <p>{task.description}</p>
            <p>{task.end_date}</p>
            <p>{task.duration}</p>
            <p>{task.completionDate}</p>
            <p>{task.task_category}</p>
            <br />
          </div>)
        })
        :(
        <p>Il y a eu une erreur</p>
        )
      }
    </div>
  );
}

export default Uncomplete;
