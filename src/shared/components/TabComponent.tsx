import React from 'react';

export const TabComponent = ({ tabOptionList }) => {
  const [selectedTab, setSelectedTab] = React.useState('all');

  const handleTabClick = (tabId) => {
    setSelectedTab(tabId);
  };

  return (
    <div className="flex">
      {tabOptionList.map((tab) => (
        <TabItem tab={tab} isActive={false} onClick={handleTabClick} />
      ))}
    </div>
  );
};

interface TabItemProps {
  tab: any;
  isActive: boolean;
  onClick: (tabId) => void;
}

export const TabItem: React.FC<TabItemProps> = ({ tab, isActive, onClick }) => {
  return (
    <div
      key={tab.id}
      className={`cursor-pointer p-2 mx-2 text-sm ${
        isActive ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-500'
      }`}
      onClick={onClick}
    >
      <p className="">{tab.label}</p>
    </div>
  );
};
