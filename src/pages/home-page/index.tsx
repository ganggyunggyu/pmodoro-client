import { UserInfo } from '@/app/store/useUserStore';

import { Banner } from '@/widgets/banner';
import { UserSearchWidget } from '@/widgets/user-search-widget';

import { UserCard } from '@/features/user/ui/user-card';
import { PulseLoaderSpinner } from '@/shared/components/PulseLoaderPage';
import { useUserSearchQuery } from '@/shared/components/TabComponent';

export const HomePage = () => {
  const { data: userList, isLoading } = useUserSearchQuery();

  return (
    <main className="mt-60">
      <Banner />
      <UserSearchWidget />
      <section className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 transition-all pb-20 ">
        {isLoading ? (
          <div className="flex">
            <PulseLoaderSpinner />
          </div>
        ) : (
          userList?.map((cardUser: UserInfo) => (
            <UserCard key={cardUser._id} cardUser={cardUser} />
          ))
        )}
      </section>
    </main>
  );
};
