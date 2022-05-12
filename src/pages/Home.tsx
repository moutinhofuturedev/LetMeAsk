import { useHistory } from 'react-router-dom'
import { FormEvent } from 'react'
import { useState } from 'react'

import IllustrationImg from '../assets/images/illustration.svg' //forma correta de importar imagens no react
import LogoImage from '../assets/images/logo.svg'
import LogoGoogle from '../assets/images/google-icon.svg'

import { Button } from '../components/button'

import '../styles/auth.scss'
import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'

export function Home() { //componente Home
const history = useHistory() //todo método hook deve ser inserido sempre dentro do componente
const { user, signInWithGoogle } = useAuth()
const [ roomCode, setRoomCode ]  = useState('')


    async function handleCreateRoom() { //função para 'puxar' o caminho que da acesso página de criação de sala
        if (!user) {
            await signInWithGoogle()
        }

        history.push('/rooms/new')

    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault()

        if(roomCode.trim() === '') {
            return
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get()

        if(!roomRef.exists()) {
            alert('Room does not exists!')
            return
        }

        if(roomRef.val().endedAt) {
            alert('Room already closed.')   
        }

        history.push(`/rooms/${roomCode}`)
    }

    return(

        <div id='page-auth'>
            <aside>
                <img src={IllustrationImg} id='illustration-img' alt="Ilustração da página de início" title="Ilustração da página de início"/>
                <strong>Crie salas de Q&amp;A ao vivo</strong>
                <p>Tire dúvidas da sua audiência em tempo real</p>
            </aside>
            <main>
                <div className='main-content'>
                    <img src={LogoImage} alt="Logo Letmeask" title="Logo Letmeask"/>
                    <button onClick={handleCreateRoom} className='create-room'>
                        <img src={LogoGoogle} alt="Logo do Google" title="Logo Google"/>
                        Crie sua sala com o Google
                    </button>
                    <div className='separator'>ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input type="text" placeholder='Digite o código da sala' 
                        onChange={event => setRoomCode(event.target.value)} value={roomCode}/>
                        <Button type="submit">Entrar na sala</Button>  
                    </form>
                </div>
            </main>
        </div>
    )
}


