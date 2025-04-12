import React, { ReactNode } from 'react';
import { useLocation } from 'react-router';

interface RouteProviderProps {
  children: ReactNode;
}

export const RouteProvider: React.FC<RouteProviderProps> = ({ children }) => {
  const routeProviderRef = React.useRef<HTMLElement | null>(null);

  const { pathname } = useLocation(); // useLocation 사용하여 pathname 가져오기

  React.useEffect(() => {
    if (routeProviderRef.current) {
      routeProviderRef.current.scrollTo(0, 0); // 페이지 이동 시 스크롤 상단으로 이동
    }
  }, [pathname]);

  return (
    <main
      ref={routeProviderRef}
      className="fixed w-screen h-[calc(100vh-var(--spacing)*16)] overflow-y-scroll pt-24 pb-20 lg:px-[10%] px-[7%]"
    >
      {children}
    </main>
  );
};
