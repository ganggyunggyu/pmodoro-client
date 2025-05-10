import { useWidgetStore } from '@/app/store';
import { Button, DropdownButton, SelectorButton, XIcon } from '@/shared';
import { useSearchStore } from '@/app/store/useSearchStore';
import { DropDownButton } from '@/shared/components/DropDown';
import { DropdownWrapper } from '@/pages/components-page';
import { TabItem } from '@/shared/components/TabComponent';
import { tabs } from '@/widgets/user-search-widget';
import React from 'react';
import {
  ALL_POSITIONS,
  DESIGNER_POSITIONS,
  DEVELOPER_POSITIONS,
  MARKETER_POSITIONS,
  PLANNER_POSITIONS,
} from '@/shared/constants/positions';
import { useUserStore } from '@/app/store/useUserStore';

export const UserSearchForm = () => {
  const { isSearchDropDownOpen, setIsSearchDropDownOpen } = useWidgetStore();

  const { setSearchQueryField, searchQuery, toggleSkill } = useSearchStore();
  const [selectedPosition, setSelectedPosition] = React.useState('전체');

  const [isPositionDropdownOpen, setIsPositionDropdownOpen] =
    React.useState(false);
  const [isCareerDropdownOpen, setIsCareerDropdownOpen] = React.useState(false);

  const [isUserSkillDropdownOpen, setIsUserSkillDropdownOpen] =
    React.useState(false);

  const onOffButtonList = [
    { id: 'designer', label: '온라인', isOnline: true },
    { id: 'marketer', label: '오프라인', isOnline: false },
  ];

  const toggleOnlineOffline = (label: string) => {
    if (searchQuery.isOnline === true && label === '온라인') {
      setSearchQueryField('isOnline', null);
    } else if (searchQuery.isOnline === false && label === '오프라인') {
      setSearchQueryField('isOnline', null);
    } else if (label === '온라인') {
      setSearchQueryField('isOnline', true);
    } else if (label === '오프라인') {
      setSearchQueryField('isOnline', false);
    }
  };

  const handleTabClick = (position) => {
    setSelectedPosition(position);
  };

  const getSkillList = () => {
    if (selectedPosition === '개발자') return DEVELOPER_POSITIONS;
    if (selectedPosition === '디자이너') return DESIGNER_POSITIONS;
    if (selectedPosition === '기획자') return PLANNER_POSITIONS;
    if (selectedPosition === '마케터') return MARKETER_POSITIONS;
    return ALL_POSITIONS;
  };

  const skillList = getSkillList();

  const handleSkillClick = (skill) => {
    toggleSkill(skill);

    console.log(searchQuery);
  };

  return (
    <article className="flex gap-5">
      <div>
        <DropdownWrapper
          isOpen={isUserSkillDropdownOpen}
          trigger={
            <DropdownButton
              onClick={() => {
                setIsUserSkillDropdownOpen(!isUserSkillDropdownOpen);
              }}
              label="기술 스택"
              direction={isUserSkillDropdownOpen ? 'up' : 'down'}
              variant={isUserSkillDropdownOpen ? 'primaryTrans' : 'outlineAlt'}
              size="sm"
            />
          }
        >
          <section className="flex flex-col gap-3 p-3 bg-white fixed">
            <header className="w-full flex justify-between sticky top-0 bg-white z-10">
              <p className="text-black text-lg font-semibold">포지션 선택</p>
              <button
                className="cursor-pointer"
                onClick={() => setIsUserSkillDropdownOpen(false)}
              >
                <XIcon />
              </button>
            </header>
            <div className="flex items-center justify-between w-full">
              {tabs.map((tab) => {
                return (
                  <TabItem
                    isActive={tab.label === selectedPosition}
                    onClick={() => {
                      handleTabClick(tab.label);
                    }}
                    tab={tab}
                    key={tab.id}
                  />
                );
              })}
            </div>
            <div className="flex flex-col gap-2 overflow-y-auto px-1 max-h-[300px]">
              {skillList.map((skill, idx) => {
                return (
                  <SelectorButton
                    key={idx}
                    icon="check"
                    isSelected={searchQuery.skills.includes(skill)}
                    onClick={() => {
                      handleSkillClick(skill);
                    }}
                  >
                    {skill}
                  </SelectorButton>
                );
              })}
            </div>

            <div className="px-3 pb-3">
              <Button
                onClick={() => setIsUserSkillDropdownOpen(false)}
                className="w-full py-3 bg-primary text-white rounded-md text-sm"
              >
                선택완료
              </Button>
            </div>
          </section>
        </DropdownWrapper>
      </div>

      <div className="w-0.5 bg-alt"></div>
      {onOffButtonList.map((op, index) => (
        <Button
          key={index}
          onClick={() => toggleOnlineOffline(op.label)}
          size="sm"
          children={op.label}
          variant={
            op.isOnline === searchQuery.isOnline ? 'primaryTrans' : 'outlineAlt'
          }
        />
      ))}
    </article>
  );
};
