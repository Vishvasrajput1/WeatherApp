import React from "react";
import { WeatherOverviewCard } from "../common/WeatherOverviewCard";
import { HourlyUpdate } from "../common/HourlyUpdate";
import { getTodaysOvewerview } from "../utils/helper";
import { TodayOverview } from "../common/TodayOverview";
import OtherCities from "../common/OtherCities";

export const TodayWeather = ({ city, data }) => {
  return (
    <div className="flex flex-col xl:flex-row gap-7.5 w-full h-full">
      <div className="w-full xl:w-[50%] flex flex-col gap-7.5 h-full">
        <div className="w-full h-full">
          <WeatherOverviewCard data={getTodaysOvewerview(data)} city={city} />
        </div>
        <div className="w-full h-full">
          <HourlyUpdate data={data} city={city} />
        </div>
      </div>

      <div className="w-full xl:w-[50%] flex flex-col gap-7.5">
        <div className="w-full">
          <TodayOverview data={data} isToday/>
        </div>
        <div className="w-full">
          <OtherCities city={city} />
        </div>
      </div>
    </div>
  );
};
