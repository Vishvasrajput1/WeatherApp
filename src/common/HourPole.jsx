import React from 'react';
import sunnyIcon from '../assets/cloudy.png';
import cloudyIcon from '../assets/cloudy.png';
import windyIcon from '../assets/Windy 1.png';
import rainyIcon from '../assets/Rainy (2) 2.png';
import showerIcon from '../assets/Rainy-Sunny (2) 1.png';
import snowyIcon from '../assets/RAINY-SUNNY 1.png';
import { getWeatherIcon } from '../utils/helper';

export const HourPole = ({ data, isWeek = false, weatherCode, icon }) => {
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

  // For week view - card style with separator
  if (isWeek) {
    const dayName = data?.lable?.toUpperCase() || '';
    const temperature = data?.temperature || data?.value?.split(' ')[0] || '';
    const weatherIconType =
      icon || (weatherCode ? getWeatherIcon(weatherCode) : 'cloudy');

    return (
      <div className='flex flex-col items-center justify-between card-bg rounded-[30px] p-4 py-7.25 shrink-0'>
        <div className='flex flex-col items-center w-full'>
          <span className='text-sm font-medium mb-3'>{dayName}</span>
          <div className='w-full border-t border-gray-500/30 mb-3'></div>
        </div>
        <div className='flex items-center justify-center flex-1 py-4'>
          <img
            src={getIconForWeather(data?.icon || weatherIconType)}
            alt='weather'
            className='w-12 h-12 object-contain'
          />
        </div>
        <span className='text-lg font-semibold'>
          {data?.value || Math.round(temperature)}
        </span>
      </div>
    );
  }

  // Original hourly view
  return (
    <div className='flex flex-col items-center justify-between gap-4 border hour-pole p-2 rounded-full py-4 shrink-0'>
      <span className='text-xs'>{data.lable}</span>
      <div>
        <img
          src={getIconForWeather(data.icon)}
          alt='cloud'
          className='h-5 w-5'
        />
      </div>
      <span className='text-xs'>{data.value}</span>
    </div>
  );
};
