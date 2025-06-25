import { ClockFading } from "lucide-react";
import type { Auction } from "../../types/types";
import { useEffect, useState } from "react";

interface TimeTagProps {
  auction: Auction;
}

type TimeLeft = {
  value: number;
  unit: 'h' | 'd';
};

const SmallTimeTag: React.FC<TimeTagProps> = ({ auction }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ 
    value: 0, 
    unit: 'h' 
  });

  // console.log(auction);
  

  useEffect(() => {
    const calculateTimeLeft = (): TimeLeft => {
      const now = new Date();
      const endTime = new Date(auction.endTime!);
      const diffMs = endTime.getTime() - now.getTime();
      
      if (diffMs <= 0) {
        return { value: 0, unit: 'h' };
      }

      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      
      if (diffHours < 24) {
        return { value: diffHours, unit: 'h' };
      } else {
        const diffDays = Math.floor(diffHours / 24);
        return { value: diffDays, unit: 'd' };
      }
    };

    setTimeLeft(calculateTimeLeft());
    
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 60000);

    return () => clearInterval(interval);
  }, [auction.endTime]);

  const isLessThan24h = timeLeft.unit === 'h' && timeLeft.value < 24;

  return (
    <div
      className={`flex items-center justify-center text-[10px] font-light px-3 py-1 rounded-[16px] w-fit gap-1 ${
        isLessThan24h ? "bg-primary-red text-white" : "bg-white text-primary"
      }`}
    >
      {timeLeft.value > 0 ? `${timeLeft.value}${timeLeft.unit}` : ''} 
      <ClockFading size={10} />
    </div>
  );
};

export default SmallTimeTag;