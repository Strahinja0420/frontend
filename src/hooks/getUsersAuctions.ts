import type { Auction } from "../types/types";

export const fetchUsersAuctions = async (): Promise<Auction[]> => {
  try {
    const token = localStorage.getItem("token");
    // console.log(token);

    const response = await fetch("http://localhost:5000/users/me/auctions", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("something went wrong while fetching auctions");
    console.log(error);
    
    return [];
  }
};
