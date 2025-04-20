import { RightArrow } from '@/shared/icons';
import { Button, ButtonProps } from '../atom-button';
import { cva } from 'class-variance-authority';

type SelectorButtonProps = ButtonProps & {
  isSelected: boolean;
  icon: 'circle' | 'check' | 'arrow';
};

const SearchButtonVariants = cva(
  'items-center justify-center rounded-lg transition-colors disabled:opacity-50 disabled:pointer-events-none cursor-pointer box-border hover:scale-[101%] active:scale-95 transition-all min-w-fit',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-white hover:bg-primary-mute',
        primaryTrans: 'bg-primary-transparent text-primary',
        secondary: 'bg-background-alt text-black-normal hover:bg-[#e0e0e0]',

        outlineAlt:
          'border border-alt bg-normal hover:bg-primary-transparent hover:text-primary',
        outlinePrimary:
          'border border-primary text-primary hover:bg-primary-transparent hover:text-primary',
        outlineBgPrimary1:
          'border border-primary text-primary bg-[#FFCCC8] hover:bg-primary hover:text-normal',
        outlineBgPrimary2:
          'border border-primary text-primary bg-[#F9E0DD] hover:bg-primary hover:text-normal',

        ghost:
          'bg-transparent hover:bg-black-assist/10 text-black-normal opacity-80 border border-alt',
        muted: 'bg-primary-mute text-white hover:bg-[#bb7269]',

        kakao: 'bg-[#FFE812] border border-alt text-black-normal',
      },
      size: {
        xs: 'px-3 py-1.5 text-sm w-fit h-[28px] min-w-fit',
        sm: 'px-4 py-2 text-md w-[60px] h-[40px]',
        md: 'px-5 py-3 text-base w-[68px] h-[48px] min-w-fit',
        lg: 'w-full text-lg py-3',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

export const SelectorButton = ({
  isSelected,
  children,
  icon,
  ...props
}: SelectorButtonProps) => (
  <Button
    variant={isSelected ? 'outlinePrimary' : 'outlineAlt'}
    className="flex w-full justify-between px-4 hover:bg-primary-transparent hover:text-primary" //이거 바리안츠로 추가해서 위의 형태로
    {...props}
  >
    {children}

    {icon === 'circle' && (
      <div
        className={`w-6 h-6 border rounded-full transition-all
        ${isSelected ? 'border-4' : 'border-1'}
      `}
      />
    )}
    {icon === 'check' && (
      <figure
        className={`flex items-center justify-center w-6 h-6  rounded-md
      ${
        isSelected
          ? 'bg-primary text-normal'
          : 'text-normal border-2 border-primary'
      }
      
      `}
      >
        <svg
          width="16"
          height="14"
          viewBox="0 0 16 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 8.72414L5.5 13L15 1"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </figure>
    )}
    {icon === 'arrow' && <RightArrow />}
  </Button>
);
