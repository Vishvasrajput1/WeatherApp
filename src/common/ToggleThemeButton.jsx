import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/useTheme';

export const ToggleThemeButton = () => {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === 'dark';
  const handleToggleTheme = () => {
    toggleTheme();
  };

  return (
    <div className='flex items-center'>
      <button
        onClick={handleToggleTheme}
        className={`p-2 rounded-lg transition-colors duration-200 cursor-pointer ${
          isDarkMode
            ? 'bg-gray-900 border border-gray-700 hover:bg-gray-700  text-white shadow(10px 10px 20px rgba(250, 247, 247))'
            : 'bg-white border border-gray-300 hover:bg-gray-300'
        }`}
        aria-label='Toggle dark mode'
      >
        {isDarkMode ? (
          <Sun className=' text-white' />
        ) : (
          <Moon className='text-gray-700' />
        )}
      </button>
    </div>
  );
};
