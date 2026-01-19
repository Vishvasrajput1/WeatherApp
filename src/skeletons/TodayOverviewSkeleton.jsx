import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

export const TodayOverviewSkeleton = ({ isWeek = false, isToday = false }) => {
  return (
    <div
      className={`w-full rounded-2xl ${
        !isWeek ? 'skeleton-color  2xl:p-4 p-3 space-y-3' : 'space-y-7.5'
      }`}
    >
      <div className='h-7 w-30'>
        <Skeleton className='h-7 w-full' />
      </div>

      <div
        className={`grid grid-cols-1 md:grid-cols-2 ${
          isWeek ? 'gap-10' : '2xl:gap-4 gap-3'
        }`}
      >
        <Skeleton className='h-40 w-full' />
        <Skeleton className='h-40 w-full' />
        <Skeleton className='h-40 w-full' />
        <Skeleton className='h-40 w-full' />
      </div>
    </div>
  );
};
