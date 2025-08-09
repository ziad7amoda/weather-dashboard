import React from 'react';
import { ArrowUp, ArrowDown, Sun, Cloud, CloudRain } from 'lucide-react';
import type { ForecastDay } from '../types/weather';

// ForecastDay type is imported from types

interface ForecastCardProps {
  forecast: ForecastDay[];
  temperatureUnit: 'C' | 'F';
}

const ForecastCard: React.FC<ForecastCardProps> = ({ forecast, temperatureUnit }) => {
  const getWeatherIcon = (condition: string) => {
    const text = condition.toLowerCase();
    if (text.includes('sun') || text.includes('clear')) return <Sun className="w-8 h-8 text-yellow-400" />;
    if (text.includes('rain') || text.includes('drizzle')) return <CloudRain className="w-8 h-8 text-blue-400" />;
    if (text.includes('cloud')) return <Cloud className="w-8 h-8 text-gray-400" />;
    return <Sun className="w-8 h-8 text-yellow-400" />;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <div className="forecast-card">
      <h3 className="forecast-title">3-Day Forecast</h3>
      <div className="forecast-days">
        {forecast.map((day, index) => {
          const maxTemp = temperatureUnit === 'C' ? day.day.maxtemp_c : day.day.maxtemp_f;
          const minTemp = temperatureUnit === 'C' ? day.day.mintemp_c : day.day.mintemp_f;
          
          return (
            <div key={day.date} className="forecast-day">
              <div className="forecast-day-info">
                <div className="forecast-day-name">
                  {index === 0 ? (
                    <>
                      Today <span className="day-pill">Now</span>
                    </>
                  ) : (
                    formatDate(day.date)
                  )}
                </div>
                <div className="forecast-day-weather">
                  {getWeatherIcon(day.day.condition.text)}
                  <span className="forecast-day-condition">{day.day.condition.text}</span>
                </div>
              </div>
              <div className="forecast-day-temps">
                <div className="forecast-day-high">
                  <ArrowUp className="forecast-day-icon" />
                  {Math.round(maxTemp)}°
                </div>
                <div className="forecast-day-low">
                  <ArrowDown className="forecast-day-icon" />
                  {Math.round(minTemp)}°
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ForecastCard;