import { env } from "@/env";
import urlJoin from "url-join";
import { logger } from "./logger";
import { dataSetModel, type DataSet } from "./validate";
import { getSleepTime, ratelimit } from "./ratelimit";

export const fingridFetch = async (url: string, revalidate = 60) => {
  const fetchUrl = urlJoin("https://data.fingrid.fi/api/", url);

  //   const { success, reset } = await ratelimit().limit("fingrid-api");

  //   if (!success) {
  //     const sleepTime = getSleepTime(reset);
  //     logger.warn({ sleepTime }, "Rate limit exceeded");
  //     await new Promise((resolve) => setTimeout(resolve, sleepTime));
  //     logger.info("Woke up from sleep");
  //   }

  const response = await fetch(fetchUrl, {
    headers: {
      "x-api-key": env.FINGRID_API_KEY,
    },
    next: {
      revalidate,
    },
  });
  response.ok
    ? logger.info({ url: fetchUrl, status: response.status }, "Fingrid fetch")
    : logger.warn(
        { url: fetchUrl, status: response.status },
        "Fingrid fetch failed",
      );
  return response;
};

type SuccessResponse = {
  success: true;
  data: DataSet;
};

type FailResponse = {
  success: false;
  status: number;
  message: string;
};

export const getDataSet = async ({
  datasetId,
  searchParams,
  revalidate,
}: {
  datasetId: number;
  searchParams?: URLSearchParams;
  revalidate?: number;
}): Promise<SuccessResponse | FailResponse> => {
  const response = await fingridFetch(
    `/datasets/${datasetId}/data?${searchParams?.toString()}`,
    revalidate,
  );

  if (!response.ok)
    return {
      success: false,
      status: response.status,
      message: response.statusText,
    };

  if (response.status === 429) {
    logger.warn("Rate limit exceeded");
    return { success: false, status: 429, message: "Rate limit exceeded" };
  }

  const json = await response.json();

  const parseResult = dataSetModel.safeParse(json);

  if (!parseResult.success) {
    logger.error(parseResult.error, "Failed to parse data");
    return { success: false, status: 500, message: "Failed to parse data" };
  }

  return {
    success: true,
    data: parseResult.data,
  };
};
