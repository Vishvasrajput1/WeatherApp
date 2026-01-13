import { FaRegBell } from 'react-icons/fa';
import { RxDashboard } from 'react-icons/rx';
import { ToggleThemeButton } from '../common/ToggleThemeButton';
import { IoLocationOutline } from 'react-icons/io5';

import { useTheme } from '../context/useTheme';
import WeatherCitySearch from '../common/WeatherCitySearch';
// import '@geoapify/geocoder-autocomplete/styles/minimal.css';

export const Header = ({ city, setCity }) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <div className='flex items-center justify-between '>
      <div className='flex items-center gap-2'>
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-full ${
            isDarkMode ? 'bg-gray-700' : 'bg-white'
          }`}
        >
          <RxDashboard size={20} />
        </div>
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-full ${
            isDarkMode ? 'bg-gray-700' : 'bg-white'
          }`}
        >
          <FaRegBell size={20} />
        </div>
        <div className='flex items-center gap-2'>
          <IoLocationOutline size={20} />
          <span>{city?.label}</span>
        </div>
      </div>
      <div className='flex items-center w-123'>
        <WeatherCitySearch key={city} onCitySelect={setCity} city={city} />
      </div>
      <div>
        <ToggleThemeButton />
      </div>
    </div>
  );
};
