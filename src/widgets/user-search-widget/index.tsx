import { UserSearchForm } from '@/features/user/ui';

export const UserSearchWidget = () => {
  const tabs = ['전체', '개발자', '기획자', '디자이너', '마케터'];
  return (
    <section className="flex flex-col gap-5 mb-5 w-full overflow-scroll">
      <p className="text-xl font-semibold">원하는 팀원을 구체적으로 검색해요</p>
      <article className="flex w-full ">
        {tabs.map((tab, index) => {
          return <button key={index}>{tab}</button>;
        })}
      </article>
      <UserSearchForm />
    </section>
  );
};
