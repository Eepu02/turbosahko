import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";

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
