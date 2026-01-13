import Skeleton from 'react-loading-skeleton';

export const WeatherOverviewCardSkeleton = () => {
  return (
    <div className='card-bg w-full 2xl:h-1/2 p-4 rounded-2xl space-y-4'>
      <div className='flex justify-between items-center w-full'>
        <Skeleton height={32} width={100} />
        <Skeleton circle width={32} height={32} />
      </div>

      <div className='space-y-1'>
        <Skeleton height={28} width={100} /> 
        <Skeleton height={20} width={60} /> 
      </div>

      <div className='flex items-end justify-between'>
        <div className='mb-0 space-y-2'>
          <Skeleton height={40} width={100} /> 
          <Skeleton height={20} width={60} /> 
        </div>

        <div className='space-y-2 shrink-0'>
          <Skeleton circle width={90} height={90} />

          <div className='flex gap-6 w-40'>
            <Skeleton height={20} width={40} />
            <Skeleton height={20} width={40} />
          </div>
        </div>
      </div>
    </div>
  );
};
