import { useAuth } from '@/context/AuthContext'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import dayjs from 'dayjs'
import { MdEvent, MdLocationOn, MdPayment } from 'react-icons/md'
import { BiSolidCreditCard } from 'react-icons/bi'

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

export default function BookingHistory() {
    const { user } = useAuth()
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchBookingHistory = async () => {
            try {
                setLoading(true)
                const res = await fetch(`/api/bookings/yourBooking/${user?._id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                const bookingData = await res.json();
                setBookings(bookingData)
                console.log(bookingData);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false)
            }
        }
        if (user?._id) {
            fetchBookingHistory();
        }
    }, [user?._id])

    if (loading) {
        return (
            <div className="flex justify-center items-center h-96">
                <p className="text-gray-500">Loading bookings...</p>
            </div>
        )
    }

    if (bookings.length === 0) {
        return (
            <div className="flex justify-center items-center h-96">
                <p className="text-gray-500 text-lg">No bookings yet</p>
            </div>
        )
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Orders</h2>

            <div className="space-y-4">
                {bookings.map((booking) => {
                    const showDateTime = dayjs(`${booking.showId.date} ${booking.showId.startTime}`, "DD-MM-YYYY hh:mm A")
                    const bookingDate = dayjs(booking.bookingDateTime)

                    return (
                        <div key={booking._id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition">
                            {/* Main Content */}
                            <div className="p-4 border-b">
                                <div className="flex gap-4">
                                    {/* Movie Poster */}
                                    <div className="flex-shrink-0">
                                        {booking.showId.movie?.poster_path ? (
                                            <Image
                                                src={`${IMAGE_BASE}${booking.showId.movie.poster_path}`}
                                                alt={booking.showId.movie.title}
                                                width={100}
                                                height={150}
                                                className="object-cover rounded-lg"
                                            />
                                        ) : (
                                            <div className="w-28 h-40 flex items-center justify-center bg-gray-300 rounded-lg text-xs">
                                                <span className="text-gray-500">No Image</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Movie and Show Details */}
                                    <div className="flex-grow">
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <h3 className="text-base font-bold text-gray-800 mb-1">
                                                    {booking.showId.movie?.title || "Unknown Movie"}
                                                </h3>
                                                <p className="text-xs text-gray-600 mb-1">
                                                    <span className="font-semibold text-gray-700">{booking.showId.format}</span>
                                                </p>
                                            </div>
                                            <div className="bg-[#f74565] text-white px-2 py-0.5 rounded text-xs font-semibold">
                                                M-Ticket
                                            </div>
                                        </div>

                                        {/* Date and Time */}
                                        <p className="text-xs text-gray-600 mb-2 flex items-center gap-1">
                                            <MdEvent className="text-[#f74565] text-sm" />
                                            {showDateTime.format('ddd, DD MMM YYYY | hh:mm A')}
                                        </p>

                                        {/* Theater Info */}
                                        <p className="text-xs text-gray-600 mb-2 flex items-center gap-1">
                                            <MdLocationOn className="text-[#f74565] text-sm" />
                                            <span className="font-semibold">{booking.showId.theatre?.name}</span>
                                            <span className="text-xs">— {booking.showId.theatre?.location}, {booking.showId.location}</span>
                                        </p>

                                        {/* Seats */}
                                        <p className="text-xs text-gray-700 mb-3 flex items-center gap-2">
                                            <span className="font-semibold">Seats:</span>
                                            <span className="bg-gray-100 px-2 py-0.5 rounded font-mono text-xs">
                                                {booking.seats.join(", ")}
                                            </span>
                                            <span className="text-xs text-gray-600">Qty: {booking.seats.length}</span>
                                        </p>

                                        {/* Price Breakdown */}
                                        <div className="flex items-center gap-4 pt-2 border-t">
                                            <div className="text-xs">
                                                <p className="text-gray-600">Ticket: <span className="font-semibold text-gray-800">₹{booking.bookingFee.ticketPrice.toFixed(2)}</span></p>
                                                <p className="text-gray-600">Conv Fee: <span className="font-semibold text-gray-800">₹{booking.bookingFee.convenience.toFixed(2)}</span></p>
                                            </div>
                                            <div className="flex-grow text-right">
                                                <p className="text-gray-600 text-xs">Total</p>
                                                <p className="text-lg font-bold text-[#f74565]">₹{booking.bookingFee.total.toFixed(2)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Footer Info */}
                            <div className="bg-gray-50 px-4 py-3 grid grid-cols-3 gap-4 text-xs">
                                <div>
                                    <p className="text-gray-600 text-xs mb-0.5 flex items-center gap-1">
                                        <MdEvent className="text-gray-400" />
                                        Booking Date
                                    </p>
                                    <p className="font-semibold text-gray-800 text-xs">{bookingDate.format('MMM DD YYYY hh:mmA')}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600 text-xs mb-0.5 flex items-center gap-1">
                                        <BiSolidCreditCard className="text-gray-400" />
                                        Payment
                                    </p>
                                    <p className="font-semibold text-gray-800 capitalize text-xs">{booking.paymentMethod}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600 text-xs mb-0.5">Booking ID</p>
                                    <p className="font-semibold text-gray-800 font-mono text-xs">{booking.bookingRef}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )

}