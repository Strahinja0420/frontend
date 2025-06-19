import React from "react";

interface StatCardProps {
  title: string;
  subtitle?: string;
  value: string | number;
}

const StatCard: React.FC<StatCardProps> = ({ title, subtitle, value }) => {
  return (
    <div className="flex flex-col h-full p-3 pb-0 bg-white rounded-lg shadow-sm group hover:bg-black">
      <div className="flex-grow">
        <h3 className="text-[20px]  font-bold text-(--text-primary) group-hover:text-(--primary-yellow)">
          {title}
        </h3>
        {subtitle && (
          <p className="text-[16px] font-light text-(--text-gray) mb-2 group-hover:text-(--primary-yellow)">
            {subtitle}
          </p>
        )}
      </div>
      <p className="text-[80px] font-bold text-(--text-primary) group-hover:text-(--primary-yellow)">
        {value}
      </p>
    </div>
  );
};

export default StatCard;
