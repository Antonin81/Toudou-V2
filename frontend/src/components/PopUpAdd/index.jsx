import { Link } from "react-router-dom"
import styled from "styled-components"

const PopUp = styled.div`
    position:absolute;
    inset:0px;
    background-color:rgba(0, 0, 0, 0.7);
    display:flex;
    align-items:center;
    justify-content:center;
`

const PopUpContent = styled.div`
    background-color:white;
`

function PopUpAdd({selectedCategory, setIsCategoryCreationPopUpOpened}){

    const linkToCategoryCreation=`/CreateCategory/${selectedCategory}`;
    const linkToTaskCreation=`/CreateTask/${selectedCategory}`;

    function handleClickBack(e){
        setIsCategoryCreationPopUpOpened(false)
    }

    return(
        <PopUp>
            <PopUpContent>
                <p>Que voulez-vous ajouter à cette catégorie ? {selectedCategory}</p>
                <Link to={linkToTaskCreation}>Créer une tâche</Link>
                <Link to={linkToCategoryCreation}>Créer une catégorie</Link>
                <button onClick={handleClickBack}>Back</button>
            </PopUpContent>
        </PopUp>
    )
}

export default PopUpAdd