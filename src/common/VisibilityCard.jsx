import VisibilityImage from '../assets/visibility_image.png';
import { FiEye } from 'react-icons/fi';

export const VisibilityCard = ({ data, isWeek = false }) => {
  return (
    <div
      className={`${
        isWeek ? 'card-bg' : ' child-card-bg '
      } w-full h-full rounded-[15px] 2xl:p-3 p-2 py-3 space-y-8`}
    >
      <div className='text-base'>Visibility</div>
      <div>
        <img
          src={VisibilityImage}
          alt='cloud'
          className='w-22.5 h-22.5 mx-auto'
        />
      </div>
      <div className='flex justify-between  p-1'>
        <span className='2xl:text-xl text-base font-semibold'>
          {data?.current?.visibility / 1000} km
        </span>
        <span className='flex items-center  gap-1 text-xs'>
          <FiEye />
          Haze is affecting visibility
        </span>
      </div>
    </div>
  );
};
