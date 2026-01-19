import React from 'react';
import TinyBarChart from './TinyBarChart';
import SpeedometerChart from './SemiCircleRadialChart';
import { HumidityCard } from './HumidityCard';
import { VisibilityCard } from './VisibilityCard';
import RainChancesChart from './RainChancesChart';

export const TodayOverview = ({ data, isWeek = false, isToday = false }) => {
  return (
    <div
      className={`w-full h-full rounded-2xl ${
        !isWeek ? 'card-bg 2xl:p-4 p-3 space-y-3' : 'space-y-7.5'
      }`}
    >
      <h2 className='font-semibold text-lg'>
        {isToday ? 'Today' : isWeek ? 'Week' : 'Tomorrow'} Overview
      </h2>
      <div
        className={`grid grid-cols-1 md:grid-cols-2 ${
          isWeek ? 'gap-x-10 gap-y-7.5' : '2xl:gap-4 gap-3'
        }`}
      >
        {!isWeek ? (
          <>
            <RainChancesChart data={data} height={130} />
            <SpeedometerChart data={data} />
            <TinyBarChart data={data} />
            <HumidityCard data={data} />
          </>
        ) : (
          <>
            <TinyBarChart data={data} isWeek={isWeek} />
            <SpeedometerChart data={data} isWeek={isWeek} />
            <HumidityCard data={data} isWeek={isWeek} />
            <VisibilityCard data={data} isWeek={isWeek} />
          </>
        )}
      </div>
    </div>
  );
};
