"use client";
import { createContext, useContext } from "react";
import { useState } from "react";


const seatContext = createContext();

export const SeatContextProvider = ({children}) =>{
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [isSelectedSeats, setIsSelectedSeats] = useState(false);
    return(
        <seatContext.Provider value={{ selectedSeats, setSelectedSeats, isSelectedSeats, setIsSelectedSeats}}> 
            {children}
        </seatContext.Provider>
    )
}

export const useSeatContext = () => useContext(seatContext);