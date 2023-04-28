import React, { useState } from "react"
import { Navigate } from "react-router-dom"

function Connection(){
    const [goToAccueil, setGoToAccueil]=useState(false)

    const handleSubmitConnection=(e)=>{
        e.preventDefault()
        console.log(`Bonjour ${e.target['inputConnection'].value}, content de vous revoir !`)
        setGoToAccueil(true)
    }

    const handleSubmitInscription=(e)=>{
        e.preventDefault()
        console.log(`Bonjour ${e.target['inputInscription'].value}, merci de vous être inscrit !`)
        setGoToAccueil(true)
    }

    if(goToAccueil){
        return(
            <Navigate to={"/Home"}/>
        )
    }

    return(
        <React.Fragment>
            <main>
                <section>
                    <form onSubmit={handleSubmitConnection}>
                        <fieldset>
                            <legend>Connexion</legend>
                            <input type="text" name="inputConnection" id="" placeholder="Nom d'utilisateur/mail"/>
                            <p>Ici demande de mdp</p>
                            <button type="submit">Valider</button>
                        </fieldset>
                    </form>
                </section>
                <section>
                    <form onSubmit={handleSubmitInscription}>
                        <fieldset>
                            <legend>Inscription</legend>
                            <input type="text" name="inputInscription" id="" placeholder="Mets ton nom d'utilisateur"/>
                            <p>mail, mdp une première fois, confirmation mdp</p>
                            <button type="submit">Valider</button>
                        </fieldset>
                    </form>
                </section>
            </main>
        </React.Fragment>
    )
}

export default Connection