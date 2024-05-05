import { Ratelimit } from "@upstash/ratelimit";
import type { RedisClientType } from "redis";
import { createClient } from "redis";
import { logger } from "./logger";
import { env } from "@/env";
import { kv } from "@vercel/kv";

const GLOBAL_PREFIX =
  `turbosahko-${process.env.VERCEL_GIT_COMMIT_REF}` || "turbosahko-local";

let redisClientInstance: RedisClientType | undefined;
let semaphore = false;

export const redisClient = async () => {
  if (!redisClientInstance && !semaphore) {
    semaphore = true; // mark awaited constructor
    redisClientInstance = createClient({
      socket: {
        tls: env.NODE_ENV === "production",
      },
    });
    redisClientInstance.on("error", (error) =>
      logger.error({ error }, "Redis client error"),
    );
  }
  return redisClientInstance;
};

let ratelimitInstance: Ratelimit | undefined;

// export const ratelimit = async (identifier: string) => {
export const ratelimit = () => {
  if (!ratelimitInstance) {
    // Create a new ratelimiter, that allows 10 requests per 10 seconds
    ratelimitInstance = new Ratelimit({
      redis: kv,
      limiter: Ratelimit.slidingWindow(10, "60 s"),
      analytics: true,
      /**
       * Optional prefix for the keys used in redis. This is useful if you want to share a redis
       * instance with other applications and want to avoid key collisions. The default prefix is
       * "@upstash/ratelimit"
       */
      prefix: "turbosahko-ratelimit",
    });
  }
  return ratelimitInstance;
};

export const getSleepTime = (wakeUpDate: number) => {
  const timeRemainingMillis = wakeUpDate - Date.now();
  const sleepTimeMillis =
    timeRemainingMillis + Math.random() * timeRemainingMillis;
  return sleepTimeMillis;
};
