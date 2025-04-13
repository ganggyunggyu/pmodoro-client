import React from 'react';

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
    <div className="flex w-full justify-start lg:gap-30 items-center">
      <p className="w-40 text-black-alt">{label}</p>
      <div
        className={`w-full p-2 ${
          isEditing ? 'border border-alt rounded-md' : ''
        }`}
      >
        {label === '자기소개' ? (
          <textarea
            ref={textareaRef}
            value={value}
            onChange={onChange}
            placeholder="자기소개"
            className="w-full rounded-lg"
            disabled={!isEditing}
          />
        ) : (
          <input
            type="text"
            value={value}
            className="w-full"
            disabled={!isEditing}
            onChange={onChange}
          />
        )}
      </div>
    </div>
  );
};
