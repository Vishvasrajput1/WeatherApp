import React from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { HourlyUpdateSkeleton } from './HourlyUpdateSkeleton';
import { WeatherOverviewCardSkeleton } from './WeatherOverviewCardSkeleton';
import { TodayOverviewSkeleton } from './TodayOverviewSkeleton';
import { OtherCitiesSkeleton } from './OtherCitiesSkeleton';

const WeatherDashboardSkeleton = ({ isWeek = false }) => {
  return (
    <SkeletonTheme
      baseColor='var(--skeleton-bg)'
      highlightColor='var(--skeleton-highlight)'
    >
      {isWeek ? (
        <div className='flex flex-col gap-7.5 w-full h-full'>
          <div className='flex flex-col xl:flex-row gap-7.5 w-full'>
            <div className='w-full xl:w-[25%] rounded-[25px] border border-gray-100 skeleton-color flex flex-col justify-between overflow-hidden'>
              <div className='p-4 border border-gray-100 skeleton-color flex items-center justify-between'>
                <Skeleton width={80} height={20} />
                <Skeleton width={60} height={20} />
              </div>
              <div className='p-4 flex-1 flex flex-col justify-center gap-6'>
                <div className='flex justify-between items-center'>
                  <Skeleton width={100} height={48} />
                  <Skeleton circle width={80} height={80} />{' '}
                </div>
                <div className='flex justify-between'>
                  <div className='flex flex-col gap-3'>
                    <Skeleton width={100} height={12} count={3} />{' '}
                  </div>
                  <div className='flex flex-col gap-3'>
                    <Skeleton width={100} height={12} count={3} />{' '}
                  </div>
                </div>
              </div>
            </div>

            <div className='w-full xl:w-[50%] grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3'>
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className='border border-gray-100 skeleton-color rounded-2xl p-4 flex flex-col items-center justify-between gap-4'
                >
                  <Skeleton width={40} height={15} />
                  <Skeleton circle width={40} height={40} />
                  <Skeleton width={30} height={20} />
                </div>
              ))}
            </div>

            <div className='w-full xl:w-[25%] flex flex-col'>
              <div className='border border-gray-100 skeleton-color rounded-[25px] p-4 h-full'>
                <Skeleton width={120} height={24} className='mb-4' />
                <Skeleton height={150} width='100%' />
              </div>
            </div>
          </div>

          <div className='flex flex-col xl:flex-row gap-7.5 w-full h-full'>
            <TodayOverviewSkeleton isWeek={isWeek} />

            <div className='w-full xl:w-[25%] h-full'>
              <div className='border border-gray-100 skeleton-color rounded-2xl p-2 h-full min-h-96'>
                <Skeleton height='100%' width='100%' borderRadius={20} />
              </div>
            </div>

            <div className='w-full xl:w-[25%]'>
              <OtherCitiesSkeleton isWeek={isWeek} />
            </div>
          </div>
        </div>
      ) : (
        <div className='flex flex-col xl:flex-row gap-7.5 w-full h-full'>
          <div className='w-full xl:w-[50%] flex flex-col gap-7.5 h-full'>
            <div className='w-full h-full'>
              <WeatherOverviewCardSkeleton />
            </div>
            <div className='w-full h-full'>
              <HourlyUpdateSkeleton />
            </div>
          </div>

          <div className='w-full xl:w-[50%] flex flex-col gap-7.5'>
            <div className='w-full'>
              <TodayOverviewSkeleton heightClass='h-72' />{' '}
            </div>
            <div className='w-full'>
              <OtherCitiesSkeleton />{' '}
            </div>
          </div>
        </div>
      )}
    </SkeletonTheme>
  );
};

export default WeatherDashboardSkeleton;
