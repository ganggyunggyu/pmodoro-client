import React from 'react';
import { useWidgetStore } from '@/app/store';
import { useUserStore } from '@/app/store/useUserStore';
import { useGetUserQuery } from '@/entities';
import { DEVELOPER_POSITIONS } from '@/shared/constants/positions';
import { Button, SelectorButton, XIcon } from '@/shared';

export const PositionSelector = () => {
  const { userInfo, setUserInfo } = useUserStore();
  const { setIsPositionSelector } = useWidgetStore();
  // const userId = userInfo?._id;
  // const { isLoading } = useGetUserQuery(userId);

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
    // <article className="fixed w-full lg:w-1/2 md:w-2/3 top-1/2 left-1/2 -translate-1/2 bg-white transition-all rounded-md p-3">
    <article className="shadow-md flex flex-col gap-5 p-4">
      <header className="w-full flex justify-between">
        <p className="text-black text-lg font-semibold">기술 스택</p>
        <button onClick={handlePositionSelect}>
          <XIcon />
        </button>
      </header>
      <ul className="h-60 flex flex-col gap-2 overflow-y-scroll">
        {DEVELOPER_POSITIONS.map((position) => (
          <SelectorButton
            key={position}
            isSelected={userInfo?.skills?.includes(position)}
            onClick={() => toggleSkill(position)}
            icon="check"
          >
            <p>{position}</p>
          </SelectorButton>
        ))}
      </ul>
      <div className="w-full flex items-center justify-center">
        <Button
          variant="primary"
          className="w-1/2"
          size="sm"
          onClick={handlePositionSelect}
        >
          선택완료
        </Button>
      </div>
    </article>
  );
};

export const PositionSelectorWrapper = () => {
  const { userInfo, setUserInfo } = useUserStore();
  const { setIsPositionSelector } = useWidgetStore();
  const userId = userInfo?._id;
  const { isLoading } = useGetUserQuery(userId);

  if (isLoading) return <p>loading</p>;

  const handlePositionSelect = () => setIsPositionSelector(false);

  return (
    <>
      <div
        onClick={handlePositionSelect}
        className="fixed top-0 left-0 w-screen h-screen bg-black opacity-30 z-10 "
      />
      <PositionSelector />
    </>
  );
};
