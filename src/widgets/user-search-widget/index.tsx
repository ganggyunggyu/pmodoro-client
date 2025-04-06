import React from 'react';
import { UserSearchForm } from '@/features/user/ui';
import { TabComponent, TabItem } from '@/shared/components/TabComponent';
import { useSearchStore } from '@/app/store/useSearchStore';

export const UserSearchWidget: React.FC = () => {
  const { selectedPosition, setSelectedPosition } = useSearchStore();
  const tabs = [
    { id: 'all', label: '전체' },
    { id: 'developer', label: '개발자' },
    { id: 'planner', label: '기획자' },
    { id: 'designer', label: '디자이너' },
    { id: 'marketer', label: '마케터' },
  ];

  const handleTabClick = (position) => {
    setSelectedPosition(position);

    console.log(selectedPosition);
  };

  return (
    <section className="flex flex-col gap-5 mb-5 w-full overflow-scroll">
      <p className="text-xl font-semibold">원하는 팀원을 구체적으로 검색해요</p>

      <div className="flex">
        {tabs.map((tab) => (
          <TabItem
            tab={tab}
            key={tab.id}
            onClick={() => handleTabClick(tab.label)}
            isActive={selectedPosition === tab.label}
          />
        ))}
      </div>
      <UserSearchForm />
    </section>
  );
};
