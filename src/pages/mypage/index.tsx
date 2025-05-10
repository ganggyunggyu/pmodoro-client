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
import { Button, SelectorButton, XIcon } from '@/shared';
import { DropdownWrapper } from '../components-page';
import {
  ALL_POSITIONS,
  CAREERS,
  DESIGNER_POSITIONS,
  DEVELOPER_POSITIONS,
  MARKETER_POSITIONS,
  PLANNER_POSITIONS,
} from '@/shared/constants/positions';
import { positions } from '@/widgets/onboarding/step-2-position';
import { AnimatePresence } from 'framer-motion';
import { tabs } from '@/widgets/user-search-widget';
import { TabItem } from '@/shared/components/TabComponent';

export const Mypage: React.FC = () => {
  const navigate = useNavigate();
  const { userId } = useParams();

  const [selectedPosition, setSelectedPosition] = React.useState('');

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

  React.useEffect(() => {
    setSelectedPosition(userInfo?.position);
  }, []);

  if (userQuery.isLoading) {
    return <PulseLoaderSpinner />;
  }

  const sideItem = [
    { label: '마이페이지', path: '/my-page' },
    { label: '알림', path: '/alram' },
    { label: '설정', path: '/setting' },
  ];

  const handleTabClick = (position) => {
    setSelectedPosition(position);
  };

  const getSkillList = () => {
    if (selectedPosition === '개발자') return DEVELOPER_POSITIONS;
    if (selectedPosition === '디자이너') return DESIGNER_POSITIONS;
    if (selectedPosition === '기획자') return PLANNER_POSITIONS;
    if (selectedPosition === '마케터') return MARKETER_POSITIONS;
    return ALL_POSITIONS;
  };

  const skillList = getSkillList();

  return (
    <main className="w-full flex lg:gap-5 pb-10">
      <MainSidebar sideItemList={sideItem} />
      <section className="lg:flex-1 w-full">
        <p className="lg:w-full text-center lg:text-left text-lg font-bold py-3 lg:py-5">
          유저 정보
        </p>

        <div className="relative lg:w-full lg:p-6 lg:pb-25 rounded-md lg:border border-alt">
          <Button
            onClick={isEditing ? handleEditEndClick : handleEditStartClick}
            className="absolute right-0 lg:bottom-5 lg:right-5 z-10"
          >
            {isEditing ? '저장하기' : '수정하기'}
          </Button>

          <article className="flex flex-col items-center gap-8">
            <div className="flex flex-row w-full justify-start lg:gap-40 items-start ">
              <p className="w-30 text-black-alt hidden lg:block">
                프로필 이미지
              </p>
              <ProfileImage src={userInfo?.kakaoAuthInfo?.profileImg} />
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
              trigger={
                <article className="flex w-full justify-start lg:gap-40 gap-10  items-center">
                  <p className="w-40 text-black-alt min-w-fit">상세 포지션</p>
                  <div className="w-full flex flex-col gap-3">
                    {isEditing && (
                      <React.Fragment>
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
                      </React.Fragment>
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
                <div className="flex items-center justify-between w-full">
                  {tabs.map((tab) => {
                    return (
                      <TabItem
                        isActive={tab.label === selectedPosition}
                        onClick={() => {
                          handleTabClick(tab.label);
                        }}
                        tab={tab}
                        key={tab.id}
                      />
                    );
                  })}
                </div>
                <div className="flex flex-col gap-2 overflow-y-auto pr-1 max-h-[300px]">
                  {skillList.map((skill, idx) => {
                    return (
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
                    );
                  })}
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
        <Button onClick={handleProjectAddClick} size="lg" className="mt-10">
          <p>{isProjectForm ? '닫기' : '프로젝트 추가하기'}</p>
        </Button>

        <Button onClick={handleLogoutClick} size="lg" className="mt-10">
          <p>로그아웃</p>
        </Button>
      </section>
    </main>
  );
};
