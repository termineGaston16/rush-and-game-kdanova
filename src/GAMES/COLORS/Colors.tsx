import { useEffect, useRef } from 'react'
import './colors.css'

interface Props {
    lineOfGames: (numberRandom: number) => void
    timeBeforeLosing: NodeJS.Timeout
}

const Colors: React.FC<Props> = ({ lineOfGames, timeBeforeLosing }) => {

    const rhythmRef = useRef<number[]>([])
    const playerRhythm = useRef<number[]>([])
    const cycles = useRef<number>(0)

    const simonRef = useRef<HTMLUListElement>(null)
    const simonIndexRef = useRef<number>(0)
    const playerTurn = useRef<boolean>(false)


    const createRhythm = () => {

        for (let index = 0; index < (cycles.current >= 0 ? 1 : cycles.current); index++) {
            rhythmRef.current.push(Math.floor(Math.random() * 4))
        }

        const simonInterval = setInterval(() => {
            showRhythm(rhythmRef.current[simonIndexRef.current])
            simonIndexRef.current += 1

            if (simonIndexRef.current >= cycles.current + 1) {
                clearInterval(simonInterval)
                playerTurn.current = true
            }
        }, 800)
    }

    const showRhythm = (key: number) => {
        simonRef.current?.classList.remove('simon-error')

        setTimeout(() => {
            (simonRef.current?.children[key] as HTMLElement).style.border = '3px solid rgb(11, 11, 11)',
                (simonRef.current?.children[key] as HTMLElement).style.boxShadow = 'none'
        }, 500);
        (simonRef.current?.children[key] as HTMLElement).style.border = '1px solid white',
            (simonRef.current?.children[key] as HTMLElement).style.boxShadow = '0px 0px 5px white'
    }

    const pressKey = (value: number) => {

        if (playerTurn.current) {

            playerRhythm.current.push(value)

            if (playerRhythm.current.every((key, index) => key === rhythmRef.current[index])) {

                if (playerRhythm.current.length === rhythmRef.current.length) {

                    cycles.current += 1
                    playerRhythm.current = []
                    simonIndexRef.current = 0
                    playerTurn.current = false

                    if (cycles.current >= 3) {
                        clearTimeout(timeBeforeLosing)
                        lineOfGames(Math.floor(Math.random() * 7))
                    } else {
                        createRhythm()
                    }

                }

            } else {
                playerRhythm.current = []
                simonIndexRef.current = 0
                playerTurn.current = false

                simonRef.current?.classList.add('simon-error')

                const simonInterval = setInterval(() => {
                    showRhythm(rhythmRef.current[simonIndexRef.current])
                    simonIndexRef.current += 1

                    if (simonIndexRef.current >= cycles.current + 1) {
                        clearInterval(simonInterval)
                        playerTurn.current = true
                    }
                }, 800)

            }
        }
    }

    useEffect(() => { createRhythm() }, [])

    return (<main className='Colors'>
        <ul
            ref={simonRef}
            className='Colors__Simon'>
            <li
                onClick={() => pressKey(0)}
                className='Colors__Simon__btn red'></li>
            <li
                onClick={() => pressKey(1)}
                className='Colors__Simon__btn blue'></li>
            <li
                onClick={() => pressKey(2)}
                className='Colors__Simon__btn green'></li>
            <li
                onClick={() => pressKey(3)}
                className='Colors__Simon__btn yellow'></li>
        </ul>
    </main>)
}

export default Colors