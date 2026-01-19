import { getIconForWeather, getWeatherIcon } from '../utils/helper';

export const HourPole = ({ data, isWeek = false, weatherCode, icon }) => {
  if (isWeek) {
    const dayName = data?.lable?.toUpperCase() || '';
    const temperature = data?.temperature || data?.value?.split(' ')[0] || '';
    const weatherIconType =
      icon || (weatherCode ? getWeatherIcon(weatherCode) : 'cloudy');

    return (
      <div className='flex flex-col items-center justify-between card-bg rounded-[30px]  py-6 shrink-0 w-full min-w-0'>
        <div className='flex flex-col items-center w-full'>
          <span className='text-sm font-medium mb-3'>{dayName}</span>
          <div className='w-full border-t border-gray-500/30 mb-3'></div>
        </div>
        <div className='flex items-center justify-center flex-1 py-4'>
          <img
            src={getIconForWeather(data?.icon || weatherIconType)}
            alt='weather'
            className='w-12.5 h-12.5 object-contain'
          />
        </div>
        <span className='2xl:text-[32px] text-2xl font-semibold w-full text-center'>
          {data?.value || Math.round(temperature)}
        </span>
      </div>
    );
  }

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
