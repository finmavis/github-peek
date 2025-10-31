import { forwardRef, type ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';

import styles from './button.module.css';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'solid' | 'soft' | 'ghost' | 'outline';
  size?: '1' | '2' | '3' | '4';
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'solid',
      size = '3',
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={classNames(
          styles.button,
          styles[`variant-${variant}`],
          styles[`size-${size}`],
          className
        )}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

