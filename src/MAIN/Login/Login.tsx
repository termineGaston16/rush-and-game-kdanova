import { toast, Toaster } from 'sonner'
import './login.css'
interface Props {
    setShowLogin: React.Dispatch<React.SetStateAction<boolean>>
}

const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const usernameLogin = (new FormData(e.currentTarget).get('usernameLogin'))?.toString()
        .trim()
        .replace(/\W/g, '')

    const usernamePassword = (new FormData(e.currentTarget).get('usernamePassword'))?.toString()
        .trim()

    if (usernameLogin && usernameLogin.length > 2 && usernameLogin.length < 10) {

        if (usernamePassword) {
            
        } else {
            toast.error('Failed to usernamePassword')
        }

    } else {
        toast.error('Failed to usernameLogin')
    }

}

const Login: React.FC<Props> = ({ setShowLogin }) => {
    return (<form
        onSubmit={(e) => onSubmit(e)}
        className="form__login">
        <h3
            className="form__login__title"
        >¡Logueate para acumular tus puntos!</h3>

        <label
            className="form__login__label-username"
            htmlFor="usernameLogin">Username:</label>
        <input
            className="form__login__input-username"
            type="text" name="usernameLogin" id="usernameLogin"
            minLength={2}
            maxLength={10}
            required />

        <label
            className="form__login__label-password"
            htmlFor="usernamePassword">Password:</label>
        <input
            className="form__login__input-password"
            type="password" name="usernamePassword" id="usernamePassword" required />

        <div className="form__login__btn-container">
            <button
                className="form__login__btn-container-btn"
                style={{ backgroundColor: 'green' }}
                type="submit">Listo</button>
            <button
                className="form__login__btn-container-btn"
                style={{ backgroundColor: 'red' }}
                onClick={() => setShowLogin(false)}
                type="button">Atrás</button>
        </div>
        <Toaster />
    </form>)
}

export default Login;