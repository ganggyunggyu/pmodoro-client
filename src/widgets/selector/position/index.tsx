import React from 'react';
import { useWidgetStore } from '@/app/store';
import { useUserStore } from '@/app/store/useUserStore';
import { useGetUserQuery } from '@/entities';
import { DEVELOPER_POSITIONS } from '@/shared/constants/positions';
import { XIcon } from '@/widgets/onboarding/step-1-user-info';

const PositionItem = ({
  position,
  isSelected,
  onClick,
}: {
  position: string;
  isSelected: boolean;
  onClick: () => void;
}) => (
  <li
    key={position}
    className={`p-3 border rounded-md text-sm flex justify-between items-center transition-all
      ${isSelected ? 'border-primary text-primary' : 'border-alt text-black'}
    `}
    onClick={onClick}
  >
    <p className="transition-all">{position}</p>
    <div
      className={`w-5 h-5 border rounded-full transition-all
        ${isSelected ? 'border-4' : 'border-1'}
      `}
    />
  </li>
);

export const PositionSelector = () => {
  const { userInfo, setUserInfo } = useUserStore();
  const { setIsPositionSelector } = useWidgetStore();
  const userId = userInfo._id;
  const { isLoading } = useGetUserQuery(userId);

  if (isLoading) return <p>loading</p>;

  const handlePositionSelect = () => setIsPositionSelector(false);

  const toggleSkill = (position: string) => {
    const { skills } = userInfo;
    const isSelect = skills.includes(position);

    const updatedSkills = isSelect
      ? skills.filter((skill) => skill !== position)
      : [...skills, position];

    setUserInfo({ ...userInfo, skills: updatedSkills });
  };

  return (
    <>
      <div
        onClick={handlePositionSelect}
        className="fixed top-0 left-0 w-screen h-screen bg-black opacity-30 z-10 "
      />
      <article className="z-10">
        <div className="fixed w-full lg:w-1/2 md:w-2/3 top-1/2 left-1/2 -translate-1/2 bg-white transition-all rounded-md p-3">
          <header className="py-3 px-3 w-full flex justify-between">
            <p className="text-black text-lg font-semibold">기술 스택</p>
            <button onClick={handlePositionSelect}>
              <XIcon />
            </button>
          </header>
          <ul className="p-3 h-60 flex flex-col gap-2 overflow-y-scroll">
            {DEVELOPER_POSITIONS.map((position) => (
              <PositionItem
                key={position}
                position={position}
                isSelected={userInfo.skills.includes(position)}
                onClick={() => toggleSkill(position)}
              />
            ))}
          </ul>
          <div className="w-full flex items-center justify-center pt-2">
            <button
              onClick={handlePositionSelect}
              className="px-20 py-3 bg-primary text-white rounded-md text-sm"
            >
              선택완료
            </button>
          </div>
        </div>
      </article>
    </>
  );
};
