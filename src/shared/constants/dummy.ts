import { UserInfo } from '@/app/store/useUserStore';

export const mockUsers: UserInfo[] = [
  {
    _id: '6610f01f4a1c2f3c1a0e0011',
    userId: 'kakao-1001',
    displayName: '김개발',
    phoneNumber: '010-1234-5678',
    firstArea: '서울',
    secondArea: '강남구',
    position: '프론트엔드',
    detailPositionList: ['React', 'Vue', 'Next.js'],
    career: 3,
  },
  {
    _id: '6610f01f4a1c2f3c1a0e0012',
    userId: 'kakao-1002',
    displayName: '이디자이너',
    phoneNumber: '010-9876-5432',
    firstArea: '부산',
    secondArea: '해운대구',
    position: 'UI/UX 디자이너',
    detailPositionList: ['Figma', 'Sketch'],
    career: 5,
  },
  {
    _id: '6610f01f4a1c2f3c1a0e0013',
    userId: 'kakao-1003',
    displayName: '박백엔드',
    phoneNumber: '010-5555-7777',
    firstArea: '경기도',
    secondArea: '성남시',
    position: '백엔드',
    detailPositionList: ['Node.js', 'Express', 'MongoDB'],
    career: 4,
  },
];
