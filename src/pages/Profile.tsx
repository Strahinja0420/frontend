import React, { act, useState } from "react";
import TopBar from "../components/TopBar";
import StatCard from "../components/cards/StatCard";
import MyAuctions from "../components/profile/MyAuctions";
import MyBidding from "../components/profile/MyBidding";
import MyWon from "../components/profile/MyWon";

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"myAuctions" | "bidding" | "won">(
    "myAuctions"
  );

  return (
    <div className="min-h-screen">
      <TopBar />

      <div className="max-w-screen mx-auto px-6 py-1">
        <h1 className="text-2xl font-bold text-(--text-primary) mb-2">
          Hello Jamal Reces!
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 ">
          <StatCard title="Earnings" subtitle="All-time" value="324 €" />
          <StatCard title="Posted auctions" subtitle="All-time" value="18" />
          <StatCard title="Currently bidding" value="5" />
          <StatCard title="Currently winning" value="2" />
        </div>

        <div className=" pt-0">
          <div className="flex space-x-8 items-center justify-center ">
            <div className="bg-[#EDF4F2] rounded-[32px] py-1 px-1">
              <button
                onClick={() => setActiveTab("myAuctions")}
                className={`px-4 py-2 font-medium rounded-[16px] transition-all duration-200 ease-in-out ${
                  activeTab === "myAuctions"
                    ? "bg-(--main-black-color) text-white"
                    : "text-(--text-primary) hover:text-white hover:bg-(--main-black-color)"
                }`}
              >
                My auctions
              </button>
              <button
                onClick={() => setActiveTab("bidding")}
                className={`px-4 py-2 font-medium rounded-[16px] transition-all duration-200 ease-in-out ${
                  activeTab === "bidding"
                    ? "bg-(--main-black-color) text-white"
                    : "text-(--text-primary) hover:text-white hover:bg-(--main-black-color)"
                }`}
              >
                Bidding
              </button>
              <button
                onClick={() => setActiveTab("won")}
                className={`px-4 py-2 font-medium rounded-[16px] transition-all duration-200 ease-in-out ${
                  activeTab === "won"
                    ? "bg-(--main-black-color) text-white"
                    : "text-(--text-primary) hover:text-white hover:bg-(--main-black-color)"
                }`}
              >
                Won
              </button>
            </div>
          </div>
        </div>

        {activeTab === "myAuctions" ? (
          <MyAuctions />
        ) : activeTab === "bidding" ? (
          <MyBidding />
        ) : activeTab === "won" ? (
          <MyWon />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Profile;
