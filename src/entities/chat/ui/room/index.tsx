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
      variant = 'outlinePrimary';
      break;
  }

  return (
    <Button
      size="lg"
      variant={variant}
      className={cn(
        'flex items-center justify-start px-3 gap-3 hover:bg-normal hover:text-primary hover:border-primary hover:border-1 overflow-hidden min-w-fit',
        className,
      )}
      {...props}
    >
      {user.kakaoAuthInfo?.profileImg ? (
        <img
          className="min-w-12 min-h-12 rounded-full"
          src={user.kakaoAuthInfo.profileImg}
          alt=""
        />
      ) : (
        <span className="min-w-12 min-h-12 bg-alt rounded-full" />
      )}

      <figure className="flex flex-col items-start gap-1">
        <p className="text-body-normal-sb text-ellipsis whitespace-nowrap">
          {user.displayName}
        </p>
        <p className="text-body-reading-m text-black-alt overflow-hidden text-ellipsis whitespace-nowrap max-w-40">
          {lastMessage}
        </p>
      </figure>
    </Button>
  );
};
