/* eslint-disable react/button-has-type */
import { ButtonHTMLAttributes, FC } from 'react';
import { twMerge } from 'tailwind-merge';

const PrimaryButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className,
  ...props
}) => (
  <button
    className={twMerge(
      'mt-8 flex items-center justify-center rounded-lg bg-[#2864FF] py-4 disabled:cursor-not-allowed disabled:bg-grey-5',
      className
    )}
    {...props}>
    {children}
  </button>
);

export default PrimaryButton;
