/* eslint-disable react/require-default-props */
import { InputHTMLAttributes } from 'react';

import { twMerge } from 'tailwind-merge';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  inputClassName?: string;
}

const TokenInput = ({ className, inputClassName, children, ...props }: InputProps) => (
  <div
    className={twMerge(
      'relative flex h-full w-full items-center rounded-[10px] bg-white p-4',
      className
    )}>
    {children}
    <input
      className={twMerge(
        'w-full bg-transparent text-right text-black focus-visible:outline-none',
        inputClassName
      )}
      {...props}
    />
  </div>
);

export default TokenInput;
