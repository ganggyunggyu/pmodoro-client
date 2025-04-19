import { UserInfo } from '@/app/store/useUserStore';
import { Button, ButtonProps } from '@/shared';
import { cn } from '@/shared/lib/cn';

type ChatRoomProps = ButtonProps & {
  user: UserInfo;
  lastMessage: string;
  status: 'default' | 'read' | 'new';
};

export const ChatRoom = ({
  user,
  className,
  lastMessage,
  status,
  ...props
}: ChatRoomProps) => {
  let variant: ButtonProps['variant'] = 'outlineAlt';

  switch (status) {
    case 'read':
      variant = 'ghost';
      break;
    case 'new':
      variant = 'outlineBgPrimary2';
      break;
    case 'default':
    default:
      variant = 'outlineAlt';
      break;
  }

  return (
    <Button
      size="lg"
      variant={variant}
      className={cn(
        'flex items-center justify-start pl-3 gap-3 hover:bg-normal hover:text-primary hover:border-primary hover:border-1',
        className,
      )}
      {...props}
    >
      {user.kakaoAuthInfo?.profileImg ? (
        <img
          className="w-12 h-12 rounded-full"
          src={user.kakaoAuthInfo.profileImg}
          alt=""
        />
      ) : (
        <span className="w-12 h-12 bg-alt rounded-full" />
      )}

      <figure className="flex flex-col items-start gap-1">
        <p className="text-sm font-bold">{user.displayName}</p>
        <p className="text-sm font-semibold text-black-alt">{lastMessage}</p>
      </figure>
    </Button>
  );
};
