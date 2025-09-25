import { ClockFading } from "lucide-react";
import type { Auction } from "../../types/types";
import { useEffect, useState } from "react";

interface TimeTagProps {
  auction: Auction;
}

type TimeLeft = {
  value: number;
  unit: "d" | "h" | "m";
};

const SmallTimeTag: React.FC<TimeTagProps> = ({ auction }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ value: 0, unit: "m" });

  useEffect(() => {
    const calculateTimeLeft = (): TimeLeft => {
      const now = new Date();
      const endTime = new Date(auction.endTime!);
      const diffMs = endTime.getTime() - now.getTime();

      if (diffMs <= 0) return { value: 0, unit: "m" };

      const totalMinutes = Math.floor(diffMs / (1000 * 60));
      if (totalMinutes < 60) {
        return { value: totalMinutes, unit: "m" };
      }

      const totalHours = Math.floor(totalMinutes / 60);
      if (totalHours < 24) {
        return { value: totalHours, unit: "h" };
      }

      const totalDays = Math.floor(totalHours / 24);
      return { value: totalDays, unit: "d" };
    };

    setTimeLeft(calculateTimeLeft());

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [auction.endTime]);

  const isUrgent = timeLeft.unit !== "d";

  return (
    <div
      className={`flex items-center justify-center text-[10px] font-light px-3 py-1 rounded-[16px] w-fit gap-1 ${
        isUrgent ? "bg-primary-red text-white" : "bg-white text-primary"
      }`}
    >
      {timeLeft.value > 0 ? `${timeLeft.value}${timeLeft.unit}` : "Ended"}
      <ClockFading size={10} />
    </div>
  );
};

export default SmallTimeTag;
