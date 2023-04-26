import { useEffect, useState } from "react";

function Home() {
  const[taskList, setTaskList]=useState([])
  const[error, setError]=useState(false)

  useEffect(()=>{
    async function fetchTasks(){
      try {
        const response=await fetch('http://localhost:8000/tasks/incomplete')
        const data=await response.json()
        const tasks=data;
        setTaskList(data.tasksList)
        console.log("j'ai les datas!")
      } catch (err) {
        console.log("Il y a une erreur")
        setError(true)
      }
    }
    fetchTasks()
    console.log(taskList)
  },[])

  return (
    <div className="Home">
      <p>Bonjour User!</p>
      {
      !error 
        ? taskList.map((task)=>{
          return(
          <div>
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

export default Home;
