import { useEffect, useRef } from "react";
import { Cable } from "../../INTERFACES/types";

interface Props {
    cableGrabbedData: Cable
}

const CanvasJoinTheCables: React.FC<Props> = ({ cableGrabbedData }) => {

    const canvasRef = useRef<HTMLCanvasElement>(null)
    const { isGrabbing, 
        cableColor, 
        xActualPosition, 
        xInitialPosition, 
        yActualPosition, 
        yInitialPosition } = cableGrabbedData

    useEffect(() => {

        const canvas = canvasRef.current
        if (canvas) {
            const ctx = canvas.getContext('2d')
            if (ctx) {

                ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas
                if (isGrabbing) {
                    ctx.beginPath();
                    ctx.moveTo(xInitialPosition, yInitialPosition); // Punto inicial
                    ctx.lineTo(xActualPosition, yActualPosition); // Punto actual
                    ctx.strokeStyle = cableColor; // Color de la línea
                    ctx.lineWidth = 10; // Ancho de la línea
                    ctx.lineCap = 'round'; // Extremos redondeados
                    ctx.lineJoin = 'round'; // Uniones redondeadas
                    ctx.stroke();
                }
                

            }
        }
    }, [isGrabbing, xActualPosition, xInitialPosition, yActualPosition, yInitialPosition])

    return (<canvas
        ref={canvasRef}
        className="joinTheCables__canvas"
        width={window.innerWidth}
        height={window.innerHeight}
    ></canvas>)
}

export default CanvasJoinTheCables;