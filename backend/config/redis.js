import { createClient } from "redis";

const r = createClient({
  url: process.env.REDIS_URL
});

r.on("error", (e) => console.log("Redis Error", e));

await r.connect();

export default r;