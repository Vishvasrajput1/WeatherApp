import React, { useState, Component, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Dashboard } from './Dashboard';


const APIkey = import.meta.env.VITE_APP_OPENWEATHER_API_KEY;

export const Layout = ({ children }) => {
  const location = useLocation();
  const isRootPath = location.pathname === '/';
  const initialCity = {
    lat: 23.02579,
    lon: 72.58727,
    name: 'Ahmedabad',
    label: 'Ahmedabad, Gujarat (India)',
  };
  const [city, setCity] = useState();
  useEffect(() => {
    function getLocationInfo(lat, lon) {
      const url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${APIkey}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setCity((prevCity) => ({
            ...prevCity,
            name: data[0]?.name,
            label: `${data[0]?.name}, ${data[0]?.state}, ${data[0]?.country}`,
            lat: data[0]?.lat,
            lon: data[0]?.lon,
          }));
          localStorage.setItem(
            'city',
            JSON.stringify({
              name: data[0]?.name,
              label: `${data[0]?.name}, ${data[0]?.state}, ${data[0]?.country}`,
              lat: data[0]?.lat,
              lon: data[0]?.lon,
            })
          );
        })
        .catch((error) => {
          console.error(error);
        });
    }
    if (navigator.geolocation) {
      const options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          getLocationInfo(latitude, longitude);

        },
        (error) => {
          console.warn(`Error: ${error.message}`);
          getLocationInfo(initialCity.lat, initialCity.lon);
        },
        options
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }, []);

  return (
    <>
      <div className='flex flex-col gap-7.5 h-screen overflow-hidden bg-(--bg-color) text-(--text-color)'>
        <div className='sticky top-0 z-50 w-full p-4 pb-0 bg-(--bg-color)'>
          <Header city={city} setCity={setCity} />
        </div>
        <div className='flex-1 px-4 overflow-y-auto overflow-x-hidden'>
          {isRootPath ? <Dashboard city={city} /> : children || <Outlet />}
        </div>
      </div>
    </>
  );
};
