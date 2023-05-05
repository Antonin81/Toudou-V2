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
    const [days,hours,minutes]=calculateDuration(duration)
    const [isLoading, setIsLoading]=useState(false)
    const [data, setData]=useState(null)
    const [error, setError]=useState(false)
    const [exists, setExists]=useState(true)

    function handleClick(e){
        if(e.target.type!=="checkbox" && e.target.type!=="Link" && e.target.type!=="submit"){
            setShowAll(!showAll)
        }
    } 

    function calculateDuration(d){
        let days=Math.floor(d/(60*24));
        d-=(60*24*days);
        let hours=Math.floor(d/(60));
        d-=60*hours;
        return [days,hours,d];
    }

    async function tryFetchPost(url,reqBody){

        setIsLoading(true)
        try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reqBody)
            };
            const response = await fetch(`http://localhost:8000${url}`,requestOptions)
            setData(await response.json())
        }catch(err){
            throw err;
        } finally {
            setIsLoading(false)
        }
    }

    function handleClickDeletion(e){
        try{
            tryFetchPost('/tasks/delete',{id_task:id_task})
            setExists(false)
        } catch(err){
            console.log(err)
            setError(true)
        }
    }

    function handleClickCheck(e){
        try{
            tryFetchPost('/tasks/check',{id_task:id_task})
            setExists(false)
        }catch(err){
            console.log(err)
            setError(true)
        }
        
    }

    function utcToLocal(date){
        let utcDate=new Date(Date.parse(date));
        const localDate = new Date();
        localDate.setUTCFullYear(utcDate.getUTCFullYear());
        localDate.setUTCMonth(utcDate.getUTCMonth());
        localDate.setUTCDate(utcDate.getUTCDate());
        localDate.setUTCHours(utcDate.getUTCHours());
        const day = ('0' + localDate.getDate()).slice(-2);
        const month = ('0' + (localDate.getMonth() + 1)).slice(-2);
        const year = localDate.getFullYear();
        return `${day}/${month}/${year}`;
        
    }



    const linkToUpdate=`/UpdateTask/${id_task}`
    return( exists &&
        (<StyledTask data-parentcat={task_category} onClick={handleClick} niveau={niveau}>
            <TopPartTask>
                <LeftPartTask>
                    {page==="Uncomplete"?<input type="checkbox" onChange={handleClickCheck}/>:<input type="checkbox" checked disabled/>}
                    <p>{title}</p>
                </LeftPartTask>
                <RightPartTask>
                    {page==="Uncomplete" && <Link to={linkToUpdate}>M</Link>} 
                    <button onClick={handleClickDeletion}>S</button>
                </RightPartTask>
            </TopPartTask>
            {
                showAll && (
                    <TaskDetailsSection>
                        {description ? <p>description : {description}</p> : <p>description : Non renseignée</p>}
                        {end_date ? <p>date limite : {utcToLocal(end_date)}</p> : <p>date limite : Non renseignée</p>}
                        {duration ? <p>durée estimée : {days}d{hours}h{minutes}m</p> : <p>durée estimée : Non renseignée</p>}
                        {page==="Complete" && completionDate && <p>date de complétion : {completionDate}</p>}
                    </TaskDetailsSection>
                )
            }
            
        </StyledTask>)
    )
}

export default Task