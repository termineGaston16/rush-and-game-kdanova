import { useEffect, useState } from 'react';
import './joinTheCables.css'
import { Cable } from '../../INTERFACES/types';
import CanvasJoinTheCables from './CanvasJoinTheCables';

export default function JoinTheCables() {
    const [firstCables, setFirstCables] = useState<number[]>([1, 2, 3, 4]);
    const [secondsCables, setSecondsCables] = useState<number[]>([1, 2, 3, 4]);
    const [verification, setVerification] = useState<number[]>([0, 0, 0, 0])

    const [cableGrabbedData, setCableGrabbedData] = useState<Cable[]>([])

    const handleOnDragStart = (e: React.DragEvent<HTMLDivElement>, cableRightData: number) => {
        const indexCable = cableGrabbedData.findIndex(cable => cable.cableValue === cableRightData)
        const colorCable = cableRightData === 1 ? 'aqua' :
            cableRightData === 2 ? 'greenyellow' :
                cableRightData === 3 ? 'blueviolet' :
                    cableRightData === 4 ? 'white' :
                        ''

        if (indexCable > -1) {
            const newArray = structuredClone(cableGrabbedData)
            newArray[indexCable] = {
                cableColor: colorCable,
                cableConnected: false,
                cableValue: cableRightData,
                isGrabbing: true,
                xActualPosition: e.clientX,
                xInitialPosition: e.clientX,
                yActualPosition: e.clientY,
                yInitialPosition: e.clientY
            }
            setCableGrabbedData(newArray)

        } else {

            setCableGrabbedData(prevArray => [...prevArray, {
                cableColor: colorCable,
                cableConnected: false,
                cableValue: cableRightData,
                isGrabbing: true,
                xActualPosition: e.clientX,
                xInitialPosition: e.clientX,
                yActualPosition: e.clientY,
                yInitialPosition: e.clientY
            }])
        }

        e.dataTransfer.setData('cableRightData', cableRightData.toString())
    }

    const handleOnDrag = (e: React.DragEvent<HTMLDivElement>, cableRightData: number) => {

        const indexCable = cableGrabbedData.findIndex(cable => cable.cableValue === cableRightData)
        if (indexCable > -1) {
            const newArray = structuredClone(cableGrabbedData)
            newArray[indexCable] = {
                ...cableGrabbedData[indexCable],
                xActualPosition: e.clientX,
                yActualPosition: e.clientY
            }
            setCableGrabbedData(newArray)
        }
    }

    const handleOnDrop = (e: React.DragEvent<HTMLDivElement>, cableLeftData: number) => {
        const indexCable = cableGrabbedData.findIndex(cable => cable.cableValue.toString() === e.dataTransfer.getData('cableRightData'))
        if (indexCable > -1) {
            const newArray = structuredClone(cableGrabbedData)
            newArray[indexCable] = {
                ...cableGrabbedData[indexCable],
                cableConnected: true
            }
            setCableGrabbedData(newArray)
        }



        const newArray = structuredClone(verification)
        const cableRightData = parseInt(e.dataTransfer.getData('cableRightData'))

        if (cableLeftData === cableRightData) {
            newArray[cableRightData - 1] = 1
        } else {
            newArray[cableRightData - 1] = 0
        }
        setVerification(newArray)
    }

    const handleOnDragEnd = () => {
        const newArray = cableGrabbedData.filter(cable => cable.cableConnected)
        setCableGrabbedData(newArray)

        if (verification.every(cable => cable === 1)) alert('¡JUEGO GANADO!')
    }

    function mezclarArray(cables: number[]) {
        const copia = [...cables]; // Crear una copia para evitar mutar el original
        for (let i = copia.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1)); // Elegir un índice al azar
          [copia[i], copia[j]] = [copia[j], copia[i]]; // Intercambiar elementos
        }
        return copia;
      }
      
      useEffect(() => {
        setFirstCables(mezclarArray(firstCables)); 
        setSecondsCables(mezclarArray(secondsCables))
      }, []); 

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

                            onDragStart={(e) => handleOnDragStart(e, cableRightData)}
                            onDrag={(e) => handleOnDrag(e, cableRightData)}

                            className="joinTheCables__firstCables__item__border"
                            style={{
                                ...(cableRightData === 1 && { backgroundColor: 'aqua' }),
                                ...(cableRightData === 2 && { backgroundColor: 'greenyellow' }),
                                ...(cableRightData === 3 && { backgroundColor: 'blueviolet' }),
                                ...(cableRightData === 4 && { backgroundColor: 'white' }),
                                cursor: 'grab'
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

                            onDrop={(e) => handleOnDrop(e, cableLeftData)}
                            onDragOver={(e) => e.preventDefault()}
                        ></div>
                    </li>
                ))}
            </ul>
        </main>
    );
}
