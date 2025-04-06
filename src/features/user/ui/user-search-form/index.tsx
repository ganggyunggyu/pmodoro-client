import React from 'react';
import { DropDownButton, DropDownOverlay } from '@/shared/components/DropDown';
import { useWidgetStore } from '@/app/store';

export const UserSearchForm = () => {
  // Zustand 스토어에서 상태 가져오기
  const { isSearchDropDownOpen, setIsSearchDropDownOpen } = useWidgetStore();

  // 옵션 및 포지션 리스트
  const options = [
    // { id: 'all', label: '기술 스택' },
    // { id: 'developer', label: '세부 직무' },
    // { id: 'planner', label: '경력' },
    { id: 'designer', label: '온라인' },
    { id: 'marketer', label: '오프라인' },
    // { id: 'marketer', label: '위치' },
  ];

  const PositionList = [
    { id: 1, label: '개발자' },
    { id: 2, label: '디자이너' },
    { id: 3, label: '기획자' },
    { id: 4, label: '마케터' },
  ];

  const handleDropdownBackgroundClick = () => {
    setIsSearchDropDownOpen(false);
  };

  return (
    <article className="flex gap-5">
      {isSearchDropDownOpen && (
        <DropDownOverlay
          label="포지션"
          tabOptionList={PositionList}
          mainOptionList={options}
          toggleDropdown={handleDropdownBackgroundClick}
        />
      )}

      {options.map((op, index) => (
        <DropDownButton key={index} label={op.label} />
      ))}
    </article>
  );
};
