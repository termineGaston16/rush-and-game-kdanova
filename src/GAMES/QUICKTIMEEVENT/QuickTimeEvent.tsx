import { useEffect, useRef, useState } from "react"
import './quickTimeEvent.css'

export default function QuickTimeEvent() {

    const [lettersToAppreciate, setLettersToAppreciate] = useState<{
        key: string,
        isPressed: boolean,
        xPos: number,
        yPos: number,
        timeBeforeLosing: number
    }[]>([])

    const counter = useRef<number>(0)
    const [indexLetter, setIndexLetter] = useState<number>(0)

    useEffect(() => {
        const interval = setInterval(() => {

            setLettersToAppreciate(prevArray => ([...prevArray, {
                isPressed: false,
                key: String.fromCharCode(Math.floor(Math.random() * 26) + 65),
                xPos: Math.floor(Math.random() * 400),
                yPos: Math.floor(Math.random() * 600),
                timeBeforeLosing: 5
            }]))

            ++counter.current

            if (counter.current >= 5) clearInterval(interval)

        }, 1000)

        return () => clearInterval(interval)
    }, [])

    useEffect(() => {

        if (lettersToAppreciate.length < 1) return

        setTimeout(() => {
            if (!lettersToAppreciate[indexLetter].isPressed) {
                // alert('Juego perdido');
            }
        }, 5000);

        setIndexLetter(prevItem => ++prevItem)
    }, [lettersToAppreciate])

    const onKeyDownHandle = (e: React.KeyboardEvent<HTMLElement>) => {
        console.log(e.key);
    }

    return (<main
        onKeyDown={(e) => onKeyDownHandle(e)}
        className="QuickTimeEvent">
        <ul className="QuickTimeEvent__list">
            {lettersToAppreciate.map((letter, index) => (
                <li
                    className={`
                        QuickTimeEvent__list__item
                        ${letter.isPressed && 'keyPress'}
                        `}
                    style={{
                        position: 'absolute',
                        top: letter.xPos,
                        left: letter.yPos
                    }}
                    key={index}>{letter.key}</li>
            ))}
        </ul>
    </main>)
}