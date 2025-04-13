import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router';

import { motion } from 'framer-motion';
import { getIsMobile } from '@/shared/lib';
import { ChatIcon, HomeIcon, UserIcon } from '@/shared/icons';
import { useUserStore } from '@/app/store/useUserStore';
import { useWidgetStore } from '@/app/store';

export const MobileBottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userInfo, isAuth } = useUserStore();
  const { setIsLoginWidgetOpen } = useWidgetStore();

  const { pathname } = location;

  const navigationButtonList = [
    {
      icon: <HomeIcon />,
      isPath: pathname === '/',
      onClick: () => handleLogoClick(),
    },
    {
      icon: <ChatIcon />,
      isPath: pathname.includes('chat'),
      onClick: () => handleChatClick(),
    },
    {
      icon: <UserIcon />,
      isPath: pathname.includes('my-page'),
      onClick: () => handleProfileClick(),
    },
  ];

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleChatClick = () => {
    navigate(`/chat/${userInfo?._id}`);
  };

  const handleProfileClick = () => {
    if (isAuth) {
      navigate(`/my-page/${userInfo?._id}`);
    } else {
      setIsLoginWidgetOpen(true);
    }
  };

  return (
    <motion.footer
      initial={{ translateY: 30, opacity: 0 }}
      animate={{ translateY: 0, opacity: 1 }}
      exit={{ translateY: -30, opacity: 0, position: 'fixed' }}
      transition={{ duration: 0.5 }}
      className="absolute bottom-0 w-screen h-20 px-[10%] flex justify-between border border-t border-alt text-xs bg-white"
    >
      <nav className="flex w-full h-full justify-between items-center">
        {navigationButtonList.map((nav, index) => {
          return (
            <button
              key={index}
              className={`${nav.isPath ? 'text-primary' : 'text-black-alt'}`}
              onClick={nav.onClick}
            >
              {nav.icon}
            </button>
          );
        })}
      </nav>
    </motion.footer>
  );
};

export const Footer = () => {
  const isMobile = getIsMobile();
  const [showFooter, setShowFooter] = React.useState(false);
  const location = useLocation();
  const { pathname } = location;

  React.useEffect(() => {
    const observer = new MutationObserver(() => {
      const routerProvider = document.getElementById('route-provider');
      if (!routerProvider) return;

      const handleScroll = () => {
        const scrollTop = routerProvider.scrollTop;
        const clientHeight = routerProvider.clientHeight;
        const scrollHeight = routerProvider.scrollHeight;

        if (scrollTop + clientHeight >= scrollHeight - 150) {
          setShowFooter(true);
        } else {
          setShowFooter(false);
        }
      };

      routerProvider.addEventListener('scroll', handleScroll);
      handleScroll();

      observer.disconnect(); // 찾으면 감시 종료
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, [pathname]);

  return (
    <React.Fragment>
      {isMobile ? (
        <MobileBottomNavigation />
      ) : (
        <motion.footer
          initial={{ translateY: 100, opacity: 0 }}
          animate={
            showFooter
              ? { translateY: 0, opacity: 1 }
              : { translateY: 100, opacity: 0 }
          }
          transition={{ duration: 0.4 }}
          className="absolute bottom-0 w-screen h-20 px-[10%] flex justify-between bg-primary-mute text-white text-xs z-0"
        >
          <article className="flex items-center gap-3">
            <Link to="https://tidal-oval-d41.notion.site/1bdf990b675180859bade3a99096c1fd?pvs=4">
              개인정보 처리방침
            </Link>
            <div className="h-3 w-[1px] bg-white" />
            <Link to="https://tidal-oval-d41.notion.site/1bdf990b6751808089e3cd50b9f78af4?pvs=4">
              이용 약관
            </Link>
          </article>

          <article className="flex items-center justify-center">
            <button>문제 신고</button>
          </article>
        </motion.footer>
      )}
    </React.Fragment>
  );
};
