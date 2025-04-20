import React, { InputHTMLAttributes } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/shared/lib/cn';
import { RightArrow } from '@/shared/icons';

const inputVariants = cva(
  'block w-full px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-primary disabled:bg-[#D22828]/15  transition-all rounded-lg disabled:border-2',
  {
    variants: {
      variant: {
        default: 'border border-alt',
        underline: 'border-0 border-b border-black-assist rounded-none',
        ghost: 'border-transparent bg-transparent',
      },
      inputSize: {
        sm: 'h-8 text-sm',
        md: 'h-10 text-base',
        lg: 'h-12 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      inputSize: 'md',
    },
  },
);

const inputLabelVariants = cva(
  'absolute top-1 left-4 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 ',
);

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> &
  VariantProps<typeof inputVariants> & {
    label?: string;
    alertMessage?: string;
    isArrow?: boolean;
  };

export const Input: React.FC<InputProps> = ({
  label,
  alertMessage,
  className,
  id,
  variant,
  inputSize,
  isArrow,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`; // fallback id

  return (
    <>
      <div className="relative z-0 py-1 w-full">
        <input
          id={inputId}
          placeholder=" "
          autoComplete="off"
          className={cn(
            inputVariants({ variant, inputSize }),
            'peer',
            className,
          )}
          {...props}
        />
        {label && (
          <label className={cn(inputLabelVariants())} htmlFor={inputId}>
            {label}
          </label>
        )}
        {isArrow && (
          <figure className="absolute right-4 top-3">
            <RightArrow />
          </figure>
        )}
      </div>
      {alertMessage && (
        <p className="text-red-400 text-xs mt-1 transition-all">
          {alertMessage}
        </p>
      )}
    </>
  );
};
