import React from "react";

function TopButtons({ setQuery }) {
  const cities = [
    {
      id: 1,
      title: "London",
    },
    {
      id: 2,
      title: "Sydney",
    },
    {
      id: 3,
      title: "Tokyo",
    },
    {
      id: 4,
      title: "Mumbai",
    },
    {
      id: 5,
      title: "Paris",
    },
  ];

  return (
    <div className="flex flex-wrap justify-around my-6 text-black">
      {cities.map((city) => (
        <button
          key={city.id}
          className="m-1 px-1 py-1  text-white text-lg font-bold rounded-lg hover:bg-pink-500 transition duration-300"
          onClick={() => setQuery({ q: city.title })}
        >
          {city.title}
        </button>
      ))}
    </div>
  );
}

export default TopButtons;
