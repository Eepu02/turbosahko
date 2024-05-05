import { RefreshButton } from "@/components/refresh-button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import { fingridFetch, getDataSet } from "@/utils/fetch";
import { logger } from "@/utils/logger";
import { dataSetModel } from "@/utils/validate";

export default async function HomePage() {
  logger.info("Rendering Home page");

  const today = new Date();
  const todayAtMidnight = new Date(today.setHours(0, 0, 0, 0));

  const tomorrowAtMidnight = new Date(todayAtMidnight);
  tomorrowAtMidnight.setDate(todayAtMidnight.getDate() + 1);

  const totalWind = await getDataSet({
    datasetId: 268,
    searchParams: new URLSearchParams("sortBy=startTime"),
    revalidate: 60 * 60 * 24,
  });

  const maxWindCapacity = totalWind?.data.at(0)?.value ?? 7200;

  const currentWind = await getDataSet({
    datasetId: 181,
    searchParams: new URLSearchParams("sortBy=startTime"),
    revalidate: 60 * 3,
  });

  const currentWindCapacity = currentWind?.data.at(0)?.value ?? 0;

  logger.info({ currentWindCapacity, maxWindCapacity }, "Wind capacity");

  const response = await fingridFetch(
    `/datasets/181/data?startTime=${todayAtMidnight.toISOString()}&endTime=${tomorrowAtMidnight.toISOString()}`,
  );

  if (!response.ok) {
    logger.error(response.statusText, "Failed to fetch data");
    return <div>Failed to fetch data</div>;
  }

  const parsed = await response.json();
  // logger.info(parsed, "Data fethced");

  const data = dataSetModel.parse(parsed);

  return (
    <div>
      {todayAtMidnight.toLocaleString("fi")}
      <div>
        {data.data.map((item) => (
          <div key={item.startTime.toISOString()}>
            <p>{item.value}</p>
          </div>
        ))}
      </div>
      <RefreshButton />
      <Card className="bg-background max-w-sm">
        <CardHeader>
          <CardTitle>{currentWindCapacity} MW</CardTitle>
          <CardDescription>Reaaliaikainen tuulisähkön tuotanto</CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={(currentWindCapacity / maxWindCapacity) * 100} />
        </CardContent>
        <CardFooter>
          Maksimikapasiteetti - {Math.round(maxWindCapacity / 100) * 100} MW
        </CardFooter>
      </Card>
    </div>
  );
}
