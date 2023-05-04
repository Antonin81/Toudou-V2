import { Link } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../../utils/style/colors'

const StyledHeader = styled.header`
    background-color:${colors.primary_blue};
`

function Header(){
    return(
        <StyledHeader>
            <div>
                <p>Logo</p>
                <p>TOUDOU</p>
            </div>
            <nav>
            <Link to="/Home">Accueil</Link>
            <Link to="/Uncomplete">En cours</Link>
            <Link to="/Complete">Finies</Link>
            {/* <Link to="/Modify">Modifications</Link> */}
            <Link to="/">Déconnexion</Link>
            </nav>
        </StyledHeader>
    )
}

export default Header