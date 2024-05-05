import { env } from "@/env";
import urlJoin from "url-join";
import { logger } from "./logger";

export const fingridFetch = async (url: string, revalidate = 0) => {
  const fetchUrl = urlJoin("https://data.fingrid.fi/api/", url);
  const response = await fetch(fetchUrl, {
    headers: {
      "x-api-key": env.FINGRID_API_KEY,
    },
    next: {
      revalidate,
    },
  });
  logger.info({ url: fetchUrl, status: response.status }, "Fingrid fetch");
  return response;
};
