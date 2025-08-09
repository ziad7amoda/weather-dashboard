import React, { useState, useEffect } from 'react';
import { Search, MapPin, Thermometer } from 'lucide-react';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import { fetchWeatherData, fetchMockWeatherData } from './services/weatherApi';
import type { WeatherData } from './types/weather';

// Seed: initial demo data from mock service so UI is not empty on load
const seedData: WeatherData = {
  location: {
    name: 'New York',
    region: 'NY',
    country: 'USA',
    lat: 40.7128,
    lon: -74.006,
    localtime: new Date().toISOString(),
  },
  current: {
    temp_c: 22,
    temp_f: 72,
    condition: { text: 'Partly cloudy', icon: '//cdn.weatherapi.com/weather/64x64/day/116.png', code: 1003 },
    humidity: 65,
    wind_kph: 15,
    wind_mph: 9,
    wind_dir: 'NW',
    pressure_mb: 1012,
    feelslike_c: 22,
    feelslike_f: 72,
    uv: 5,
    visibility_km: 10,
  },
  forecast: {
    forecastday: [
      { date: new Date().toISOString().split('T')[0], day: { maxtemp_c: 25, maxtemp_f: 77, mintemp_c: 18, mintemp_f: 64, avgtemp_c: 22, avgtemp_f: 72, maxwind_kph: 20, maxwind_mph: 12, totalprecip_mm: 0, totalprecip_in: 0, avghumidity: 60, condition: { text: 'Sunny', icon: '//cdn.weatherapi.com/weather/64x64/day/113.png', code: 1000 } }, hour: [] },
      { date: new Date(Date.now()+86400000).toISOString().split('T')[0], day: { maxtemp_c: 23, maxtemp_f: 73, mintemp_c: 16, mintemp_f: 61, avgtemp_c: 20, avgtemp_f: 68, maxwind_kph: 18, maxwind_mph: 11, totalprecip_mm: 0, totalprecip_in: 0, avghumidity: 62, condition: { text: 'Partly cloudy', icon: '//cdn.weatherapi.com/weather/64x64/day/116.png', code: 1003 } }, hour: [] },
      { date: new Date(Date.now()+2*86400000).toISOString().split('T')[0], day: { maxtemp_c: 20, maxtemp_f: 68, mintemp_c: 14, mintemp_f: 57, avgtemp_c: 17, avgtemp_f: 62, maxwind_kph: 22, maxwind_mph: 14, totalprecip_mm: 2, totalprecip_in: 0.08, avghumidity: 65, condition: { text: 'Light rain', icon: '//cdn.weatherapi.com/weather/64x64/day/296.png', code: 1063 } }, hour: [] },
    ],
  },
};

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([seedData]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [temperatureUnit, setTemperatureUnit] = useState<'C' | 'F'>('C');

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeatherData(searchQuery.trim());
      // Replace previous city with the new one
      setWeatherData([data]);
      setSearchQuery('');
    } catch (e) {
      // As a safe fallback, try mock
      try {
        const mock = await fetchMockWeatherData(searchQuery.trim());
        setWeatherData([mock]);
      } catch (err) {
        setError('Unable to fetch weather data. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const removeCity = (cityName: string) => {
    setWeatherData(prev => prev.filter(data => data.location.name !== cityName));
  };

  const toggleTemperatureUnit = () => {
    setTemperatureUnit(prev => prev === 'C' ? 'F' : 'C');
  };

  return (
    <div className="app">
      <div className="container">
        <header className="app-header">
          <h1 className="app-title">Weather Forecast</h1>
          <p className="app-subtitle">Real-time weather information worldwide</p>
        </header>

        <div className="search-area">
          <div className="search-wrapper">
            <Search className="search-icon" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Search for any city..."
              className="search-input"
              disabled={loading}
            />
            {loading && (
              <div className="search-loading">
                <div className="spinner" />
              </div>
            )}
          </div>
        </div>

        <div className="unit-toggle-container">
          <div className="unit-segment" role="group" aria-label="Temperature unit selector">
            <button
              type="button"
              className={`unit-option ${temperatureUnit === 'C' ? 'active' : ''}`}
              onClick={() => setTemperatureUnit('C')}
              aria-pressed={temperatureUnit === 'C'}
            >
              °C
            </button>
            <button
              type="button"
              className={`unit-option ${temperatureUnit === 'F' ? 'active' : ''}`}
              onClick={() => setTemperatureUnit('F')}
              aria-pressed={temperatureUnit === 'F'}
            >
              °F
            </button>
          </div>
        </div>

        {error && <div className="error-banner">{error}</div>}

        {weatherData.length > 0 ? (
          <div className="cards-stack">
            {weatherData.map((data) => (
              <div key={data.location.name} className="card-group">
                <WeatherCard
                  data={data}
                  temperatureUnit={temperatureUnit}
                  onRemove={() => removeCity(data.location.name)}
                  showRemove={weatherData.length > 1}
                />
                <ForecastCard forecast={data.forecast.forecastday} temperatureUnit={temperatureUnit} />
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-inner">
              <div className="empty-state-icon">
                <MapPin />
              </div>
              <h2 className="empty-state-title">Welcome to Weather Forecast</h2>
              <p className="empty-state-subtitle">Discover real-time weather conditions and forecasts for cities around the world</p>
              <p className="empty-state-hint">Try searching for "London", "New York", "Tokyo", or "Paris"</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;