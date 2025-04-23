import { axios } from '@/app/config';
import { useSearchStore } from '@/app/store/useSearchStore';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

export const TabComponent = ({ tabOptionList }) => {
  const [selectedTab, setSelectedTab] = React.useState('all');

  const handleTabClick = (tabId) => {
    setSelectedTab(tabId);
  };

  return (
    <div className="flex">
      {tabOptionList.map((tab) => (
        <TabItem isActive={false} tab={tab} />
      ))}
    </div>
  );
};
interface TabItemProps extends React.HTMLAttributes<HTMLDivElement> {
  tab: {
    id: string | number;
    label: string;
  };
  isActive: boolean;
}

export const TabItem: React.FC<TabItemProps> = ({
  tab,
  className,
  isActive,
  ...props
}) => {
  return (
    <div
      key={tab.id}
      className={`cursor-pointer p-2 lg:mx-2 text-caption1-m lg:text-headline-m ${
        isActive ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-500'
      } ${className ?? ''}`}
      {...props}
    >
      <p className="w-fit">{tab.label}</p>
    </div>
  );
};
