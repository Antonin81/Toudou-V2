import { Link } from "react-router-dom"
import styled from "styled-components"
import colors from "../../utils/style/colors"

const StyledFooter = styled.footer`
    background-color:${colors.primary_blue};
    padding:5% 1%;
`

function Footer(){
    return(
        <StyledFooter>
            <Link to='/MentionsLegales'>Mentions légales</Link>
        </StyledFooter>
    )
}

export default Footer