import React from 'react';
import { DropDownButton, DropDownOverlay } from '@/shared/components/DropDown';

export const UserSearchForm = () => {
  const [isDromDown, setIsDropDown] = React.useState(false);
  const options = [
    { id: 'all', label: '전체' },
    { id: 'developer', label: '개발자' },
    { id: 'planner', label: '기획자' },
    { id: 'designer', label: '디자이너' },
    { id: 'marketer', label: '마케터' },
  ];
  const handleDropdownClick = () => {
    setIsDropDown(!isDromDown);
  };
  const handleDropdownBackgroundClick = () => {
    setIsDropDown(!isDromDown);
  };
  return (
    <article className="flex gap-5">
      {isDromDown && (
        <DropDownOverlay
          label="포지션"
          tabOptionList={options}
          mainOptionList={options}
          toggleDropdown={handleDropdownBackgroundClick}
        />
      )}
      {options.map((op) => {
        return (
          <DropDownButton
            key={op.id}
            onClick={handleDropdownClick}
            label={op.label}
            isActive={op.label === '디자이너'}
          />
        );
      })}
    </article>
  );
};
