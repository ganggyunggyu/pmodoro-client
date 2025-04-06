import { BottomArrow, SelectCircle, TopArrow } from '@/shared/icons';
import { TabComponent } from './TabComponent';

interface DropDownButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string; // 추가적으로 전달받을 prop
  isActive: boolean;
}
interface DropDownItemProps {
  label: string;
  isActive: boolean;
}
interface DropDownOverlayProps {
  label: string;
  tabOptionList?: { label: string }[];
  mainOptionList: { label: string }[];
  toggleDropdown: () => void;
}

export const DropDownButton: React.FC<DropDownButtonProps> = ({
  label,
  isActive,
  ...props
}) => {
  return (
    <button
      key={label}
      className={`flex items-center gap-2 text-sm border border-alt px-2 py-1 rounded-md
        ${isActive ? 'z-10 bg-white' : ' '}
        
        `}
      {...props}
    >
      <p>{label}</p>
      <span>{isActive ? <TopArrow /> : <BottomArrow />}</span>
    </button>
  );
};

export const DropDownItem: React.FC<DropDownItemProps> = ({
  label,
  isActive,
}) => {
  return (
    <li
      className={`p-3 border rounded-md text-sm flex justify-between
    ${isActive ? 'border-primary text-primary ' : 'border-black-alt'}
    `}
    >
      <p>{label}</p>
      <SelectCircle isActive={isActive} />
    </li>
  );
};

export const DropDownOverlay: React.FC<DropDownOverlayProps> = ({
  label,
  tabOptionList,
  mainOptionList,
  toggleDropdown,
}) => {
  const handleArticleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 이벤트 전파 막기
  };

  return (
    <main
      onClick={toggleDropdown}
      className="fixed top-0 left-0 w-screen h-screen bg-black/30 backdrop-opacity-30"
    >
      <article
        onClick={handleArticleClick} // article 클릭 시 이벤트 전파 막음
        className="fixed p-3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white"
      >
        <p>{label}</p>

        <TabComponent tabOptionList={tabOptionList} />
        <ul className="pt-3 bg-white flex flex-col gap-2">
          {mainOptionList.map((op) => {
            return (
              <DropDownItem key={op.label} label={op.label} isActive={true} />
            );
          })}
        </ul>
      </article>
    </main>
  );
};
