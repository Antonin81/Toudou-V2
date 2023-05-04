import { useFetch } from "../../utils/hooks";
import React from "react";
import TasksTreeSection from "../../components/TasksTreeSection";
import colors from "../../utils/style/colors";
import styled from "styled-components";
import { useState } from "react";
import PopUpAdd from '../../components/PopUpAdd';

const TasksTreeSectionStyled = styled.div`
  >*{
    background-color:${colors.yellow};
  }
  >:nth-child(even){
      background-color:gold;
  }
  border-radius: 10px;
  overflow:hidden;
  filter: drop-shadow(0 0 0.75rem rgba(0, 0, 0, 0.2));
  border: 2px dashed ${colors.yellow};
`

const StyledMain = styled.main`
  padding:1em 2em;
`

function Uncomplete() {

  const { data, isLoading, error } = useFetch('http://localhost:8000/tasks/uncomplete')  

  const [isCategoryCreationPopUpOpened, setIsCategoryCreationPopUpOpened] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)

  if(error){
    return <p>Oups... Désolés pour l'erreur!</p>
  }

  return (
    <StyledMain>
      {
      !isLoading 
        ? (
          <TasksTreeSectionStyled>
            <TasksTreeSection data={data} page={"Uncomplete"} setIsCategoryCreationPopUpOpened={setIsCategoryCreationPopUpOpened} setSelectedCategory={setSelectedCategory} />
          </TasksTreeSectionStyled>
          )
        :(
        <p>Chargement</p>
        )
      }
      {
        isCategoryCreationPopUpOpened && <PopUpAdd selectedCategory={selectedCategory} setIsCategoryCreationPopUpOpened={setIsCategoryCreationPopUpOpened} />
      }
    </StyledMain>
  );
}

export default Uncomplete;
