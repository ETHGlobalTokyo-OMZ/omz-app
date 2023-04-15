/* eslint-disable react/require-default-props */
import { InputHTMLAttributes } from 'react';

import { twMerge } from 'tailwind-merge';

import SearchIcon from 'assets/search.svg';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  inputClassName?: string;
}

const SearchInput = ({ className, inputClassName, ...props }: InputProps) => (
  <div
    className={twMerge(
      'relative flex h-full w-full items-center gap-2 rounded-full bg-[#22252E] py-3 px-7',
      className
    )}>
    <SearchIcon />
    <input
      className={twMerge(
        'bg-transparent text-white w-full text-sm placeholder:text-[#C6C6C6] focus-visible:outline-none',
        inputClassName
      )}
      {...props}
    />
  </div>
);

export default SearchInput;
