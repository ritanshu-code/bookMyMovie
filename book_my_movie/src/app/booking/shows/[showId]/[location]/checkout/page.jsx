"use client"

import { useEffect, useState } from 'react'
import m5 from "../../../../../../../public/recommendedMoviesAssets/m5.avif"
import Image from 'next/image';
import { useParams } from "next/navigation";
import dayjs from 'dayjs';
import { calculateTotalPrice, groupSeatsByType, razorpayScript } from '../../../../../../utils/constants';
import { FaInfoCircle } from "react-icons/fa";
import { BiSolidOffer } from "react-icons/bi";
import { CiCircleQuestion, CiUser } from "react-icons/ci";
import { useAuth } from '@/context/AuthContext';
import { useSeatContext } from '@/context/SeatContext';

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    }
    script.onerror = () => {
      resolve(false);
    }
    document.body.appendChild(script);
  })
}

export default function checkOutPage() {

  const [showData, setShowData] = useState(null);
  const params = useParams();
  const showId = params?.showId;
  const { user } = useAuth()
  const { selectedSeats } = useSeatContext()
  const { base, tax, total } = calculateTotalPrice(selectedSeats)

  console.log(selectedSeats);

  console.log("showId::::", showId)

  useEffect(() => {
    const fetchShowData = async () => {
      try {
        const response = await fetch(`/api/shows/${showId}`);

        if (!response.ok) {
          throw new Error("Failed to fetch show data");
        }

        const data = await response.json();

        console.log("Fetched show data:", data);

        setShowData(data); // ✅ store it

      } catch (error) {
        console.error("Error fetching show data:", error);
      }
    };

    if (showId) fetchShowData();
  }, [showId]);

  // payment gateway integration

  const handlePaymentSuccess = async (response) => {
    try {
      const paymentData = {
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
      };
      const verifyResponse = await fetch("/api/payment/verifyPayment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(paymentData)
      });
      const verifyResult = await verifyResponse.json();

      return verifyResult.success;
    } catch (error) {
      console.error("Payment verification failed:", error);
    }
  }

  const handleBookSeats = async () => {
    try {
      const res = await loadScript(razorpayScript)
      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?")
        return;
      }

      const reqData = {
        amount: total
      }

      try {
        const response = await fetch("/api/payment/createOrder", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(reqData)
        });
        const orderData = await response.json();
        console.log();
        
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: orderData.amount,
          currency: orderData.currency,
          name: "Book My Movie",
          description: "Movie ticket purchase",
          order_id: orderData.id,
          handler: async function (response) {
            console.log(response);
            // const success = await handlePaymentSuccess(response);


          },
          prefill: {
            name: user?.name,
            email: user?.email,
            contact: user?.phone
          },
          theme: {
            color: "#025cca"
          }
        }

        const rzp = new window.Razorpay(options);
        rzp.open();

      } catch (error) {
        console.log("err in razorpay api call", error);

      }

    } catch (error) {
      console.error("Error in booking seats:", error);
    }
  }





  return (
    <div className="min-h-screen w-full bg-white">

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Left Section */}
          <div className="flex-1 space-y-4">

            {/* Movie Details */}
            <div className="flex gap-4">
              <Image
                src={m5}
                alt={showData?.movie.poster_path
                }
                width={100}
                height={150}
              />

              <div>
                <h3 className="font-semibold text-lg">
                  {showData?.movie.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {showData?.movie.certification} •{" "}
                  {showData?.movie.spoken_languages
                    .join(", ")} •{" "}
                  {showData?.movie.format}
                </p>
                <p className="text-sm text-gray-600">
                  {showData?.theatre?.name}, {showData?.theatre.city},{" "}
                  {showData?.theatre.state}
                </p>
              </div>
            </div>
            {/* show details */}
            <div className="border border-gray-200 rounded-[24px] px-6 py-5">
              <p className="text-md font-medium border-b pb-5 border-gray-200">
                {dayjs(showData?.date, "DD-MM-YYYY")
                  .format("D MMMM YYYY")
                  .split(" ")
                  .slice(0, 2)
                  .join(" ")}{" "}
                &nbsp;•{" "}
                <span className="font-semibold">{showData?.startTime}</span>
              </p>
              <div className="flex items-center justify-between mt-4 mb-4">
                <div>
                  <p className="text-md mt-2 font-semibold">
                    {selectedSeats.length} ticket
                  </p>
                  <div className="text-sm text-gray-500">
                    <span className="font-medium">
                      {groupSeatsByType(selectedSeats).map(
                        ({ type, seats }) => (
                          <p key={type} className="font-medium">
                            {type} - {seats.join(", ")}
                          </p>
                        ),
                      )}
                    </span>
                  </div>
                </div>
                <p className="text-md font-semibold mt-2">
                  <span className="text-gray-700">₹</span>
                  {base}
                </p>
              </div>
            </div>
            {/* Cancellation Notice */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-[24px] text-yellow-800 text-sm px-6 py-5 tracking-wide">
              <span className="font-medium flex items-center gap-2">
                <FaInfoCircle size={20} />
                No cancellation or refund available after payment.
              </span>
            </div>
            {/* Offers */}
            <div className="flex items-center justify-between bg-white border border-gray-200 rounded-[24px] px-6 py-5 hover:shadow-sm transition">

              <p className="font-medium text-sm flex items-center gap-2">
                <BiSolidOffer size={20} className="text-blue-500" />
                Available Offers
              </p>

              <p className="text-sm text-blue-600 font-medium cursor-pointer hover:underline">
                View all offers
              </p>

            </div>
          </div>

          {/* Right Section */}
          <div className="w-full lg:w-[340px] space-y-4">
            <h4 className="font-medium text-gray-900 text-lg">
              Payment Summary
            </h4>
            <div className="border border-gray-200 rounded-[24px] px-6 py-7 space-y-2">
              <div className="flex justify-between text-md">
                <span className="text-sm text-gray-500">Order amount</span>
                <span>₹{base}</span>
              </div>
              <div className="flex justify-between text-md pb-4">
                <span className="font-semibold text-sm">Taxes & fees (5%)</span>
                <span>₹{tax}</span>
              </div>
              <div className="flex justify-between text-md font-semibold border-t border-gray-200 pt-4">
                <span>To be paid</span>
                <span>₹{total}</span>
              </div>
            </div>

            {/* User Details */}
            <h4 className="text-lg font-medium">Your details</h4>
            <div className="border flex items-start gap-3 border-gray-200 rounded-[24px] px-6 py-7">
              <CiUser size={24} />
              <div className="-mt-1">
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-sm text-gray-600">+91-{user?.phone}</p>
                <p className="text-sm text-gray-600">{user?.email}</p>
                <p className="text-sm text-gray-600">Delhi</p>
              </div>
            </div>

            {/* Terms and button */}
            <div className="border border-gray-200 rounded-[24px] px-6 py-5">
              <p className="text-sm font-medium cursor-pointer flex items-center gap-2">
                <CiCircleQuestion size={24} /> Terms and conditions
              </p>
            </div>
            <div onClick={handleBookSeats} className="flex justify-between items-center bg-black rounded-[24px] px-6 py-4 cursor-pointer">
              <p className="text-white font-bold">
                ₹{total} <span className="text-xs font-medium">TOTAL</span>
              </p>
              <p className="text-white font-medium">Proceed To Pay</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

