import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Toggle from '../common/Toggle';
import { useTheme } from '../context/useTheme';
import { tomorrosDate } from '../utils/helper';
import { TodayWeather } from './TodayWeather';
import { TomorrowWeather } from './TomorrowWeather';
import { WeekWeather } from './WeekWeather';
import WeatherDashboardSkeleton from '../skeletons/WeatherDashboardSkeleton';

export const Dashboard = ({ city }) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const tabs = [
    { title: 'Today' },
    { title: 'Tomorrow' },
    { title: 'Next 7days' },
  ];
  const activeTab = tabs[activeIndex];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // const response = await fetch(
      //   `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${
      //     city.lon
      //   }&appid=${import.meta.env.VITE_APP_OPENWEATHER_API_KEY}`
      // );
      if (!city) return;
      let response = null;
      if (tabs[activeIndex].title === 'Tomorrow') {
        response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${
            city.lat
          }&longitude=${
            city.lon
          }&current=temperature_2m,wind_speed_10m,apparent_temperature,uv_index,cloudcover,relative_humidity_2m,dew_point_2m,visibility&hourly=precipitation_probability,temperature_2m,relative_humidity_2m,wind_speed_10m,rain&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,rain_sum,wind_speed_10m_max,uv_index_max&timezone=auto&start_date=${tomorrosDate()}&end_date=${tomorrosDate()}`
        );
      } else {
        response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,wind_speed_10m,apparent_temperature,uv_index,cloudcover,relative_humidity_2m,dew_point_2m,visibility&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation_probability,rain&daily=weathercode,temperature_2m_max,temperature_2m_min,rain_sum,sunrise,sunset,wind_speed_10m_max,uv_index_max&timezone=auto`
        );
      }
      const data = await response.json();
      setWeatherData(data);
      setLoading(false);
    };
    fetchData();
  }, [city, activeIndex]);

  return (
    <div className='flex flex-col gap-7.5 h-auto w-full'>
      <div className='flex items-center justify-between'>
        <Toggle
          options={tabs}
          activeIndex={activeIndex}
          onChange={setActiveIndex}
        />
      </div>

      {loading ? (
        <WeatherDashboardSkeleton isWeek={activeTab.title === 'Next 7days'} />
      ) : (
        <div className='flex-1 w-full'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={activeTab.title}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
              className='w-full'
            >
              {activeTab.title === 'Today' && (
                <TodayWeather city={city} data={weatherData} />
              )}
              {activeTab.title === 'Tomorrow' && (
                <TomorrowWeather city={city} data={weatherData} />
              )}
              {activeTab.title === 'Next 7days' && (
                <WeekWeather data={weatherData} city={city} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
