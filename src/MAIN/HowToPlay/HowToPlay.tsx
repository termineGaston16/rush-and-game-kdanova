import './howToPlay.css'

interface Props{
    setShowInstructions: React.Dispatch<React.SetStateAction<boolean>>
}

const HowToPlay: React.FC<Props> =({setShowInstructions})=>{
    return (<div className="HowToPlay">
        <div className="HowToPlay__container">
            <h5 className="HowToPlay__container__subtitle">¿Cómo Jugar?</h5>
            <h2 className="HowToPlay__container__title">RUSH & GAME</h2>

            <span className="HowToPlay__container__span">Une los cables</span>
            <p className="HowToPlay__container__p">Cuatro cables de colores aparecerán en el lado izquierdo. 
                Tu tarea será arrastrarlos y conectarlos con su color correspondiente en el lado derecho.</p>

            <span className="HowToPlay__container__span">Gira el triángulo</span>
            <p className="HowToPlay__container__p">Sujeta y gira el manubrio inferior para hacer girar el triángulo. 
                Deberás lograr que su punta coincida con la luz blanca.
            </p>

            <span className="HowToPlay__container__span">Copia el código</span>
            <p className="HowToPlay__container__p">Se te mostrará un código aleatorio. 
                Deberás copiarlo exactamente como aparece y luego presionar "Enter" o hacer clic en el botón para enviarlo.
            </p>

            <span className="HowToPlay__container__span">El juego de la memoria</span>
            <p className="HowToPlay__container__p">Completa el clásico juego de memoria en una cuadrícula de 6x6. 
                Sin embargo, ten en cuenta que una ficha será una trampa.
            </p>

            <span className="HowToPlay__container__span">Quick Time Event</span>
            <p className="HowToPlay__container__p">Presiona las teclas que aparezcan en la pantalla antes de que se acabe el tiempo asignado para cada una.
            </p>

            <span className="HowToPlay__container__span">Atrapa a Iko</span>
            <p className="HowToPlay__container__p">Iko es juguetona, ¡atrápala haciendo clic mientras se esconde!
            </p>

            <span className="HowToPlay__container__span">Ritmo de colores</span>
            <p className="HowToPlay__container__p">Sigue la secuencia de colores mostrada en la pantalla haciendo clic tres veces en el orden correcto para ganar.
            </p>    
        </div>

        <button 
        className="HowToPlay__btn"
        type="button" 
        onClick={()=>setShowInstructions(false)}>Volver</button>
    </div>)
}

export default HowToPlay;