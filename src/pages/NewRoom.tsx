
import { Link, useHistory } from 'react-router-dom' //criação de tag para caminho de acesso de volta a página Home
// import { useContext } from 'react'
import { FormEvent, useState } from 'react'
import { database } from '../services/firebase'

import IllustrationImg from '../assets/images/illustration.svg' //forma correta de importar imagens no react
import LogoImage from '../assets/images/logo.svg'

import { Button } from '../components/button'

import '../styles/auth.scss'
import { useAuth } from '../hooks/useAuth'

export function NewRoom() {
    const { user } = useAuth()
    const history = useHistory()
    const [newRoom, setNewRoom] = useState('')

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault()

        if (newRoom.trim() === '') {
            return
        }

        const roomRef = database.ref('rooms')

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
        })

        history.push(`/rooms/${firebaseRoom.key}`)
    }

    return(
        <div id='page-auth'>
            <aside>
                <img src={IllustrationImg} id='illustration-img' alt="Ilustração da página de início"/>
                <strong>Crie salas de Q&amp;A ao vivo</strong>
                <p>Tire dúvidas da sua audiência em tempo real</p>
            </aside>
            <main>
                <div className='main-content'>
                    <img src={LogoImage} alt="Logo Letmeask"/>
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input type="text" placeholder='Nome da sala' onChange={event => setNewRoom(event.target.value)} value={newRoom}/>
                        <Button type="submit">Criar sala</Button>  
                    </form>
                    <p>
                    Quer entrar em uma sala já existente?  <Link to='/'>Clique aqui</Link> {/* "Link" função de dentro do react-router-dom */}
                    </p>
                </div>
            </main>
        </div>
    )
}


