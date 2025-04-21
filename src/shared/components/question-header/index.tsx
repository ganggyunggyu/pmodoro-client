// components/QuestionHeader.tsx
import React from 'react';

interface QuestionHeaderProps {
  title: string;
  className?: string;
}

export const QuestionHeader: React.FC<QuestionHeaderProps> = ({
  title,
  className,
}) => {
  return (
    <article className={`w-full flex flex-col gap-3 ${className || ''}`}>
      <p className="text-headline-m">{title}</p>
    </article>
  );
};
