"use client";

import { useEffect, useState } from "react";

export const useCountDown = ({ initialTimeInseconds }) => {
    const [timeInseconds, setTimeInseconds] = useState(initialTimeInseconds);

    useEffect(() => {
        if (timeInseconds <= 0) {
            return;
        }
        const intervalId = setInterval(() =>{
            setTimeInseconds(prevTime => prevTime - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timeInseconds])

    const minutes = Math.floor(timeInseconds / 60);
    const seconds = timeInseconds % 60;

    const displayTime = minutes < 10 ? `0${minutes}` : minutes;
    const displaySeconds = seconds < 10 ? `0${seconds}` : seconds;

    return {
        displayTime: `${displayTime}:${displaySeconds}`,
        isExpired: timeInseconds <= 0
    }
}