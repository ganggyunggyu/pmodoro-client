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
        <TabItem tab={tab} />
      ))}
    </div>
  );
};

interface TabItemProps {
  tab: any;
}

export const useUserSearchQuery = () => {
  const { searchQuery } = useSearchStore(); // zustand store에서 searchQuery 가져오기

  return useQuery({
    queryKey: ['searchUsers', searchQuery], // 쿼리 키로 searchQuery를 사용
    queryFn: () => getSearchUsers(searchQuery), // 서버 요청
  });
};

export const getSearchUsers = async (searchQuery: Record<string, any>) => {
  const { data } = await axios.get('/users/search', { params: searchQuery });
  return data;
};

export const TabItem: React.FC<TabItemProps> = ({ tab }) => {
  const { setSearchQueryField, searchQuery } = useSearchStore();

  const handleTabClick = (position) => {
    setSearchQueryField('position', position);
  };

  const getIsActive = () => {
    return searchQuery.position === tab.label;
  };
  const isActiveTemp = getIsActive();

  return (
    <div
      key={tab.id}
      className={`cursor-pointer p-2 mx-2 text-xs lg:text-sm ${
        isActiveTemp
          ? 'text-red-500 border-b-2 border-red-500'
          : 'text-gray-500'
      }`}
      onClick={() => handleTabClick(tab.label)}
    >
      <p className="">{tab.label}</p>
    </div>
  );
};
