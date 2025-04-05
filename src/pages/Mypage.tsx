import React from 'react';
import { useNavigate, Link, useParams, useLocation } from 'react-router-dom';

import { useUserStore } from '@/app/store/useUserStore';
import useProjectStore from '@/app/store/useProjectStore';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export const getUser = async (userId: string) => {
  const result = await axios.get(`http://localhost:3000/user/${userId}`);
  console.log(result);
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
        {sideItemList.map((item) => {
          return (
            <li
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

export const MainProvider = () => {
  return <main></main>;
};

export const Mypage: React.FC = () => {
  const navigate = useNavigate();

  const { userId } = useParams();

  const { isAuth } = useUserStore((state) => state);
  const { projectList } = useProjectStore((state) => state);

  const [isEditing, setIsEditing] = React.useState(false);
  const [isPublic, setIsPublic] = React.useState(false);

  const userQuery = useGetUserQuery(userId);

  if (userQuery.isLoading) {
    return <div>유저 정보 불러오는중</div>;
  }

  const sideItem = [
    { label: '마이페이지', path: '/my-page' },
    { label: '알림', path: '/alram' },
    { label: '설정', path: '/setting' },
  ];

  return (
    <main className=" w-full flex gap-5 pb-10">
      <MainSidebar sideItemList={sideItem} />
      <section className=" flex-1">
        <p className="w-full text-left text-lg font-bold py-5">마이페이지</p>
        <div className="relative w-full p-6 rounded-lg border border-alt pb-20">
          <h2 className="text-lg font-bold mb-4">기본 정보</h2>
          <button className="absolute bottom-5 right-5 border border-alt rounded-md py-2 px-3">
            수정하기
          </button>

          <article className="flex flex-col items-center gap-8">
            <div className="flex w-full justify-start gap-20 items-center">
              <p className="w-30 text-black-alt">프로필 이미지</p>
              <div className="w-16 h-16 bg-alt rounded-full" />
            </div>
            <div className="flex w-full justify-start gap-30 items-center">
              <p className="w-30 text-black-alt">닉네임</p>
              <input
                type="text"
                value={userQuery.data.displayName}
                // onChange={(e) => updateProfile('name', e.target.value)}
                className="w-full p-2 border rounded-lg"
                disabled={!isEditing}
              />
            </div>

            <div className="flex w-full justify-start gap-30 items-center">
              <p className="w-30 text-black-alt">위치</p>
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

            <div className="flex w-full justify-start gap-30 items-center">
              <p className="w-30 text-black-alt">이메일</p>
              <input
                type="text"
                value={userQuery.data.email || '이메일 정보가 없습니다.'}
                // onChange={(e) => updateProfile('region', e.target.value)}
                className="w-full p-2 border rounded-lg"
                disabled={!isEditing}
              />
            </div>
            <div className="flex w-full justify-start gap-30 items-center">
              <p className="w-30 text-black-alt">자기소개</p>
              <input
                type="text"
                value={userQuery.data.description || ''}
                // onChange={(e) => updateProfile('introduction', e.target.value)}
                className="w-full p-2 border rounded-lg"
                disabled={!isEditing}
              />
            </div>

            <h2 className="text-lg font-bold mb-4 w-full text-left">
              프로젝트 정보
            </h2>

            <div className="flex w-full justify-start gap-30 items-center">
              <p className="w-30 text-black-alt">현재 직무</p>
              <input
                type="text"
                value={userQuery.data.position}
                // onChange={(e) => updateProfile('job', e.target.value)}
                className="w-full p-2 border rounded-lg"
                disabled={!isEditing}
              />
            </div>
            <div className="flex w-full justify-start gap-30 items-center">
              <p className="w-30 text-black-alt">경력</p>
              <input
                type="text"
                value={userQuery.data.career}
                // onChange={(e) => updateProfile('career', e.target.value)}
                className="w-full p-2 border rounded-lg"
                disabled={!isEditing}
              />
            </div>
            <div className="flex w-full justify-start gap-20 items-center">
              <p className="w-30 text-black-alt">상세 포지션</p>
              {userQuery.data.skills?.map((position) => {
                return (
                  <button className="text-xs py-2 px-5 rounded-full bg-alt">
                    {position}
                  </button>
                );
              })}
            </div>
          </article>
        </div>
        <p className="w-full text-left text-xl font-bold py-5">프로젝트 이력</p>
        <section className=" p-6 w-12/12 rounded-lg border border-alt">
          {projectList.length !== 0 &&
            projectList.map((project, index) => {
              return (
                <article key={index} className="flex flex-col gap-10  w-full">
                  <div className="flex w-full justify-start gap-30 items-center">
                    <p className="min-w-30 text-black-alt">이름</p>
                    <input
                      type="text"
                      value={project.name}
                      // onChange={(e) =>
                      // updateProfile('positions', e.target.value.split(', '))
                      // }
                      className="w-full p-2 border rounded-lg"
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="flex w-full justify-start gap-30 items-center">
                    <p className="min-w-30 text-black-alt">직무</p>
                    <input
                      type="text"
                      value={project.description}
                      // onChange={(e) =>
                      //   updateProfile('positions', e.target.value.split(', '))
                      // }
                      className="w-full p-2 border rounded-lg"
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="flex w-full justify-start gap-30 items-center">
                    <p className="min-w-30 text-black-alt">기간</p>
                    <input
                      type="text"
                      value={project.startYear}
                      // onChange={(e) =>
                      //   updateProfile('positions', e.target.value.split(', '))
                      // }
                      className="w-full p-2 border rounded-lg"
                      disabled={!isEditing}
                    />
                    ~
                    <input
                      type="text"
                      value={project.endYear}
                      // onChange={(e) =>
                      //   updateProfile('positions', e.target.value.split(', '))
                      // }
                      className="w-full p-2 border rounded-lg"
                      disabled={!isEditing}
                    />
                  </div>
                </article>
              );
            })}
        </section>

        <button className="w-full h-20 bg-primary-opacity text-primary mt-10">
          <p>눌러서 추가하기</p>
        </button>
      </section>
    </main>
  );
};
