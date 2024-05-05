import { datasets, type Datasets } from "@/datasets";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { getDataSet } from "@/utils/fetch";
import { Skeleton } from "../ui/skeleton";
import { Header } from "./header";

export const SingleDataCard = async ({ dataset }: { dataset: Datasets }) => {
  const data = datasets[dataset];

  const result = await getDataSet({
    datasetId: data.id,
    searchParams: new URLSearchParams("sortBy=startTime"),
    revalidate: data.revalidate,
  });

  const IconComponent = data.icon;

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Header
            title={data.name}
            Icon={IconComponent}
            isLive={data.revalidate < 60 * 15}
            description={data.description}
          />
        </CardTitle>
      </CardHeader>
      <CardContent>
        {result.success ? (
          <p className="text-4xl font-bold">
            {Math.round(result.data.data.at(0)?.value ?? 0)} MW
          </p>
        ) : (
          <Skeleton />
        )}
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};
