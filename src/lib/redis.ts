import type { RedisClientType } from "redis";
import { createClient } from "redis";
import { logger } from "../utils/logger";
import { env } from "@/env";

const maxConnectRetry = 10;
const minConnectDelay = 100; // Milliseconds
const maxConnectDelay = 60000; // Milliseconds

let redisClientInstance: RedisClientType | undefined;
let semaphore = false;

export const redisClient = async () => {
  if (!redisClientInstance && !semaphore) {
    semaphore = true; // mark awaited constructor
    redisClientInstance = createClient({
      url: env.KV_URL,
      socket: {
        tls: env.NODE_ENV === "production",
        reconnectStrategy: (retries) => {
          if (retries > maxConnectRetry) {
            logger.warn("Too many retries on Redis. Connection terminated");
            return new Error("Too many retries.");
          } else {
            const wait = Math.min(
              minConnectDelay * Math.pow(2, retries),
              maxConnectDelay,
            );
            logger.info(`waiting ${wait} milliseconds`);
            return wait;
          }
        },
      },
    });
    await redisClientInstance.connect();

    redisClientInstance.on("error", (error) =>
      logger.error({ error }, "Redis client error"),
    );
  }
  return redisClientInstance;
};
