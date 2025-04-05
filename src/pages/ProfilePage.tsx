import { useParams } from 'react-router';
import { getUser, useGetUserQuery } from './Mypage';
import { PulseLoaderSpinner } from '@/shared/components/PulseLoaderPage';

export const ProfilePage = () => {
  const params = useParams();

  const { data, isLoading } = useGetUserQuery(params.userId);
  if (isLoading) return <PulseLoaderSpinner />;
  console.log(data);

  return <main className="w-screen h-screen px-[10%]"></main>;
};
