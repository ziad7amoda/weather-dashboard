import axios from 'axios';
import { WeatherData, WeatherError, ForecastDay } from '../types/weather';

// OpenWeatherMap API
// https://openweathermap.org/forecast5
const API_KEY = 'API_KEY'; // Replace with your actual API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const weatherApi = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

function kelvinToC(k: number) {
  return k - 273.15;
}
function kelvinToF(k: number) {
  return (k - 273.15) * 9/5 + 32;
}

function getWeatherIcon(icon: string) {
  return `//openweathermap.org/img/wn/${icon}@2x.png`;
}

function mapOpenWeatherToWeatherData(city: string, data: any): WeatherData {
  // Get current weather from first forecast entry
  const current = data.list[0];
  const cityInfo = data.city;

  // 3-day forecast: group by date
  const forecastMap: { [date: string]: any[] } = {};
  data.list.forEach((entry: any) => {
    const date = entry.dt_txt.split(' ')[0];
    if (!forecastMap[date]) forecastMap[date] = [];
    forecastMap[date].push(entry);
  });
  const forecastDays: ForecastDay[] = Object.keys(forecastMap)
    .slice(0, 3)
    .map(date => {
      const dayEntries = forecastMap[date];
      // Calculate min/max/avg temps, humidity, etc.
      const temps = dayEntries.map((e: any) => e.main.temp);
      const minTemps = dayEntries.map((e: any) => e.main.temp_min);
      const maxTemps = dayEntries.map((e: any) => e.main.temp_max);
      const humidities = dayEntries.map((e: any) => e.main.humidity);
      const winds = dayEntries.map((e: any) => e.wind.speed);
      const conditions = dayEntries.map((e: any) => e.weather[0]);
      const mainCondition = conditions[Math.floor(conditions.length / 2)];
      return {
        date,
        day: {
          maxtemp_c: kelvinToC(Math.max(...maxTemps)),
          maxtemp_f: kelvinToF(Math.max(...maxTemps)),
          mintemp_c: kelvinToC(Math.min(...minTemps)),
          mintemp_f: kelvinToF(Math.min(...minTemps)),
          avgtemp_c: kelvinToC(
            temps.reduce((a: number, b: number) => a + b, 0) / temps.length
          ),
          avgtemp_f: kelvinToF(
            temps.reduce((a: number, b: number) => a + b, 0) / temps.length
          ),
          maxwind_kph: Math.max(...winds) * 3.6,
          maxwind_mph: Math.max(...winds) * 2.23694,
          totalprecip_mm: 0, // Not available in free API
          totalprecip_in: 0,
          avghumidity: humidities.reduce((a: number, b: number) => a + b, 0) / humidities.length,
          condition: {
            text: mainCondition.description,
            icon: getWeatherIcon(mainCondition.icon),
            code: mainCondition.id,
          },
        },
        hour: [],
      };
    });

  return {
    location: {
      name: cityInfo.name,
      region: cityInfo.country,
      country: cityInfo.country,
      lat: cityInfo.coord.lat,
      lon: cityInfo.coord.lon,
      localtime: new Date(current.dt * 1000).toISOString(),
    },
    current: {
      temp_c: kelvinToC(current.main.temp),
      temp_f: kelvinToF(current.main.temp),
      condition: {
        text: current.weather[0].description,
        icon: getWeatherIcon(current.weather[0].icon),
        code: current.weather[0].id,
      },
      humidity: current.main.humidity,
      wind_kph: current.wind.speed * 3.6,
      wind_mph: current.wind.speed * 2.23694,
      wind_dir: '',
      pressure_mb: current.main.pressure,
      feelslike_c: kelvinToC(current.main.feels_like),
      feelslike_f: kelvinToF(current.main.feels_like),
      uv: 0,
      visibility_km: (current.visibility || 0) / 1000,
    },
    forecast: {
      forecastday: forecastDays,
    },
  };
}

export const fetchWeatherData = async (city: string): Promise<WeatherData> => {
  try {
    const response = await weatherApi.get('/forecast', {
      params: {
        q: city,
        appid: API_KEY,
      },
    });
    return mapOpenWeatherToWeatherData(city, response.data);
  } catch (error) {
    // Fallback to mock data on error
    console.error('Falling back to mock data:', error);
    return fetchMockWeatherData(city);
  }
};

// For demo purposes, we'll use mock data when API key is not provided
export const fetchMockWeatherData = async (city: string): Promise<WeatherData> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const mockData: WeatherData = {
    location: {
      name: city,
      region: 'Demo Region',
      country: 'Demo Country',
      lat: 40.7128,
      lon: -74.0060,
      localtime: new Date().toISOString(),
    },
    current: {
      temp_c: Math.floor(Math.random() * 30) + 10,
      temp_f: Math.floor(Math.random() * 86) + 50,
      condition: {
        text: 'Partly cloudy',
        icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
        code: 1003,
      },
      humidity: Math.floor(Math.random() * 40) + 40,
      wind_kph: Math.floor(Math.random() * 20) + 5,
      wind_mph: Math.floor(Math.random() * 12) + 3,
      wind_dir: 'NW',
      pressure_mb: Math.floor(Math.random() * 50) + 1000,
      feelslike_c: Math.floor(Math.random() * 30) + 10,
      feelslike_f: Math.floor(Math.random() * 86) + 50,
      uv: Math.floor(Math.random() * 10) + 1,
      visibility_km: Math.floor(Math.random() * 10) + 5,
    },
    forecast: {
      forecastday: [
        {
          date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          day: {
            maxtemp_c: Math.floor(Math.random() * 30) + 15,
            maxtemp_f: Math.floor(Math.random() * 86) + 59,
            mintemp_c: Math.floor(Math.random() * 15) + 5,
            mintemp_f: Math.floor(Math.random() * 59) + 41,
            avgtemp_c: Math.floor(Math.random() * 25) + 10,
            avgtemp_f: Math.floor(Math.random() * 77) + 50,
            maxwind_kph: Math.floor(Math.random() * 25) + 10,
            maxwind_mph: Math.floor(Math.random() * 15) + 6,
            totalprecip_mm: Math.floor(Math.random() * 10),
            totalprecip_in: Math.floor(Math.random() * 4),
            avghumidity: Math.floor(Math.random() * 40) + 40,
            condition: {
              text: 'Sunny',
              icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
              code: 1000,
            },
          },
          hour: [],
        },
        {
          date: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString().split('T')[0],
          day: {
            maxtemp_c: Math.floor(Math.random() * 30) + 15,
            maxtemp_f: Math.floor(Math.random() * 86) + 59,
            mintemp_c: Math.floor(Math.random() * 15) + 5,
            mintemp_f: Math.floor(Math.random() * 59) + 41,
            avgtemp_c: Math.floor(Math.random() * 25) + 10,
            avgtemp_f: Math.floor(Math.random() * 77) + 50,
            maxwind_kph: Math.floor(Math.random() * 25) + 10,
            maxwind_mph: Math.floor(Math.random() * 15) + 6,
            totalprecip_mm: Math.floor(Math.random() * 10),
            totalprecip_in: Math.floor(Math.random() * 4),
            avghumidity: Math.floor(Math.random() * 40) + 40,
            condition: {
              text: 'Cloudy',
              icon: '//cdn.weatherapi.com/weather/64x64/day/119.png',
              code: 1006,
            },
          },
          hour: [],
        },
        {
          date: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString().split('T')[0],
          day: {
            maxtemp_c: Math.floor(Math.random() * 30) + 15,
            maxtemp_f: Math.floor(Math.random() * 86) + 59,
            mintemp_c: Math.floor(Math.random() * 15) + 5,
            mintemp_f: Math.floor(Math.random() * 59) + 41,
            avgtemp_c: Math.floor(Math.random() * 25) + 10,
            avgtemp_f: Math.floor(Math.random() * 77) + 50,
            maxwind_kph: Math.floor(Math.random() * 25) + 10,
            maxwind_mph: Math.floor(Math.random() * 15) + 6,
            totalprecip_mm: Math.floor(Math.random() * 10),
            totalprecip_in: Math.floor(Math.random() * 4),
            avghumidity: Math.floor(Math.random() * 40) + 40,
            condition: {
              text: 'Light rain',
              icon: '//cdn.weatherapi.com/weather/64x64/day/296.png',
              code: 1063,
            },
          },
          hour: [],
        },
      ],
    },
  };
  
  return mockData;
}; 