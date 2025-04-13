import React from 'react';
import { useWidgetStore } from '@/app/store';
import { useUserStore } from '@/app/store/useUserStore';
import { NextIcon } from '@/widgets/onboarding/step-1-user-info';

export const PositionSelectorButton = () => {
  const { userInfo } = useUserStore();

  const { setIsPositionSelector } = useWidgetStore();

  return (
    <React.Fragment>
      <article className="flex w-full justify-start lg:gap-30 items-center">
        <p className="w-40 text-black-alt">상세 포지션</p>
        <button
          onClick={() => {
            setIsPositionSelector(true);
          }}
          className="flex justify-between p-3 w-full text-left border border-alt rounded-lg"
        >
          <p className={`${userInfo.skills ? 'text-black-alt' : 'text-black'}`}>
            {userInfo.skills ? userInfo.skills?.join(', ') : '기술 스택'}
          </p>
          <NextIcon />
        </button>
      </article>
    </React.Fragment>
  );
};
