import { useEffect, useState } from "react"
import './memoryGame.css'

export default function MemoryGame() {

    const [clickcounter, setClickcounter] = useState<0 | 1>(0)
    const [isClickable, setIsClickable] = useState<boolean>(true);
    const [previousValue, setPreviousValue] = useState<{ value: string, index: number}>({
        index: 0,
        value: ''
    })
    const [itemsFound, setItemsFound] = useState<Set<string>>(new Set());

    const [board, setBoard] = useState<string[]>([
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

                if (board[indexOfTheCharter] === previousValue.value) {
                    setItemsFound((prevArray) => {
                        const updatedSet = new Set(prevArray);
                        updatedSet.add(board[indexOfTheCharter]);
                        return updatedSet;
                    });


                    const newArray = structuredClone(tebleroHidden)
                    newArray[indexOfTheCharter] = board[indexOfTheCharter]
                    newArray[previousValue.index] = previousValue.value
                    setTebleroHidden(newArray)
                    setClickcounter(0)

                } else {
                    setIsClickable(false)

                    setTimeout(() => {
                        const newArray = structuredClone(tebleroHidden)
                        newArray[indexOfTheCharter] = '¿?'
                        newArray[previousValue.index] = '¿?'
                        setTebleroHidden(newArray)
                        setClickcounter(0)
                        setIsClickable(true)
                    }, 700)

                }
                break;

            default:
                break;
        }


        const newArray = structuredClone(tebleroHidden)
        newArray[indexOfTheCharter] = board[indexOfTheCharter]
        setTebleroHidden(newArray)
    }

    function shuffleArray(array: string[]): string[] {
        return array
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
    }

    useEffect(() => {
        setBoard(shuffleArray(board))
    }, [])

    useEffect(() => {
        if (itemsFound.size === 4) alert("¡JUEGO GANADO!")
    }, [itemsFound])


    return (<main className="MemoryGame">
        <ul className="MemoryGame__list">
            {tebleroHidden.map((item, index) => (
                <li
                    style={{ pointerEvents: isClickable ? 'auto' : 'none' }}
                    onClick={() => flipLetter(index)}
                    className="MemoryGame__list__item"
                    key={index}>
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    </main>)
}