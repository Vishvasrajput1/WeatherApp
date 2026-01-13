import React, { useEffect, useState } from 'react';
import sunnyIcon from '../assets/Sunny (2) 2.png';
import cloudyIcon from '../assets/cloudy.png';
import windyIcon from '../assets/Windy 1.png';
import rainyIcon from '../assets/Rainy (2) 2.png';
import {
  getWeatherDescription,
  getWeatherIcon,
  celsiusToFahrenheit,
} from '../utils/helper';
import { useTheme } from '../context/useTheme';
const APIkey = import.meta.env.VITE_APP_OPENWEATHER_API_KEY;

const OtherCities = ({ city, isWeek = false }) => {
  const { theme } = useTheme();
  const [nearbyCities, setNearbyCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unit, setUnit] = useState('C');

  const getIconForWeather = (iconType) => {
    switch (iconType) {
      case 'sunny':
        return sunnyIcon;
      case 'cloudy':
      case 'partly-cloudy':
        return cloudyIcon;
      case 'rainy':
      case 'thunderstorm':
        return rainyIcon;
      case 'windy':
        return windyIcon;
      default:
        return cloudyIcon;
    }
  };

  const convertTemp = (temp) => {
    if (!temp) return '';
    const val = parseFloat(temp);
    if (isNaN(val)) return '';
    if (unit === 'F') {
      return `${Math.round(celsiusToFahrenheit(val))}°F`;
    }
    return `${Math.round(val)}°C`;
  };

  const getNearbyCities = async (baseLat, baseLon) => {

    const offsets = [
      { lat: 0.3, lon: 0.3 }, // ~33km northeast
      { lat: -0.3, lon: 0.3 }, // ~33km southeast
      { lat: 0.3, lon: -0.3 }, // ~33km northwest
      { lat: -0.3, lon: -0.3 }, // ~33km southwest
    ];

    const citiesPromises = offsets.map(async (offset) => {
      const lat = baseLat + offset.lat;
      const lon = baseLon + offset.lon;

      try {
        const geoResponse = await fetch(
          `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${APIkey}`
        );
        const geoData = await geoResponse.json();

        const weatherResponse = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto`
        );
        const weatherData = await weatherResponse.json();

        if (geoData && weatherData && geoData.length > 0) {
          return {
            name: geoData[0]?.name || '',
            country: geoData[0]?.country || '',
            region: geoData[0]?.state || '',
            lat,
            lon,
            temperature: weatherData?.current?.temperature_2m,
            tempUnit: weatherData?.current_units?.temperature_2m,
            weatherCode:
              weatherData.current?.weathercode ||
              weatherData.daily?.weathercode?.[0],
            description: getWeatherDescription(
              weatherData.current?.weathercode ||
                weatherData.daily?.weathercode?.[0]
            ),
            icon: getWeatherIcon(
              weatherData.current?.weathercode ||
                weatherData.daily?.weathercode?.[0]
            ),
          };
        }
        return null;
      } catch (error) {
        console.error('Error fetching city data:', error);
        return null;
      }
    });

    const cities = await Promise.all(citiesPromises);
    const uniqueCities = cities.filter(
      (city, index, self) =>
        city !== null &&
        index === self.findIndex((c) => c && c.name === city.name)
    );
    return uniqueCities.slice(0, 4);
  };

  useEffect(() => {
    const fetchNearbyCities = async () => {
      if (!city || !city.lat || !city.lon) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const cities = await getNearbyCities(city.lat, city.lon);
        setNearbyCities(cities);
      } catch (error) {
        console.error('Error fetching nearby cities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNearbyCities();
  }, [city]);


  return (
    <div className='w-full  rounded-2xl p-4 space-y-4'>
      <div className='flex justify-between items-center'>
        <h2 className='text-lg font-medium'>Other Cities</h2>
      </div>
      {loading ? (
        <div className='flex items-center justify-center py-8'>
          <div className='w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin' />
        </div>
      ) : nearbyCities.length === 0 ? (
        <div className='text-center py-8 text-secondary text-sm'>
          No nearby cities found
        </div>
      ) : (
        <div className={isWeek ? 'space-y-3' : 'grid grid-cols-2 gap-3'}>
          {nearbyCities?.map((cityData, index) => {
            return isWeek ? (
              <div
                key={index}
                className='card-bg rounded-xl p-3 flex items-center justify-between'
              >
                <div className='flex flex-col flex-1'>
                  <span className='text-xs text-secondary mb-1'>
                    {cityData.country || cityData.region}
                  </span>
                  <span className='text-base font-semibold mb-1'>
                    {cityData.name}
                  </span>
                  <span className='text-sm font-normal'>
                    {cityData.description}
                  </span>
                </div>
                <div className='ml-4 shrink-0'>
                  <img
                    src={getIconForWeather(cityData.icon)}
                    alt={cityData.description}
                    className='w-12 h-12 object-contain'
                  />
                </div>
              </div>
            ) : (
              <div key={index} className='card-bg rounded-xl xl:p-4 p-3'>
                <div className='flex flex-col flex-1 gap-3'>
                  <span className='font-semibold text-xl xl:text-3xl'>
                    {cityData?.temperature} {cityData?.tempUnit}
                  </span>
                </div>
                <div className='flex items-center justify-between'>
                  <div className='flex flex-col flex-1'>
                    <span className='text-base mb-1'>{cityData.name}</span>
                    <span className='text-[10px] font-normal'>
                      {cityData.description}
                    </span>
                  </div>
                  <div className='ml-4 shrink-0'>
                    <img
                      src={getIconForWeather(cityData.icon)}
                      alt={cityData.description}
                      className='w-12 h-12 object-contain'
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OtherCities;
