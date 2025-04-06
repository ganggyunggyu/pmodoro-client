export type Project = {
  _id: string; // 클라이언트에서는 string으로 표현되는 ObjectId
  name: string;
  position: string;
  duration: {
    startDate: string; // API에서 받을 때는 ISO 형식의 문자열로 받을 수 있음
    endDate: string;
  };
  description: string;
  userId: string; // 'User' 모델의 ObjectId를 string으로 처리
  createdAt: string; // 날짜도 ISO 형식의 문자열로 받음
  updatedAt: string; // 날짜도 ISO 형식의 문자열로 받음
};
