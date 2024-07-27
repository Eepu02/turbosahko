import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

export const CardLoader = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="-mb-2 flex flex-row gap-2">
            <div className="size-6 animate-pulse rounded-full bg-gray-200"></div>
            <div className="h-6 w-64 animate-pulse rounded-full bg-gray-200"></div>
            <div className="ml-auto h-6 w-10 animate-pulse rounded-full bg-gray-200"></div>
          </div>
        </CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-4 w-full animate-pulse rounded-full bg-gray-200"></div>
      </CardContent>
      <CardFooter>
        <div className="h-4 w-64 animate-pulse rounded-full bg-gray-200"></div>
      </CardFooter>
    </Card>
  );
};
