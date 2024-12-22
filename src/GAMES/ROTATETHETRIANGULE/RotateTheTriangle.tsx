import { useRef, useState } from 'react';
import CanvasRotateTheTriangle from './CanvasRotateTheTriangle';
import './rotateTheTriangle.css';

export default function RotateTheTriangle() {
    const [rotation, setRotation] = useState(0);
    const divRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const startAngle = useRef(0);

    const calculateAngle = (clientX: number, clientY: number) => {
        if (!divRef.current) return 0;
        const rect = divRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calcular el ángulo entre el centro del div y el cursor
        const deltaX = clientX - centerX;
        const deltaY = clientY - centerY;
        return Math.atan2(deltaY, deltaX) * (180 / Math.PI); // Convertir a grados
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        isDragging.current = true;
        startAngle.current = calculateAngle(e.clientX, e.clientY) - rotation;
    };

    const handleMouseMove = () => {
        if (isDragging.current) {
            const angle = calculateAngle(e.clientX, e.clientY);
            setRotation(angle - startAngle.current);
        }
    };
    
    const handelMouseUp = () =>{

    }

    return (
        <main className="rotateTheTriangle">
            <section className="rotateTheTriangle__component-of-the-triangle">
                <div className="rotateTheTriangle__component-of-the-triangle__edge-of-the-circle">
                    <div className="rotateTheTriangle__component-of-the-triangle__edge-of-the-circle__triangle">
                        <CanvasRotateTheTriangle />
                    </div>
                </div>
            </section>
            <section className="handlebar-component">
                <div
                    className="handlebar-component__handlebar"
                    ref={divRef}
                    style={{ transform: `rotate(${rotation}deg)`}}

                    onMouseDown={(e) => handleMouseDown(e)}

                ></div>
            </section>
        </main>
    );
}
