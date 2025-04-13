export const Banner: React.FC = () => {
  return (
    <div className="absolute top-16 left-0 w-screen bg-gradient-to-b from-[#D87C73] via-[#CFEBCB] to-[#FDF8D8] flex flex-col items-center justify-center text-center py-20 overflow-x-hidden">
      <h1 className="text-2xl md:text-4xl font-bold mb-2">
        프모도로 서비스가 정식 오픈했어요!
      </h1>
      <p className="text-lg md:text-2xl text-black-alt font-semibold mb-6">
        프모도로만의 장점이 궁금하다면?
      </p>
      <button className="px-6 py-2 bg-white border border-gray-300 rounded-lg shadow-md hover:bg-gray-100 cursor-pointer">
        알아보러 가기
      </button>
    </div>
  );
};
