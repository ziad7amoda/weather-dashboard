import React from 'react';
import { MapPin, Droplets, Wind, Eye, Sun, Cloud, CloudRain, X } from 'lucide-react';
import type { WeatherData } from '../types/weather';

interface WeatherCardProps {
  data: WeatherData;
  temperatureUnit: 'C' | 'F';
  onRemove: () => void;
  showRemove?: boolean;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ 
  data, 
  temperatureUnit, 
  onRemove, 
  showRemove = true 
}) => {
  const temp = temperatureUnit === 'C' ? data.current.temp_c : data.current.temp_f;
  const windSpeed = temperatureUnit === 'C' ? `${Math.round(data.current.wind_kph)} km/h` : `${Math.round(data.current.wind_mph)} mph`;
  const visibilityKm = data.current.visibility_km ?? 0;
  const visibility = temperatureUnit === 'C' ? `${visibilityKm} km` : `${Math.round(visibilityKm * 0.621371)} mi`;

  const getWeatherIcon = (condition: string) => {
    const text = condition.toLowerCase();
    if (text.includes('sun') || text.includes('clear')) return <Sun size={32} color="#facc15" />;
    if (text.includes('rain') || text.includes('drizzle')) return <CloudRain size={32} color="#60a5fa" />;
    if (text.includes('cloud')) return <Cloud size={32} color="#9ca3af" />;
    return <Sun size={32} color="#facc15" />;
  };

  return (
    <div className="relative group weather-card-shell">
      <div className="weather-card-surface">
        {/* Remove button */}
        {showRemove && (
          <button onClick={onRemove} className="remove-btn">
            <X className="remove-icon" />
          </button>
        )}

        {/* Location */}
        <div className="location-row">
          <MapPin size={20} color="#ffffffcc" />
          <div>
            <h2 className="text-2xl font-light">{data.location.name}</h2>
            <p className="text-white/70 text-sm">{data.location.country}</p>
          </div>
        </div>

        {/* Main temperature */}
        <div className="text-center mb-8">
          <div className="temp-row">
            {getWeatherIcon(data.current.condition.text)}
            <div className="temp-main">
              {Math.round(temp)}°
            </div>
          </div>
          <div className="condition-row">
            <img
              src={data.current.condition.icon}
              alt={data.current.condition.text}
              className="condition-icon"
            />
            <span className="condition-text">{data.current.condition.text}</span>
          </div>
        </div>

        {/* Weather details */}
        <div className="details-grid">
          <div className="detail-card">
            <div className="detail-row">
              <Droplets size={20} color="#93c5fd" />
              <div>
                <p className="text-white/70 text-sm">Humidity</p>
                <p className="text-white font-semibold">{data.current.humidity}%</p>
              </div>
            </div>
          </div>
          <div className="detail-card">
            <div className="detail-row">
              <Wind size={20} color="#86efac" />
              <div>
                <p className="text-white/70 text-sm">Wind</p>
                <p className="text-white font-semibold">{windSpeed}</p>
              </div>
            </div>
          </div>
          <div className="detail-card">
            <div className="detail-row">
              <Eye size={20} color="#c4b5fd" />
              <div>
                <p className="text-white/70 text-sm">Visibility</p>
                <p className="text-white font-semibold">{visibility}</p>
              </div>
            </div>
          </div>
          <div className="detail-card">
            <div className="detail-row">
              <Sun size={20} color="#fde047" />
              <div>
                <p className="text-white/70 text-sm">UV Index</p>
                <p className="text-white font-semibold">{data.current.uv}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;