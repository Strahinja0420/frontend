import { useEffect, useState } from "react";
import Card from "./Card";
import type { Auction } from "../../types/types";
import { fetchAuctions } from "../../hooks/getAuctions";

const CardGroup = () => {
  const [auctions, setAuctions] = useState<Auction[]>([]);

  useEffect(() => {
    const loadAuctions = async () => {
      try {
        const data = await fetchAuctions();
        setAuctions(data);
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    };

    loadAuctions();
  }, []);
  return (
    <div className="grid grid-cols-2 gap-6 justify-items-center">
      {auctions.slice(0, 4).map((a) => (
        <Card key={a.id} auction={a} />
      ))}
    </div>
  );
};

export default CardGroup;
