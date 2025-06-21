import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import AddAuction from "./pop-ups/AddAuction";
import ProfileSettings from "./pop-ups/ProfileSettings";
import { Bell, User } from "lucide-react";
import { House } from 'lucide-react';

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
            <House size={16} />
            <p className="pl-1">Auctions</p>
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
            <User size={16} />
            <p className="pl-1">Profile</p>
          </NavLink>
        </div>
      </div>

      <div className="flex-grow"></div>
      <div className="flex items-center bg-white  rounded-[32px] gap-2 p-1 max-h-[64px] ">
        <button className="relative text-gray-600 hover:text-gray-900">
          <div className="text-black bg-(--lighter-gray) rounded-[32px] p-3.5 ">
            <Bell size={15} />
          </div>
          {/* <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span> */}
        </button>
        <button
          onClick={() => setAddAuctionModal(!addAuctionModal)}
          className="hover:cursor-pointer "
        >
          <img className="h-11 " src="src/assets/images/button.png" alt="" />
        </button>
        {addAuctionModal && (
          <AddAuction onClose={() => setAddAuctionModal(!addAuctionModal)} />
        )}

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
  );
};

export default TopBar;
