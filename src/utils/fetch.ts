import { env } from "@/env";
import urlJoin from "url-join";

export const fingridFetch = async (url: string) => {
  const fetchUrl = urlJoin("https://data.fingrid.fi/api/", url);
  const response = await fetch(fetchUrl, {
    headers: {
      "x-api-key": env.FINGRID_API_KEY,
    },
  });
  return response;
};
