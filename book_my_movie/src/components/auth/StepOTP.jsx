import { useAuth } from '@/context/AuthContext';
import { useCountDown } from '@/hooks/useCountdown';
import React, { useRef, useState } from 'react'
import { IoClose } from 'react-icons/io5';

export const StepOTP = ({ onNext }) => {

    const [otpArray, setOtpArray] = useState(new Array(4).fill(""));
    const inputRef = useRef([])
    const { verifyOtpRequest } = useAuth();

    const {displayTime, isExpired} = useCountDown({
        initialTimeInseconds: 2 * 60, // 2 minutes
    })

    const handleVerifyOtp = (e) => {
        e.preventDefault();
        const otp = parseInt(otpArray.join(""), 10);
        verifyOtpRequest(otp, onNext);
    };

    const handleResendOtp = (e) => {
        e.preventDefault();
        // logic for resend otp
    }

    const handleOtpChange = ({target}, index) =>{
      const {value} = target;
      if(!isNaN(parseInt(value))){
        setOtpArray([...otpArray.map((d, idx) => (idx === index ? value : d))])

        // focus on next input
        if(value !== "" && index < inputRef.current.length - 1){
            inputRef.current[index + 1].focus();
        }
      }
    }

    const handleClearOtp = () => {
      setOtpArray(new Array(4).fill(""));
      inputRef.current[0].focus();
    }


  return (
    <div className="flex flex-col gap-3 px-10 py-6">
      <h2 className="text-center text-lg font-semibold">Enter the code sent to your email</h2>

      <p className="text-center text-sm text-gray-500">
        If you don't have an account, we'll create one for you.
      </p>

      {/* old input */}
      <div className='flex items-center justify-center'>
        {otpArray.map((digit, index) => (
            <input 
            type="text" 
            ref={(ref) => inputRef.current[index] = ref}
            key={index}
            value={digit}
            onChange={(e) => handleOtpChange(e, index)}
            name='otp'
            maxLength={1}
            className='w-12 h-12 font-bold text-center rounded-md mx-1 border border-gray-200 bg-gray-900 text-white outline-none'
            />
        ))}

        <button 
        onClick={handleClearOtp}
        type='button' className='w-8 cursor-pointer h-8 border border-gray-200 items-center text-[#f74565] ml-1 font-bold rounded-md'>
            <IoClose size={24} className="inline" />
        </button>
      </div>
      {isExpired ? (
        <p className="text-center text-sm text-indigo-500">OTP expired.Please <a href="" className='underline' onClick={handleResendOtp}>resend OTP</a></p>
      ) : (
        <p className="text-center text-sm text-gray-500">OTP expires in: {displayTime}</p>
      )}
      <button
        type="submit"
        onClick={handleVerifyOtp}
        className="w-full cursor-pointer text-white bg-black py-2 rounded-md text-lg hover:bg-gray-800 transition"
      >
        Continue
      </button>

      <p className="text-[#c4c5c5] text-center m-auto text-[12px]">
        By entering your email id, you're agreeing to our{" "}
        <a href="" className="text-[#f74565]">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="" className="text-[#f74565]">
          Privacy Policy
        </a>
        . Thanks!
      </p>
    </div>
  )
}
