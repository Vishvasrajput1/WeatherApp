import Skeleton from 'react-loading-skeleton';

export const OtherCitiesSkeleton = ({ isWeek = false }) => {
  return (
    <div className='w-full rounded-2xl px-4 space-y-4'>
      <div className='h-7 w-32'>
        <Skeleton className='h-full w-full' />
      </div>

      <div className={isWeek ? 'space-y-3' : 'grid grid-cols-2 gap-3'}>
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`card-bg rounded-xl ${
              isWeek ? 'p-3 flex items-center justify-between' : 'xl:p-4 p-3'
            }`}
          >
            {isWeek ? (
              <>
                <div className='flex flex-col flex-1 gap-2'>
                  <Skeleton className='h-3 w-16' /> 
                  <Skeleton className='h-5 w-24' /> 
                  <Skeleton className='h-4 w-20' /> 
                </div>
                <div className='ml-4 shrink-0'>
                  <Skeleton className='w-12 h-12 rounded-full' /> 
                </div>
              </>
            ) : (
              <>
                <div className='flex flex-col flex-1 gap-3 mb-2'>
                  <Skeleton className='h-8 w-20 xl:h-10' /> 
                </div>
                <div className='flex items-center justify-between'>
                  <div className='flex flex-col flex-1 gap-1'>
                    <Skeleton className='h-4 w-20' /> 
                    <Skeleton className='h-3 w-16' /> 
                  </div>
                  <div className='ml-4 shrink-0'>
                    <Skeleton className='w-12 h-12 rounded-full' /> 
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
