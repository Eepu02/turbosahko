import { env } from "@/env";
import urlJoin from "url-join";
import { logger } from "./logger";
import { dataSetModel, type DataSet } from "./validate";
import { ratelimit } from "./ratelimit";
import { kvCache } from "@/lib/cache";

export const fingridFetch = async (url: string, revalidate = 60) => {
  const fetchUrl = urlJoin("https://data.fingrid.fi/api/", url);

  await ratelimit().blockUntilReady("fingrid-api", 60_000);

  const response = await fetch(fetchUrl, {
    headers: {
      "x-api-key": env.FINGRID_API_KEY,
    },
    next: {
      // revalidate: 60 * 3,
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

const getDataSet = async ({
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

const datasetCache = kvCache<DataSet>("dataset", 60);

export const getCachedDataSet = async ({
  datasetId,
  searchParams,
}: {
  datasetId: number;
  searchParams?: URLSearchParams;
}): Promise<SuccessResponse | FailResponse> => {
  logger.info({ datasetId, searchParams }, "Fetching dataset");
  const fromCache = await datasetCache.get(`${datasetId}`);

  logger.info({ datasetId, hit: !!fromCache }, "Cache");

  if (fromCache) {
    return { success: true, data: fromCache };
  }

  logger.info({ datasetId, searchParams }, "Fetching dataset from Fingrid");

  const response = await getDataSet({ datasetId, searchParams });

  if (!response.success) return response;

  await datasetCache.set(`${datasetId}`, response.data);

  return response;
};
