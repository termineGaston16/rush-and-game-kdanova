import { FaPlayCircle } from "react-icons/fa";
import { HiQuestionMarkCircle } from "react-icons/hi";
import LogoCompleto from '../../../public/logo(sinfondo)-completo.png'
import './home.css'
import { ReactNode, useRef, useState } from "react";
import HowToPlay from "../HowToPlay/HowToPlay";
import { GiDiamonds } from "react-icons/gi";
import CatchIko from "../../GAMES/CATCHIKO/CatchIko";
import Colors from "../../GAMES/COLORS/Colors";
import CopyTheCode from "../../GAMES/COPYTHECODE/CopyTheCode";
import JoinTheCables from "../../GAMES/JOINTHECABLES/JoinTheCables";
import MemoryGame from "../../GAMES/MEMORYGAME/MemoryGame";
import RotateTheTriangle from "../../GAMES/ROTATETHETRIANGULE/RotateTheTriangle";
import GameWon from "../GameWon/GameWon";
import Before from "../../GAMES/BeforeAndAfter/Before";
import After from "../../GAMES/BeforeAndAfter/After";
import QuickTimeEvent from "../../GAMES/QUICKTIMEEVENT/QuickTimeEvent";


export default function Home() {
    // const [showScoreTable, setShowScoreTable] = useState<boolean>(false)
    // const [showLogin, setShowLogin] = useState<boolean>(false)

    const [showInstructions, setShowInstructions] = useState<boolean>(false)
    const showLocalScore = useRef<number>(0.0)

    const timeLimitRef = useRef<number>(30000)
    const gamesPlayedRef = useRef<number>(0)

    const [showGame, setShowGame] = useState<ReactNode | null>(null)
    const [showCurrentGameTitle, setShowCurrentGameTitle] = useState<string | undefined>(undefined)
    const [gameOvercome, setGameOvercome] = useState<boolean>(false)
    const numberRandomLast = useRef<number>(0)
    const timerRef = useRef<NodeJS.Timeout>(null)

    const lineOfGames = (numberRandom: number) => {
        let number = numberRandom
        while (number === numberRandomLast.current) {
            number = Math.floor(Math.random() * 7)
        }
        numberRandomLast.current = number

        if (timerRef.current) clearTimeout(timerRef.current)
        const timeBeforeLosing = setTimeout(() => {
            setShowGame(<After
                gamesPlayedRef={gamesPlayedRef.current}
                showLocalScore={showLocalScore.current}
                setShowGame={setShowGame}
            />)

            setShowCurrentGameTitle(undefined)
            timeLimitRef.current = 30000
            gamesPlayedRef.current = 0

        }, timeLimitRef.current);
        timerRef.current = timeBeforeLosing

        if (gamesPlayedRef.current <= 0) {
            setShowGame(<Before />);
            gamesPlayedRef.current = 0

            setTimeout(() => {
                continueGameLogic(number, timeBeforeLosing);
            }, 3000);
        } else {
            continueGameLogic(number, timeBeforeLosing);
        }
    };

    const continueGameLogic = (numberRandom: number, timeBeforeLosing: NodeJS.Timeout) => {

        document.title = `${(showLocalScore.current).toFixed(2)} pts. | by KDA/NOVA`

        switch (numberRandom) {
            case 0:
                setGameOvercome(true)
                setTimeout(() => { setGameOvercome(false) }, 3000)

                setShowCurrentGameTitle('¡Atrapa a Iko!');
                setShowGame(<CatchIko
                    lineOfGames={lineOfGames}
                    timeBeforeLosing={timeBeforeLosing}
                />);

                gamesPlayedRef.current += 1
                timeLimitRef.current -= 1000
                break;
            case 1:
                setGameOvercome(true)
                setTimeout(() => { setGameOvercome(false) }, 3000)

                setShowCurrentGameTitle('¡Sigue el Ritmo!');
                setShowGame(<Colors
                    lineOfGames={lineOfGames}
                    timeBeforeLosing={timeBeforeLosing}
                />);

                gamesPlayedRef.current += 1
                timeLimitRef.current -= 1000
                break;
            case 2:
                setGameOvercome(true)
                setTimeout(() => { setGameOvercome(false) }, 3000)

                setShowCurrentGameTitle('¡Copia el Código!');
                setShowGame(<CopyTheCode
                    lineOfGames={lineOfGames}
                    timeBeforeLosing={timeBeforeLosing}
                />);

                gamesPlayedRef.current += 1
                timeLimitRef.current -= 1000
                break;
            case 3:
                setGameOvercome(true)
                setTimeout(() => { setGameOvercome(false) }, 3000)

                setShowCurrentGameTitle('¡Une los Cables!');
                setShowGame(<JoinTheCables
                    lineOfGames={lineOfGames}
                    timeBeforeLosing={timeBeforeLosing}
                />);

                gamesPlayedRef.current += 1
                timeLimitRef.current -= 1000
                break;
            case 4:
                setGameOvercome(true)
                setTimeout(() => { setGameOvercome(false) }, 3000)

                setShowCurrentGameTitle('¡Completa el juego de memoria!');
                setShowGame(<MemoryGame
                    lineOfGames={lineOfGames}
                    timeBeforeLosing={timeBeforeLosing}
                />);

                gamesPlayedRef.current += 1
                timeLimitRef.current -= 1000
                break;
            case 5:
                setGameOvercome(true)
                setTimeout(() => { setGameOvercome(false) }, 3000)

                setShowCurrentGameTitle('¡Presiona los botones indicados!');
                setShowGame(<QuickTimeEvent
                    lineOfGames={lineOfGames}
                    timeBeforeLosing={timeBeforeLosing}
                    setShowGame={setShowGame}
                    gamesPlayedRef={gamesPlayedRef.current}
                    showLocalScore={showLocalScore.current}
                />);

                gamesPlayedRef.current += 1
                timeLimitRef.current -= 1000
                break;
            case 6:
                setGameOvercome(true)
                setTimeout(() => { setGameOvercome(false) }, 3000)

                setShowCurrentGameTitle('¡Gira el Triángulo!');
                setShowGame(<RotateTheTriangle
                    lineOfGames={lineOfGames}
                    timeBeforeLosing={timeBeforeLosing}
                />);

                gamesPlayedRef.current += 1
                timeLimitRef.current -= 1000
                break;
            default:
                console.warn("Número aleatorio fuera del rango esperado.");
        }
    };


    return (<main
        className="Home">

        {showCurrentGameTitle &&
            <div className="showCurrentGameTitle">
                <span className="showCurrentGameTitle__title">{showCurrentGameTitle}</span>
                <div
                    key={timeLimitRef.current}
                    style={{ animation: `timeBar ${timeLimitRef.current / 1000}s linear` }}
                    className="showCurrentGameTitle__timeBar"></div>
            </div>}
        {showGame && showGame}
        {gameOvercome && <GameWon showLocalScore={showLocalScore} />}


        <span className="Home__copyright">KDA/NOVA 2024</span>
        <img className="Home__logo" src={LogoCompleto} alt="Logo de Rush & Game" loading="lazy" />

        <div className="Home__users-data">
            <span className="Home__users-data__name">Punt. local:</span>
            <span className="Home__users-data__score">{showLocalScore.current.toFixed(2)}</span> <GiDiamonds />
        </div>

        <div className="Home__buttons">
            <button
                onClick={() => lineOfGames(Math.floor(Math.random() * 7))}
                className="Home__buttons__play"
                type="button">Jugar <FaPlayCircle /></button>

            <button
                onClick={() => setShowInstructions(true)}
                className="Home__buttons__how-to-play"
                type="button">¿Cómo jugar? <HiQuestionMarkCircle /></button>

            {/* <button
                onClick={() => setShowScoreTable(true)}
                className="Home__buttons__play"
                type="button">Tabla de Punt. <FaListOl /></button> */}


            {/* <div className="Home__buttons__count">

                <button
                    onClick={() => setShowLogin(true)}
                    className="Home__buttons__count__login"
                    type="button">Loguearse <MdOutlineAccountCircle /></button>

                <Link 
                    to={'/crear-perfil'}
                    target="_blank"
                    className="Home__buttons__count__create"
                    >Crear Cuenta <FaPlusCircle /></Link>

            </div> */}
        </div>

        {showInstructions && <HowToPlay setShowInstructions={setShowInstructions} />}
        {/* {showScoreTable && <ScoreTable setShowScoreTable={setShowScoreTable} />}
        {showLogin && <Login 
        setLocalAccount= {setLocalAccount}
        setShowLogin={setShowLogin} />} */}
    </main>)
}