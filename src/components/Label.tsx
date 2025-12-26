import React from 'react';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

export const Label = ({ children, className, ...props }: LabelProps) => {
  return (
    <label 
      className={`text-[0.55rem] md:text-sm uppercase ${className || ''}`} 
      {...props}
    >
      {children}
    </label>
  );
};