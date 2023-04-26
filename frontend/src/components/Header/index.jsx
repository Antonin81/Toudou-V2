import { Link } from 'react-router-dom'

function Header(){
    return(
        <header>
            <Link to="/">Accueil</Link>
            <Link to="/Uncomplete">Tâches en cours</Link>
            <Link to="/Complete">Tâches terminées</Link>
            <Link to="/Modify">Modifications</Link>
        </header>
    )
}

export default Header