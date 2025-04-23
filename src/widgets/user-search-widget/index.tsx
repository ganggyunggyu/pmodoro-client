import React from 'react';
import { UserSearchForm } from '@/features/user/ui';
import { TabComponent, TabItem } from '@/shared/components/TabComponent';
import { useSearchStore } from '@/app/store/useSearchStore';
import { useQuery } from '@tanstack/react-query';
import { axios } from '@/app/config';

export const tabs = [
  { id: 'all', label: '전체' },
  { id: 'developer', label: '개발자' },
  { id: 'planner', label: '기획자' },
  { id: 'designer', label: '디자이너' },
  { id: 'marketer', label: '마케터' },
];
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
export const UserSearchWidget: React.FC = () => {
  const { setSearchQueryField, searchQuery } = useSearchStore();
  const handleTabClick = (position: string) => {
    setSearchQueryField('position', position);
  };
  const getIsActive = (position) => {
    return searchQuery.position === position;
  };

  return (
    <section className="flex flex-col gap-5 mb-5 min-w-full overflow-scroll">
      <p className="text-xl font-semibold">원하는 팀원을 구체적으로 검색해요</p>

      <div className="flex items-center justify-between lg:justify-start w-full">
        {tabs.map((tab) => (
          <TabItem
            isActive={getIsActive(tab.label)}
            onClick={() => handleTabClick(tab.label)}
            tab={tab}
            key={tab.id}
          />
        ))}
      </div>
      <UserSearchForm />
    </section>
  );
};
