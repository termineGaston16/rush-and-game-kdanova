import { useState } from "react"
import './memoryGame.css'

export default function MemoryGame() {

    const [clickcounter, setClickcounter] = useState<0 | 1 | 2>(0)
    const [previousValue, setPreviousValue] = useState<{ value: string, index: number }>({
        index: 0,
        value: ''
    })

    const [board, _setBoard] = useState<string[]>([
        '©', '©', '⁂',
        '⁂', 'Ⅵ', 'Ⅵ',
        'N', 'N', 'Ω'
    ])

    const [tebleroHidden, setTebleroHidden] = useState<string[]>([
        '¿?', '¿?', '¿?',
        '¿?', '¿?', '¿?',
        '¿?', '¿?', '¿?'
    ])

    const flipLetter = (indexOfTheCharter: number) => {
        switch (clickcounter) {
            case 0:
                setClickcounter(1)
                setPreviousValue({
                    index: indexOfTheCharter,
                    value: board[indexOfTheCharter]
                })
                break;

            case 1:
                setClickcounter(2)

                if (board[indexOfTheCharter] === previousValue.value) {
                    console.log('son iguales');

                    const newArray = structuredClone(tebleroHidden)
                    newArray[indexOfTheCharter] = board[indexOfTheCharter]
                    newArray[previousValue.index] = previousValue.value
                    setTebleroHidden(newArray)
                    setClickcounter(0)
                }
                break;

            case 2:
                setClickcounter(0)
                
                const newArray = structuredClone(tebleroHidden)
                newArray[indexOfTheCharter] = '¿?'
                newArray[previousValue.index] = '¿?'
                setTebleroHidden(newArray)

                return
            default:
                break;
        }


        const newArray = structuredClone(tebleroHidden)
        newArray[indexOfTheCharter] = board[indexOfTheCharter]
        setTebleroHidden(newArray)
    }


    return (<main className="MemoryGame">
        <ul className="MemoryGame__list">
            {tebleroHidden.map((item, index) => (
                <li
                    onClick={() => flipLetter(index)}
                    className="MemoryGame__list__item"
                    key={index}>
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    </main>)
}