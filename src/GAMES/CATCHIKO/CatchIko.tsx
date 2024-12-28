import { useEffect, useRef, useState } from "react";
import './cathIko.css'

export default function CatchIko() {
    const ikoRef = useRef<HTMLDivElement>(null);
    const flashlightRef = useRef<HTMLDivElement>(null)

    const [ikoPosition, setIkoPosition] = useState<{ x: number; y: number }>({
        x: 0,
        y: 0,
    });

    useEffect(() => {
        if (ikoRef.current) {
            const observer = new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting) {
                        setIkoPosition((prevPosition) => ({
                            x: Math.floor(Math.random() * (document.documentElement.scrollWidth)) - 25,
                            y: prevPosition.y === 0 ? (window.innerHeight + (window.innerHeight / 2))  : 0,
                        }));
                    }
                },
                {
                    root: null,
                    rootMargin: "0px",
                    threshold: .2,
                }
            );

            observer.observe(ikoRef.current);
            return () => {
                observer.disconnect();
            };
        }
    }, []);

    const handleOnMouseMove=(e: React.MouseEvent<HTMLElement, MouseEvent>)=>{
        if(flashlightRef.current){
            const {style} = flashlightRef.current
            style.background = `radial-gradient(circle at ${(e.clientX / window.innerWidth) * 100}% ${(e.clientY / window.innerHeight) * 100}%, rgba(255, 255, 255, 0.412),rgba(0, 0, 0, 0.900) 20%)`
        }
    }

    return (
        <main
            onMouseMove={(e) => handleOnMouseMove(e)}
            ref={flashlightRef}
            className="CatchIko"
        >   
            <div 

            className="CatchIko__flashlight"></div>
            <div
                className="CatchIko__iko"
                ref={ikoRef}
                onClick={() => alert('JUEGO GANADO')}
                style={{
                    position: "absolute",
                    width: "200px",
                    height: "200px",
                    border: "2px solid aqua",
                    borderRadius: "10rem",
                    top: `${ikoPosition.y}px`,
                    left: `${ikoPosition.x}px`,
                    transition: "1.3s",
                }}
            ></div>
        </main>
    );
}
