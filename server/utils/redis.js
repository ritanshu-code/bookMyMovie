import Redis from "ioredis";

const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    retryStrategy: () => 5000
});

redis.on("error", (err)=>{
    console.error("Redis connection error:", err);
})

redis.on("connect", () => {
    console.log("Connected to Redis successfully");
})

export default redis;