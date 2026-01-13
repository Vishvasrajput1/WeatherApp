import { useState } from 'react';
import { useTheme } from '../context/useTheme';

const ToggleUnit = ({ value, onChange }) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  const bgClass = isDarkMode ? 'bg-green-500' : 'bg-indigo-500';

  const [activeIndex, setActiveIndex] = useState(value === 'F' ? 0 : 1);

  const handleClick = (unit) => {
    onChange?.(unit);
    setActiveIndex(unit === 'F' ? 0 : 1);
  };

  return (
    <div
      className={` flex rounded-full  ${
        isDarkMode ? 'bg-gray-200' : 'bg-white'
      } transition-colors duration-200`}
    >
      {['F', 'C'].map((unit, index) => (
        <button
          key={unit}
          onClick={() => handleClick(unit)}
          className={`px-3 py-1 text-xs font-semibold rounded-full transition-all duration-200 cursor-pointer ${
            activeIndex === index
              ? isDarkMode
                ? 'text-white bg-[#091209]'
                : 'text-white bg-blue-500'
              : isDarkMode
              ? 'text-gray-400 '
              : 'text-gray-600'
          }`}
        >
          {unit}
        </button>
      ))}
    </div>
  );
};

export default ToggleUnit;
