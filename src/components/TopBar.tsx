import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import AddAuction from "./pop-ups/AddAuction";
import ProfileSettings from "./pop-ups/ProfileSettings";

const TopBar = () => {
  const [addAuctionModal, setAddAuctionModal] = useState(false);
  const [profileSettings, setProfileSettings] = useState(false);

  return (
    <div className="flex items-center p-3">
      <div className="text-2xl font-bold text-blue-600 pr-[10px]">
        <Link to={"/"}>
          <img className="w-12 h-12" src="src/assets/images/logo.png" />
        </Link>
      </div>

      <div className="flex items-center space-x-0.5 bg-white p-1 rounded-[32px]">
        <div className="flex">
          <NavLink
            to="/auctions"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-[32px] transition-all duration-200 ease-in-out ${
                isActive
                  ? "bg-(--main-black-color) text-white"
                  : "bg-white text-black hover:bg-gray-100"
              }`
            }
          >
            <img
              className="bg-white rounded-2xl"
              src="src/assets/icons/home.png"
              alt=""
            />
            Auctions
          </NavLink>
        </div>
        <div className="flex">
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-[32px] transition-all duration-200 ease-in-out ${
                isActive
                  ? "bg-(--main-black-color) text-white"
                  : "bg-white text-black hover:bg-gray-100"
              }`
            }
          >
            <img
              className="bg-white rounded-2xl"
              src="src/assets/icons/Person.png"
              alt=""
            />
            Profile
          </NavLink>
        </div>
      </div>

      <div className="flex-grow"></div>

      {/* //TODO promeni sliku u svg ikonicu iz lucide react-a */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center bg-white p-0 rounded-[32px]">
          <button className="relative p-2 pr-0 text-gray-600 hover:text-gray-900">
            <img
              className="w-8 h-8 bg-gray-400 rounded-full"
              src="src/assets/icons/Notifications.png"
              alt=""
            />
            {/* <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span> */}
          </button>
          <div className="px-2">
            <button
              onClick={() => setAddAuctionModal(!addAuctionModal)}
              className="hover:cursor-pointer"
            >
              <img
                className="h-11 "
                src="src/assets/images/button.png"
                alt=""
              />
            </button>
            {addAuctionModal && (
              <AddAuction
                onClose={() => setAddAuctionModal(!addAuctionModal)}
              />
            )}
          </div>
          <button
            onClick={() => setProfileSettings(!profileSettings)}
            className="hover:cursor-pointer"
          >
            <div className="flex items-center justify-center bg-gray-300 rounded-full h-11 w-11">
              <span className="text-sm font-medium">JR</span>
            </div>
          </button>
          {profileSettings && (
                <ProfileSettings
                  onClose={() => setProfileSettings(!profileSettings)}
                />
              )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
