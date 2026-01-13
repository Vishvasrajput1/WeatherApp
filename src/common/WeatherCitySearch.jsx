import { useState } from 'react';
import AsyncSelect from 'react-select/async';
import { useTheme } from '../context/useTheme';

const WeatherCitySearch = ({ onCitySelect, city }) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  const [selectedValue, setSelectedValue] = useState(city);

  const loadOptions = async (inputValue) => {
    if (inputValue.length < 3) return [];
    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${inputValue}&count=5&language=en&format=json`
      );
      const data = await response.json();
      return (data.results || []).map((city) => ({
        value: {
          lat: city.latitude,
          lon: city.longitude,
          name: city.name,
          label: `${city.name}, ${city.admin1 || ''} (${city.country})`,
        },
        label: `${city.name}, ${city.admin1 || ''} (${city.country})`,
      }));
    } catch (e) {
      return [];
    }
  };

  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: isDarkMode ? '#1e293b' : '#ffffff',
      borderColor: state.isFocused
        ? '#3b82f6'
        : isDarkMode
        ? '#334155'
        : '#e2e8f0',
      color: isDarkMode ? 'white' : 'black',
      '&:hover': {
        borderColor: isDarkMode ? '#475569' : '#cbd5e1',
      },
      borderRadius: '8px',
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
      border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`,
    }),
    input: (base) => ({
      ...base,
      color: isDarkMode ? 'white' : 'black',
    }),
    placeholder: (base) => ({
      ...base,
      color: isDarkMode ? '#94a3b8' : '#64748b',
    }),
    singleValue: (base) => ({
      ...base,
      color: isDarkMode ? 'white' : 'black',
    }),
    option: (base, { isFocused, isSelected }) => ({
      ...base,
      backgroundColor: isSelected
        ? '#3b82f6'
        : isFocused
        ? isDarkMode
          ? '#334155'
          : '#f1f5f9'
        : 'transparent',
      color: isSelected ? 'white' : isDarkMode ? 'white' : 'black',
      cursor: 'pointer',
    }),
  };

  const handleChange = (selected) => {
    setSelectedValue(selected);
    if (selected) {
      onCitySelect(selected.value);
    } else {
      const defaultCity = localStorage.getItem('city');
      if (defaultCity) {
        setSelectedValue(JSON.parse(defaultCity));
        onCitySelect(JSON.parse(defaultCity));
      }
    }
  };

  return (
    <AsyncSelect
      value={selectedValue}
      cacheOptions
      loadOptions={loadOptions}
      defaultOptions
      onChange={handleChange}
      placeholder='Search for a city...'
      className='w-full'
      styles={customStyles}
      isClearable
    />
  );
};

export default WeatherCitySearch;
