import React from "react";

function Forecast({ title, items }) {
  return (
    <div className="text-black">
      <div className="flex items-center justify-start mt-6">
        <p className="text-white font-bold uppercase">{title}</p>
      </div>
      <hr className="my-2" />

      <div className="flex flex-wrap items-center justify-between text-white">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center m-2 md:m-4 lg:m-6"
          >
            <p className="font-light text-sm md:text-base">{item.title}</p>
            <div className="w-12 my-1 md:w-16 lg:w-20 text-center">
              <span
                role="img"
                aria-label="icon"
                className="text-3xl md:text-3xl lg:text-3xl"
              >
                {item.icon}
              </span>
            </div>
            <p className="font-medium text-base md:text-lg lg:text-xl">{`${item.temp.toFixed()}°`}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;
