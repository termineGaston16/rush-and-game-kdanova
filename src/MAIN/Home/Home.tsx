import { FaPlayCircle } from "react-icons/fa";
import { HiQuestionMarkCircle } from "react-icons/hi";
import { MdOutlineAccountCircle } from "react-icons/md";
import { FaPlusCircle } from "react-icons/fa";
import { GiDiamonds } from "react-icons/gi";
import { FaListOl } from "react-icons/fa";

import LogoCompleto from '../../../public/logo(sinfondo)-completo.png'
import './home.css'
import { useEffect, useState } from "react";
import HowToPlay from "../HowToPlay/HowToPlay";
import ScoreTable from "../ScoreTable/ScoreTable";
import { Player } from "../../INTERFACES/types";
import Login from "../Login/Login";

export default function Home() {

    const [showInstructions, setShowInstructions] = useState<boolean>(false)
    const [showScoreTable, setShowScoreTable] = useState<boolean>(false)
    const [showLogin, setShowLogin] = useState<boolean>(false)

    const [localAccount, setLocalAccount] = useState<Player | undefined>(undefined)

    useEffect(() => { document.title = 'Home | Rush & Game' }, [])


    return (<main
        className="Home">
        <span className="Home__copyright">KDA/NOVA 2024</span>
        <img className="Home__logo" src={LogoCompleto} alt="rush-and-game-logo" loading="lazy" />

        {localAccount &&
            <div className="Home__users-data">
                <span className="Home__users-data__name">{localAccount.username}</span>
                <span className="Home__users-data__score">{localAccount.score}k <GiDiamonds /></span>
            </div>}

        <div className="Home__buttons">
            <button
                className="Home__buttons__play"
                type="button">Jugar <FaPlayCircle /></button>

            <button
                onClick={() => setShowInstructions(true)}
                className="Home__buttons__how-to-play"
                type="button">¿Cómo jugar? <HiQuestionMarkCircle /></button>

            <button
                onClick={() => setShowScoreTable(true)}
                className="Home__buttons__play"
                type="button">Tabla de Punt. <FaListOl /></button>


            <div className="Home__buttons__count">

                <button
                    onClick={() => setShowLogin(true)}
                    className="Home__buttons__count__login"
                    type="button">Loguearse <MdOutlineAccountCircle /></button>

                <button
                    className="Home__buttons__count__create"
                    type="button">Crear Cuenta <FaPlusCircle /></button>

            </div>
        </div>

        {showInstructions && <HowToPlay setShowInstructions={setShowInstructions} />}
        {showScoreTable && <ScoreTable setShowScoreTable={setShowScoreTable} />}
        {showLogin && <Login setShowLogin={setShowLogin}/>}
    </main>)
}