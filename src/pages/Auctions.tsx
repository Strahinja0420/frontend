import { useEffect, useState } from "react";
import TopBar from "../components/TopBar";
import type { Auction } from "../types/types";
import { fetchAuctions } from "../hooks/getAuctions";
import Card from "../components/cards/Card";

const Auctions = () => {
  const [auctions, setAuctions] = useState<Auction[]>([]);

  useEffect(() => {
    const loadAuctions = async () => {
      try {
        const data = await fetchAuctions();
        setAuctions(data);
        // console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadAuctions();
  }, []);

  return (
    <>
      <TopBar />

      <div className="p-4">
        <h1 className="text-[32px] font-bold mb-3">Auctions</h1>
        {auctions.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center h-[calc(100vh-200px)] ">
            <p className="text-center text-[32px] font-bold text-(--text-primary)">
              Oh no, no auctions yet!
            </p>
            <p className="text-center text-[16px] font-light text-(--text-gray)">
              To add a new auction click "+" button in <br />
              navigation bar or wait for other users <br />
              to add new auctions.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-6  gap-5">
            {auctions.map((auction) => (
              <Card key={auction.id} auction={auction} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Auctions;
