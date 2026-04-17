"use client";

import { useContext, createContext, use } from "react";
import { useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [step, setStep] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [otpData, setOtpData] = useState(null);
    const [auth, setAuth] = useState(false);
    const [user, setUser] = useState(null);


    const toggleModal = () => {
        setShowModal(!showModal)
        if(step !== 1){
            setStep(1);
        }
    }

    const sendOtpRequest = async ({ email, onNext, setLoading }) => {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:3000/api/auth/sendOTP", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to send OTP");
            }

            // store email + hash
            setOtpData(data);
            setLoading(false);

            onNext();

        } catch (error) {
            console.error(error.message);
            setLoading(false);
        }
    };

    const verifyOtpRequest = async (otp, onNext) => {
        try {
            if (!otpData) {
                throw new Error("No OTP request found");
            }

            const res = await fetch("http://localhost:3000/api/auth/verifyOTP", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: otpData.email,
                    otp,
                    hash: otpData.hash,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "OTP verification failed");
            }

            // success (cookies already set by backend)
            console.log("User logged in");
            setOtpData(null);
            setUser(data.user);
            setAuth(true);
            if (!data.user?.activateUser) {
                onNext();
            } else {
                setStep(1);
                toggleModal();
            }

        } catch (error) {
            console.error(error.message);
        }
    };

    const activateUserRequest = async (data) => {
        const { name, phone } = data;
        const id = user?._id;
        const requestData = { name, phone, id };
        try {
            const res = await fetch("http://localhost:3000/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || "Failed to activate user");
            }
            setUser(data);
            setStep(1);
            toggleModal();
        } catch (error) {
            console.error(error.message);
        }
    };

    const logoutRequest = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/auth/logout", {
                method: "DELETE",
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || "Failed to logout");
            }
            setUser(null);
            setAuth(false);

        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <AuthContext.Provider value={{ step, setStep, showModal, toggleModal, sendOtpRequest, otpData, verifyOtpRequest, auth, setAuth, setUser, user, activateUserRequest, logoutRequest }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);