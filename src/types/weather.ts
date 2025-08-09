export interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    localtime: string;
  };
  current: {
    temp_c: number;
    temp_f: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    humidity: number;
    wind_kph: number;
    wind_mph: number;
    wind_dir: string;
    pressure_mb: number;
    feelslike_c: number;
    feelslike_f: number;
    uv: number;
    visibility_km: number;
  };
  forecast: {
    forecastday: ForecastDay[];
  };
}

export interface ForecastDay {
  date: string;
  day: {
    maxtemp_c: number;
    maxtemp_f: number;
    mintemp_c: number;
    mintemp_f: number;
    avgtemp_c: number;
    avgtemp_f: number;
    maxwind_kph: number;
    maxwind_mph: number;
    totalprecip_mm: number;
    totalprecip_in: number;
    avghumidity: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
  };
  hour: HourForecast[];
}

export interface HourForecast {
  time: string;
  temp_c: number;
  temp_f: number;
  condition: {
    text: string;
    icon: string;
    code: number;
  };
  humidity: number;
  wind_kph: number;
  wind_mph: number;
  wind_dir: string;
  pressure_mb: number;
  feelslike_c: number;
  feelslike_f: number;
  chance_of_rain: number;
  chance_of_snow: number;
}

export interface WeatherError {
  error: {
    code: number;
    message: string;
  };
} 