import "./App.css";
import TopButtons from "./components/TopButtons";
import Inputs from "./components/Inputs";
import TimeAndLocation from "./components/TimeAndLocation";
import TemperatureAndDetails from "./components/TemperatureAndDetails";
import Forecast from "./components/Forecast";
import Loader from "./components/Loader"; // Import the Loader component
import getFormattedWeatherData from "./services/weatherService";
import { useEffect, useState } from "react";

function App() {
  const [query, setQuery] = useState({ q: "hyderabad" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true); // Set loading to true before fetching data

      await getFormattedWeatherData({ ...query, units })
        .then((data) => {
          setWeather(data);
          setLoading(false); // Set loading to false after fetching data
        })
        .catch((error) => {
          console.error("Failed to fetch weather data:", error);
          setLoading(false); // Set loading to false in case of error
        });
    };

    fetchWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return "url('/images/warm.jpg')";

    const threshold = units === "metric" ? 20 : 68;

    if (weather.temp <= threshold) {
      return "url('/images/cold.jpeg')";
    } else if (weather.temp > threshold && weather.temp <= threshold + 10) {
      return "url('/images/cold.jpeg')";
    } else if (
      weather.temp > threshold + 10 &&
      weather.temp <= threshold + 20
    ) {
      return "url('/images/hot.jpeg')";
    } else {
      return "url('/images/warm.jpg')";
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen m-10"
      style={{
        backgroundImage: formatBackground(),
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="mx-auto max-w-screen-lg mt-4 py-5 px-4 md:px-8 lg:px-32 h-fit  shadow-gray-400 bg-transparent">
        <TopButtons setQuery={setQuery} />
        <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />
        {loading && <Loader />} {/* Render Loader component when loading */}
        {!loading && weather && (
          <div>
            <TimeAndLocation weather={weather} />
            <TemperatureAndDetails weather={weather} />
            <Forecast title="hourly forecast" items={weather.hourly} />
            <Forecast title="daily forecast" items={weather.daily} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
