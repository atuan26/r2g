import React from "react";

const TimePicker = () => {
  return (
    <label className="text-gray-700" for="time">
      <input
        type="time"
        className="appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent flex-1"
      />
    </label>
  );
};

export default TimePicker;
