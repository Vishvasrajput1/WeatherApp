import React from "react";
import { WeatherOverviewCard } from "../common/WeatherOverviewCard";
import { HourlyUpdate } from "../common/HourlyUpdate";
import { getTodaysOvewerview, getTomorrowData } from "../utils/helper";
import { TodayOverview } from "../common/TodayOverview";

import OtherCities from "../common/OtherCities";

export const TomorrowWeather = ({ city, data }) => {
  return (
    <div className="flex flex-col xl:flex-row gap-7.5 w-full h-full">
      <div className="w-full xl:w-[50%] flex flex-col gap-7.5 h-full">
        <div className="w-full">
          <WeatherOverviewCard data={getTomorrowData(data)} city={city} />
        </div>
        <div className="w-full">
          <HourlyUpdate data={data} city={city} isTomorrow={true} />
        </div>
      </div>

      <div className="w-full xl:w-[50%] flex flex-col gap-7.5">
        <div className="w-full">
          <TodayOverview data={data} />
        </div>
        <div className="w-full">
          <OtherCities city={city} />
        </div>
      </div>
    </div>
  );
};
