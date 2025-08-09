# Weather Dashboard

A real-time weather dashboard built with React and TypeScript that displays weather information for multiple cities with a clean and minimal UI.

## Features

- 🌤️ **Real-time weather data** for multiple cities
- 🔍 **Search functionality** to add new cities
- 📊 **3-day weather forecast** with detailed information
- 🌡️ **Temperature unit toggle** (Celsius/Fahrenheit)
- 📱 **Responsive design** that works on all devices
- ⚡ **Loading states** and error handling
- 🎨 **Clean and minimal UI** with modern design
- 🗑️ **Remove cities** from the dashboard

## Weather Information Displayed

### Current Weather
- Temperature (current and feels like)
- Weather condition with icons
- Humidity percentage
- Wind speed and direction
- Atmospheric pressure
- Visibility
- Last updated timestamp

### 3-Day Forecast
- Daily high and low temperatures
- Weather conditions with icons
- Humidity levels
- Date and day information

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd weather-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will open at `http://localhost:3000`

### API Configuration

This application uses the WeatherAPI.com service. To use real weather data:

1. **Sign up for a free API key** at [WeatherAPI.com](https://www.weatherapi.com/)
   - Go to https://www.weatherapi.com/
   - Click "Get Started for Free"
   - Create an account
   - Get your API key from the dashboard

2. **Replace the API key** in `src/services/weatherApi.ts`:
```typescript
const API_KEY = 'your-actual-api-key-here'; // Replace with your actual API key
```

3. **The application will automatically:**
   - Use real weather data when a valid API key is provided
   - Fall back to mock data when no API key is provided or when the key is invalid

### Troubleshooting

#### 401 Unauthorized Error
If you see a 401 error, it means:
- Your API key is invalid or has expired
- You've exceeded the free tier limits (1,000,000 calls per month)

**Solution:**
1. Check your API key at https://www.weatherapi.com/dashboard
2. Generate a new API key if needed
3. Update the `API_KEY` constant in `src/services/weatherApi.ts`

#### Using Mock Data
The application automatically uses mock data when:
- No API key is provided
- API key is invalid or expired
- API service is unavailable

This ensures the application always works, even without a valid API key.

## Usage

1. **Search for a city**: Enter a city name in the search box and click "Search"
2. **View weather details**: Each city displays current weather and 3-day forecast
3. **Toggle temperature units**: Click the temperature toggle button to switch between Celsius and Fahrenheit
4. **Remove cities**: Click the X button on any weather card to remove it from the dashboard
5. **Add multiple cities**: Search for different cities to build your personalized dashboard

## Technology Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type safety and better development experience
- **Axios** - HTTP client for API requests
- **Lucide React** - Beautiful icons
- **date-fns** - Date formatting utilities
- **CSS Custom Properties** - Modern styling with CSS variables

## Project Structure

```
src/
├── components/
│   ├── WeatherCard.tsx      # Current weather display
│   ├── ForecastCard.tsx     # 3-day forecast display
│   └── LoadingSpinner.tsx   # Loading animation
├── services/
│   └── weatherApi.ts        # API service and mock data
├── types/
│   └── weather.ts           # TypeScript interfaces
├── App.tsx                  # Main application component
├── index.tsx               # Application entry point
└── index.css               # Global styles
```

## Customization

### Styling
The application uses CSS custom properties for easy theming. Modify the variables in `src/index.css`:

```css
:root {
  --primary-color: #6366f1;
  --background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --surface: rgba(255, 255, 255, 0.95);
  /* ... other variables */
}
```

### Adding New Weather Data
To display additional weather information, modify the `WeatherData` interface in `src/types/weather.ts` and update the corresponding components.

## API Limits

- WeatherAPI.com free tier: 1,000,000 calls per month
- Rate limit: 1 call per second

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- [WeatherAPI.com](https://www.weatherapi.com/) for providing weather data
- [Lucide](https://lucide.dev/) for beautiful icons
- [date-fns](https://date-fns.org/) for date utilities 