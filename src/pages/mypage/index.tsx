import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useUserStore } from '@/app/store/useUserStore';

import { PulseLoaderSpinner } from '@/shared/components/PulseLoaderPage';
import { getIsMobile } from '@/shared/lib';

import { ProjectForm } from '@/features/project/ui/project-form';
import { useWidgetStore } from '@/app/store';
import {
  useGetProjectByUser,
  useGetUserQuery,
  usePatchUserMutation,
} from '@/entities';
import { ProfileImage } from '@/entities/user/ui/profile-image';
import { ProjectCard } from '@/features/project/ui/project-card';

import {
  PositionSelector,
  PositionSelectorWrapper,
} from '@/widgets/selector/position';
import { MainSidebar } from '@/widgets/side-bar/main-side-bar';
import { EditInput } from '@/shared/components/EditInput';
import { PositionLabelList } from '@/features/position/ui/position-label-list';
import { PositionSelectorButton } from '@/features';

export const Mypage: React.FC = () => {
  const isMobile = getIsMobile();
  const navigate = useNavigate();

  const {
    isProjectForm,
    setIsProjectForm,
    isPositionSelector,
    setIsPositionSelector,
  } = useWidgetStore();

  const { mutate: patchUser } = usePatchUserMutation();

  const { userInfo, setUserInfoField } = useUserStore();
  const { userId } = useParams();
  const { data: projectList, isLoading: isProjectListLoading } =
    useGetProjectByUser(userId);

  const [isEditing, setIsEditing] = React.useState(false);

  const userQuery = useGetUserQuery(userId);
  const postLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('auth_time');

    navigate('/');

    window.location.reload();
  };

  const handleLogoutClick = () => {
    postLogout();
  };

  if (userQuery.isLoading) {
    return <PulseLoaderSpinner />;
  }

  const sideItem = [
    { label: '마이페이지', path: '/my-page' },
    { label: '알림', path: '/alram' },
    { label: '설정', path: '/setting' },
  ];

  const handleProjectAddClick = async () => {
    setIsProjectForm(!isProjectForm);
  };

  const handleEditStartClick = () => {
    setIsEditing(true);
  };
  const handleEditEndClick = () => {
    setIsEditing(false);

    patchUser({
      userId: userInfo._id,
      updatedData: userInfo,
    });

    userQuery.refetch();
  };

  return (
    <main className="w-full flex lg:gap-5 pb-10">
      {!isMobile && <MainSidebar sideItemList={sideItem} />}
      <section className="lg:flex-1 w-full">
        <p className="lg:w-full text-left text-lg font-bold py-5">마이페이지</p>
        <div className="relative lg:w-full p-6 rounded-md border border-alt pb-20">
          <h2 className="text-lg font-bold mb-4">기본 정보</h2>
          {isEditing ? (
            <button
              onClick={handleEditEndClick}
              className="absolute bottom-5 right-5 border border-alt rounded-md py-2 px-3"
            >
              저장하기
            </button>
          ) : (
            <button
              onClick={handleEditStartClick}
              className="absolute bottom-5 right-5 border border-alt rounded-md py-2 px-3"
            >
              수정하기
            </button>
          )}

          <article className="flex flex-col items-center gap-8">
            <div className="flex w-full justify-start lg:gap-20 items-center">
              <p className="w-30 text-black-alt">프로필 이미지</p>
              <ProfileImage />
            </div>
            <EditInput
              label="닉네임"
              onChange={(event) => {
                const value = event.target.value;
                setUserInfoField('displayName', value);
              }}
              value={userInfo.displayName}
              isEditing={isEditing}
            />

            <EditInput
              label="주소"
              onChange={(event) => {
                const value = event.target.value;
                setUserInfoField('firstArea', value);
              }}
              value={userInfo.firstArea}
              isEditing={isEditing}
            />

            <EditInput
              label="이메일"
              onChange={(event) => {
                const value = event.target.value;
                setUserInfoField('email', value);
              }}
              value={
                userInfo.email ? userInfo.email : '이메일 정보가 없습니다.'
              }
              isEditing={isEditing}
            />
            <EditInput
              label="자기소개"
              onChange={(event) => {
                const value = event.target.value;
                setUserInfoField('description', value);
              }}
              value={userInfo.description}
              isEditing={isEditing}
            />

            <h2 className="text-lg font-bold mb-4 w-full text-left">
              프로젝트 정보
            </h2>

            <div className="flex w-full justify-start lg:gap-30 items-center">
              <p className="w-40 text-black-alt">현재 직무</p>
              <input
                type="text"
                value={userQuery.data.position}
                // onChange={(e) => updateProfile('job', e.target.value)}
                className="w-full p-2 border rounded-lg"
                disabled={!isEditing}
              />
            </div>
            <div className="flex w-full justify-start lg:gap-30 items-center">
              <p className="w-40 text-black-alt">경력</p>
              <input
                type="text"
                value={userQuery.data.career}
                // onChange={(e) => updateProfile('career', e.target.value)}
                className="w-full p-2 border rounded-lg"
                disabled={!isEditing}
              />
            </div>
            {!isEditing ? <PositionLabelList /> : <PositionSelectorButton />}
          </article>
        </div>
        <p className="w-full text-left text-xl font-bold py-5">프로젝트 이력</p>
        <section className="w-12/12 flex flex-col gap-3">
          {isProjectListLoading ? (
            <div className="flex">
              <PulseLoaderSpinner />
            </div>
          ) : (
            projectList &&
            projectList.map((project) => {
              return <ProjectCard key={project._id} project={project} />;
            })
          )}
        </section>
        {isProjectForm && <ProjectForm />}
        <button
          onClick={handleProjectAddClick}
          className="w-full h-20 bg-primary-opacity text-primary mt-10"
        >
          <p>{!isProjectForm ? '눌러서 추가하기' : '닫기'}</p>
        </button>
        <button
          onClick={handleLogoutClick}
          className="w-full h-20 bg-primary-opacity text-primary mt-10"
        >
          <p>로그아웃</p>
        </button>
      </section>
      {isPositionSelector && <PositionSelectorWrapper />}
    </main>
  );
};
