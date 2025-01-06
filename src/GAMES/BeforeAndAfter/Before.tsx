import { useEffect, useState } from "react"
import { BiRadar } from "react-icons/bi";
import './before.css'

export default function Before() {

    const [count, setCount] = useState<number>(3)
    useEffect(() => {
        if (count <= 0) return

        const countSetTimeOut = setTimeout(() => {
            setCount(prevData => prevData - 1)
        }, 1000)

        return () => clearTimeout(countSetTimeOut)
    }, [count])


    return (<main className="Before">
            <BiRadar className="Before__container__icon" />
            <span className="Before__container__count">{count}</span>
    </main>)
}