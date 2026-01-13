import { MapContainer, TileLayer, LayersControl, useMap } from 'react-leaflet';
import { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';

/* 🔁 Recenter map when city changes */
const RecenterMap = ({ lat, lon }) => {
  const map = useMap();

  useEffect(() => {
    if (lat && lon) {
      map.setView([lat, lon], 8, {
        animate: true,
      });
    }
  }, [lat, lon, map]);

  return null;
};

const WeatherMap = ({ selectedCity }) => {
  const API_KEY = import.meta.env.VITE_APP_OPENWEATHER_API_KEY;

  const lat = selectedCity?.lat || 20;
  const lon = selectedCity?.lon || 78;

  return (
    <div className='w-full h-full rounded-2xl overflow-hidden shadow-lg border border-gray-200'>
      <MapContainer
        center={[lat, lon]}
        zoom={5}
        style={{
          height:
            window.innerWidth > 1440
              ? 522
              : window.innerWidth >= 1024
              ? 484
              : 300,
          width: '100%',
        }}
      >
        {/* Base map */}
        <TileLayer
          url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
          attribution='&copy; OpenStreetMap &copy; CARTO'
        />

        {/* Auto recenter */}
        <RecenterMap lat={lat} lon={lon} />

        <LayersControl position='topright' collapsed={false}>
          <LayersControl.Overlay name='Precipitation (Rain)'>
            <TileLayer
              url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
              detectRetina={true}
            />
          </LayersControl.Overlay>

          <LayersControl.Overlay checked name='Temperature'>
            <TileLayer
              url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
              detectRetina={true}
            />
          </LayersControl.Overlay>

          <LayersControl.Overlay name='Wind Speed'>
            <TileLayer
              url={`https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
              detectRetina={true}
            />
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
    </div>
  );
};

export default WeatherMap;
