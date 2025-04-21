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
    <div className="flex gap-3 w-full overflow-scroll">
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
  );
};
