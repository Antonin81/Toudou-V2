import React from "react"
import { Link } from "react-router-dom"
import styled from 'styled-components'
import truc from '../../assets/images/truc.svg'
import Footer from '../../components/Footer'

const ParallaxHeader = styled.header`
    position:relative;
    z-index:-1;
    height:100vh;
    width:100%;
    transform-style:preserve-3d;
`

const ParallaxDiv = styled.div`
    height:100%;
    width:100%;
    inset:0;
    position:absolute;
    object-fit:cover;
    background-position:center;
    z-index:-1;
    background-image:url(${({img})=>img});
    background-size:auto calc(${({plan})=>33-(12*plan)}%);
    transform : translateZ(-${({plan})=>10*plan}px) scale(${({plan})=>1+plan});
`

const ParallaxWrapper = styled.div`
    height:100vh;
    overflow-y:auto;
    overflow-x:hidden;
    perspective:10px;
    font-size:2.5rem;
`

const ParallaxTitle = styled.h1`
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%, -50%);
    font-size:8rem;
`

const ParallaxLink = styled(Link)`
    position:absolute;
    top:80%;
    left:50%;
    transform:translate(-50%, -80%);
    font-size:4rem;
`

function Landing(){
    return(
        <ParallaxWrapper>
            <ParallaxHeader>
                <ParallaxTitle>TOUDOU</ParallaxTitle>
                <ParallaxLink to='/Connection'>Connectez-vous (Call to action)</ParallaxLink>
                <ParallaxDiv img={truc} plan={1.75}>
                </ParallaxDiv>
            </ParallaxHeader>
            <main style={{backgroundColor:"white"}}>
                <article>
                    <h2>Kécécé Toudou</h2>
                    <p>C'est une application web permettant de créer une To-do list en ligne.</p>
                </article>
                <article>
                    <h2>Kécécé une to-do list</h2>
                    <p>C'est une liste des tâches que l'on a à faire.</p>
                </article>
                <article>
                    <h2>Fonctionnalités</h2>
                    <p>Permet de stocker des tâches que l'on a à faire, visionner celles qui ne sont pas terminées tout comme celles qui le sont.</p>
                    <br />
                    <p>Ajout de tâches ainsi que leur suppression et leur validation. Une tâche est définie par son titre, sa description, le temps que vous estimez devoir y passer ainsi que la date limite de sa complétion. Les tâches sont entièrement modifiables. à suivre...</p>
                    <br />
                    <p>Vous pouvez également modifier les catégories de tâches.</p>
                    <br />
                </article>
                <Link to='/Connection'>Connectez-vous (Call to action)</Link>
            </main>
            <Footer/>
        </ParallaxWrapper>
    )
}

export default Landing