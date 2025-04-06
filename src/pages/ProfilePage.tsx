import { useParams } from 'react-router';
import { getUser, useGetUserQuery } from './Mypage';
import { PulseLoaderSpinner } from '@/shared/components/PulseLoaderPage';
import React from 'react';
import { UserInfo } from '@/app/store/useUserStore';
import { useUserSearchQuery } from '@/shared/components/TabComponent';
import { UserCard } from './HomePage';

export const ProfileImage = () => {
  const params = useParams();
  const { data: user, isLoading } = useGetUserQuery(params.userId);
  if (isLoading) return <PulseLoaderSpinner />;

  console.log(user);
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

export const UserProfileCard = () => {
  const params = useParams();
  const { data: user, isLoading } = useGetUserQuery(params.userId);

  if (isLoading) return <PulseLoaderSpinner />;
  return (
    <article className={`flex gap-3 lg:flex-col lg:gap-7 lg:w-3/12`}>
      <div className="flex items-end gap-5">
        <div>
          <ProfileImage />
        </div>
        <div className="flex flex-col">
          <p className="text-lg font-semibold">{user.displayName}</p>
          <p>{user.position}</p>
        </div>
      </div>
      <button className="lg:block hidden bg-primary text-white rounded-md py-2 px-10">
        채팅하기
      </button>
    </article>
  );
};

export const UserDescription = () => {
  return <article></article>;
};

export const ProfilePage = () => {
  const params = useParams();

  const { data: user, isLoading } = useGetUserQuery(params.userId);
  const { data: users, isLoading: isUsersLoading } = useUserSearchQuery();

  if (isLoading) return <PulseLoaderSpinner />;

  return (
    <main className="flex flex-col gap-10 h-screen">
      <section
        className={`gap-4 lg:gap-10 p-6 border border-alt
        lg:flex 
        flex flex-col `}
      >
        <UserProfileCard />
        <article className="flex flex-col p-6 bg-primary-opacity flex-1">
          <p className="text-primary">자기소개</p>
          <p>{user.description}</p>
        </article>
      </section>

      <section className="flex flex-col gap-4 lg:gap-7">
        <p className="text-lg font-semibold">기본정보</p>

        <article className="flex">
          <p className="text-black-alt w-50">직무</p>
          <p>{user.position}</p>
        </article>
        <article className="flex">
          <p className="text-black-alt w-50">경력</p>
          <p>{user.career}</p>
        </article>
        <article className="flex">
          <p className="text-black-alt w-50">기술 스택</p>
          <div className="flex gap-3">
            {user.skills.map((skill, index) => {
              return (
                <figure
                  key={index}
                  className="min-w-fit px-3 py-2 border border-alt rounded-full text-xs"
                >
                  {skill}
                </figure>
              );
            })}
          </div>
        </article>
      </section>

      <section className="flex flex-col gap-4 lg:gap-7">
        <p className="text-lg font-semibold">프로젝트 참여 정보</p>

        <article className="flex">
          <p className="text-black-alt w-50">활동 지역</p>
          <p>
            {user.firstArea
              ? user.firstArea + ' ' + user.secondArea
              : '정보 없음'}
          </p>
        </article>
        <article className="flex">
          <p className="text-black-alt w-50">참가 선호</p>
          <p>{user.isOnline ? '온라인' : '오프라인'}</p>
        </article>
        <article className="flex">
          <p className="text-black-alt w-50">참가 경험</p>
          <p>0회</p>
        </article>
      </section>

      <section className="flex flex-col gap-4 lg:gap-7">
        <p className="text-lg font-semibold">더 찾아보기</p>

        <section className="flex gap-3 w-full overflow-x-scroll pb-20">
          {isUsersLoading ? (
            <div className="flex">
              <PulseLoaderSpinner />
            </div>
          ) : (
            users?.map((cardUser: UserInfo) => <UserCard cardUser={cardUser} />)
          )}
        </section>
      </section>
    </main>
  );
};
