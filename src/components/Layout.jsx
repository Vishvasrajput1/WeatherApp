import React, { useState, Component, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Dashboard } from './Dashboard';


const geojson = {
  type: 'Feature',
  properties: {
    datasource: {
      sourcename: 'openstreetmap',
      attribution: '© OpenStreetMap contributors',
      license: 'Open Database License',
      url: 'https://www.openstreetmap.org/copyright',
    },
    ref: 'DL',
    other_names: {
      ref: 'DL',
      'name:ar': 'دلهي',
      'name:cs': 'Dillí',
      'name:ga': 'Deilí',
      'name:hi': 'दिल्ली',
      'name:ja': 'デリー',
      'name:kn': 'ದೆಹಲಿ',
      'name:ks': 'دِل',
      'name:mr': 'दिल्ली',
      'name:or': 'ଦିଲ୍ଲୀ',
      'name:pa': 'ਦਿੱਲੀ',
      'name:ru': 'Дели',
      'name:ta': 'டெல்லி',
      'name:te': 'ఢిల్లీ',
      'name:ug': 'دېھلى',
      'name:uk': 'Делі',
      'name:ur': 'دہلی',
      'name:zh': '德里国家首都辖区',
      alt_name: 'राष्ट्रीय राजधानी क्षेत्र दिल्ली',
      'name:grc': 'Δελίς',
      'ISO3166-2': 'IN-DL',
      '_place_name:de': 'Nationales Hauptstadtterritorium Delhi',
      'name:eo': 'Delhio',
      'name:ko': '델리',
      'official_name:de': 'Nationales Hauptstadtterritorium Delhi',
      'official_name:vi': 'Lãnh thổ Thủ đô Quốc gia Delhi',
      'alt_name:vi': 'Dilli',
      official_name: 'National Capital Territory of Delhi',
    },
    country: 'India',
    country_code: 'in',
    state: 'Delhi',
    iso3166_2: 'IN-DL',
    lon: 77.1716954,
    lat: 28.6273928,
    state_code: 'DL',
    result_type: 'state',
    formatted: 'Delhi, India',
    address_line1: 'Delhi',
    address_line2: 'India',
    category: 'administrative',
    timezone: {
      name: 'Asia/Kolkata',
      offset_STD: '+05:30',
      offset_STD_seconds: 19800,
      offset_DST: '+05:30',
      offset_DST_seconds: 19800,
      abbreviation_STD: 'IST',
      abbreviation_DST: 'IST',
    },
    plus_code: '7JWVJ5GC+XM',
    rank: {
      importance: 0.703553691289515,
      confidence: 1,
      match_type: 'full_match',
    },
    place_id:
      '51eaf7b30efd4a534059f1be85d09ca03c40f00101f9013aa41d0000000000c0020a',
  },
  geometry: {
    type: 'Point',
    coordinates: [77.1716954, 28.6273928],
  },
  bbox: [76.8388351, 28.4046285, 77.3452524, 28.8834464],
};
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

          // Optionally, use a geocoding API like Google Maps or OpenCage to get the address
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
      <div className='flex flex-col h-screen overflow-hidden bg-(--bg-color) text-(--text-color)'>
        <div className='sticky top-0 z-50 w-full p-4 pb-0 bg-(--bg-color)'>
          <Header city={city} setCity={setCity} />
        </div>
        <div className='flex-1 p-4 overflow-y-auto overflow-x-hidden'>
          {isRootPath ? <Dashboard city={city} /> : children || <Outlet />}
        </div>
      </div>
    </>
  );
};
