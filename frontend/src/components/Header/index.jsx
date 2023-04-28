import { Link } from 'react-router-dom'

function Header(){
    return(
        <header>
            <div>
                <p>Logo</p>
                <p>TOUDOU</p>
            </div>
            <nav>
            <Link to="/Home">Accueil</Link>
            <Link to="/Uncomplete">Tâches en cours</Link>
            <Link to="/Complete">Tâches terminées</Link>
            <Link to="/Modify">Modifications</Link>
            <Link to="/">Déconnexion</Link>
            </nav>
        </header>
    )
}

export default Header