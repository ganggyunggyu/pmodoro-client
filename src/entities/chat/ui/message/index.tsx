import { useUserStore } from '@/app/store/useUserStore';
import { cn } from '@/shared/lib/cn';

interface MessageProps extends React.HTMLAttributes<HTMLDivElement> {
  message: string;
  displayName?: string;
  isMe: boolean;
}

export const ChatMessage = ({
  message,
  displayName,
  className,
  isMe,
  ...props
}: MessageProps) => {
  return (
    <figure className={cn('max-w-fit', className)} {...props}>
      {!isMe && <div className="text-xs text-gray-500 mb-1">{displayName}</div>}

      <div
        className={`rounded-b-md px-4 py-2 text-sm max-w-xs
        ${
          isMe
            ? 'bg-primary text-white  rounded-l-md'
            : ' bg-primary-transparent rounded-r-md'
        }
        `}
      >
        {message}
      </div>
    </figure>
  );
};
