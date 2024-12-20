import { useEffect, useRef, useState } from 'react';
import '../STYLES/joinTheCables.css';

export default function JoinTheCables() {

    const [initialPos, setInitialPos] = useState({ x: 0, y: 0 });
    const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleOnDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        setInitialPos({ x: e.clientX, y: e.clientY });
    };

    const handleOnDrag = (e: React.DragEvent<HTMLDivElement>) => {
        if (e.clientX === 0 && e.clientY === 0) return; // Ignora eventos de arrastre inválidos
        setCurrentPos({ x: e.clientX, y: e.clientY });
    };

    const handleOnDragEnd = () => {
        // Limpia el canvas después de soltar el elemento
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    };

    useEffect(() => {
        // Dibuja la línea en el canvas
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpia el canvas
                ctx.beginPath();
                ctx.moveTo(initialPos.x, initialPos.y); // Punto inicial
                ctx.lineTo(currentPos.x, currentPos.y); // Punto actual
                ctx.strokeStyle = 'aqua'; // Color de la línea
                ctx.lineWidth = 30; // Ancho de la línea
                ctx.stroke();
            }
        }
    }, [currentPos]);

    return (
        <main className="joinTheCables">
            {/* Canvas para dibujar las líneas */}
            <canvas
                ref={canvasRef}
                className="joinTheCables__canvas"
                width={window.innerWidth}
                height={window.innerHeight}
            ></canvas>

            <ul className="joinTheCables__firstCables">
                {firstCables.map((cableRightData, i) => (
                    <li
                        key={i}
                        className="joinTheCables__firstCables__item"
                    >
                        <div
                            draggable
                            onDragStart={(e) => handleOnDragStart(e)}
                            onDrag={(e) => handleOnDrag(e)}
                            onDragEnd={handleOnDragEnd}
                            className="joinTheCables__firstCables__item__border"
                            style={{
                                ...(cableRightData === 1 && { backgroundColor: 'aqua' }),
                                ...(cableRightData === 2 && { backgroundColor: 'greenyellow' }),
                                ...(cableRightData === 3 && { backgroundColor: 'blueviolet' }),
                                ...(cableRightData === 4 && { backgroundColor: 'white' }),
                            }}
                        ></div>
                    </li>
                ))}
            </ul>
            <ul className="joinTheCables__secondsCables">
                {secondsCables.map((cableLeftData, i) => (
                    <li
                        key={i}
                        className="joinTheCables__secondsCables__item"
                    ></li>
                ))}
            </ul>
        </main>
    );
}
