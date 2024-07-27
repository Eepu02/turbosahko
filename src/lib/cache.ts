import { redisClient } from "./redis";

const GLOBAL_PREFIX =
  `turbosahko-${process.env.VERCEL_GIT_COMMIT_REF}` || "turbosahko-local";

export const kvCache = <DataType extends object>(
  cachePrefix: string,
  expirationTimeMin: number | false = 120,
) => {
  return {
    get: async (key: string): Promise<DataType | null> => {
      const value = await (
        await redisClient()
      )?.get(`${GLOBAL_PREFIX}-${cachePrefix}-${key}`);
      return value ? (JSON.parse(value) as DataType) : null;
    },
    set: async (key: string, value: DataType) => {
      const returnVal = await (
        await redisClient()
      )?.set(
        `${GLOBAL_PREFIX}-${cachePrefix}-${key}`,
        JSON.stringify(value),
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
