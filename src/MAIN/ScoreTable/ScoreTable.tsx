import './scoreTable.css'

interface Props{
    setShowScoreTable: React.Dispatch<React.SetStateAction<boolean>>
}



const ScoreTable: React.FC<Props> =({setShowScoreTable})=>{
    return (<div className="ScoreTable">
        <div className="ScoreTable__container">
            <h2 className="ScoreTable__container__title">Tabla de Puntuaciones Global</h2>

              

        </div>

        <button 
        className="ScoreTabley__btn"
        type="button" 
        onClick={()=>setShowScoreTable(false)}>Volver</button>
    </div>)
}

export default ScoreTable;