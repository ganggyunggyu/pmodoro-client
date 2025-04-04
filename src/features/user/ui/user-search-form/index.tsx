export const UserSearchForm = () => {
  return (
    <form className="flex items-center lg:gap-5 md:gap-3 sm:gap-1 transition-all">
      <button className="py-2 px-3 bg-neutral-100 text-sm rounded-md min-w-fit">
        상세 검색
      </button>

      <div className="h-8 w-0.5 bg-neutral-300" />
      <button className="py-2 px-3 bg-neutral-100 text-sm rounded-md min-w-fit">
        포지션
      </button>
      <button className="py-2 px-3 bg-neutral-100 text-sm rounded-md min-w-fit">
        기술 스택
      </button>
      <button className="py-2 px-3 bg-neutral-100 text-sm rounded-md min-w-fit">
        위치
      </button>
      <button className="py-2 px-3 bg-neutral-100 text-sm rounded-md min-w-fit">
        가능 시간
      </button>
      <div className="h-8 w-0.5 bg-neutral-300" />
      <div className="flex items-center border p-1 border-neutral-300 rounded-md">
        <label className="px-2" htmlFor="">
          🔎
        </label>
        <input className=" h-full" placeholder="상세 검색" type="text" />
      </div>
    </form>
  );
};
