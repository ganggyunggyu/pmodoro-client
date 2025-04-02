import { PROJECT_NAME } from '../constants/core';

const Logo = () => {
  return (
    <button type="button" className="text-2xl font-bold text-red-500">
      {PROJECT_NAME}
    </button>
  );
};

export default Logo;
