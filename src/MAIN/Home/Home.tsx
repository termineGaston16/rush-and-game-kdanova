import { FaPlayCircle } from "react-icons/fa";
import { HiQuestionMarkCircle } from "react-icons/hi";
import LogoCompleto from '../../../public/logo(sinfondo)-completo.png'
import './home.css'
import { ReactNode, useState } from "react";
import HowToPlay from "../HowToPlay/HowToPlay";
import { GiDiamonds } from "react-icons/gi";
import CatchIko from "../../GAMES/CATCHIKO/CatchIko";
import Colors from "../../GAMES/COLORS/Colors";
import CopyTheCode from "../../GAMES/COPYTHECODE/CopyTheCode";
import JoinTheCables from "../../GAMES/JOINTHECABLES/JoinTheCables";
import MemoryGame from "../../GAMES/MEMORYGAME/MemoryGame";
import QuickTimeEvent from "../../GAMES/QUICKTIMEEVENT/QuickTimeEvent";
import RotateTheTriangle from "../../GAMES/ROTATETHETRIANGULE/RotateTheTriangle";
import GameWon from "../GameWon/GameWon";


export default function Home() {
    // const [showScoreTable, setShowScoreTable] = useState<boolean>(false)
    // const [showLogin, setShowLogin] = useState<boolean>(false)

    const [showInstructions, setShowInstructions] = useState<boolean>(false)

    const [showLocalScore, setShowLocalScore] = useState<number>(0.0)

    const [timeLimit, setTimeLimit] = useState<number>(60)
    const [gamesWon, setGamesWon] = useState<number>(0)

    const [showGame, setShowGame] = useState<ReactNode | null>(null)
    const [showCurrentGameTitle, setShowCurrentGameTitle] = useState<string | undefined>(undefined)
    const [gameOvercome, setGameOvercome] = useState<boolean>(false)


    const lineOfGames = (numberRandom: number) => {

        // if (gamesWon <= 0) <Befeore></Befeore>

        switch (numberRandom) {
            case 0:
                setGameOvercome(true)

                setShowCurrentGameTitle('¡Atrapa a Iko!');
                setShowGame(<CatchIko lineOfGames={lineOfGames} />);

                setTimeout(() => { setGameOvercome(false) }, 3000)
                break;
            case 1:
                setGameOvercome(true)

                setShowCurrentGameTitle('¡Sigue el Ritmo!');
                setShowGame(<Colors lineOfGames={lineOfGames} />);

                setTimeout(() => { setGameOvercome(false) }, 3000)
                break;
            case 2:
                setGameOvercome(true)

                setShowCurrentGameTitle('¡Copia el Código!');
                setShowGame(<CopyTheCode lineOfGames={lineOfGames} />);

                setTimeout(() => { setGameOvercome(false) }, 3000)
                break;
            case 3:
                setGameOvercome(true)

                setShowCurrentGameTitle('¡Une los Cables!');
                setShowGame(<JoinTheCables lineOfGames={lineOfGames} />);

                setTimeout(() => { setGameOvercome(false) }, 3000)
                break;
            case 4:
                setGameOvercome(true)

                setShowCurrentGameTitle('¡Completa el juego de memoria!');
                setShowGame(<MemoryGame lineOfGames={lineOfGames} />);

                setTimeout(() => { setGameOvercome(false) }, 3000)
                break;
            case 5:
                setGameOvercome(true)

                setShowCurrentGameTitle('¡Presiona los botones indicados!');
                setShowGame(<QuickTimeEvent lineOfGames={lineOfGames} />);

                setTimeout(() => { setGameOvercome(false) }, 3000)
                break;
            case 6:
                setGameOvercome(true)

                setShowCurrentGameTitle('¡Gira el Triángulo!');
                setShowGame(<RotateTheTriangle lineOfGames={lineOfGames} />);

                setTimeout(() => { setGameOvercome(false) }, 3000)
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
                <div className="showCurrentGameTitle__timeBar"></div>
            </div>}
        {showGame && showGame}
        {gameOvercome && <GameWon setShowLocalScore={setShowLocalScore} />}

        <span className="Home__copyright">KDA/NOVA 2024</span>
        <img className="Home__logo" src={LogoCompleto} alt="rush-and-game-logo" loading="lazy" />

        <div className="Home__users-data">
            <span className="Home__users-data__name">Punt. local:</span>
            <span className="Home__users-data__score">{showLocalScore.toFixed(2)}</span> <GiDiamonds />
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