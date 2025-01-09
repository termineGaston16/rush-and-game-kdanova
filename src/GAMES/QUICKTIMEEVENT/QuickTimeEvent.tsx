import { ReactNode, useEffect, useRef, useState } from "react"
import './quickTimeEvent.css'
import After from "../BeforeAndAfter/After"

interface Props {
    lineOfGames: (numberRandom: number) => void
    timeBeforeLosing: NodeJS.Timeout
    gamesPlayedRef: number
    showLocalScore: number
    setShowGame: React.Dispatch<React.SetStateAction<ReactNode>>
}

const QuickTimeEvent: React.FC<Props> = ({ lineOfGames, timeBeforeLosing, setShowGame, gamesPlayedRef, showLocalScore }) => {

    const mainRef = useRef<HTMLDivElement>(null)
    const ulRef = useRef<HTMLUListElement>(null)
    useEffect(() => {
        if (mainRef.current) mainRef.current.focus()
    }, [])

    const keysToTouchRef = useRef<string[]>((() => {
        const array: string[] = [];
        for (let index = 0; index < 5; index++) {
            array.push(String.fromCharCode(Math.floor(Math.random() * 26) + 65));
        }
        return array;
    })());
    const xAndYPoss = useRef<{ xPos: number, yPos: number }[]>((() => {

        const array: { xPos: number, yPos: number }[] = []

        for (let index = 0; index < 5; index++) {
            array.push({
                xPos: Math.floor(Math.random() * 100),
                yPos: Math.floor(Math.random() * 100)
            })
        }

        return array;
    })())
    const [keysToDisplay, setKeysToDisplay] = useState<string[]>([])

    const [indexKey, setIndexKey] = useState<number>(0)
    const indexWhenAKeyIsPressedRef = useRef<number>(0)
    const indexArrayPress = useRef<number>(0)
    const timeBeforeLosingRef = useRef<NodeJS.Timeout[]>([])

    const pressKey = (e: React.KeyboardEvent<HTMLElement>) => {
        const keyPress = e.key.toLocaleUpperCase()

        if (keysToTouchRef.current[0] === keyPress) {
            keysToTouchRef.current.splice(0, 1);
            (ulRef.current?.children[indexWhenAKeyIsPressedRef.current] as HTMLElement).classList.add('keyPressed')

            clearTimeout(timeBeforeLosingRef.current[indexWhenAKeyIsPressedRef.current])
            indexWhenAKeyIsPressedRef.current += 1
            indexArrayPress.current += 1

            if (keysToTouchRef.current.length <= 0) {
                clearTimeout(timeBeforeLosing)
                lineOfGames(Math.floor(Math.random() * 7))
            }
        }
        return
    }

    useEffect(() => {
        const setTimeKey = setTimeout(() => {
            setKeysToDisplay(prevArray => [...prevArray, keysToTouchRef.current[indexKey - indexArrayPress.current]])
            setIndexKey(prevItem => prevItem += 1)

            const timeBeforeLosing = setTimeout(() => {
                setShowGame(<After
                    gamesPlayedRef={gamesPlayedRef}
                    showLocalScore={showLocalScore}
                    setShowGame={setShowGame}
                />)
            }, 4000)
            timeBeforeLosingRef.current.push(timeBeforeLosing)

        }, 700)

        if (indexKey >= 5) return clearTimeout(setTimeKey)

        return () => clearTimeout(setTimeKey)
            
    }, [indexKey])

    useEffect(()=>{
        return ()=> timeBeforeLosingRef.current.forEach(timeOut => clearTimeout(timeOut))
    },[])

    return (<main
        className="QuickTimeEvent"
        tabIndex={0}
        ref={mainRef}
        onKeyDown={(e) => pressKey(e)}>

        <ul className="QuickTimeEvent__list"
            ref={ulRef}>

            {keysToDisplay.map((key, index) => (
                <li
                    className="QuickTimeEvent__list__item"
                    key={index}
                    style={{ bottom: `${xAndYPoss.current[index].yPos}%`, left: `${xAndYPoss.current[index].xPos}%` }}
                >
                    {key}
                </li>
            )
            )}

        </ul>
    </main>)
}

export default QuickTimeEvent;
