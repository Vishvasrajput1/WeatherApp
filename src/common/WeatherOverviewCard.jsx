import { useState } from 'react';
import { IoLocationOutline } from 'react-icons/io5';

import { useTheme } from '../context/useTheme';
import { celsiusToFahrenheit, getIconForWeather } from '../utils/helper';
import ToggleUnit from './ToggleUnit';

export const WeatherOverviewCard = ({ data, city }) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const [unit, setUnit] = useState('C');

  const convertTemp = (tempStr) => {
    if (!tempStr) return '';
    const val = parseFloat(tempStr);
    if (isNaN(val)) return tempStr;

    if (unit === 'F') {
      return `${Math.round(celsiusToFahrenheit(val))}°F`;
    }
    return `${Math.round(val)}°C`;
  };

  return (
    <div className={`card-bg w-full 2xl:h-1/2 p-4 rounded-2xl space-y-4`}>
      <div className='flex justify-between items-center w-full'>
        <div className='flex items-center gap-2 bg-white rounded-full p-1 px-2 text-gray-900 w-fit text-sm'>
          <IoLocationOutline size={20} />
          <span>{city?.name}</span>
        </div>
        <ToggleUnit value={unit} onChange={setUnit} />
      </div>
      <div className=''>
        <span className='text-2xl'>Weather</span>
        <br />
        <span className='text-xs'>Now</span>
      </div>
      <div className='flex items-end justify-between'>
        <div className='mb-0'>
          <span className='text-4xl'>
            {convertTemp(data?.temperature) || '-'}
          </span>
          <br />
          <span className='text-xs'>
            Feels like {convertTemp(data?.feels_like) || '-'}
          </span>
        </div>
        <div className='space-y-2 shrink-0'>
          <img
            src={getIconForWeather(data?.icon)}
            alt='cloud'
            className='w-30 h-30 object-contain'
          />
          <div className='text-xs flex gap-6 w-40'>
            <span>High : {convertTemp(data?.temp_max) || '-'}</span>{' '}
            <span>Low : {convertTemp(data?.temp_min) || '-'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
