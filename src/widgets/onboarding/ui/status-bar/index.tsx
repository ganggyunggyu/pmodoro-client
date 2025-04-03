import { useLocation } from 'react-router';

export const StatusBar = () => {
  const { pathname } = useLocation();
  return (
    <div className=" w-full flex items-center justify-center gap-7 py-4">
      <p
        className={`transition-all
            ${
              pathname.includes('user-info')
                ? 'text-primary'
                : 'text-black-assist'
            }
            `}
      >
        기본 정보
      </p>
      <div
        className={`w-16 h-0.5 transition-all
            ${pathname.includes('user-info') ? 'bg-primary' : 'bg-black-assist'}
            
            `}
      />
      <p
        className={`transition-all ${
          pathname.includes('position') ? 'text-primary' : 'text-black-assist'
        }`}
      >
        희망 직무 정보
      </p>
      <div
        className={`w-16 h-0.5 transition-all
            ${pathname.includes('position') ? 'bg-primary' : 'bg-black-assist'}
            
            `}
      />
      <p
        className={`transition-all ${
          pathname.includes('other-info') || pathname.includes('final')
            ? 'text-primary'
            : 'text-black-assist'
        }`}
      >
        참가 정보
      </p>
    </div>
  );
};
