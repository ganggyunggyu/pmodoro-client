import { PulseLoaderSpinner } from '@/shared/components/PulseLoaderPage';
import { delay } from '@/shared/lib/delay';
import React, { ReactNode } from 'react';
import { useLocation } from 'react-router';

interface RouteProviderProps {
  children: ReactNode;
}

export const RouteProvider: React.FC<RouteProviderProps> = ({ children }) => {
  const routeProviderRef = React.useRef<HTMLElement | null>(null);

  const [isOpacity, setIsOpacity] = React.useState(true);
  const [isView, setIsView] = React.useState(false);

  const { pathname } = useLocation();

  const isOnboardingWidgets = pathname.includes('onboarding');

  const initPage = async () => {
    if (isOnboardingWidgets) {
      setIsView(true);
      setIsOpacity(false);
      return;
    }

    await delay(450);
    setIsView(true);

    await delay(500);
    setIsOpacity(false);

    if (routeProviderRef.current) {
      routeProviderRef.current.scrollTo(0, 0);
    }
  };

  const unMountePage = () => {
    setIsOpacity(true);
    setIsView(false);
  };

  React.useEffect(() => {
    initPage();
    return () => unMountePage();
  }, [pathname]);

  return (
    <React.Fragment>
      {!isView ? (
        <div className="flex">
          <PulseLoaderSpinner />
        </div>
      ) : (
        <main
          ref={routeProviderRef}
          id="route-provider"
          className={`fixed w-screen h-screen  overflow-y-scroll pt-24 pb-20 lg:px-[5%] px-[7%] transition-opacity duration-500
        ${isOpacity ? 'opacity-0' : 'opacity-100'}
        `}
        >
          {children}
        </main>
      )}
    </React.Fragment>
  );
};
