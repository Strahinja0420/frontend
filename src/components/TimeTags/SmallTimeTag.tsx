import { ClockFading } from "lucide-react";


interface time {
  time: string;
}

const SmallTimeTag: React.FC<time> = ({ time }) => {
  return (
    <div
      className={`flex items-center justify-center not-last:text-primary text-[14px] font-light px-[4px] py-[2px] rounded-[16px] w-[69px] h-[24px] gap-1 ${
        time === "24h" ? " bg-(--primary-red)" : " bg-white"
      }`}
    >
      {time} <ClockFading size={14} />
    </div>
  );
};

export default SmallTimeTag;
