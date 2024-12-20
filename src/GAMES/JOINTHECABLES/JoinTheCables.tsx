import { useState } from 'react';
import './joinTheCables.css'
import { Cable } from '../../INTERFACES/types';
import CanvasJoinTheCables from './CanvasJoinTheCables';

export default function JoinTheCables() {
    const [firstCables, setFirstCables] = useState<number[]>([1, 2, 3, 4]);
    const [secondsCables, setSecondsCables] = useState<number[]>([1, 2, 3, 4]);

    const [cableGrabbedData, setCableGrabbedData] = useState<Cable | undefined>(undefined)

    const handleOnDragStart = (e: React.DragEvent<HTMLDivElement>, cableColor: string) => {
        setCableGrabbedData({
            isGrabbing: true,
            cableConnected: false,
            cableColor: cableColor,
            xInitialPosition: e.clientX,
            yInitialPosition: e.clientY,
            xActualPosition: e.clientX,
            yActualPosition: e.clientY
        })
    }

    const handleOnDrag = (e: React.DragEvent<HTMLDivElement>) => {
        setCableGrabbedData(prevState => {
            if (!prevState) return prevState

            return {
                ...prevState,
                xActualPosition: e.clientX,
                yActualPosition: e.clientY,
            };
        });

    }

    const handleOnDrop = () => {
        setCableGrabbedData(prevState => {
            if (!prevState) return prevState
            
            return {
                ...prevState,
                cableConnected: true
            }
        })
    }

    const handleOnDragEnd = () => {
        if (!cableGrabbedData?.cableConnected) {
            setCableGrabbedData(undefined)
        }
    }

    return (
        <main
            onDragEnd={handleOnDragEnd}
            className="joinTheCables">

            {cableGrabbedData && <CanvasJoinTheCables cableGrabbedData={cableGrabbedData} />}

            <ul className="joinTheCables__firstCables">
                {firstCables.map((cableRightData, i) => (
                    <li key={i} className="joinTheCables__firstCables__item">
                        <div
                            draggable

                            onDragStart={(e) => handleOnDragStart(e,
                                cableRightData === 1 ? 'aqua' :
                                    cableRightData === 2 ? 'greenyellow' :
                                        cableRightData === 3 ? 'blueviolet' :
                                            cableRightData === 4 ? 'white' :
                                                ''
                            )}
                            onDrag={(e) => handleOnDrag(e)}

                            className="joinTheCables__firstCables__item__border"
                            style={{
                                ...(cableRightData === 1 && { backgroundColor: 'aqua' }),
                                ...(cableRightData === 2 && { backgroundColor: 'greenyellow' }),
                                ...(cableRightData === 3 && { backgroundColor: 'blueviolet' }),
                                ...(cableRightData === 4 && { backgroundColor: 'white' }),
                                cursor: 'grabbing'
                            }}
                        ></div>
                    </li>
                ))}
            </ul>

            <ul className="joinTheCables__secondsCables">
                {secondsCables.map((cableLeftData, i) => (
                    <li key={i}
                        className="joinTheCables__secondsCables__item">

                        <div
                            className="joinTheCables__firstCables__item__border"
                            style={{
                                background: 'radial-gradient(circle at 50% 50%, rgb(38, 38, 38), rgb(16, 16, 16))',
                                ...(cableLeftData === 1 && { border: '4px solid aqua' }),
                                ...(cableLeftData === 2 && { border: '4px solid greenyellow' }),
                                ...(cableLeftData === 3 && { border: '4px solid blueviolet' }),
                                ...(cableLeftData === 4 && { border: '4px solid white' }),
                            }}

                            onDrop={() => handleOnDrop()}
                            onDragOver={(e) => e.preventDefault()}
                        ></div>
                    </li>
                ))}
            </ul>
        </main>
    );
}
