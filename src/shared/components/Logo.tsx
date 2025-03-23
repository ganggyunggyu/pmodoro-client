'use client';

import { useRouter } from 'next/navigation';
import { PROJECT_NAME } from '../constants/core';

const Logo = () => {
  const router = useRouter();

  const handleLogoClick = () => {
    router.push('/');
  };
  return (
    <button
      onClick={handleLogoClick}
      type="button"
      className="text-2xl font-bold text-red-500"
    >
      {PROJECT_NAME}
    </button>
  );
};

export default Logo;
