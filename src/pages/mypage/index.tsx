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

import { MainSidebar } from '@/widgets/side-bar/main-side-bar';
import { EditInput } from '@/shared/components/EditInput';
import { PositionLabelList } from '@/features/position/ui/position-label-list';
import { PositionSelectorButton } from '@/features';
import { Button, SelectorButton, XIcon } from '@/shared';
import { DropdownWrapper } from '../components-page';
import { CAREERS, DEVELOPER_POSITIONS } from '@/shared/constants/positions';
import { positions } from '@/widgets/onboarding/step-2-position';
import { AnimatePresence } from 'framer-motion';

export const Mypage: React.FC = () => {
  const isMobile = getIsMobile();
  const navigate = useNavigate();
  const { userId } = useParams();

  const [isEditing, setIsEditing] = React.useState(false);
  const [isPositionDropdownOpen, setIsPositionDropdownOpen] =
    React.useState(false);
  const [isCareerDropdownOpen, setIsCareerDropdownOpen] = React.useState(false);

  const [isUserSkillDropdownOpen, setIsUserSkillDropdownOpen] =
    React.useState(false);

  const {
    isProjectForm,
    setIsProjectForm,
    isProjectFormVisible,
    setIsProjectFormVisible,
  } = useWidgetStore();

  const { userInfo, setUserInfoField, toggleSkill } = useUserStore();
  const { mutate: patchUser } = usePatchUserMutation();

  const userQuery = useGetUserQuery(userId);
  const { data: projectList, isLoading: isProjectListLoading } =
    useGetProjectByUser(userId);

  const handleLogoutClick = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('auth_time');
    navigate('/');
    window.location.reload();
  };

  const handleEditStartClick = () => setIsEditing(true);

  const handleEditEndClick = () => {
    setIsEditing(false);
    patchUser({
      userId: userInfo._id,
      updatedData: userInfo,
    });
    userQuery.refetch();
  };

  const handleProjectAddClick = () => {
    setIsProjectForm(!isProjectForm);
    setTimeout(() => setIsProjectFormVisible(!isProjectFormVisible), 300);
  };

  const handlePositionClick = (position: string) => {
    setUserInfoField('position', position);
  };

  const handleCareerClick = (career: string) => {
    setUserInfoField('career', career);
  };

  if (userQuery.isLoading) {
    return <PulseLoaderSpinner />;
  }

  const sideItem = [
    { label: '마이페이지', path: '/my-page' },
    { label: '알림', path: '/alram' },
    { label: '설정', path: '/setting' },
  ];

  return (
    <main className="w-full flex lg:gap-5 pb-10">
      {!isMobile && <MainSidebar sideItemList={sideItem} />}
      <section className="lg:flex-1 w-full">
        <p className="lg:w-full text-left text-lg font-bold py-5">마이페이지</p>

        <div className="relative lg:w-full p-6 rounded-md border border-alt pb-20">
          <h2 className="text-lg font-bold mb-4">기본 정보</h2>

          <Button
            onClick={isEditing ? handleEditEndClick : handleEditStartClick}
            className="absolute bottom-5 right-5 border border-alt rounded-md py-2 px-3"
          >
            {isEditing ? '저장하기' : '수정하기'}
          </Button>

          <article className="flex flex-col items-center gap-8">
            <div className="flex w-full justify-start lg:gap-20 items-center">
              <p className="w-30 text-black-alt">프로필 이미지</p>
              <ProfileImage />
            </div>

            <EditInput
              label="닉네임"
              onChange={(e) => setUserInfoField('displayName', e.target.value)}
              value={userInfo.displayName}
              isEditing={isEditing}
            />
            <EditInput
              label="주소"
              onChange={(e) => setUserInfoField('firstArea', e.target.value)}
              value={userInfo.firstArea}
              isEditing={isEditing}
            />
            <EditInput
              label="이메일"
              onChange={(e) => setUserInfoField('email', e.target.value)}
              value={userInfo.email ?? '이메일 정보가 없습니다.'}
              isEditing={isEditing}
            />
            <EditInput
              label="자기소개"
              onChange={(e) => setUserInfoField('description', e.target.value)}
              value={userInfo.description}
              isEditing={isEditing}
            />

            <h2 className="text-lg font-bold mb-4 w-full text-left">
              프로젝트 정보
            </h2>

            {/* 직무 선택 */}
            <DropdownWrapper
              isOpen={isPositionDropdownOpen}
              onClose={() => setIsPositionDropdownOpen(false)}
              trigger={
                <article className="flex w-full justify-start lg:gap-40 items-center">
                  <p className="w-40 text-black-alt">직무</p>
                  <SelectorButton
                    variant="outlineAlt"
                    icon="arrow"
                    isSelected={isPositionDropdownOpen}
                    disabled={!isEditing}
                    onClick={() =>
                      isEditing &&
                      setIsPositionDropdownOpen(!isPositionDropdownOpen)
                    }
                  >
                    <p
                      className={
                        userInfo.position ? 'text-black' : 'text-black-alt'
                      }
                    >
                      {userInfo.position || '직무 선택'}
                    </p>
                  </SelectorButton>
                </article>
              }
            >
              <section className="flex flex-col gap-3 p-3">
                <header className="w-full flex justify-between sticky top-0 bg-white z-10">
                  <p className="text-black text-lg font-semibold">직무 선택</p>
                  <button onClick={() => setIsPositionDropdownOpen(false)}>
                    <XIcon />
                  </button>
                </header>

                <div className="flex flex-col gap-2 overflow-y-auto pr-1 max-h-[300px]">
                  {positions.map((position, idx) => (
                    <SelectorButton
                      key={idx}
                      icon="circle"
                      isSelected={position.label === userInfo.position}
                      onClick={() => {
                        handlePositionClick(position.label);
                        setIsPositionDropdownOpen(false);
                      }}
                    >
                      {position.label}
                    </SelectorButton>
                  ))}
                </div>

                <div className="px-3 pb-3">
                  <Button
                    onClick={() => setIsPositionDropdownOpen(false)}
                    className="w-full py-3 bg-primary text-white rounded-md text-sm"
                  >
                    선택완료
                  </Button>
                </div>
              </section>
            </DropdownWrapper>

            {/* 경력 선택 */}
            <DropdownWrapper
              isOpen={isCareerDropdownOpen}
              onClose={() => setIsCareerDropdownOpen(false)}
              trigger={
                <article className="flex w-full justify-start lg:gap-40 items-center">
                  <p className="w-40 text-black-alt">경력</p>
                  <SelectorButton
                    variant="outlineAlt"
                    icon="arrow"
                    isSelected={isCareerDropdownOpen}
                    disabled={!isEditing}
                    onClick={() =>
                      isEditing &&
                      setIsCareerDropdownOpen(!isCareerDropdownOpen)
                    }
                  >
                    <p
                      className={
                        userInfo.career ? 'text-black' : 'text-black-alt'
                      }
                    >
                      {userInfo.career || '경력 선택'}
                    </p>
                  </SelectorButton>
                </article>
              }
            >
              <section className="flex flex-col gap-3 p-3">
                <header className="w-full flex justify-between sticky top-0 bg-white z-10">
                  <p className="text-black text-lg font-semibold">경력 선택</p>
                  <button onClick={() => setIsCareerDropdownOpen(false)}>
                    <XIcon />
                  </button>
                </header>

                <div className="flex flex-col gap-2 overflow-y-auto pr-1 max-h-[300px]">
                  {CAREERS.map((career, idx) => (
                    <SelectorButton
                      key={idx}
                      icon="circle"
                      isSelected={career === userInfo.career}
                      onClick={() => {
                        handleCareerClick(career);
                        setIsCareerDropdownOpen(false);
                      }}
                    >
                      {career}
                    </SelectorButton>
                  ))}
                </div>

                <div className="px-3 pb-3">
                  <Button
                    onClick={() => setIsCareerDropdownOpen(false)}
                    className="w-full py-3 bg-primary text-white rounded-md text-sm"
                  >
                    선택완료
                  </Button>
                </div>
              </section>
            </DropdownWrapper>

            <DropdownWrapper
              isOpen={isUserSkillDropdownOpen}
              onClose={() => setIsUserSkillDropdownOpen(false)}
              trigger={
                <article className="flex w-full justify-start lg:gap-40 items-center">
                  <p className="w-40 text-black-alt">상세 포지션</p>
                  <div className="w-full flex flex-col gap-3">
                    {isEditing && (
                      <SelectorButton
                        variant="outlineAlt"
                        icon="arrow"
                        isSelected={isUserSkillDropdownOpen}
                        disabled={!isEditing}
                        onClick={() =>
                          isEditing &&
                          setIsUserSkillDropdownOpen(!isUserSkillDropdownOpen)
                        }
                      >
                        <p
                          className={
                            userInfo.career ? 'text-black' : 'text-black-alt'
                          }
                        >
                          상세 포지션 선택
                        </p>
                      </SelectorButton>
                    )}
                    <PositionLabelList />
                  </div>
                </article>
              }
            >
              <section className="flex flex-col gap-3 p-3">
                <header className="w-full flex justify-between sticky top-0 bg-white z-10">
                  <p className="text-black text-lg font-semibold">
                    포지션 선택
                  </p>
                  <button onClick={() => setIsUserSkillDropdownOpen(false)}>
                    <XIcon />
                  </button>
                </header>

                <div className="flex flex-col gap-2 overflow-y-auto pr-1 max-h-[300px]">
                  {DEVELOPER_POSITIONS.map((skill, idx) => (
                    <SelectorButton
                      key={idx}
                      icon="check"
                      isSelected={userInfo?.skills?.includes(skill)}
                      onClick={() => {
                        toggleSkill(skill);
                      }}
                    >
                      {skill}
                    </SelectorButton>
                  ))}
                </div>

                <div className="px-3 pb-3">
                  <Button
                    onClick={() => setIsUserSkillDropdownOpen(false)}
                    className="w-full py-3 bg-primary text-white rounded-md text-sm"
                  >
                    선택완료
                  </Button>
                </div>
              </section>
            </DropdownWrapper>
          </article>
        </div>

        <p className="w-full text-left text-xl font-bold py-5">프로젝트 이력</p>

        <section className="w-full flex flex-col gap-3">
          {isProjectListLoading ? (
            <PulseLoaderSpinner />
          ) : (
            projectList?.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))
          )}
        </section>
        <AnimatePresence>
          {isProjectFormVisible && <ProjectForm />}
        </AnimatePresence>
        <button
          onClick={handleProjectAddClick}
          className="w-full h-20 bg-primary-opacity text-primary mt-10"
        >
          <p>{isProjectForm ? '눌러서 추가하기' : '닫기'}</p>
        </button>

        <button
          onClick={handleLogoutClick}
          className="w-full h-20 bg-primary-opacity text-primary mt-10"
        >
          <p>로그아웃</p>
        </button>
      </section>
    </main>
  );
};
