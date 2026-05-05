🎬 BookMyMovie – Full-Stack Movie Ticket Booking Platform

A production-style movie ticket booking system built with modern full-stack technologies, featuring real-time seat locking, secure payments, and concurrency-safe booking flow — inspired by platforms like BookMyShow.

🚀 Live Demo

🔗 https://book-my-movie-phi.vercel.app

✨ Key Features

🎟️ Movie Listings & Show Discovery
Browse movies, theatres, and show timings grouped by location

🪑 Real-Time Seat Selection
Live seat locking using Socket.IO to prevent double booking

🔒 Concurrency-Safe Booking System
Redis-based temporary locks + MongoDB transactions ensure data integrity

💳 Secure Payment Integration
Razorpay integration with backend payment verification

⚡ Optimistic UI + Live Sync
Instant UI updates across multiple users/devices

🔐 Authentication System
OTP-based login with JWT, refresh tokens, and HTTP-only cookies

🏗️ Scalable Backend Architecture
Service-based structure with clean separation of concerns

🧠 System Design Highlights

Client (Next.js)

   ↓
   
API Routes (Server Actions / Route Handlers)

   ↓
   
MongoDB (Source of Truth - Bookings, Shows)

   ↓
   
Redis (Temporary Seat Locks - TTL based)

   ↓
   
Socket.IO (Real-time sync across users)

🛠️ Tech Stack

Frontend - 
Next.js (App Router),
React.js,
Tailwind CSS,
Backend,
Node.js,
Next.js API Routes,
Socket.IO,

Database & Infra -
MongoDB (Mongoose),
Redis (Seat locking mechanism)

Payments -
Razorpay (Test mode integration)

Deployment -
Vercel (Frontend + API)

Separate Node server for WebSockets

🔥 Core Engineering Challenges Solved

⚔️ Race Conditions in Seat Booking
→ Solved using Redis locks + MongoDB transactions

🔄 Real-Time State Sync
→ Socket.IO broadcasts seat lock/unlock/book events

💥 Preventing Double Booking
