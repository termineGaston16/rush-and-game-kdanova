import { useEffect, useState } from "react";
import './gameWon.css'

interface Props {
    setShowLocalScore: React.Dispatch<React.SetStateAction<number>>
}

const GameWon: React.FC<Props> = ({ setShowLocalScore }) => {

    const [scoreToSum, setScoreToSum] = useState<number>(0.0)
    useEffect(()=>{
        const scoreObtained = parseFloat(Math.random().toFixed(2))
        
        setScoreToSum(scoreObtained)
        setShowLocalScore(prevScore => prevScore += scoreObtained)
    },[])

    return (<div className="GameWon">
        <span className="GameWon__title">¡Juego superado!</span>
        <span className="GameWon__score">+{scoreToSum} pts</span>
    </div>)
}

export default GameWon;