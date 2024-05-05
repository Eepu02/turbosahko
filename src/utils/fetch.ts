import { env } from "@/env";
import urlJoin from "url-join";
import { logger } from "./logger";
import { dataSetModel, type DataSet } from "./validate";

export const fingridFetch = async (url: string, revalidate = 60) => {
  const fetchUrl = urlJoin("https://data.fingrid.fi/api/", url);
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

export const getDataSet = async ({
  datasetId,
  searchParams,
  revalidate,
}: {
  datasetId: number;
  searchParams?: URLSearchParams;
  revalidate?: number;
}): Promise<DataSet | null> => {
  const response = await fingridFetch(
    `/datasets/${datasetId}/data?${searchParams?.toString()}`,
    revalidate,
  );

  if (!response.ok) return null;

  if (response.status === 429) {
    logger.warn("Rate limit exceeded");
    return null;
  }

  const json = await response.json();

  const parseResult = dataSetModel.safeParse(json);

  if (!parseResult.success) {
    logger.error(parseResult.error, "Failed to parse data");
    return null;
  }

  return parseResult.data;
};
