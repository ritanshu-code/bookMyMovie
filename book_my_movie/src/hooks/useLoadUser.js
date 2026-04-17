"use client";
import { useAuth } from "@/context/AuthContext";
import {  useEffect, useState } from "react";


export const useLoadUser = () => {
    const { setUser, setAuth } = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch("/api/users/me");

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.error);
                }
                
                
                setUser(data);
                setAuth(true);

            } catch (error) {
                console.log("Not logged in");
                setAuth(false);

            } finally {
                setIsLoading(false);
            }
        })(); // ✅ THIS WAS MISSING
    }, []);

    return { isLoading };
};