import type { SuperJSONValue } from "node_modules/superjson/dist/types";
import { redisClient } from "./redis";
import { parse, stringify } from "superjson";
import { logger } from "@/utils/logger";

const GLOBAL_PREFIX =
  `turbosahko-${process.env.VERCEL_GIT_COMMIT_REF}` || "turbosahko-local";

export const kvCache = <DataType extends SuperJSONValue>(
  cachePrefix: string,
  expirationTimeMin: number | false = 120,
) => {
  return {
    get: async (key: string) => {
      logger.info({ key }, "Fetching from cache");
      const value = await (
        await redisClient()
      )?.get(`${GLOBAL_PREFIX}-${cachePrefix}-${key}`);
      return value ? parse<DataType>(value) : null;
    },
    set: async (key: string, value: DataType) => {
      const returnVal = await (
        await redisClient()
      )?.set(
        `${GLOBAL_PREFIX}-${cachePrefix}-${key}`,
        stringify(value),
        (typeof expirationTimeMin === "number" && {
          EX: expirationTimeMin * 60,
        }) ||
          {},
      );
      return returnVal;
    },
    delete: async (key: string) => {
      const returnVal = await (
        await redisClient()
      )?.del(`${GLOBAL_PREFIX}-${cachePrefix}-${key}`);
      return returnVal;
    },
  };
};
