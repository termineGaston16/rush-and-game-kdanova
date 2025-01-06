import { useQuery } from 'react-query'
import './scoreTable.css'
import { useEffect, useRef, useState } from 'react'
import { Player } from '../../INTERFACES/types'
import { PiStarThin } from "react-icons/pi";
import { GiCrossMark } from "react-icons/gi";

interface Props {
    setShowScoreTable: React.Dispatch<React.SetStateAction<boolean>>
}

const ScoreTable: React.FC<Props> = ({ setShowScoreTable }) => {

    const [playersOrderedLocally, setPlayersOrderedLocally] = useState<Player[]>([])
    const { isLoading, isError, refetch } = useQuery({
        queryKey: ['players'],
        queryFn: async () => getPlayersFromDB(playersOrderedLocally),
        retry: 2,
        retryDelay: 2000,
        refetchOnWindowFocus: false,
        onSuccess: (newData) => {
            setPlayersOrderedLocally(newData)
        }
    });

    const showResultsPlayersOrderedLocally = (playersOrderedLocally: Player[]) => {

        if (isError) {
            return (<div className='isError-container'>
                <GiCrossMark className='isError-container__icon'/>
                <span className='isError-container__span'>Parece que ocurrió un error inesperado.</span>
                <button
                    type="button"
                    onClick={() => refetch()}
                    className='isError-container__btn'
                >Reintentar</button>
            </div>)
        }

        if (playersOrderedLocally.length > 0) {
            return (<ul className='ScoreTable__container__list'>{
                playersOrderedLocally.map((player, index) => (
                    <li 
                    ref={index === playersOrderedLocally.length - 1 ? lastElementRef : null}
                    className='ScoreTable__container__list__item'
                    key={index}>
                        <span 
                        className='ScoreTable__container__list__item__span'
                        >{index}</span> {player.username} | {player.score.toFixed(2)} <PiStarThin />
                    </li>
                ))}
            </ul>)
        } else {
            return (<div className='isError-container'>
                <GiCrossMark className='isError-container__icon'/>
                <span className='isError-container__span'>No hay resultados</span>
                <button
                    type="button"
                    onClick={() => refetch()}
                    className='isError-container__btn'
                >Reintentar</button>
            </div>)
        }

    }

    const lastElementRef = useRef<HTMLLIElement>(null)
    useEffect(() => {
        if (lastElementRef.current) {
            const observer = new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting) {
                        refetch()
                    }
                },
                {
                    root: null,
                    rootMargin: '0px',
                    threshold: 0.5,
                }
            );

            observer.observe(lastElementRef.current);

            return () => {
                observer.disconnect();
            };
        }
    }, [playersOrderedLocally]);

    return (<div className="ScoreTable">
        <div className="ScoreTable__container">
            <h2 className="ScoreTable__container__title">Tabla de Puntuaciones Global</h2>

            {isLoading ? <span className="ScoreTable__container__loading">Cargando...</span> : showResultsPlayersOrderedLocally(playersOrderedLocally)}
        </div>

        <button
            className="ScoreTabley__btn"
            type="button"
            onClick={() => setShowScoreTable(false)}>Volver</button>
    </div>)
}

export default ScoreTable;