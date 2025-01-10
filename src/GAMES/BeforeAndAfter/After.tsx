import { ReactNode, useEffect, useState } from "react";
import './afther.css'

interface Props {
    gamesPlayedRef: number
    showLocalScore: number
    setShowGame: React.Dispatch<React.SetStateAction<ReactNode>>
}

const After: React.FC<Props> = ({ gamesPlayedRef, showLocalScore, setShowGame }) => {

    const [alertMessage, _setAlertMessage] = useState<string>(() => {
        if (gamesPlayedRef <= 3) {
            return '¡Mejor la próxima!'
        } else if (gamesPlayedRef >= 5 && gamesPlayedRef <= 15) {
            return 'Bien hecho!'
        } else {
            return '¡Has avanzado mucho!'
        }
    })

    useEffect(()=>{
        document.title = 'Rush & Game | by KDA/NOVA'
    },[])

    return (<div className="After">
        <h2 className="After__title">{alertMessage}</h2>

        <div className="After__score-box">
            <span className="After__score-box__games-count">Cant. Juegos <br /> completados: <span className="puntaje">{gamesPlayedRef}</span></span>
            <span className="After__score-box__new-score">Nuevo puntaje: <span className="puntaje">{showLocalScore.toFixed(2)}</span></span>
        </div>

        <button type="button" className="After__btn-menu"
        onClick={()=>setShowGame(null)}
        >Volver al Menú</button>
    </div>)
}

export default After;