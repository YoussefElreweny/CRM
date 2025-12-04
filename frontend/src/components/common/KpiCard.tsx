
import React from 'react';

interface KpiCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'increase' | 'decrease';
  icon: React.ReactNode;
}

const KpiCard: React.FC<KpiCardProps> = ({ title, value, change, changeType, icon }) => {
  const changeColor = changeType === 'increase' ? 'text-green-500' : 'text-red-500';
  const iconBgColor = changeType === 'increase' ? 'bg-green-100' : changeType === 'decrease' ? 'bg-red-100' : 'bg-blue-100';
  const iconColor = changeType === 'increase' ? 'text-green-600' : changeType === 'decrease' ? 'text-red-600' : 'text-blue-600';

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex items-start">
      <div className={`p-3 rounded-full mr-4 ${iconBgColor} ${iconColor}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <p className="text-3xl font-bold text-gray-800">{value}</p>
        {change && (
          <p className={`text-sm mt-1 ${changeColor}`}>
            {change}
          </p>
        )}
      </div>
    </div>
  );
};

export default KpiCard;
