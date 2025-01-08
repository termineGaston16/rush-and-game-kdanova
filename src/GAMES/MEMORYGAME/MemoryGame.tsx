import { useEffect, useRef, useState } from "react"
import './memoryGame.css'

interface Props {
    lineOfGames: (numberRandom: number) => void
    timeBeforeLosing: NodeJS.Timeout
}

const MemoryGame: React.FC<Props> = ({lineOfGames, timeBeforeLosing}) => {

    const fileOneRef = useRef<string | null>(null)
    const fileTwoRef = useRef<string | null>(null)

    const tableRef = useRef<HTMLUListElement>(null)
    const counterToWinRef = useRef<number>(0)

    const [originalBoard, setOriginalBoard] = useState<string[]>([
        '©', '©', '⁂',
        '⁂', 'Ⅵ', 'Ⅵ',
        'N', 'N', 'Ω'
    ])

    const [hiddenBoard, setHiddenBoard] = useState<string[]>(Array(9).fill('¿?'));

    const flipFicha = (indexOfTheFile: number) => {

        if (hiddenBoard[indexOfTheFile] === '¿?') {

            if (!fileOneRef.current) {
                fileOneRef.current = originalBoard[indexOfTheFile]

                const newArray = structuredClone(hiddenBoard)
                newArray[indexOfTheFile] = originalBoard[indexOfTheFile]
                setHiddenBoard(newArray);

                (tableRef.current?.children[indexOfTheFile] as HTMLElement).style.transform = 'rotateY(360deg)'

                return
            }

            if (!fileTwoRef.current) {
                fileTwoRef.current = originalBoard[indexOfTheFile]

                const newArray = structuredClone(hiddenBoard)
                newArray[indexOfTheFile] = originalBoard[indexOfTheFile]
                setHiddenBoard(newArray);

                (tableRef.current?.children[indexOfTheFile] as HTMLElement).style.transform = 'rotateY(360deg)'
            }

            if (fileOneRef.current && fileOneRef.current && fileOneRef.current === fileTwoRef.current) {
                const fileOne = fileOneRef.current;
                const fileTwo = fileTwoRef.current;

                setTimeout(() => {
                    setHiddenBoard(prevArray =>
                        prevArray.map((item, index) => {
                            if (item === fileOne || item === fileTwo) {
                                (tableRef.current?.children[index] as HTMLElement).style.background = 'radial-gradient(circle at 60% 20%, rgba(254, 103, 21, 0.56), rgb(196, 196, 65))';
                                (tableRef.current?.children[index] as HTMLElement).style.border = '1px solid red';
                                (tableRef.current?.children[index] as HTMLElement).style.color = 'aqua';
                                (tableRef.current?.children[index] as HTMLElement).style.textShadow = '0px 0px 10px aqua';
                            }
                            return item;
                        })
                    );
                }, 300);

                counterToWinRef.current += 1
                fileOneRef.current = null;
                fileTwoRef.current = null;

                if (counterToWinRef.current >= 4) {
                    clearTimeout(timeBeforeLosing)
                    lineOfGames(Math.floor(Math.random() * 7))
                }

                return
            } else {
                const fileOne = fileOneRef.current;
                const fileTwo = fileTwoRef.current;

                setTimeout(() => {
                    setHiddenBoard(prevArray => prevArray.map((item, index) => {
                        if (item === fileOne || item === fileTwo) {
                            (tableRef.current?.children[index] as HTMLElement).style.transform = 'rotateY(-360deg)';
                            return '¿?';
                        } else {
                            return item;
                        }
                    }));
                }, 500);

                fileOneRef.current = null;
                fileTwoRef.current = null;
                return
            }

        }
    }

    useEffect(() => {
        const shuffledBoard = [...originalBoard].sort(() => Math.random() - 0.5);
        setOriginalBoard(shuffledBoard);
      }, []);

    return (<main className="MemoryGame">
        <ul
            ref={tableRef}
            className="MemoryGame__list">
            {hiddenBoard.map((item, index) => (
                <li
                    id={index.toString()}
                    onClick={() => flipFicha(index)}
                    className="MemoryGame__list__item"
                    key={index}>

                    <span>{item}</span>
                </li>
            ))}
        </ul>
    </main>)
}

export default MemoryGame;
