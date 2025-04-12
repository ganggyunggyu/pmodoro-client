import { useLocation } from 'react-router';

export const MainSidebar = ({ sideItemList }) => {
  const location = useLocation();
  const { pathname } = location;
  return (
    <aside className=" w-3/12 text-xl">
      <ul className=" sticky top-0 flex flex-col gap-7 items-start">
        {sideItemList.map((item, index) => {
          return (
            <li
              key={index}
              className={`
          ${pathname.includes(item.path) ? 'text-blck' : 'text-black-alt'}
          `}
            >
              {item.label}
            </li>
          );
        })}
      </ul>
    </aside>
  );
};
