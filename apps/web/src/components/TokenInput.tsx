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
      'bg-white relative flex h-full w-full items-center rounded-[10px] p-4',
      className
    )}>
    {children}
    <input
      type="number"
      className={twMerge(
        'bg-transparent text-black w-full text-right text-[20px] font-medium leading-[24px] placeholder:text-grey-3 focus-visible:outline-none',
        inputClassName
      )}
      {...props}
    />
  </div>
);

export default TokenInput;
