import CopyImg from '../assets/images/copy.svg'

import '../styles/roomCode.scss'

type RoomCodeProps = {
    code: string
}

export function RoomCode(props: RoomCodeProps) {
    function copyRoomCodeClipBoard() {
        navigator.clipboard.writeText(props.code)
    }

    return(
        <button className="room-code" onClick={copyRoomCodeClipBoard}>
            <div>
                <img src={CopyImg} alt="Copy room code" title="Copy room code" />
            </div>
            <span>Sala #{props.code}</span>
        </button>
    )
}