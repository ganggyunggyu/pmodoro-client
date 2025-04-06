import { BottomArrow, SelectCircle, TopArrow } from '@/shared/icons';
import { TabComponent } from './TabComponent';
import { useSearchStore } from '@/app/store/useSearchStore';
import { useWidgetStore } from '@/app/store';

interface DropDownButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
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
  ...props
}) => {
  const isActive = true;

  const isArrow = label !== '온라인' && label !== '오프라인';

  const { setSearchQueryField, searchQuery } = useSearchStore();
  const { setIsSearchDropDownOpen, isSearchDropDownOpen } = useWidgetStore();

  const toggleOnlineOffline = () => {
    if (searchQuery.isOnline === true && label === '온라인') {
      setSearchQueryField('isOnline', null);
    } else if (searchQuery.isOnline === false && label === '오프라인') {
      setSearchQueryField('isOnline', null);
    } else if (label === '온라인') {
      setSearchQueryField('isOnline', true);
    } else if (label === '오프라인') {
      setSearchQueryField('isOnline', false);
    }
  };

  const handleSearchClick = () => {
    if (!isArrow) {
      toggleOnlineOffline();
    } else {
      setIsSearchDropDownOpen(!isSearchDropDownOpen);
    }
  };

  return (
    <button
      key={label}
      className={`flex items-center gap-2 text-sm border border-alt px-2 py-1 rounded-md
        ${isActive ? 'z-10 bg-white' : ' '}
        ${
          !isArrow && searchQuery.isOnline === true && label === '온라인'
            ? 'z-10 bg-primary text-white'
            : ' '
        }
        ${
          !isArrow && searchQuery.isOnline === false && label === '오프라인'
            ? 'z-10 bg-primary text-white'
            : ' '
        }
        `}
      onClick={handleSearchClick}
      {...props}
    >
      <p>{label}</p>
      {isArrow && <span>{isActive ? <TopArrow /> : <BottomArrow />}</span>}
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
    e.stopPropagation();
  };

  return (
    <main
      onClick={toggleDropdown}
      className="fixed top-0 left-0 w-screen h-screen bg-black/30 backdrop-opacity-30 z-20"
    >
      <article
        onClick={handleArticleClick}
        className="fixed p-3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-md w-1/2"
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
