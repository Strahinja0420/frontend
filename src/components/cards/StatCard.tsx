import React from 'react';

interface StatCardProps {
  title: string;
  subtitle?: string;
  value: string | number;
}

const StatCard: React.FC<StatCardProps> = ({ title, subtitle, value }) => {
  return (
    <div  className="group bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:bg-black">
      <h3 className="text-lg font-medium text-(--text-primary) group-hover:text-(--primary-yellow)">{title}</h3>
      {subtitle && <p className="text-sm text-gray-500 mb-2 group-hover:text-(--primary-yellow)">{subtitle}</p>}
      <p className="text-3xl font-bold text-(--text-primary) group-hover:text-(--primary-yellow)">{value}</p>
    </div>
  );
};

export default StatCard;