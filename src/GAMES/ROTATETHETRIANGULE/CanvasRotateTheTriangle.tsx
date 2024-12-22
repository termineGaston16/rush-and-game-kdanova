import { useEffect, useRef, useState } from "react"

export default function CanvasRotateTheTriangle() {

    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [possibleColors, setPossibleColors] = useState<string[]>(['crimson',
        'darkslateblue',
        'yellow',
        'goldenrod',
        'slategray'])


    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        // Limpiar el canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Crear gradiente lineal para el triángulo
        const gradient = ctx.createLinearGradient(0, 0, 0, 80); // Coordenadas del gradiente
        gradient.addColorStop(0, "white");
        gradient.addColorStop(1, possibleColors[Math.floor(Math.random() * 5)]);

        // Dibujar el triángulo con gradiente
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(150, 5); // Punta superior
        ctx.lineTo(50, 120); // Esquina inferior izquierda
        ctx.lineTo(250, 120); // Esquina inferior derecha
        ctx.closePath();
        ctx.fill();

    }, [])

    return (<canvas ref={canvasRef}
        className="joinTheCables__canvas"
    ></canvas>)
}