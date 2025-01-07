import { useEffect, useRef, useState } from 'react';
import { FaArrowsRotate } from "react-icons/fa6";
import CanvasRotateTheTriangle from './CanvasRotateTheTriangle';
import './rotateTheTriangle.css';

interface Props {
    lineOfGames: (numberRandom: number) => void
    timeBeforeLosing: NodeJS.Timeout
}

const RotateTheTriangle: React.FC<Props> = ({ lineOfGames, timeBeforeLosing }) => {
    const [rotationA, setRotationA] = useState<number>(Math.floor(Math.random() * 350));
    const [rotationB, setRotationB] = useState<number>(Math.floor(Math.random() * 350));
    const divRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const lastAngle = useRef(0);

    useEffect(() => {
        while (rotationA === rotationB) {
            setRotationA(Math.floor(Math.random() * 360));
        }
    }, [rotationA, rotationB]);

    const calculateAngle = (clientX: number, clientY: number) => {
        if (!divRef.current) return 0;
        const rect = divRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = clientX - centerX;
        const deltaY = clientY - centerY;

        return Math.atan2(deltaY, deltaX) * (180 / Math.PI); // Convertir a grados
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        isDragging.current = true;
        lastAngle.current = calculateAngle(e.clientX, e.clientY);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (isDragging.current) {

            if (rotationB >= -2 && rotationB <= 2) {
                clearTimeout(timeBeforeLosing)
                lineOfGames(Math.floor(Math.random() * 7))
                return
            }

            const currentAngle = calculateAngle(e.clientX, e.clientY);
            const deltaAngle = currentAngle - lastAngle.current;

            setRotationB((prevRotationB) => prevRotationB + deltaAngle);
            lastAngle.current = currentAngle;
        }
    };

    const handleMouseUp = () => {
        isDragging.current = false;
    };

    return (
        <main className="rotateTheTriangle">
            <section className="rotateTheTriangle__component-of-the-triangle">
                <div
                    style={{ transform: `rotate(${rotationA}deg)` }}
                    className="rotateTheTriangle__component-of-the-triangle__edge-of-the-circle">
                    <div
                        style={{ transform: `rotate(${rotationB}deg)` }}
                        className="rotateTheTriangle__component-of-the-triangle__edge-of-the-circle__triangle"
                    >
                        <CanvasRotateTheTriangle />
                    </div>
                </div>
            </section>
            <section className="handlebar-component">
                <div
                    className="handlebar-component__handlebar"
                    ref={divRef}
                    style={{ transform: `rotate(${rotationB}deg)` }}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                ><FaArrowsRotate className='handlebar-component__handlebar__icon' /></div>
            </section>
        </main>
    );
}

export default RotateTheTriangle;
