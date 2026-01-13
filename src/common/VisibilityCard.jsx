import VisibilityImage from '../assets/visibility_image.png';
import { FiEye } from 'react-icons/fi';

export const VisibilityCard = ({ data, isWeek = false }) => {
  return (
    <div
      className={`${
        isWeek ? 'card-bg' : ' child-card-bg '
      } w-full h-full rounded-[15px] 2xl:p-3 p-2 2xl:space-y-4 space-y-3`}
    >
      <div className='text-base'>Visibility</div>
      <div>
        <img src={VisibilityImage} alt='cloud' className='w-20 h-20 mx-auto' />
      </div>
      <div className='flex justify-between 2xl:p-2 p-1'>
        <span className='2xl:text-xl text-base font-semibold'>
          {data?.current?.visibility / 1000} km
        </span>
        <span className='flex items-center 2xl:gap-2 gap-1 text-xs'>
          <FiEye />
          Haze is affecting visibility
        </span>
      </div>
    </div>
  );
};
