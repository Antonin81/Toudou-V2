import styled from "styled-components"
import { Link } from "react-router-dom"

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

    function handleClickAdd(e){
        setIsCategoryCreationPopUpOpened(true)
        setSelectedCategory(cat.id_category)
    }

    const updateLink=`/UpdateCategory/${cat.id_category}`

    return(
        <StyledCategory data-parentcat={cat.parent_category} niveau={niveau}>
            <StyledTitle>{cat.name}</StyledTitle>
            <RightPartCategory>
                <button onClick={handleClickAdd}>+</button>
                <Link to={updateLink}>M</Link>
                <button>S</button>
            </RightPartCategory>
        </StyledCategory>
    )
}

export default Category