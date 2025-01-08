import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import './copyTheCode.css';

interface Props {
    lineOfGames: (numberRandom: number) => void
    timeBeforeLosing: NodeJS.Timeout
}

const CopyTheCode: React.FC<Props> = ({ lineOfGames, timeBeforeLosing }) => {
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
            clearTimeout(timeBeforeLosing)
            lineOfGames(Math.floor(Math.random() * 7))
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
                <input autoComplete="off" className="CopyTheCode__form__input" type="text" name="codeByUser" autoFocus />
                <button className="CopyTheCode__form__btn" type="submit">
                    <FaCheck />
                </button>
            </form>
        </main>
    );
}

export default CopyTheCode;
