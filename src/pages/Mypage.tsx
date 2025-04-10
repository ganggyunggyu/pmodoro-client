import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

import { UserInfo } from '@/app/store/useUserStore';
import { useQuery } from '@tanstack/react-query';
import { PulseLoaderSpinner } from '@/shared/components/PulseLoaderPage';
import { getIsMobile } from '@/shared/lib';
import { ProfileImage } from './ProfilePage';
import { axios } from '../app/config';
import { ProjectForm } from '@/features/project/ui/project-form';
import { useWidgetStore } from '@/app/store';
import { Project, useDeleteProject, useGetProjectByUser } from '@/entities';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const location = useLocation();
  const { pathname } = location;
  const params = useParams();

  const { mutate: deleteProject } = useDeleteProject();
  const { refetch: projectListRefetch } = useGetProjectByUser(params.userId);

  const handleDeleteClick = () => {
    deleteProject(project._id, {
      onSuccess: () => {
        projectListRefetch();
      },
    });
  };

  const isMyPage = pathname.includes('my-page');
  return (
    <article className="flex flex-col gap-6 w-full border border-alt p-6 rounded-lg">
      <div className="flex w-full justify-start lg:gap-30 items-center">
        <p className="min-w-30 text-black-alt">이름</p>
        <span className="w-full p-2 rounded-lg">{project.name}</span>
      </div>

      <div className="flex w-full justify-start lg:gap-30 items-center">
        <p className="min-w-30 text-black-alt">직무</p>
        <span className="w-full p-2 rounded-lg">{project.position}</span>
      </div>

      <div className="flex w-full justify-start lg:gap-30 items-center">
        <p className="min-w-30 text-black-alt">내용</p>
        <span className="w-full p-2 rounded-lg">{project.description}</span>
      </div>

      <div className="flex w-full justify-start lg:gap-30 items-center">
        <p className="min-w-30 text-black-alt">기간</p>

        <div className="flex lg:flex-row flex-col w-full">
          <span className="w-full p-2 rounded-lg">
            {formatDate(project.duration.startDate)} 시작
          </span>
          <span className="w-full p-2 rounded-lg">
            {formatDate(project.duration.endDate)} 끝
          </span>
        </div>
      </div>

      {isMyPage && (
        <div className="flex gap-3 w-full mt-2">
          <div className="flex-1" />
          <button
            onClick={handleDeleteClick}
            className="px-3 py-2 rounded-md text-black border border-alt"
          >
            삭제하기
          </button>
          <button className="px-3 py-2 rounded-md text-primary border border-primary">
            수정하기
          </button>
        </div>
      )}
    </article>
  );
};

export const formatDate = (date: string): string => {
  const formattedDate = new Date(date);
  const year = formattedDate.getFullYear();
  const month = formattedDate.getMonth() + 1; // 0부터 시작하므로 1을 더해줘
  const day = formattedDate.getDate();
  return `${year}년 ${month}월 ${day}일`;
};

export const getUser = async (userId: string): Promise<UserInfo> => {
  const result = await axios.get(`/user/${userId}`);
  return result.data;
};

export const useGetUserQuery = (userId: string) => {
  return useQuery({
    queryKey: [userId],
    queryFn: () => getUser(userId),
  });
};

export const MainSidebar = ({ sideItemList }) => {
  const location = useLocation();
  const { pathname } = location;
  return (
    <aside className=" w-3/12 text-xl">
      <ul className=" sticky top-0 flex flex-col gap-7 items-start">
        {sideItemList.map((item, index) => {
          return (
            <li
              key={index}
              className={`
          ${pathname.includes(item.path) ? 'text-blck' : 'text-black-alt'}
          `}
            >
              {item.label}
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export const Mypage: React.FC = () => {
  const isMobile = getIsMobile();
  const navigate = useNavigate();

  const { isProjectForm, setIsProjectForm } = useWidgetStore();

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

  return (
    <main className="w-full flex lg:gap-5 pb-10">
      {!isMobile && <MainSidebar sideItemList={sideItem} />}
      <section className="lg:flex-1 w-full">
        <p className="lg:w-full text-left text-lg font-bold py-5">마이페이지</p>
        <div className="relative lg:w-full p-6 rounded-md border border-alt pb-20">
          <h2 className="text-lg font-bold mb-4">기본 정보</h2>
          <button className="absolute bottom-5 right-5 border border-alt rounded-md py-2 px-3">
            수정하기
          </button>

          <article className="flex flex-col items-center gap-8">
            <div className="flex w-full justify-start lg:gap-20 items-center">
              <p className="w-30 text-black-alt">프로필 이미지</p>
              <ProfileImage />
            </div>
            <div className="flex w-full justify-start lg:gap-30 items-center">
              <p className="w-40 text-black-alt">닉네임</p>
              <input
                type="text"
                value={userQuery.data.displayName}
                className="w-full p-2 border rounded-lg"
                disabled={!isEditing}
              />
            </div>

            <div className="flex w-full justify-start lg:gap-30 items-center">
              <p className="w-40 text-black-alt">위치</p>
              <input
                type="text"
                value={
                  userQuery.data.firstArea
                    ? userQuery.data.firstArea + ' ' + userQuery.data.secondArea
                    : '유저 위치가 입력되지 않았습니다.'
                }
                // onChange={(e) => updateProfile('region', e.target.value)}
                className="w-full p-2 border rounded-lg"
                disabled={!isEditing}
              />
            </div>

            <div className="flex w-full justify-start lg:gap-30 items-center">
              <p className="w-40 text-black-alt">이메일</p>
              <input
                type="text"
                value={userQuery.data.email || '이메일 정보가 없습니다.'}
                // onChange={(e) => updateProfile('region', e.target.value)}
                className="w-full p-2 border rounded-lg"
                disabled={!isEditing}
              />
            </div>
            <div className="flex w-full justify-start lg:gap-30 items-center">
              <p className="w-40 text-black-alt">자기소개</p>
              <input
                type="text"
                value={userQuery.data.description || ''}
                // onChange={(e) => updateProfile('introduction', e.target.value)}
                className="max-w-full p-2 border rounded-lg"
                disabled={!isEditing}
              />
            </div>

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
            <div className="flex w-full justify-start lg:gap-25 items-center">
              <p className="w-30 text-black-alt">상세 포지션</p>
              <div className="flex gap-3">
                {userQuery.data.skills?.map((position, index) => {
                  return (
                    <button
                      key={index}
                      className="text-xs py-2 px-3 rounded-full bg-white border border-alt"
                    >
                      {position}
                    </button>
                  );
                })}
              </div>
            </div>
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
    </main>
  );
};
