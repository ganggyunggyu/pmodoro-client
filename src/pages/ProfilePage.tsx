import React from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';

import { useUserStore } from '@/app/store/useUserStore';
import useProjectStore from '@/app/store/useProjectStore';

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();

  const { userId } = useParams();

  console.log(userId);

  const { userInfo, isAuth } = useUserStore((state) => state);
  const { projectList } = useProjectStore((state) => state);

  const [isEditing, setIsEditing] = React.useState(false);
  const [isPublic, setIsPublic] = React.useState(false);

  const [profile, setProfile] = React.useState({
    name: userInfo?.displayName || '',
    phone: '',
    email: '',
    region: userInfo ? `${userInfo.firstArea} ${userInfo.secondArea}` : '',
    introduction: '',
    job: userInfo?.position || '',
    career: '',
    skills: [],
    positions: userInfo?.detailPositionList || [],
  });
  const togglePublic = () => setIsPublic((prev) => !prev);

  const updateProfile = (field: string, value: any) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  if (!isAuth) {
    return (
      <main className="p-10">
        <Link to="/login" className="text-blue-500 underline">
          로그인 페이지로 이동
        </Link>
      </main>
    );
  }

  return (
    <main className="w-screen flex flex-col items-center justify-center">
      <p className="w-8/12 text-left text-xl font-bold py-5">마이페이지</p>
      <section className=" p-6 w-8/12 rounded-lg shadow-lg">
        <article className="flex justify-between items-center w-full">
          <h2 className="text-lg font-bold mb-4">프로필</h2>
          <button>수정하기</button>
        </article>

        <article className="flex flex-col items-center gap-10">
          <div className="flex w-full justify-start gap-10 items-center">
            <p>프로필 이미지</p>
            <div className="w-16 h-16 bg-gray-400 rounded-full" />
          </div>
          <div className="flex w-full justify-start gap-10 items-center">
            <p className="min-w-fit w-16">닉네임</p>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => updateProfile('name', e.target.value)}
              className="w-full p-2 border rounded-lg"
              disabled={!isEditing}
            />
          </div>
          <div className="flex w-full justify-start gap-10 items-center">
            <p className="min-w-fit w-16">위치</p>
            <input
              type="text"
              value={profile.region}
              onChange={(e) => updateProfile('region', e.target.value)}
              className="w-full p-2 border rounded-lg"
              disabled={!isEditing}
            />
          </div>
          <div className="flex w-full justify-start gap-10 items-center">
            <p className="min-w-fit w-16">이메일</p>
            <input
              type="text"
              value={profile.region}
              onChange={(e) => updateProfile('region', e.target.value)}
              className="w-full p-2 border rounded-lg"
              disabled={!isEditing}
            />
          </div>
          <div className="flex w-full justify-start gap-10 items-center">
            <p className="min-w-fit w-16">자기소개</p>
            <input
              type="text"
              value={profile.introduction}
              onChange={(e) => updateProfile('introduction', e.target.value)}
              className="w-full p-2 border rounded-lg"
              disabled={!isEditing}
            />
          </div>

          <h2 className="text-lg font-bold mb-4 w-full text-left">
            프로젝트 정보
          </h2>

          <div className="flex w-full justify-start gap-10 items-center">
            <p className="min-w-fit w-16">현재 직무</p>
            <input
              type="text"
              value={profile.job}
              onChange={(e) => updateProfile('job', e.target.value)}
              className="w-full p-2 border rounded-lg"
              disabled={!isEditing}
            />
          </div>
          <div className="flex w-full justify-start gap-10 items-center">
            <p className="min-w-fit w-16">연차</p>
            <input
              type="text"
              value={profile.career}
              onChange={(e) => updateProfile('career', e.target.value)}
              className="w-full p-2 border rounded-lg"
              disabled={!isEditing}
            />
          </div>
          <div className="flex w-full justify-start gap-10 items-center">
            <p className="min-w-fit w-16">상세 포지션</p>
            {profile.positions.map((position) => {
              return (
                <button className="py-2 px-5 rounded-full bg-red-100">
                  {position}
                </button>
              );
            })}
          </div>
          <div className="flex w-full justify-start gap-10 items-center">
            <p className="min-w-fit w-16">기술 스택</p>
            {profile.skills.map((skil) => {
              return (
                <button className="py-2 px-5 rounded-full bg-red-100">
                  {skil}
                </button>
              );
            })}
          </div>
        </article>
      </section>
      <p className="w-8/12 text-left text-xl font-bold py-5">프로젝트 이력</p>
      <section className=" p-6 w-8/12 rounded-lg shadow-lg">
        {projectList.length !== 0 &&
          projectList.map((project, index) => {
            return (
              <article key={index} className="flex flex-col gap-10">
                <div className="flex w-full justify-start gap-10 items-center">
                  <p className="min-w-fit w-16">프로젝트 이름</p>
                  <input
                    type="text"
                    value={project.name}
                    onChange={(e) =>
                      updateProfile('positions', e.target.value.split(', '))
                    }
                    className="w-full p-2 border rounded-lg"
                    disabled={!isEditing}
                  />
                </div>
                <div className="flex w-full justify-start gap-10 items-center">
                  <p className="min-w-fit w-16">프로젝트 설명</p>
                  <input
                    type="text"
                    value={project.description}
                    onChange={(e) =>
                      updateProfile('positions', e.target.value.split(', '))
                    }
                    className="w-full p-2 border rounded-lg"
                    disabled={!isEditing}
                  />
                </div>
                <div className="flex w-full justify-start gap-10 items-center">
                  <p className="min-w-fit w-16">프로젝트 기간</p>
                  <input
                    type="text"
                    value={project.startYear}
                    onChange={(e) =>
                      updateProfile('positions', e.target.value.split(', '))
                    }
                    className="w-full p-2 border rounded-lg"
                    disabled={!isEditing}
                  />
                  ~
                  <input
                    type="text"
                    value={project.endYear}
                    onChange={(e) =>
                      updateProfile('positions', e.target.value.split(', '))
                    }
                    className="w-full p-2 border rounded-lg"
                    disabled={!isEditing}
                  />
                </div>
              </article>
            );
          })}
      </section>
      <div className="mt-6 text-center">
        <p className="mb-2">
          프로필을 공개하여 프로젝트 제안을 받으시겠습니까?
        </p>
        <button
          onClick={togglePublic}
          className={`px-6 py-2 rounded-lg font-semibold ${
            isPublic ? 'bg-green-500 text-white' : 'bg-gray-400'
          }`}
        >
          {isPublic ? '공개됨' : '공개하기'}
        </button>
      </div>
    </main>
  );
};
