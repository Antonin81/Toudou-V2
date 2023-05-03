import styled from "styled-components"

const StyledCategory = styled.div`
    padding:1em;
    ${({niveau})=>
    `   padding-left:calc(1em + (${niveau}*5%));
    `}
`
const StyledTitle = styled.p`
    font-weight:bold;
`
        

function Category({cat, niveau}){

    return(
        <StyledCategory data-parentcat={cat.parent_category} niveau={niveau}>
            <StyledTitle>{cat.name}</StyledTitle>
        </StyledCategory>
    )
}

export default Category