import { createClient } from "redis";
export const redisClient = createClient({
    url: process.env.REDIS_URI
});
redisClient.on("error", (err) => console.log("Error occured in Redis: ", err));
export const connectRedis = async () => {
    await redisClient.connect();
    console.log("Redis connected");
};
//# sourceMappingURL=redis.js.map