import React from 'react';
import { useLocation } from 'react-router';

import { RouteProvider, AuthProvider } from './provider';

import { Header } from '../widgets/header';
import { Footer } from '../widgets/footer';
import { LoginWidget } from '../widgets/login-widget';
import { ChatHeader } from '../widgets/chat-header';
import { Routing } from '../pages';

import { useWidgetStore } from './store';
import { useChatStore } from './store/useChatStore';
import { getIsMobile } from '../shared/lib';

export const App = () => {
  const { pathname } = useLocation();
  const isMobile = getIsMobile();

  const { isLoginWidgetOpen, setIsLoginWidgetOpen } = useWidgetStore();
  const { currentRoomId } = useChatStore();

  const isChat = pathname.includes('chat');
  const isAdmin = pathname.includes('admin');
  const isOnboarding = pathname.includes('onboarding');

  const isFooter = !isChat && !isAdmin && !isOnboarding;
  const isChatHeader = isMobile && isChat && !!currentRoomId;

  React.useEffect(() => {
    if (isLoginWidgetOpen) {
      setIsLoginWidgetOpen(false);
    }
  }, [pathname]);

  return (
    <AuthProvider>
      {isChatHeader ? <ChatHeader /> : <Header />}
      {isLoginWidgetOpen && <LoginWidget />}
      <RouteProvider>
        <Routing />
      </RouteProvider>
      {isFooter && <Footer />}
    </AuthProvider>
  );
};
