import { useUserStore } from '@/app/store/useUserStore';
import { useGetUserQuery } from '@/entities';
import { LabelButton } from '@/shared';
import React from 'react';

export const PositionLabelList = () => {
  const { userInfo } = useUserStore();
  const userId = userInfo._id;
  const userQuery = useGetUserQuery(userId);

  if (userQuery.isLoading) return <p>loading</p>;

  return (
    <React.Fragment>
      <div className="flex w-full justify-start lg:gap-25 items-center">
        <p className="w-30 text-black-alt">상세 포지션</p>
        <div className="flex gap-3 w-9/12 overflow-scroll">
          {userInfo.skills?.map((position, index) => {
            return (
              <LabelButton
                size="xs"
                variant="outlineAlt"
                key={index}
                label={position}
              />
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
};
