import React from 'react';
import {
  formatHourlyTime,
  getDayLength,
  getHourlyWeather,
  getHourlyWeatherForTomorrow,
  getWeatherIconFromRain,
} from '../utils/helper';
import { HourPole } from './HourPole';
import sunnyIcon from '../assets/cloudy.png';
import cloudyIcon from '../assets/cloudy.png';
import windyIcon from '../assets/Windy 1.png';
import rainyIcon from '../assets/Rainy (2) 2.png';
import showerIcon from '../assets/Rainy-Sunny (2) 1.png';
import snowyIcon from '../assets/RAINY-SUNNY 1.png';
export const HourlyUpdate = ({ data, city, isTomorrow = false }) => {
  const hourlyWeather = isTomorrow
    ? getHourlyWeatherForTomorrow(data)
    : getHourlyWeather(data);
  const getIconForWeather = (iconType) => {
    switch (iconType) {
      case 'sunny':
        return sunnyIcon;
      case 'shower':
      case 'partly-cloudy':
        return showerIcon;
      case 'rainy':
      case 'thunderstorm':
        return rainyIcon;
      case 'windy':
        return windyIcon;
      default:
        return cloudyIcon;
    }
  };
  return (
    <div
      className={`card-bg w-full h-full p-4 rounded-2xl gap-3 grid grid-cols-2`}
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

        <div className='child-card-bg p-3 flex items-center justify-between rounded-2xl'>
          <div>
            <span>Tomorrow</span>
          </div>
          <div className='text-3xl'>
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
                  className={`${index === 0 ? 'text-3xl' : '2xl'}`}
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
                  className={`${index === 0 ? 'text-3xl' : '2xl'}`}
                >
                  {item}
                </span>
              ))}
          </div>
        </div>

        <div className='space-y-2'>
          <span className='text-base'>Day Length</span>
          <div className='text-3xl'>
            {getDayLength(data?.daily?.sunrise[0], data?.daily?.sunset[0])}
          </div>
        </div>
      </div>
    </div>
  );
};
