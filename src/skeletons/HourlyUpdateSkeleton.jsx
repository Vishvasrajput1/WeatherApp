import Skeleton from 'react-loading-skeleton';

export const HourlyUpdateSkeleton = () => {
  return (
    <div className='card-bg w-full h-full p-4 rounded-2xl gap-3 grid grid-cols-2'>
      <div className='space-y-4'>
        <div>
          <Skeleton className='h-8 w-32' />
        </div>

        <div className='flex overflow-hidden gap-2'>
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className='flex flex-col items-center justify-between gap-3 border hour-pole p-2 rounded-full py-4 shrink-0 min-w-12.5'
            >
              <Skeleton width={30} height={15} />
              <Skeleton circle width={30} height={30} />
              <Skeleton width={30} height={20} />
            </div>
          ))}
        </div>

        <div className='child-card-bg p-3 flex items-center justify-between rounded-2xl'>
          <Skeleton height={20} width={80} />
          <Skeleton width={30} height={30} />
          <Skeleton circle width={80} height={80} />
        </div>
      </div>

      <div className='h-full child-card-bg p-4 rounded-2xl grid grid-cols-1 gap-4'>
        <div className='space-y-2'>
          <Skeleton className='h-4 w-16' />
          <div className='flex items-center justify-between'>
            <Skeleton height={36} width={80} />
            <Skeleton height={24} width={40} />
          </div>
        </div>

        <div className='space-y-2'>
          <Skeleton className='h-4 w-16' />
          <div className='flex items-center justify-between'>
            <Skeleton height={36} width={80} />
            <Skeleton height={24} width={40} />
          </div>
        </div>

        <div className='space-y-2'>
          <Skeleton className='h-4 w-24' />
          <Skeleton className='h-9 w-32' />
        </div>
      </div>
    </div>
  );
};
