import { PulseLoaderSpinner } from '@/shared/components/PulseLoaderPage';
import React from 'react';
import { useParams } from 'react-router';
import { useGetUserQuery } from '../../hooks';

export const ProfileImage = () => {
  const params = useParams();
  const { data: user, isLoading } = useGetUserQuery(params.userId);

  if (isLoading) return <PulseLoaderSpinner />;
  return (
    <React.Fragment>
      {user?.kakaoAuthInfo?.profileImg ? (
        <img
          className="w-20 h-20 rounded-full"
          src={user.kakaoAuthInfo.profileImg}
          alt=""
        />
      ) : (
        <div className="w-20 h-20 rounded-full bg-alt" />
      )}
    </React.Fragment>
  );
};
