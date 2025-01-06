import { toast, Toaster } from 'sonner'
import './login.css'
import { useQuery } from 'react-query'
import { loginUser } from '../../FIREBASE/database'
import { useState } from 'react'
import { AiOutlineLoading } from "react-icons/ai";

interface Props {
    setShowLogin: React.Dispatch<React.SetStateAction<boolean>>,
    setLocalAccount: React.Dispatch<React.SetStateAction<{
        username: string;
        score: number;
    } | undefined>>
}

const Login: React.FC<Props> = ({ setShowLogin, setLocalAccount }) => {

    const [dataPerfilLocal, setDataPerfilLocal] = useState<{
        usernameLogin: string,
        passwordLogin: string
    } | undefined>(undefined)

    const { isLoading } = useQuery({
        queryKey: ['localAccount', dataPerfilLocal],
        queryFn: () => loginUser(dataPerfilLocal!.usernameLogin, dataPerfilLocal!.passwordLogin),
        enabled: !!dataPerfilLocal,
        cacheTime: 0,
        refetchOnWindowFocus: false,
        retry: 2,
        retryDelay: 2000,
        onSuccess: (newPlayer) => {

            if (!newPlayer) {
                toast.error('Usuario con datos no encontrado.')
                return
            }

            setLocalAccount({
                score: newPlayer.score,
                username: newPlayer.username
            })
            toast.success('Sesión iniciada correctamente')
            setShowLogin(false)
        },
        onError: () => { toast.error('Error al iniciar sesión') }
    })


    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const usernameLogin = (new FormData(e.currentTarget).get('usernameLogin'))?.toString()
            .trim()
            .replace(/\W/g, '')

        const usernamePassword = (new FormData(e.currentTarget).get('usernamePassword'))?.toString()
            .trim()

        if (usernameLogin && usernameLogin.length >= 2 && usernameLogin.length <= 10) {

            if (usernamePassword) {
                setDataPerfilLocal({
                    usernameLogin: usernameLogin,
                    passwordLogin: usernamePassword
                })
            } else {
                toast.error('Failed to usernamePassword')
            }

        } else {
            toast.error('Failed to usernameLogin')
        }

    }

    return (<form
        onSubmit={(e) => onSubmit(e)}
        className="form__login">

        {isLoading
            ?
            <AiOutlineLoading className='form__login__isLoadingLogo' />
            :
            <>
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
            </>
        }
        <Toaster />
    </form>)
}

export default Login;