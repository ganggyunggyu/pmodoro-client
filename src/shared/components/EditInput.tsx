import React from 'react';
import { Input } from './input';

interface EditInputProps {
  label: string;
  value: string;
  isEditing: boolean;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

export const EditInput: React.FC<EditInputProps> = ({
  label,
  value,
  isEditing,
  onChange,
}) => {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  React.useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto'; // 일단 높이 초기화
      textarea.style.height = `${textarea.scrollHeight}px`; // 스크롤 높이만큼 다시 설정
    }
  }, [value]);
  return (
    <div className="flex flex-col w-full justify-start lg:flex-row lg:gap-25 lg:items-center">
      <p className="w-40 lg:min-w-40 text-black-alt">{label}</p>

      {label === '자기소개' ? (
        <div
          className={`w-full rounded-md
        ${isEditing ? 'border border-alt' : ''}
        `}
        >
          <textarea
            ref={textareaRef}
            value={value}
            onChange={onChange}
            placeholder="자기소개"
            className="w-full rounded-lg py-3 lg:p-3 disabled:p-0 transition-all"
            disabled={!isEditing}
          />
        </div>
      ) : (
        <Input
          variant={isEditing ? 'default' : 'ghost'}
          type="text"
          value={value}
          disabled={!isEditing}
          className="w-full"
          onChange={onChange}
        />
      )}
    </div>
  );
};
