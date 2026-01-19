import sunnyIcon from '../assets/images/sunny-icon.png';
import cloudyIcon from '../assets/images/cloudy-icon.png';
import windyIcon from '../assets/images/windy-icon.png';
import showerIcon from '../assets/images/shower-icon.png';
import rainyIcon from '../assets/images/rainy-icon.png';
import partlyCloudyIcon from '../assets/images/partly-cloudy-icon.png';
import heavyShowerIcon from '../assets/images/heavy-shower-icon.png';

export const formatTime = (time) => {
  return new Date(time).toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
};

export const formatHourlyTime = (time, iso, isMinute) => {
  return new Date(time).toLocaleString('en-US', {
    hour: 'numeric',
    minute: isMinute && 'numeric',
    hour12: iso,
  });
};

export const getTodaysOvewerview = (data) => {
  return {
    temperature: `${data?.current?.temperature_2m} ${data?.current_units?.temperature_2m}`,
    windSpeed: `${data?.current?.wind_speed_10m} ${data?.current_units?.wind_speed_10m}`,
    apparentTemperature: `${data?.current?.apparent_temperature} ${data?.current_units?.apparent_temperature}`,
    uvIndex: `${data?.current?.uv_index} ${data?.current_units?.uv_index}`,
    cloudCover: `${data?.current?.cloudcover} ${data?.current_units?.cloudcover}`,
    humidity: `${data?.current?.relative_humidity_2m} ${data?.current_units?.relative_humidity_2m}`,
    temp_max: `${data?.daily?.temperature_2m_max[0]} ${data?.daily_units?.temperature_2m_max}`,
    temp_min: `${data?.daily?.temperature_2m_min[0]} ${data?.daily_units?.temperature_2m_min}`,
    feels_like: `${data?.current?.apparent_temperature} ${data?.current_units?.apparent_temperature}`,
    rain: `${data?.daily?.rain_sum[0]} ${data?.daily_units?.rain_sum}`,
    icon: getWeatherIconFromRain(data?.daily?.rain_sum[0]),
  };
};

export const getHourlyWeather = (data) => {
  const currentTime = new Date().getTime();
  const nearestIndex = data?.hourly?.time?.findIndex(
    (time) => new Date(time).getTime() > currentTime
  );
  return data?.hourly?.temperature_2m
    .slice(nearestIndex - 5, nearestIndex)
    .map((temp, index) => ({
      lable:
        index === 4
          ? 'Now'
          : formatHourlyTime(
              data?.hourly?.time[nearestIndex - 5 + index],
              data?.hourly_units?.time
            ),
      value: `${temp} ${data?.hourly_units?.temperature_2m}`,
      temperature: temp,
      rain: data?.hourly?.rain?.[nearestIndex - 5 + index],
      date: data?.hourly?.time[nearestIndex - 5 + index],
      icon: getWeatherIconFromRain(
        data?.hourly?.rain?.[nearestIndex - 5 + index]
      ),
    }));
};

export const getHourlyWeatherForTomorrow = (data) => {
  return data?.hourly?.temperature_2m.map((temp, index) => ({
    lable: formatHourlyTime(
      data?.hourly?.time[index],
      data?.hourly_units?.time
    ),
    value: `${temp} ${data?.hourly_units?.temperature_2m}`,
    temperature: temp,
    rain: data?.hourly?.rain?.[index],
    date: data?.hourly?.time[index],
    icon: getWeatherIconFromRain(data?.hourly?.rain?.[index]),
  }));
};

export const getDailyWeather = (data) => {
  return data?.daily?.temperature_2m_max?.map((temp, index) => ({
    lable: getDayNameFromDate(data?.daily?.time[index]),
    value: `${Math.round(temp)}${data?.daily_units?.temperature_2m_max === '°C' ? '°' : ''}`,
    temperature: temp,
    weatherCode: data?.daily?.weathercode?.[index],
    date: data?.daily?.time[index],
    icon: getWeatherIconFromRain(data?.daily?.rain_sum?.[index]),
  }));
};

export const getWindForChart = (data) => {
  return data?.hourly?.wind_speed_10m?.slice(0, 12).map((wind, index) => ({
    lable: formatHourlyTime(
      data?.hourly?.time[index],
      data?.hourly_units?.time
    ),
    value: wind,
  }));
};

export const getWindForWeekChart = (data) => {
  return data?.daily?.wind_speed_10m_max?.map((wind, index) => ({
    lable: getDayNameFromDate(data?.daily?.time[index], true),
    value: wind,
  }));
};

export const CalculateValueAndMaxvalue = (data, isWeek) => {
  const value = isWeek ? data?.daily?.uv_index_max[0] : data?.current?.uv_index;
  const maxValue = isWeek
    ? Math.max(...data?.daily?.uv_index_max)
    : data?.daily?.uv_index_max[0];
  return { value, maxValue };
};

export const getDayNameFromDate = (date, full = false) => {
  return new Date(date).toLocaleString('en-US', {
    weekday: full ? 'long' : 'short',
  });
};

export const isToday = (data) => {
  return new Date().getDate() === new Date(data?.daily?.time[0]).getDate();
};

export const getTomorrowData = (data) => {
  const tomorrowData = data?.daily?.time.map((time, index) => {
    return {
      date: time,
      temperature: data?.daily?.temperature_2m_max[index],
      temp_max: data?.daily?.temperature_2m_max[index],
      temp_min: data?.daily?.temperature_2m_min[index],
      sunrise: data?.daily?.sunrise[index],
      sunset: data?.daily?.sunset[index],
      wind_speed: data?.daily?.wind_speed_10m_max[index],
      uv_index: data?.daily?.uv_index_max[index],
      feels_like:
        (data?.daily?.temperature_2m_max[index] +
          data?.daily?.temperature_2m_min[index]) /
        2,
      rain: `${data?.daily?.rain_sum[0]} ${data?.daily_units?.rain_sum}`,
      icon: getWeatherIconFromRain(data?.daily?.rain_sum[0]),
    };
  });
  return tomorrowData ? tomorrowData[0] : null;
};

export const tomorrosDate = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split('T')[0];
};

export const getRainChances = (data) => {
  const rainchances = data?.hourly?.precipitation_probability
    ?.slice(0, 24)
    .map((rain, index) => ({
      name: formatHourlyTime(
        data?.hourly?.time[index],
        data?.hourly_units?.time
      ),
      mm: data?.hourly?.rain[index],
      value: getRainLevel(data?.hourly?.rain[index]),
      originalValue: rain,
    }));
  return rainchances;
};

export const getRainChancesForWeek = (data) => {
  const rainchances = data?.daily?.rain_sum?.map((rain, index) => ({
    name: getDayNameFromDate(data?.daily?.time[index]),
    fullName: getDayNameFromDate(data?.daily?.time[index], true),
    mm: rain,
    value: getRainLevel(rain),
    originalValue: rain,
  }));
  return rainchances;
};

export const getDayLength = (sunrise, sunset) => {
  const start = new Date(sunrise);
  const end = new Date(sunset);

  const diffMs = end - start;

  const totalMinutes = Math.floor(diffMs / (1000 * 60));

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours} hr ${minutes} min`;
};

export const celsiusToFahrenheit = (celsius) => {
  return (celsius * 9) / 5 + 32;
};

export const fahrenheitToCelsius = (fahrenheit) => {
  return ((fahrenheit - 32) * 5) / 9;
};

// Weather code to description mapping (WMO codes)
export const getWeatherDescription = (weatherCode) => {
  const code = parseInt(weatherCode);
  if (code === 0) return 'Clear Sky';
  if (code === 1) return 'Mainly Clear';
  if (code === 2) return 'Partly Cloudy';
  if (code === 3) return 'Overcast';
  if (code >= 45 && code <= 48) return 'Foggy';
  if (code >= 51 && code <= 55) return 'Drizzle';
  if (code >= 56 && code <= 57) return 'Freezing Drizzle';
  if (code >= 61 && code <= 65) return 'Rain';
  if (code >= 66 && code <= 67) return 'Freezing Rain';
  if (code >= 71 && code <= 77) return 'Snow';
  if (code >= 80 && code <= 82) return 'Rain Showers';
  if (code >= 85 && code <= 86) return 'Snow Showers';
  if (code >= 95) return 'Thunderstorm';
  return 'Unknown';
};

export const getWeatherIcon = (weatherCode) => {
  const code = parseInt(weatherCode);
  if (code === 0) return 'sunny';
  if (code === 1 || code === 2) return 'partly-cloudy';
  if (code === 3 || (code >= 45 && code <= 48)) return 'cloudy';
  if (code >= 51 && code <= 67) return 'rainy';
  if (code >= 71 && code <= 86) return 'snowy';
  if (code >= 95) return 'thunderstorm';
  return 'cloudy';
};

export const getWeatherIconFromRain = (mm) => {
  if (mm <= 0) return 'sunny';
  if (mm < 2.5) return 'shower';
  if (mm >= 2.5 && mm <= 7.6) return 'heavy-shower';
  if (mm > 7.6 && mm <= 50) return 'rainy';
  if (mm > 50) return 'thunderstorm';
  return 'cloudy';
};

export const getRainDescription = (mm) => {
  if (mm <= 0) return 'Sunny';
  if (mm < 2.5) return 'Shower';
  if (mm >= 2.5 && mm <= 7.6) return 'Moderate';
  if (mm > 7.6 && mm <= 50) return 'Heavy';
  if (mm > 50) return 'Violent';

  return 'Unknown';
};

const RAIN_LEVELS = {
  0: 'Sunny',
  1: 'Shower',
  2: 'Rainy',
  3: 'Heavy',
};

export const getRainLevel = (mm) => {
  if (mm <= 0) return 0;
  if (mm < 2.5) return 1;
  if (mm <= 7.6) return 2;
  return 3;
};

export const getRainLevelFromWeatherCode = (weatherCode) => {
  const code = parseInt(weatherCode);
  if (code === 0) return 0;
  if (code === 1 || code === 2) return 1;
  if (code === 3) return 2;
  return 3;
};

export const formatRainTick = (value) => RAIN_LEVELS[value] || '';

export const getIconForWeather = (iconType) => {
  switch (iconType) {
    case 'sunny':
      return sunnyIcon;
    case 'shower':
      return showerIcon;
    case 'heavy-shower':
      return heavyShowerIcon;
    case 'partly-cloudy':
      return partlyCloudyIcon;
    case 'rainy':
    case 'thunderstorm':
      return rainyIcon;
    case 'windy':
      return windyIcon;
    default:
      return cloudyIcon;
  }
};
