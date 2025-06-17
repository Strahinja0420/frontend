import React, { useEffect, useState } from "react";
import TopBar from "../components/TopBar";
import type { Auction } from "../types/types";
import { fetchAuctions } from "../hooks/getAuctions";
import Card from "../components/cards/Card";

const Auctions = () => {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAuctions = async () => {
      try {
        const data = await fetchAuctions();
        setAuctions(data);
        console.log(data);
        
      } catch (err) {
        setError("Failed to load auctions");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadAuctions();
  }, []);

  if (loading) {
    return <div>Loading auctions...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (auctions.length === 0) {
    return <div>No auctions available</div>;
  }
  return (
    <>
      <TopBar />

      <div className="p-4">
      <h1 className="text-[32px] font-bold mb-3">Auctions</h1>
      <div className="grid grid-cols-6  gap-50">
        {auctions.map((auction) => (
          <Card key={auction.id} auction={auction} />
        ))}
      </div>
    </div>
    </>
  );
};

export default Auctions;
