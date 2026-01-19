import React from 'react';
import humidityImage from '../assets/carbon_humidity-alt.png';
import { LuDroplets } from 'react-icons/lu';

export const HumidityCard = ({ data, isWeek = false }) => {
  return (
    <div
      className={`${
        isWeek ? 'card-bg' : ' child-card-bg '
      } w-full h-full rounded-[15px] 2xl:p-3 p-2  py-3 space-y-8`}
    >
      <div className='text-base'>Humidity</div>
      <div>
        <img
          src={humidityImage}
          alt='cloud'
          className='w-22.5 h-22.5 mx-auto'
        />
      </div>
      <div className='flex justify-between  p-1'>
        <span className='text-xl font-semibold'>
          {data?.current?.relative_humidity_2m}
          {data?.hourly_units?.relative_humidity_2m}
        </span>
        <span className='flex items-center gap-2 text-xs'>
          <LuDroplets />
          The dew point is <br /> {data?.current?.dew_point_2m} right now
        </span>
      </div>
    </div>
  );
};
