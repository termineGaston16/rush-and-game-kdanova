import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import './copyTheCode.css';

export default function CopyTheCode() {
    const [newCode, setNewCode] = useState<string>('');
    const [showError, setShowError] = useState<boolean>(false);

    useEffect(() => {
        const codeLength = Math.floor(Math.random() * 3) + 5;

        for (let index = 0; index < codeLength; index++) {
            setNewCode((prevCode) => prevCode + String.fromCharCode(Math.floor(Math.random() * 93) + 33));
        }
    }, []);

    const validateCode = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const code = new FormData(e.currentTarget).get('codeByUser') as string;

        if (code === newCode) {
            alert('¡JUEGO GANADO!');
        } else {
            setShowError(true);
        }
    };

    return (
        <main className="CopyTheCode">
            <span
                className={`CopyTheCode__span ${showError && "CopyTheCode__span--error"}`}
            >
                {newCode}
            </span>
            <form className="CopyTheCode__form" onSubmit={(e) => validateCode(e)}>
                <input className="CopyTheCode__form__input" type="text" name="codeByUser" autoFocus/>
                <button className="CopyTheCode__form__btn" type="submit">
                    <FaCheck />
                </button>
            </form>
        </main>
    );
}
