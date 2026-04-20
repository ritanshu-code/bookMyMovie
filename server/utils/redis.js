import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const redis = new Redis(process.env.REDIS_URL, {
  tls: {},
  maxRetriesPerRequest: null,
});


redis.on("error", (err)=>{
    console.error("Redis connection error:", err);
})

redis.on("connect", () => {
    console.log("Connected to Redis successfully");
})

export default redis;