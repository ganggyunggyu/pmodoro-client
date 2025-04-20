import React from 'react';
import { useLocation } from 'react-router';

import { Header } from '../widgets/header';
import { useWidgetStore } from './store';

import { useChatStore } from './store/useChatStore';
import { getIsMobile } from '../shared/lib';
import { Footer } from '../widgets/footer';
import { Routing } from '../pages';
import { LoginPage } from '../pages/login-page';
import { ChatHeader } from '../widgets/chat-header';
import { RouteProvider } from './provider/router-provider';
import { AuthProvider } from './provider/auth-provider';

export const App = () => {
  const location = useLocation();
  const { pathname } = location;
  const { isLoginWidgetOpen, setIsLoginWidgetOpen } = useWidgetStore();
  const { currentRoomId } = useChatStore();

  React.useEffect(() => {
    if (isLoginWidgetOpen) setIsLoginWidgetOpen(false);
  }, [pathname]);

  const isChat = location.pathname.includes('chat');
  const isAdmin = location.pathname.includes('admin');

  const isMobile = getIsMobile();

  const isFooter = !isChat && !isAdmin;

  return (
    <AuthProvider>
      {isMobile && isChat && currentRoomId ? <ChatHeader /> : <Header />}
      {isLoginWidgetOpen && <LoginPage />}
      <RouteProvider>
        <Routing />
      </RouteProvider>
      {isFooter && <Footer />}
    </AuthProvider>
  );
};
