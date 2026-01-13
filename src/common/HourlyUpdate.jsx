import React from 'react';
import {
  formatHourlyTime,
  getDayLength,
  getHourlyWeather,
  getHourlyWeatherForTomorrow,
  getIconForWeather,
  getWeatherIconFromRain,
} from '../utils/helper';
import { HourPole } from './HourPole';

export const HourlyUpdate = ({ data, city, isTomorrow = false }) => {
  const hourlyWeather = isTomorrow
    ? getHourlyWeatherForTomorrow(data)
    : getHourlyWeather(data);

  return (
    <div
      className={`card-bg w-full h-full p-4 rounded-2xl gap-3 grid xl:grid-cols-2 grid-cols-1`}
    >
      <div className='space-y-4 '>
        <h2 className='text-2xl'>{isTomorrow ? 'Tomorrow' : 'Today'}</h2>
        <div className='flex overflow-hidden'>
          <div className='flex justify-between overflow-auto hide-scrollbar gap-2'>
            {hourlyWeather?.map((item, index) => (
              <HourPole key={index} data={item} />
            ))}
          </div>
        </div>

        <div className='child-card-bg xl:p-3 p-2 flex items-center justify-between rounded-2xl'>
          <div>
            <span>Tomorrow</span>
          </div>
          <div className='text-xl xl:text-3xl'>
            {data?.daily?.temperature_2m_max[isTomorrow ? 0 : 1]}
            {data?.daily_units?.temperature_2m_max}
          </div>
          <div>
            <img
              src={getIconForWeather(
                getWeatherIconFromRain(
                  data?.daily?.rain_sum[isTomorrow ? 0 : 1]
                )
              )}
              alt='cloud'
              className='w-20 h-20'
            />
          </div>
        </div>
      </div>
      <div className=' h-full child-card-bg p-4 rounded-2xl grid grid-cols-1'>
        <div className='space-y-2'>
          <span className='text-base'>Sunrise</span>
          <div className='flex items-center justify-between'>
            {formatHourlyTime(
              data?.daily?.sunrise[0],
              data?.hourly_units?.time,
              true
            )
              .split(' ')
              .map((item, index) => (
                <span
                  key={index}
                  className={`${index === 0 ? 'xl:text-3xl' : 'xl:text-2xl'} text-xl`}
                >
                  {item}
                </span>
              ))}
          </div>
        </div>
        <div className='space-y-2'>
          <span className='text-base'>Sunset</span>
          <div className='flex items-center justify-between'>
            {formatHourlyTime(
              data?.daily?.sunset[0],
              data?.hourly_units?.time,
              true
            )
              .split(' ')
              .map((item, index) => (
                <span
                  key={index}
                  className={`${index === 0 ? 'xl:text-3xl' : 'xl:text-2xl'} text-xl`}
                >
                  {item}
                </span>
              ))}
          </div>
        </div>

        <div className='space-y-2 '>
          <span className='text-base'>Day Length</span>
          <div className='text-xl xl:text-3xl'>
            {getDayLength(data?.daily?.sunrise[0], data?.daily?.sunset[0])}
          </div>
        </div>
      </div>
    </div>
  );
};
