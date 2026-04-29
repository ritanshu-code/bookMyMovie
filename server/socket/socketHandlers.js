import redis from "../utils/redis.js"; 
import { Socket, Server } from "socket.io";

export const registerSocketHandlers = (socket, io) => {
    // USER JOINS A SHOW ROOM
    // when a user opens the seat layout page we send all the currently locked seats 
    socket.on("join-show", async({showId})=>{
        // join the room using showId 
        socket.join(showId);
        socket.data.showId = showId; // store the showId in socket data for later use
        console.log(`Socket ${socket.id} joined show ${showId}`);

        // fetch locked seats from the redis set 
        // example key: locked-seats:show123 -> ["A1", "A2", "B5"]

        const lockedSeats = await redis.smembers(`locked-seats:${showId}`);
        const activeLockedSeats = [];

        for(const seatId of lockedSeats){
            const LockKey = `seat-lock:${showId}:${seatId}`;
            const exists = await redis.exists(LockKey);
            if(exists){
                activeLockedSeats.push(seatId);
            } else {
                // if lock doesn't exist it means ttl expired but seatId is still in locked-seats set
                // we can clean it up 
                await redis.srem(`locked-seats:${showId}`, seatId);
            }
        }
        // send the locked seats to the users in the room
        socket.emit("locked-seats-initials", {seatIds: activeLockedSeats});
    });

    //LOCK SEATS
    // when user click proceed we lock seats for 5 mins

    socket.on("lock-seats", async ({showId, seatIds, userId})=>{

        if(!showId || !seatIds || !userId) return

        const lockedSeatsKeys = `locked-seats:${showId}`
        const unavailabeSeats = [];

        // step1 check if any of the requested seats are already locked
        for(const seatId of seatIds){
            const seatLockKey = `seat-lock:${showId}:${seatId}`;
            const existingLock = await redis.get(seatLockKey);

            if(existingLock){
                unavailabeSeats.push(seatId);
            }
        }

        // if any seat already locked reject request 

        if(unavailabeSeats.length > 0){
            socket.emit("seat-locked-failed", {
                showId, 
                requested: seatIds,
                 alreadyLocked: unavailabeSeats
            });
            return;
        }

        // step2 lock all seats for the user
        for(const seatId of seatIds){
            const seatLockKey = `seat-lock:${showId}:${seatId}`;

            //store seat lock with ttl
            // ttl = 5 mins = 300 seconds
            await redis.setex(seatLockKey, 300, userId);

            // add seat to the locked seats set for the show
            await redis.sadd(lockedSeatsKeys, seatId);
        }
        // step 3 : broadcast seat lock to everyone in the show 
        io.to(showId).emit("seat-locked", {
            showId,
            seatIds, 
            userId
        });
        console.log(`${userId} locked seats:`, seatIds);
        
    })

    // UNLOCK SEATS
    // triggered when :
    //  - user leaves checkout
    // - user cancles booking

    socket.on("unlock-seats", async({showId, seatIds, userId})=>{
        if(!showId || !seatIds || !userId) return

        const lockedSeatsKeys = `locked-seats:${showId}`;

        for(const seatId of seatIds){
            const seatLockKey = `seat-lock:${showId}:${seatId}`;

            // remove individual seat lock
            await redis.del(seatLockKey);

            // remove seat from locked seats set
            await redis.srem(lockedSeatsKeys, seatId);
        }
        // broadcast seat unlock to everyone in the show
        io.to(showId).emit("seat-unlocked", {
            showId,
            seatIds, 
            userId
        });
        console.log(`${userId} unlocked seats:`, seatIds);

    })

    // SOCKET DISCONNECT
    // we don't manually unlock seats here
    // Redis ttl will automatically release them after 5 mins
    socket.on("disconnect", ()=>{
        const showId = socket.data.showId;
        console.log(`Socket ${socket.id} disconnected from show ${showId}`);
    })
    
}