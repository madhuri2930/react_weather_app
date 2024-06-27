import { DateTime } from "luxon";

const API_KEY = "e77ca2027834626a3354b426b0bb340b";
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

const getWeatherData = (infoType, searchParams) => {
  const url = new URL(BASE_URL + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

  return fetch(url).then((res) => res.json());
};

const formatCurrentWeather = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
    timezone,
  } = data;

  const { main: details, icon } = weather[0];
  const formattedLocalTime = formatToLocalTime(dt, timezone);
  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    country,
    sunrise: formatToLocalTime(sunrise, timezone, "hh:mm a"),
    sunset: formatToLocalTime(sunset, timezone, "hh:mm a"),
    details,
    icon: iconUrlFromCode(icon),
    speed,
    timezone,
    formattedLocalTime,
  };
};

const formatForecastWeather = (secs, offset, data) => {
  const daily = data
    .filter((f) => f.dt_txt.slice(-8) === "00:00:00")
    .map((f) => ({
      temp: f.main.temp,
      title: formatToLocalTime(f.dt, offset, "ccc"),
      icon: getIconBasedOnTemperature(f.main.temp),
      date: f.dt_txt,
    }));

  const hourly = data
    .filter((f) => f.dt > secs)
    .map((f) => ({
      temp: f.main.temp,
      title: formatToLocalTime(f.dt, offset, "hh:mm a"),
      icon: getIconBasedOnTemperature(f.main.temp),
      date: f.dt_txt,
    }))
    .slice(0, 5);

  return { daily, hourly };
};

const getFormattedWeatherData = async (searchParams) => {
  const formattedCurrentWeather = await getWeatherData(
    "weather",
    searchParams
  ).then(formatCurrentWeather);
  const { dt, lat, lon, timezone } = formattedCurrentWeather;

  const formattedForecastWeather = await getWeatherData("forecast", {
    lat,
    lon,
    units: searchParams.units,
  }).then((d) => formatForecastWeather(dt, timezone, d.list));

  return { ...formattedCurrentWeather, ...formattedForecastWeather };
};

const formatToLocalTime = (
  secs,
  offset,
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) =>
  DateTime.fromSeconds(Number(secs + offset), { zone: "utc" }).toFormat(format);

const iconUrlFromCode = (code) =>
  `http://openweathermap.org/img/wn/${code}@2x.png`;

const getIconBasedOnTemperature = (temp) => {
  if (temp < 0) {
    return "❄️"; // Snowflake icon for freezing temperatures
  } else if (temp >= 0 && temp < 10) {
    return "🧥"; // Coat icon for cold temperatures
  } else if (temp >= 10 && temp < 20) {
    return "🌤️"; // Partly sunny icon for cool temperatures
  } else if (temp >= 20 && temp < 30) {
    return "☀️"; // Sun icon for warm temperatures
  } else {
    return "🔥"; // Fire icon for hot temperatures
  }
};

export default getFormattedWeatherData;

export { formatToLocalTime, iconUrlFromCode, getIconBasedOnTemperature };
