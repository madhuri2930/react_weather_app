import React, { useState } from "react";
import { UilSearch, UilLocationPoint } from "@iconscout/react-unicons";

function Inputs({ setQuery, units, setUnits }) {
  const [city, setCity] = useState("");

  const handleUnitsChange = (e) => {
    const selectedUnit = e.currentTarget.name;
    if (units !== selectedUnit) setUnits(selectedUnit);
  };

  const handleSearchClick = () => {
    if (city !== "") setQuery({ q: city });
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        setQuery({
          lat,
          lon,
        });
      });
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center my-6 text-black space-y-4 md:space-y-0 md:space-x-4">
      <div className="flex flex-row w-full md:w-3/4 items-center space-x-4">
        <input
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
          type="text"
          placeholder="Search for City"
          className="text-lg md:text-xl font-light p-2 w-full shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-md bg-white"
        />
        <UilSearch
          size={25}
          className="text-white cursor-pointer transition ease-out hover:scale-125"
          onClick={handleSearchClick}
        />
        <UilLocationPoint
          size={25}
          className="text-white cursor-pointer transition ease-out hover:scale-125"
          onClick={handleLocationClick}
        />
      </div>

      <div className="flex flex-row w-full md:w-1/4 items-center justify-center space-x-2">
        <button
          name="metric"
          className="text-lg md:text-xl text-white font-light transition ease-out hover:scale-125"
          onClick={handleUnitsChange}
        >
          °C
        </button>
        <p className="text-lg md:text-xl text-white">|</p>
        <button
          name="imperial"
          className="text-lg md:text-xl text-white font-light transition ease-out hover:scale-125"
          onClick={handleUnitsChange}
        >
          °F
        </button>
      </div>
    </div>
  );
}

export default Inputs;
