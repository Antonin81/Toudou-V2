import { useFetch } from "../../utils/hooks";
import React from "react";
import TasksTreeSection from "../../components/TasksTreeSection";
import colors from "../../utils/style/colors";
import styled from "styled-components";

const TasksTreeSectionStyled = styled.div`
  >*{
    background-color:${colors.yellow};
  }
  >:nth-child(even){
      background-color:gold;
  }
`

const StyledMain = styled.main`
  padding:1em 2em;
`

function Uncomplete() {

  const { data, isLoading, error } = useFetch('http://localhost:8000/tasks/complete')  

  if(error){
    return <p>Oups... Désolés pour l'erreur!</p>
  }

  return (
    <StyledMain>
      {
      !isLoading 
        ? (
          <TasksTreeSectionStyled>
            <TasksTreeSection data={data} page={"Complete"}/>
          </TasksTreeSectionStyled>
          )
        :(
        <p>Chargement</p>
        )
      }
    </StyledMain>
  );
}

export default Uncomplete;
