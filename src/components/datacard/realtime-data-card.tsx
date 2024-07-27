import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { datasets } from "@/datasets";
import type { Datasets } from "@/datasets";
import { getCachedDataSet } from "@/utils/fetch";
import { Badge } from "../ui/badge";
import { Header } from "./header";

export const RealtimeDataCard = async ({
  current,
  outOf,
}: {
  current: Datasets;
  outOf: Datasets | number;
}) => {
  const max =
    typeof outOf !== "number"
      ? await getCachedDataSet({
          datasetId: datasets[outOf].id,
          searchParams: new URLSearchParams("sortBy=startTime"),
          // revalidate: datasets[outOf].revalidate,
        })
      : outOf;

  const maxCapacity =
    typeof max !== "number"
      ? max.success
        ? max.data.data.at(0)?.value ?? 7200
        : 7200
      : max;

  const now = await getCachedDataSet({
    datasetId: datasets[current].id,
    searchParams: new URLSearchParams("sortBy=startTime"),
    // revalidate: datasets[current].revalidate,
  });

  const nowCapacity = now.success ? now.data.data.at(0)?.value ?? 0 : 0;

  const dataset = datasets[current];

  // Random delay
  // await new Promise((resolve) => setTimeout(resolve, Math.random() * 3000));

  return (
    <Card className={!now.success ? "border-destructive" : ""}>
      <CardHeader>
        <CardTitle>
          <Header
            title={dataset.name}
            Icon={dataset.icon}
            isLive={dataset.revalidate <= 60 * 15}
            description={dataset.description}
          />
        </CardTitle>
      </CardHeader>
      <CardContent>
        {now.success ? (
          <Progress value={(nowCapacity / maxCapacity) * 100} />
        ) : (
          <p>Failed to fetch data</p>
        )}
      </CardContent>
      <CardFooter>
        Maksimikapasiteetti - {Math.round(maxCapacity / 100) * 100}{" "}
        {datasets[current].unit}
      </CardFooter>
    </Card>
  );
};
