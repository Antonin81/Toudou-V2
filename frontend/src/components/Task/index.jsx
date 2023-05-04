import { useState } from "react"
import React from "react"
import { Link } from "react-router-dom"
import styled, { keyframes } from "styled-components"

const DetailsOpening = keyframes`
    0% {
        max-height:0;
    }
    to {
        max-height:10000px;
    }
`

const TaskDetailsSection = styled.div`
    animation : ${DetailsOpening} 0.8s ease-in normal both;
    overflow-y:hidden;
    padding-top:1em;
` 
const StyledTask = styled.div`
    padding:1em;
    ${({niveau})=>
        `padding-left:calc(1em + (${niveau}*5%));`
    }
    margin-inline:auto;
`
const LeftPartTask = styled.div`
    display:flex;
    flex-wrap:no-wrap;
`

const TopPartTask = styled.div`
    display:flex;
    width:100%;
    display:flex;
    justify-content:space-between;
`

const RightPartTask = styled.div`
    display:flex;
`

function Task({id_task, title, description, end_date, duration, task_category, completionDate, niveau, page}){

    const [showAll, setShowAll]=useState(false)

    function handleClick(e){
        if(e.target.type!=="checkbox" && e.target.type!=="Link"){
            setShowAll(!showAll)
        }
    } 

    const linkToUpdate=`/UpdateTask/${id_task}`
    return(
        <StyledTask data-parentcat={task_category} onClick={handleClick} niveau={niveau}>
            <TopPartTask>
                <LeftPartTask>
                    {page==="Uncomplete"?<input type="checkbox"/>:<input type="checkbox" checked disabled/>}
                    <p>{title}</p>
                </LeftPartTask>
                <RightPartTask>
                    {page==="Uncomplete" && <Link to={linkToUpdate}>M</Link>} 
                    <button>S</button>
                </RightPartTask>
            </TopPartTask>
            {
                showAll && (
                    <TaskDetailsSection>
                        {description ? <p>description : {description}</p> : <p>description : Non renseignée</p>}
                        {end_date ? <p>date limite : {end_date}</p> : <p>date limite : Non renseignée</p>}
                        {duration ? <p>durée estimée : {duration}</p> : <p>durée estimée : Non renseignée</p>}
                        {page==="Complete" && completionDate && <p>date de complétion : {completionDate}</p>}
                    </TaskDetailsSection>
                )
            }
            
        </StyledTask>
    )
}

export default Task