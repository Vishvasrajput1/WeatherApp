import React from 'react';
import {
  formatHourlyTime,
  getDailyWeather,
  getDayNameFromDate,
  getIconForWeather,
  getWeatherIcon,
} from '../utils/helper';

import { HourPole } from '../common/HourPole';
import { TodayOverview } from '../common/TodayOverview';
import RainChancesChart from '../common/RainChancesChart';
import OtherCities from '../common/OtherCities';
import WeatherMap from '../common/WeatherMap';

export const WeekWeather = ({ data, city }) => {
  const dailyWeather = getDailyWeather(data);
  return (
    <div className='flex flex-col gap-7.5 w-full h-full'>
      <div className='flex flex-col xl:flex-row gap-y-7.5 w-full'>
        <div className='w-full xl:max-w-[25%] rounded-[25px] card-bg font-semibold flex flex-col justify-between border-t-0 xl:mr-[39px]'>
          <div className='p-4 child-card-bg flex items-center justify-between rounded-t-[25px] border-t-0'>
            <span className='text-base'>
              {getDayNameFromDate(data?.daily?.time[0], true)}
            </span>
            <span className='text-sm'>
              {formatHourlyTime(
                data?.current?.time,
                data?.current_units?.time,
                true
              )}
            </span>
          </div>
          <div className='p-4 flex-1 flex flex-col justify-center gap-3'>
            <div className='flex justify-between items-center'>
              <span className='font-semibold text-4xl'>
                {data?.current?.temperature_2m}
                {data?.hourly_units?.temperature_2m}
              </span>
              <img
                src={getIconForWeather(dailyWeather[0].icon)}
                alt='sun'
                className='w-[66px] h-[53px] object-contain'
              />
            </div>
            <div className='flex justify-between text-xs font-normal'>
              <div className='flex flex-col gap-3'>
                <span>
                  Real feel :{' '}
                  <span className='font-semibold'>
                    {data?.current?.apparent_temperature}
                    {data?.hourly_units?.apparent_temperature}
                  </span>
                </span>
                <span>
                  Wind :{' '}
                  <span className='font-semibold'>
                    {data?.current?.wind_speed_10m}
                    {data?.hourly_units?.wind_speed_10m}
                  </span>
                </span>
                <span>
                  Clouds:{' '}
                  <span className='font-semibold'>
                    {data?.current?.cloudcover}
                    {data?.current_units?.cloudcover}
                  </span>
                </span>
              </div>
              <div className='flex flex-col gap-2'>
                <span>
                  Humidity :{' '}
                  <span className='font-semibold'>
                    {data?.current?.relative_humidity_2m}
                    {data?.current_units?.relative_humidity_2m}
                  </span>
                </span>
                <span>
                  Sunrise:{' '}
                  <span className='font-semibold'>
                    {formatHourlyTime(
                      data?.daily?.sunrise[0],
                      data?.daily_units?.sunrise,
                      true
                    )}
                  </span>
                </span>
                <span>
                  Sunset:{' '}
                  <span className='font-semibold'>
                    {formatHourlyTime(
                      data?.daily?.sunset[0],
                      data?.daily_units?.sunset,
                      true
                    )}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className='w-full xl:max-w-[50%] grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 gap-x-[39px] shrink-0 '>
          {dailyWeather?.slice(1, 7).map((item, index) => (
            <HourPole
              key={index}
              data={item}
              isWeek={true}
              weatherCode={item.weatherCode}
              icon={
                item.weatherCode ? getWeatherIcon(item.weatherCode) : 'cloudy'
              }
            />
          ))}
        </div>

        <div className='w-full xl:max-w-[25%] flex flex-col xl:ml-[28px]'>
          <RainChancesChart data={data} isWeek height={156} />
        </div>
      </div>

      <div className='flex flex-col xl:flex-row gap-7.5 w-full h-full'>
        <div className='w-full xl:w-[50%] h-full'>
          <TodayOverview data={data} isWeek={true} />
        </div>
        <div className='w-full xl:w-[25%] h-full'>
          <WeatherMap selectedCity={city} />
        </div>
        <div className='w-full xl:w-[25%] h-full'>
          <OtherCities city={city} isWeek />
        </div>
      </div>
    </div>
  );
};
