import React from "react"
import { Link } from "react-router-dom"

function Landing(){
    return(
        <React.Fragment>
            <header>
                <h1>TOUDOU</h1>
                <Link to='/Connection'>Connectez-vous (Call to action)</Link>
            </header>
            <main>
                <article>
                    <h2>Kécécé Toudou</h2>
                    <p>C'est une application web permettant de créer une To-do list en ligne</p>
                </article>
                <article>
                    <h2>Kécécé une to-do list</h2>
                    <p>C'est une liste des tâches que l'on a à faire</p>
                </article>
                <article>
                    <h2>Fonctionnalités</h2>
                    <p>Pour l'instant aucune... à suivre...</p>
                </article>
                <Link to='/Connection'>Connectez-vous (Call to action)</Link>
            </main>
        </React.Fragment>
    )
}

export default Landing