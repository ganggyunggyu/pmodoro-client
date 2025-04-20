import { UserInfo, useUserStore } from '@/app/store/useUserStore';
import { ChatMessage, ChatRoom } from '@/entities/chat/ui';
import { UserCard } from '@/features/user/ui/user-card';
import {
  Button,
  DropdownButton,
  KakaoIcon,
  LabelButton,
  MinXIcon,
  SelectorButton,
  XIcon,
} from '@/shared';
import { Input } from '@/shared/components/input';
import React from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { delay } from '@/shared/lib/delay';

interface DropdownWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  trigger: React.ReactNode;
  children: React.ReactNode;
}

export const DropdownWrapper: React.FC<DropdownWrapperProps> = ({
  isOpen,
  onClose,
  trigger,
  children,
}) => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <section className="relative w-full">
      {trigger}
      <AnimatePresence>
        {isVisible && (
          <motion.article
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden p-4 flex flex-col gap-3"
          >
            {children}
          </motion.article>
        )}
      </AnimatePresence>
    </section>
  );
};

export const ComponentsPage = () => {
  const { setUserInfo } = useUserStore();
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const mockUser: UserInfo = {
    _id: 'user123456',
    displayName: '강경규',
    position: 'Front-end Developer',
    skills: ['React', 'Vue', 'TypeScript', 'Tailwind CSS'],
    isOnline: true,
    career: 2,
    description: '개발에 입문한 프론트엔드 개발자입니다.',

    email: 'azusa@example.com',
    password: 'hashed_password_here',
    firstArea: '서울',
    secondArea: '마포구',

    kakaoAuthInfo: {
      kakaoId: 'kakao987654321',
      profileImg:
        'https://mblogthumb-phinf.pstatic.net/20130604_7/five5808_1370313200155mQtpb_PNG/sdfgeth.PNG?type=w420',
      auth_time: 1710000000,
      exp: 1713600000,
      iat: 1710000000,
      iss: 'https://kauth.kakao.com',
      sub: 'azusa-subject-id',
      aud: 'your-client-id-from-kakao',
    },
  };

  React.useEffect(() => {
    setUserInfo(mockUser);
  }, []);
  return (
    <main className=" flex flex-col gap-10 py-10">
      <div className="flex flex-col gap-3">
        <p className="text-lg font-bold">Button</p>
        <p>사이즈</p>
        <Button variant="primary" size="sm">
          스몰
        </Button>
        <Button variant="primary" size="md">
          미듐
        </Button>
        <Button variant="primary" size="lg">
          라지
        </Button>
        <p>컬러</p>
        <Button variant="primary" size="md">
          버튼
        </Button>
        <Button variant="outlinePrimary" size="md">
          버튼
        </Button>
        <Button variant="outlineAlt" size="md">
          버튼
        </Button>
        <Button variant="secondary" size="md" disabled>
          버튼
        </Button>
        <Button variant="outlineBgPrimary1" size="md">
          버튼
        </Button>
        <Button variant="outlineBgPrimary2" size="md">
          버튼
        </Button>

        <Button className="flex gap-2" variant="kakao">
          <KakaoIcon />
          카카오 계정으로 로그인
        </Button>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-lg font-bold">DropdownButton</p>
        <DropdownWrapper
          isOpen={isDropdownOpen}
          onClose={() => setIsDropdownOpen(false)}
          trigger={
            <DropdownButton
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              label="드롭다운"
              direction={isDropdownOpen ? 'up' : 'down'}
              variant="outlineAlt"
            />
          }
        >
          <section className="flex flex-col gap-3">
            <header className="w-full flex justify-between">
              <p className="text-black text-lg font-semibold">기술 스택</p>
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                <XIcon />
              </button>
            </header>
            {['항목 1', '항목 2', '항목 3', '항목 4'].map((item, idx) => (
              <SelectorButton key={idx} icon="check" isSelected={idx === 0}>
                {item}
              </SelectorButton>
            ))}
          </section>
        </DropdownWrapper>
        <p>버튼을 눌러볼수 있습니다.</p>

        <DropdownButton
          variant="outlinePrimary"
          size="md"
          label="드롭다운"
          direction="down"
        />
        <DropdownButton
          variant="outlinePrimary"
          size="md"
          label="확장"
          direction="right"
        />
      </div>

      <div className="flex flex-col gap-3">
        <p className="font-bold text-lg">Label</p>

        <LabelButton
          label="Label"
          icon={<XIcon />}
          variant="outlinePrimary"
          size="md"
        />
        <LabelButton
          label="Label"
          icon={<XIcon />}
          variant="primaryTrans"
          size="md"
        />
        <LabelButton label="Label" variant="outlinePrimary" size="md" />
        <LabelButton label="Label" variant="primaryTrans" size="md" />
        <LabelButton label="Label" variant="outlineAlt" size="xs" />
        <LabelButton
          label="Label"
          icon={<MinXIcon />}
          variant="outlineAlt"
          size="xs"
        />
      </div>

      <div className="flex flex-col gap-3">
        <p className="font-bold text-lg">UserCard</p>

        <UserCard cardUser={mockUser} />
      </div>

      <div className="flex flex-col gap-3">
        <p className="font-bold text-lg">Selector</p>

        <SelectorButton icon="circle" isSelected={true}>
          원형 아이콘 활성
        </SelectorButton>
        <SelectorButton icon="circle" isSelected={false}>
          원형 아이콘 비활성
        </SelectorButton>
        <SelectorButton icon="check" isSelected={true}>
          체크 아이콘 비활성
        </SelectorButton>
        <SelectorButton icon="check" isSelected={false}>
          체크 아이콘 비활성
        </SelectorButton>
        <SelectorButton icon="arrow" isSelected={true}>
          화살표 활성
        </SelectorButton>
        <SelectorButton icon="arrow" isSelected={false}>
          화살표 비활성
        </SelectorButton>
      </div>

      <div className="flex flex-col gap-3">
        <p className="font-bold text-lg">Chat</p>

        <p>ChatRoom</p>
        <ChatRoom
          status="default"
          user={mockUser}
          lastMessage="기본 상태의 채팅방"
        ></ChatRoom>
        <ChatRoom
          status="new"
          user={mockUser}
          lastMessage="새로운 채팅방"
        ></ChatRoom>
        <ChatRoom status="read" user={mockUser} lastMessage="읽은 채팅방" />

        <p>ChatMessage</p>
        <div>
          <ChatMessage
            message="나의 채팅 메시지"
            displayName={mockUser.displayName}
            isMe={true}
          />
          <ChatMessage
            message="상대의 채팅 메시지"
            displayName={mockUser.displayName}
            isMe={false}
          />
        </div>
      </div>

      <div>
        <Input
          alertMessage="이메일 형식이 올바르지 않아요"
          variant="default"
          inputSize="md"
          name="email"
          placeholder="기본 인풋"
        />
        <Input
          alertMessage="이메일 형식이 올바르지 않아요"
          variant="default"
          inputSize="md"
          name="email"
          placeholder="화살표 인풋"
          isArrow={true}
        />
        <Input
          alertMessage="이메일 형식이 올바르지 않아요"
          variant="default"
          inputSize="md"
          name="email"
          placeholder="뮤트 인풋"
          disabled={true}
          className="border-[#D22828] border-2"
        />
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-caption1-m">Text Caption 1 M</p>
        <p className="text-caption1-sb">Text Caption 1 SB</p>

        <p className="text-body-normal-m">Text Body Normal M</p>
        <p className="text-body-normal-sb">Text Body Normal SB</p>

        <p className="text-body-reading-m">Text Body Reading M</p>
        <p className="text-body-reading-sb">Text Body Reading SB</p>

        <p className="text-heading2-m">Text Heading 2 M</p>
        <p className="text-heading2-sb">Text Heading 2 SB</p>

        <p className="text-headline-m">Text Headline M</p>
        <p className="text-headline-sb">Text Headline SB</p>

        <p className="text-title1-m">Text Title 1 M</p>
        <p className="text-title2-m">Text Title 2 M</p>
      </div>
    </main>
  );
};
