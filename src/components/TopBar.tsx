import React from "react";

const TopBar = () => {
  return (
    <div className="flex items-center p-3">
      <div className="text-2xl font-bold text-blue-600 pr-[10px]">
        <img src="src/assets/images/logo.png" />
      </div>

      <div className="flex items-center space-x-0.5 bg-white p-2 rounded-[32px]">
        <div className="flex">
          <button className="flex items-center px-4 py-2 bg-white text-black rounded-[32px]">
            <img src="src/assets/icons/home.png" alt="" />
            Auctions
          </button>
        </div>
        <div className="flex">
          <button className="flex items-center px-4 py-2 bg-(--main-black-color) text-white rounded-[32px]">
            <img
              className="bg-white rounded-2xl"
              src="src/assets/icons/Person.png"
              alt=""
            />
            Profile
          </button>
        </div>
      </div>

      <div className="flex-grow"></div>

      {/* //TODO promeni sliku u svg ikonicu iz lucide react-a */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center bg-white p-1 rounded-[32px]">
          <button className=" relative p-2 pr-0 text-gray-600 hover:text-gray-900">
            <img
              className="rounded-full bg-gray-400  h-9 w-9"
              src="src/assets/icons/Notifications.png"
              alt=""
            />
            {/* <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span> */}
          </button>
          <button className="px-2">
            <img className="h-12" src="src/assets/images/button.png" alt="" />
          </button>
          <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center">
            <span className="text-sm font-medium">JR</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
