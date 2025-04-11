import { useParams } from 'react-router';
import { PulseLoaderSpinner } from '@/shared/components/PulseLoaderPage';
import React from 'react';
import { UserInfo } from '@/app/store/useUserStore';
import { useUserSearchQuery } from '@/shared/components/TabComponent';
import { useGetProjectByUser, useGetUserQuery } from '@/entities';
import { UserCard } from '@/features/user/ui/user-card';
import { ProfileImage } from '@/entities/user/ui/profile-image';
import { ProjectCard } from '@/features/project/ui/project-card';

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
  const { data: projectList, isLoading: isProjectListLoading } =
    useGetProjectByUser(params.userId);

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
          <p>
            {isProjectListLoading
              ? '로딩 중...'
              : projectList?.length
              ? `${projectList.length}회`
              : '프로젝트 경험 없음'}
          </p>
        </article>
      </section>

      <section className="w-12/12 flex flex-col gap-3">
        {isProjectListLoading ? (
          <div className="flex">
            <PulseLoaderSpinner />
          </div>
        ) : (
          projectList &&
          projectList.map((project) => {
            return <ProjectCard key={project?._id} project={project} />;
          })
        )}
      </section>
      <section className="flex flex-col gap-4 lg:gap-7">
        <p className="text-lg font-semibold">더 찾아보기</p>

        <section className="flex gap-3 w-full overflow-x-scroll pb-20">
          {isUsersLoading ? (
            <div className="flex">
              <PulseLoaderSpinner />
            </div>
          ) : (
            users?.map((cardUser: UserInfo) => (
              <UserCard key={cardUser._id} cardUser={cardUser} />
            ))
          )}
        </section>
      </section>
    </main>
  );
};
