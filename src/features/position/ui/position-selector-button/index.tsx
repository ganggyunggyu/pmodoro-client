import React from 'react';
import { useWidgetStore } from '@/app/store';
import { useUserStore } from '@/app/store/useUserStore';
import { LabelButton, NextIcon, SelectorButton } from '@/shared';
import { PositionLabelList } from '../position-label-list';

export const PositionSelectorButton = () => {
  const { userInfo } = useUserStore();

  const { setIsPositionSelector } = useWidgetStore();

  return (
    <article className="flex w-full justify-start lg:gap-30 items-center">
      <p className="w-40 text-black-alt">상세 포지션</p>

      <SelectorButton
        onClick={() => {
          setIsPositionSelector(true);
        }}
        icon="arrow"
        isSelected={false}
      >
        <p className={`${userInfo.skills ? 'text-black-alt' : 'text-black'}`}>
          {userInfo.skills ? userInfo.skills?.join(', ') : '기술 스택'}
        </p>
      </SelectorButton>
      {/* <div className="absolute w-full bottom-0">
        {userInfo?.skills.map((skil) => {
          return <LabelButton variant="outlineAlt" size="sm" label={skil} />;
        })}
      </div> */}
    </article>
  );
};
