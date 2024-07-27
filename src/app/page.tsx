import { RealtimeDataCard } from "@/components/datacard/realtime-data-card";
import { RefreshButton } from "@/components/refresh-button";
import { SingleDataCard } from "@/components/datacard/single-data-card";
import { logger } from "@/utils/logger";
import { CardWrapper } from "@/components/datacard/wrapper";

export default async function HomePage() {
  logger.info("Rendering Home page");

  return (
    <div className="space-y-8">
      <RefreshButton />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <CardWrapper>
          <RealtimeDataCard current="windProduction" outOf="windCapacity" />
        </CardWrapper>
        <CardWrapper>
          <RealtimeDataCard current="solarProduction" outOf="solarCapacity" />
        </CardWrapper>
        <CardWrapper>
          <RealtimeDataCard
            current="totalProduction"
            outOf="totalConsumption"
          />
        </CardWrapper>
        <CardWrapper>
          <RealtimeDataCard current="nuclearProduction" outOf={4394} />
        </CardWrapper>
        <CardWrapper>
          <RealtimeDataCard current="hydroProduction" outOf={3190} />
        </CardWrapper>
        <CardWrapper>
          <RealtimeDataCard current="industryProduction" outOf={2000} />
        </CardWrapper>
        <CardWrapper>
          <SingleDataCard dataset="importExport" />
        </CardWrapper>
        <CardWrapper>
          <SingleDataCard dataset="totalProduction" />
        </CardWrapper>
        <CardWrapper>
          <SingleDataCard dataset="totalConsumption" />
        </CardWrapper>
        <CardWrapper>
          <RealtimeDataCard current="reserveProduction" outOf={1000} />
        </CardWrapper>
      </div>
    </div>
  );
}
