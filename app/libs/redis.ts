import { createClient } from "redis";

export const client = createClient({
  username: "default",
  password: "RWvVsSh2trTLHiPH8CrLCta60RHUaZrn",
  socket: {
    host: "garlanded-end-key-44340.db.redis.io",
    port: 14906,
  },
});

client.on("error", (err) => console.log("Redis Client Error", err));

await client.connect();
