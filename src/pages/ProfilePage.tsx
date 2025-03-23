import React, { useId } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';

import { useUserStore } from '@/app/store/useUserStore';
import { PROJECT_NAME } from '@/shared/constants/core';
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

  const [projects, setProjects] = React.useState(projectList);

  const toggleEdit = () => setIsEditing((prev) => !prev);
  const togglePublic = () => setIsPublic((prev) => !prev);

  const updateProfile = (field: string, value: any) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const addProject = () => {
    setProjects((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: '',
        startYear: '',
        startMonth: '',
        endYear: '',
        endMonth: '',
        description: '',
      },
    ]);
  };

  const removeProject = (id: number) => {
    setProjects((prev) => prev.filter((project) => project.id !== id));
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
    <div className="p-6 max-w-3xl mx-auto">
      <button
        onClick={() => navigate('/')}
        type="button"
        className="text-2xl font-bold text-red-500"
      >
        {PROJECT_NAME}
      </button>

      {/* 프로필 카드 */}
      <div className="bg-gray-200 p-6 rounded-lg shadow-lg mt-6">
        <h2 className="text-lg font-bold mb-4">내 정보</h2>

        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gray-400 rounded-full" />
          <div className="flex-1 space-y-2">
            <input
              type="text"
              value={profile.name}
              onChange={(e) => updateProfile('name', e.target.value)}
              className="w-full p-2 border rounded-lg"
              disabled={!isEditing}
            />
            <input
              type="text"
              value={profile.region}
              onChange={(e) => updateProfile('region', e.target.value)}
              className="w-full p-2 border rounded-lg"
              disabled={!isEditing}
            />
          </div>
        </div>

        <textarea
          value={profile.introduction}
          onChange={(e) => updateProfile('introduction', e.target.value)}
          className="w-full p-2 border rounded-lg mt-4"
          placeholder="한 줄 소개"
          disabled={!isEditing}
        />

        <div className="flex gap-4 mt-4">
          <input
            type="text"
            value={profile.job}
            onChange={(e) => updateProfile('job', e.target.value)}
            className="w-1/2 p-2 border rounded-lg"
            placeholder="직무"
            disabled={!isEditing}
          />
          <input
            type="text"
            value={profile.career}
            onChange={(e) => updateProfile('career', e.target.value)}
            className="w-1/2 p-2 border rounded-lg"
            placeholder="경력"
            disabled={!isEditing}
          />
        </div>

        <div className="flex gap-4 mt-4">
          <input
            type="text"
            value={profile.positions.join(', ')}
            onChange={(e) =>
              updateProfile('positions', e.target.value.split(', '))
            }
            className="w-1/2 p-2 border rounded-lg"
            placeholder="희망 포지션"
            disabled={!isEditing}
          />
          <div>
            <p className="text-sm text-gray-600">
              실제 포지션: {userInfo?.detailPositionList.join(', ')}
            </p>
          </div>
        </div>

        <button onClick={toggleEdit} className="mt-4 text-blue-500 underline">
          {isEditing ? '완료' : '수정하기'}
        </button>
      </div>

      {/* 프로젝트 섹션 */}
      <div className="bg-gray-200 p-6 rounded-lg shadow-lg mt-6">
        <h2 className="text-lg font-bold mb-4">프로젝트 경험</h2>

        {projects.map((project) => (
          <div key={project.id} className="bg-gray-300 p-4 rounded-lg mb-4">
            <input
              type="text"
              value={project.name}
              onChange={(e) =>
                setProjects((prev) =>
                  prev.map((p) =>
                    p.id === project.id ? { ...p, name: e.target.value } : p,
                  ),
                )
              }
              className="w-full p-2 border rounded-lg mb-2"
              placeholder="프로젝트 명"
              disabled={!isEditing}
            />

            <div className="flex gap-2 mb-2">
              <select
                className="w-1/4 p-2 border rounded-lg"
                disabled={!isEditing}
              >
                <option>XXXX년</option>
                <option>2024년</option>
                <option>2023년</option>
              </select>
              <select
                className="w-1/4 p-2 border rounded-lg"
                disabled={!isEditing}
              >
                <option>XX월</option>
                {[...Array(12)].map((_, i) => (
                  <option key={i + 1}>{i + 1}월</option>
                ))}
              </select>
              <span className="p-2">~</span>
              <select
                className="w-1/4 p-2 border rounded-lg"
                disabled={!isEditing}
              >
                <option>XXXX년</option>
                <option>2024년</option>
                <option>2023년</option>
              </select>
              <select
                className="w-1/4 p-2 border rounded-lg"
                disabled={!isEditing}
              >
                <option>XX월</option>
                {[...Array(12)].map((_, i) => (
                  <option key={i + 1}>{i + 1}월</option>
                ))}
              </select>
            </div>

            <textarea
              className="w-full p-2 border rounded-lg mb-2"
              placeholder="프로젝트 설명"
              disabled={!isEditing}
            />

            {isEditing && (
              <button
                onClick={() => removeProject(project.id)}
                className="bg-red-500 text-white px-3 py-1 rounded-md text-sm"
              >
                삭제
              </button>
            )}
          </div>
        ))}

        {isEditing && (
          <button
            onClick={addProject}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold"
          >
            + 추가
          </button>
        )}
      </div>

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
    </div>
  );
};
