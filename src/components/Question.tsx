import '../styles/question.scss'
import { ReactNode } from 'react'

type QuestionProps = {
    content: string
    author: {
        name: string 
        avatar: string
    }
    children?: ReactNode
    isAwnsered: boolean
    isHighlighted: boolean
}

export function Question({content, author, children, isAwnsered = false, isHighlighted = false}: QuestionProps) { //o props foi desestruturado
    return(
        <div className={`question ${isAwnsered ? 'answered' : ''} ${isHighlighted ? 'highlighted' : '' && !isAwnsered}`}>
            <p>{content}</p>
            <footer>
                <div className="user-info">
                    <img src={author.avatar} alt={author.name} />
                    <span>{author.name}</span>
                </div>
                <div>{children}</div>
            </footer>
        </div>
    )
}

