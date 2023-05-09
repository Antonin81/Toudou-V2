import styled from "styled-components"
import { Link } from "react-router-dom"
import { useState } from "react"

const StyledCategory = styled.div`
    padding:1em;
    ${({niveau})=>
    `   padding-left:calc(1em + (${niveau}*5%));
    `}
    display:flex;
    justify-content:space-between;
`
const StyledTitle = styled.p`
    font-weight:bold;
`

const RightPartCategory = styled.div`
    display:flex;
`

function Category({cat, niveau, setIsCategoryCreationPopUpOpened, setSelectedCategory, error, setError}){

    const [exists, setExists]=useState(true)

    async function tryFetchDelete(reqBody){

        try {
            const requestOptions = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reqBody)
            };
            const response = await fetch('http://localhost:8000/categories/delete',requestOptions)
            const infos=await response.json()
            setError(infos.errorHasOccured)
        }catch(err){
            throw err;
        }
    }

    function handleClickAdd(e){
        setIsCategoryCreationPopUpOpened(true)
        setSelectedCategory(cat.id_category)
    }

    function handleClickDeletion(e){
        try{
            tryFetchDelete({categoryId:cat.id_category})
            setExists(false)
        } catch(err){
            console.log(err)
            setError(true)
        }
    }

    const updateLink=`/UpdateCategory/${cat.id_category}`

    return(
        exists && (
        <StyledCategory data-parentcat={cat.parent_category} niveau={niveau}>
            <StyledTitle>{cat.name}</StyledTitle>
            <RightPartCategory>
                <button onClick={handleClickAdd}>+</button>
                <Link to={updateLink}>M</Link>
                <button onClick={handleClickDeletion}>S</button>
            </RightPartCategory>
        </StyledCategory>)
    )
}

export default Category