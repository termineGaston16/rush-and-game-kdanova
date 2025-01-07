import { useEffect, useRef, useState } from "react"
import './quickTimeEvent.css'

interface Props {
    lineOfGames: (numberRandom: number) => void
    timeBeforeLosing: NodeJS.Timeout
}

const QuickTimeEvent: React.FC<Props> = ({ lineOfGames, timeBeforeLosing }) => {

    const [lettersToAppreciate, setLettersToAppreciate] = useState<{
        key: string,
        isPressed: boolean,
        xPos: number,
        yPos: number
    }[]>([])
    const lettersPrecionadas = useRef<boolean[]>([false, false, false, false, false])

    const counter = useRef<number>(0)
    const [indexLetter, setIndexLetter] = useState<number>(0)
    const divRef = useRef<null | HTMLUListElement>(null)
    const mainRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const interval = setInterval(() => {

            setLettersToAppreciate(prevArray => ([...prevArray, {
                isPressed: false,
                key: String.fromCharCode(Math.floor(Math.random() * 26) + 65),
                xPos: Math.floor(Math.random() * (divRef.current?.getBoundingClientRect().width! - 100)),
                yPos: Math.floor(Math.random() * (divRef.current?.getBoundingClientRect().height! - 100)),
            }]))

            ++counter.current

            if (counter.current >= 5) clearInterval(interval)

        }, 1000)

        // Enfoca automáticamente el contenedor al montar el componente
        if (mainRef.current) {
            mainRef.current.focus();
        }

        return () => clearInterval(interval)
    }, [])


    useEffect(() => {
        if (lettersToAppreciate.length < 1) return

        setTimeout(() => {
            if (!lettersPrecionadas.current[indexLetter]) {
                alert('fin del juego')
            }
        }, 5000);

        setIndexLetter(prevItem => ++prevItem)
    }, [lettersToAppreciate])


    const onKeyDownHandle = (e: React.KeyboardEvent<HTMLElement>) => {
        const keyPress = e.key.toLocaleUpperCase()

        const indexKeyPress = lettersToAppreciate.findIndex(letter => letter.key === keyPress && !letter.isPressed)

        if (indexKeyPress > -1) {
            const newArray = structuredClone(lettersToAppreciate)
            newArray[indexKeyPress].isPressed = true
            lettersPrecionadas.current[indexKeyPress] = true
            setLettersToAppreciate(newArray)

            if (!lettersPrecionadas.current.some(letter => !letter)) {
                clearTimeout(timeBeforeLosing)
                lineOfGames(Math.floor(Math.random() * 7))
            }
        }
    }

    return (<main
        ref={mainRef}
        tabIndex={0}
        onKeyDown={(e) => onKeyDownHandle(e)}
        className="QuickTimeEvent">
        <ul
            ref={divRef}
            className="QuickTimeEvent__list">
            {lettersToAppreciate.map((letter, index) => (
                <li
                    className={`
                        QuickTimeEvent__list__item
                        ${letter.isPressed && 'keyPress'}
                        `}
                    style={{
                        position: 'absolute',
                        top: letter.yPos,
                        left: letter.xPos
                    }}
                    key={index}>{letter.key}</li>
            ))}
        </ul>
    </main>)
}

export default QuickTimeEvent;