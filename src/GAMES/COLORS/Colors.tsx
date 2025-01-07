import { useEffect, useRef, useState } from 'react'
import './colors.css'

interface Props {
    lineOfGames: (numberRandom: number) => void
    timeBeforeLosing: NodeJS.Timeout
}

const Colors: React.FC<Props> = ({ lineOfGames, timeBeforeLosing }) => {

    const tableRef = useRef<HTMLUListElement>(null)
    const [rhythm, setRhythm] = useState<number[]>([])
    const [playerRhythm, setPlayerRhythm] = useState<number[]>([])

    const createRhythm = () => {
        if (rhythm.length >= 3) {
            clearTimeout(timeBeforeLosing)
            lineOfGames(Math.floor(Math.random() * 7))
            return
        }

        setRhythm(prevArray => [...prevArray, Math.floor(Math.random() * 4)])
    }

    const showPattern = () => {
        if (!tableRef.current) return

        rhythm.forEach((item, index) => {
            setTimeout(() => {

                switch (item) {
                    case 0:
                        (tableRef.current!.children[item] as HTMLLIElement).style.background = "radial-gradient(circle at 50% 60%, rgb(255, 0, 0), rgb(213, 4, 4))";
                        (tableRef.current!.children[item] as HTMLLIElement).style.boxShadow = '0px 0px 50px red'
                        break;
                    case 1:
                        (tableRef.current!.children[item] as HTMLLIElement).style.background = "radial-gradient(circle at 50% 60%, rgb(225, 255, 0), rgb(182, 213, 4))";
                        (tableRef.current!.children[item] as HTMLLIElement).style.boxShadow = '0px 0px 50px yellow'
                        break;
                    case 2:
                        (tableRef.current!.children[item] as HTMLLIElement).style.background = "radial-gradient(circle at 50% 60%, rgb(72, 255, 0), rgb(35, 213, 4))";
                        (tableRef.current!.children[item] as HTMLLIElement).style.boxShadow = '0px 0px 50px green'
                        break;
                    case 3:
                        (tableRef.current!.children[item] as HTMLLIElement).style.background = "radial-gradient(circle at 50% 60%, rgb(0, 17, 255), rgb(4, 18, 213))";
                        (tableRef.current!.children[item] as HTMLLIElement).style.boxShadow = '0px 0px 50px blue'
                        break;

                    default:
                        break;
                }

                setTimeout(() => {
                    switch (item) {
                        case 0:
                            (tableRef.current!.children[item] as HTMLLIElement).style.background = "radial-gradient(circle at 50% 60%, rgb(177, 0, 0), rgb(143, 0, 0))";
                            (tableRef.current!.children[item] as HTMLLIElement).style.boxShadow = 'none'
                            break;
                        case 1:
                            (tableRef.current!.children[item] as HTMLLIElement).style.background = "radial-gradient(circle at 50% 60%, rgb(177, 165, 0), rgb(143, 134, 0))";
                            (tableRef.current!.children[item] as HTMLLIElement).style.boxShadow = 'none'
                            break;
                        case 2:
                            (tableRef.current!.children[item] as HTMLLIElement).style.background = "radial-gradient(circle at 50% 60%, rgb(18, 177, 0), rgb(7, 143, 0)";
                            (tableRef.current!.children[item] as HTMLLIElement).style.boxShadow = 'none'
                            break;
                        case 3:
                            (tableRef.current!.children[item] as HTMLLIElement).style.background = "radial-gradient(circle at 50% 60%, rgb(0, 15, 152), rgb(0, 5, 143)";
                            (tableRef.current!.children[item] as HTMLLIElement).style.boxShadow = 'none'
                            break;

                        default:
                            break;
                    }
                }, 500)

            }, (index + 1) * 500)
        });
    }

    useEffect(() => {
        showPattern()
    }, [rhythm])

    useEffect(() => {
        createRhythm()
    }, [])

    useEffect(() => {
        if (playerRhythm.length > 0 && playerRhythm.length === rhythm.length) {
            if (rhythm.every((item, index) => item === playerRhythm[index])) {
                createRhythm()
            } else {

                tableRef.current?.classList.add('error')
                setTimeout(() => {
                    tableRef.current?.classList.remove('error')
                }, 1500)

                showPattern()
            }
            setPlayerRhythm([])
        }
    }, [playerRhythm])

    return (<main className='Colors'>
        <ul
            ref={tableRef}
            className='Colors__list'>
            <li
                onClick={() => setPlayerRhythm(prevArray => [...prevArray, 0])}
                className='Colors__list__item red'
                style={{
                    borderTopLeftRadius: '1000px',
                    background: "radial-gradient(circle at 50% 60%, rgb(177, 0, 0), rgb(143, 0, 0))"
                }}
            ></li>
            <li
                onClick={() => setPlayerRhythm(prevArray => [...prevArray, 1])}
                className='Colors__list__item yellow'
                style={{
                    borderTopRightRadius: '1000px',
                    background: "radial-gradient(circle at 50% 60%, rgb(177, 165, 0), rgb(143, 134, 0))"
                }}
            ></li>
            <li
                onClick={() => setPlayerRhythm(prevArray => [...prevArray, 2])}
                className='Colors__list__item green'
                style={{
                    borderBottomLeftRadius: '1000px',
                    background: "radial-gradient(circle at 50% 60%, rgb(18, 177, 0), rgb(7, 143, 0)"
                }}
            ></li>
            <li
                onClick={() => setPlayerRhythm(prevArray => [...prevArray, 3])}
                className='Colors__list__item blue'
                style={{
                    borderBottomRightRadius: '1000px',
                    background: "radial-gradient(circle at 50% 60%, rgb(0, 15, 152), rgb(0, 5, 143)"
                }}
            ></li>
        </ul>
    </main>)
}

export default Colors