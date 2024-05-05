import { RealtimeDataCard } from "@/components/datacard/realtime-data-card";
import { RefreshButton } from "@/components/refresh-button";
import { SingleDataCard } from "@/components/datacard/single-data-card";
import { fingridFetch } from "@/utils/fetch";
import { logger } from "@/utils/logger";
import { dataSetModel } from "@/utils/validate";

export default async function HomePage() {
  logger.info("Rendering Home page");

  const today = new Date();
  const todayAtMidnight = new Date(today.setHours(0, 0, 0, 0));

  const tomorrowAtMidnight = new Date(todayAtMidnight);
  tomorrowAtMidnight.setDate(todayAtMidnight.getDate() + 1);

  // const response = await fingridFetch(
  //   `/datasets/181/data?startTime=${todayAtMidnight.toISOString()}&endTime=${tomorrowAtMidnight.toISOString()}`,
  // );

  // if (!response.ok) {
  //   logger.error(response.statusText, "Failed to fetch data");
  //   return <div>Failed to fetch data</div>;
  // }

  // const parsed = await response.json();
  // // logger.info(parsed, "Data fethced");

  // const data = dataSetModel.parse(parsed);

  return (
    <div>
      {todayAtMidnight.toLocaleString("fi")}
      {/* <div>
        {data.data.map((item) => (
          <div key={item.startTime.toISOString()}>
            <p>{item.value}</p>
          </div>
        ))}
      </div> */}
      <RefreshButton />
      <div className="grid grid-cols-3 gap-4">
        <RealtimeDataCard current="windProduction" outOf="windCapacity" />
        <RealtimeDataCard current="solarProduction" outOf="solarCapacity" />
        <RealtimeDataCard current="totalProduction" outOf="totalConsumption" />
        <RealtimeDataCard current="nuclearProduction" outOf={4394} />
        <RealtimeDataCard current="hydroProduction" outOf={3190} />
        <RealtimeDataCard current="industryProduction" outOf={2000} />
        <SingleDataCard dataset="importExport" />
        <SingleDataCard dataset="totalProduction" />
        <SingleDataCard dataset="totalConsumption" />
        <RealtimeDataCard current="reserveProduction" outOf={1000} />
      </div>
    </div>
  );
}
