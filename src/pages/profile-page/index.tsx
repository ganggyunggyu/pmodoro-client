import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { PulseLoaderSpinner } from '@/shared/components/PulseLoaderPage';
import { UserInfo, useUserStore } from '@/app/store/useUserStore';
import { useGetProjectByUser, useGetUserQuery } from '@/entities';
import { UserCard } from '@/features/user/ui/user-card';
import { ProfileImage } from '@/entities/user/ui/profile-image';
import { ProjectCard } from '@/features/project/ui/project-card';
import { axios } from '@/app/config';
import { useChatStore } from '@/app/store/useChatStore';
import { Button, LeftArrow, RightArrow } from '@/shared';
import { useUserSearchQuery } from '@/widgets/user-search-widget';

export const UserProfileCard = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { data: user, isLoading } = useGetUserQuery(params.userId);
  const { userInfo } = useUserStore();

  const { setRoomId } = useChatStore();

  if (isLoading) return <PulseLoaderSpinner />;
  const handleChatClick = async () => {
    const isMe = userInfo._id === user?._id;
    if (isMe) {
      navigate(`/chat/${userInfo._id}`);
    } else {
      try {
        const result = await axios.post('/chat/room', {
          userId: userInfo._id,
          otherUserId: user?._id,
        });

        const roomId = result.data.roomId;

        setRoomId(roomId); // 상태 업데이트
        navigate(`/chat/${userInfo?._id}/${roomId}`); // 채팅 페이지로 이동
      } catch (error) {
        console.error('채팅방 생성 중 오류 발생:', error); // 오류 발생 시 콘솔에 로그 출력
      }
    }
  };

  return (
    <article
      className={`flex flex-col items-center justify-center md:flex-col gap-3 w-full lg:gap-7 lg:w-3/12`}
    >
      <div className="flex items-center w-full justify-center lg:justify-start lg:flex-row gap-5">
        <ProfileImage src={user?.kakaoAuthInfo?.profileImg} />

        <div className="flex flex-col items-center">
          <p className="text-headline-sb">{user.displayName}</p>
          <p className="text-body-normal-m text-black-alt">{user.position}</p>
        </div>
      </div>
      <Button className="w-full" onClick={handleChatClick}>
        채팅하기
      </Button>
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

  const scrollRef = React.useRef<HTMLDivElement | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    const scrollAmount = window?.innerWidth;
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (isLoading) return <PulseLoaderSpinner />;

  return (
    <main className="flex flex-col gap-10 h-screen">
      <section
        className={`w-full gap-4 lg:gap-10 p-6 border border-alt rounded-lg
        lg:flex-row
        flex flex-col`}
      >
        <UserProfileCard />
        <article className="flex flex-col p-6 bg-primary-transparent flex-1">
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

        <div className="relative w-full">
          {/* 왼쪽 버튼 */}
          <Button
            variant="round"
            size="round"
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 "
          >
            <LeftArrow />
          </Button>

          <section
            ref={scrollRef}
            className="flex gap-3 w-full h-full overflow-x-scroll scroll-smooth px-10"
          >
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
          <Button
            variant="round"
            size="round"
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10"
          >
            <RightArrow />
          </Button>
        </div>
      </section>
    </main>
  );
};
