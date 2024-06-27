import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSnowflake,
  faCloudSun,
  faSun,
  faThermometerHalf,
} from "@fortawesome/free-solid-svg-icons";

import {
  UilTemperature,
  UilTear,
  UilWind,
  UilSun,
  UilSunset,
} from "@iconscout/react-unicons";
import { iconUrlFromCode } from "../services/weatherService";

const TemperatureAndDetails = ({
  weather,
  weather: {
    details,
    icon,
    temp,
    temp_min,
    temp_max,
    sunrise,
    sunset,
    speed,
    humidity,
    feels_like,
    timezone,
  },
}) => {
  const getTemperatureIcon = (temp) => {
    if (temp <= 0) {
      return <FontAwesomeIcon icon={faSnowflake} />;
    } else if (temp > 0 && temp <= 20) {
      return <FontAwesomeIcon icon={faCloudSun} />;
    } else if (temp > 20 && temp <= 30) {
      return <FontAwesomeIcon icon={faThermometerHalf} />;
    } else {
      return <FontAwesomeIcon icon={faSun} />;
    }
  };

  return (
    <div className="text-black">
      <div className="flex items-center justify-center py-6 text-xl text-cyan-300">
        <p>{details}</p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between text-white py-3 space-y-4 md:space-y-0">
        <img src={iconUrlFromCode(icon)} alt="" className="w-20" />
        <div className="flex flex-col md:flex-row items-center">
          <h1 className="text-5xl md:mr-5">{getTemperatureIcon(temp)}</h1>
          <p className="text-5xl">{`${temp.toFixed()}°`}</p>
        </div>

        <div className="flex flex-col space-y-2">
          <div className="flex font-bold text-sm items-center justify-center">
            <UilTemperature size={18} className="mr-1" />
            Real feel:
            <span className="font-bold ml-1">{`${feels_like.toFixed()}°`}</span>
          </div>
          <div className="flex  text-sm items-center font-bold  justify-center">
            <UilTear size={18} className="mr-1" />
            Humidity:
            <span className="font-bold ml-1">{`${humidity.toFixed()}%`}</span>
          </div>
          <div className="flex  font-bold text-sm items-center justify-center">
            <UilWind size={18} className="mr-1" />
            Wind:
            <span className="font-bold ml-1">{`${speed.toFixed()} km/h`}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-4 text-white text-sm py-3">
        <div className="flex items-center">
          <UilSun />
          <p className="font-bold">
            Rise: <span className="font-bold ml-1">{sunrise}</span>
          </p>
        </div>
        <p className="font-bold hidden md:inline">|</p>

        <div className="flex items-center">
          <UilSunset />
          <p className="font-bold">
            Set: <span className="font-bold ml-1">{sunset}</span>
          </p>
        </div>
        <p className="font-bold hidden md:inline">|</p>

        <div className="flex items-center">
          <UilSun />
          <p className="font-bold">
            High:{" "}
            <span className="font-bold ml-1">{`${temp_max.toFixed()}°`}</span>
          </p>
        </div>
        <p className="font-bold hidden md:inline">|</p>

        <div className="flex items-center">
          <UilSun />
          <p className="font-bold">
            Low:{" "}
            <span className="font-bold ml-1">{`${temp_min.toFixed()}°`}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TemperatureAndDetails;
