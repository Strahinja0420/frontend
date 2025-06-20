import React, { act, useEffect, useState } from "react";
import TopBar from "../components/TopBar";
import StatCard from "../components/cards/StatCard";
import MyAuctions from "../components/profile/MyAuctions";
import MyBidding from "../components/profile/MyBidding";
import MyWon from "../components/profile/MyWon";
import type { User } from "../types/types";
import { fetchCurrentUser } from "../hooks/getCurrentUser";

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"myAuctions" | "bidding" | "won">(
    "myAuctions"
  );
  const [currentUser, setCurrentUser] = useState<User>();

  useEffect(() => {
    const loadCurrentUser = async () => {
      try {
        const data = await fetchCurrentUser();
        console.log(data);

        setCurrentUser(data);
      } catch (error) {
        console.log(error);
      }
    };

    loadCurrentUser();
  }, []);

  return (
    <div className="min-h-screen">
      <TopBar />

      <div className="px-6 py-1 mx-auto max-w-screen">
        <h1 className="text-2xl font-bold text-(--text-primary) mb-2">
          Hello{" "}
          {currentUser && currentUser.firstName + " " + currentUser.lastName}
        </h1>

        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4 ">
          <StatCard title="Earnings" subtitle="All-time" value="324 €" />
          <StatCard
            title="Posted auctions"
            subtitle="All-time"
            value={currentUser ? currentUser?._count.createdAuctions : 0}
          />
          <StatCard
            title="Currently bidding"
            value={currentUser ? currentUser?._count.bids : 0}
          />
          <StatCard title="Currently winning" value="2" />
        </div>

        <div className="pt-0 pb-3 ">
          <div className="flex items-center justify-center space-x-8 ">
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
