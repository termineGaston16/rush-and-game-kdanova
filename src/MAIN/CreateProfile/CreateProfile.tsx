import LogoCompleto from '../../../public/logo(sinfondo)-completo.png'

export default function CreateProfile() {
    return (<>
        <header className='CreateProfile-header'>
            <img className="CreateProfile-header__logo" src={LogoCompleto} alt="rush-and-game-logo" loading="lazy" />
        </header>
        <main className='CreateProfile-main'>
            <h2 className='CreateProfile-main__title'>¡Crea una cuenta para poder guardar tu progreso y competir con otros!</h2>

            <form action="">
                <label htmlFor="">Crea un username:</label>
                <input type="text" name="" id="" />

                <label htmlFor="">Crea una contraseña:</label>
                <input type="password" name="" id="" />

                <label htmlFor="">Repite la contraseña creada:</label>
                <input type="password" name="" id="" />

                <button type="submit">¡Play!</button>
            </form>
        </main>
        <footer>
            <p>
                <span>@KDA/NOVA 2025 - @Rush&Game 2025</span>
                Por la presente, se informa al usuario que los datos registrados a través de este sistema serán almacenados en una colección administrada mediante Google Firebase. Estos datos estarán bajo la custodia exclusiva del programador y creador, KDA/NOVA, quien tendrá el único acceso y autoridad para realizar modificaciones, crear nuevos registros o proceder a su eliminación.
                Al proceder a la creación de un perfil, el usuario acepta plena responsabilidad sobre los datos proporcionados, reconociendo que el creador se reserva todos los derechos sobre su gestión. Es imprescindible leer y comprender esta advertencia antes de continuar, ya que cualquier acción realizada implica la aceptación de estas condiciones.</p>
        </footer>
    </>)
}