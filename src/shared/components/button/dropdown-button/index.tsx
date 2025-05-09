import { BottomArrow, LeftArrow, RightArrow, TopArrow } from '@/shared/icons';
import { Button, ButtonProps } from '../atom-button';
import { cn } from '@/shared/lib/cn';

type DropdownButtonProps = ButtonProps & {
  direction?: 'down' | 'right' | 'up' | 'left';
  label: string;
};

export const DropdownButton = ({
  direction = 'down',
  label,
  className,
  ...props
}: DropdownButtonProps) => {
  const ArrowIcon = (() => {
    switch (direction) {
      case 'up':
        return TopArrow;
      case 'left':
        return LeftArrow;
      case 'right':
        return RightArrow;
      case 'down':
      default:
        return BottomArrow;
    }
  })();
  return (
    <Button
      className={cn('flex gap-3 items-center w-fit min-w-fit', className)}
      {...props}
    >
      <p>{label}</p>
      <ArrowIcon />
    </Button>
  );
};
