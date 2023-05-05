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

function Category({cat, niveau, setIsCategoryCreationPopUpOpened, setSelectedCategory}){

    const [isLoading, setIsLoading]=useState(false)
    const [data, setData]=useState(null)
    const [error, setError]=useState(false)
    const [exists, setExists]=useState(true)

    async function tryFetchPost(reqBody){

        setIsLoading(true)
        try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reqBody)
            };
            const response = await fetch('http://localhost:8000/categories/delete',requestOptions)
            setData(await response.json())
        }catch(err){
            throw err;
        } finally {
            setIsLoading(false)
        }
    }

    function handleClickAdd(e){
        setIsCategoryCreationPopUpOpened(true)
        setSelectedCategory(cat.id_category)
    }

    function handleClickDeletion(e){
        try{
            tryFetchPost({categoryId:cat.id_category})
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