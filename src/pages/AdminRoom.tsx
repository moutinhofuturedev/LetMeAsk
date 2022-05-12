import { useHistory, useParams } from 'react-router-dom'
import deleteImg from '../assets/images/delete.svg'
import checkImg from '../assets/images/check.svg'
import answerImg from '../assets/images/answer.svg'

import LogoImage from '../assets/images/logo.svg'
import { Button } from '../components/button'

import { RoomCode } from '../components/RoomCode'

import '../styles/firstRoom.scss'
import { useAuth } from '../hooks/useAuth'
import { Question } from '../components/Question'
import { useRoom } from '../hooks/useRoom'
import { database } from '../services/firebase'


type RoomParams = {
    id: string
}

export function AdminRoom() {
    // const { user } = useAuth()
    const history = useHistory()
    const params = useParams<RoomParams>() 
    const roomId = params.id

    const { title, questions } = useRoom(roomId)

    async function handleEndRoom() {
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date() 
        })

        history.push('/')
    }

    async function handleDeleteQuestion(questionId: string) {
        if (window.confirm('Tem certeza que deseja excluir está pergunta?')) {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
        }
    }

    async function handleCheckQuestionAsAnswered(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAwnsered: true,
        })
    }

    async function handleHighlightQuestion(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighlighted: true,
        })
    }

    return(
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={LogoImage} alt="Letmeask" title="Logo Letmeask" />
                    <div>
                    <RoomCode code={roomId}/>
                    <Button isOutlined onClick={handleEndRoom}>Encerrar Sala</Button>
                    </div>
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    { questions.length > 0 && <span>{ questions.length } pergunta (s)</span>}
                </div>

                <div className="question-list">
                {questions.map(question => {
                    return (
                        <Question key={question.id}
                        content={question.content}
                        author={question.author} isAwnsered={question.isAwnsered} isHighlighted={question.isHighlighted}                        >
                            { !question.isAwnsered && (
                                <>  {/* isto é um container em forma de fragmento para não quebar o CSS (está no lugar da div)*/}
                                    <button type="button"
                                onClick={() => handleCheckQuestionAsAnswered(question.id)}
                            >
                                <img src={checkImg} alt="Marcar pergunta como respondida" title="Pergunta respondida" />
                            </button>
                            <button type="button"
                                onClick={() => handleHighlightQuestion(question.id)}
                            >
                                <img src={answerImg} alt="Dar destaque a pergunta" title="Dar destaque a pergunta" />
                            </button>
                                </>
                            )}
                            <button type="button"
                                onClick={() => handleDeleteQuestion(question.id)}
                            >
                                <img src={deleteImg} alt="Remover Pergunta" title="Remover Pergunta"/>
                            </button>
                        </Question>
                    )
                })}
                </div>
            </main>
        </div>
    )
}


