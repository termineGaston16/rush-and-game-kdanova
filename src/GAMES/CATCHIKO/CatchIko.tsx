import { useEffect, useRef, useState } from "react";
import './cathIko.css'

interface Props {
    lineOfGames: (numberRandom: number) => void
    timeBeforeLosing: NodeJS.Timeout
}

const CatchIko: React.FC<Props> = ({ lineOfGames, timeBeforeLosing }) => {
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
                            y: prevPosition.y === 0 ? (window.innerHeight + (window.innerHeight / 2)) : 0,
                        }));
                    }
                },
                {
                    root: null,
                    rootMargin: "0px",
                    threshold: 0,
                }
            );

            observer.observe(ikoRef.current);
            return () => {
                observer.disconnect();
            };
        }
    }, []);

    return (
        <main
            ref={flashlightRef}
            className="CatchIko"
        >
            <div
                className="CatchIko__iko"
                ref={ikoRef}
                onClick={() => {
                    clearTimeout(timeBeforeLosing)
                    lineOfGames(Math.floor(Math.random() * 7))
                }}
                style={{
                    top: `${ikoPosition.y}px`,
                    left: `${ikoPosition.x}px`,
                }}
            ></div>
        </main>
    );
}

export default CatchIko;
