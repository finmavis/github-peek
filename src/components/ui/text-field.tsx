import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import classNames from 'classnames';

import styles from './text-field.module.css';

export type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  size?: '1' | '2' | '3' | '4';
  variant?: 'default' | 'soft';
  inputClassName?: string;
  startDecorator?: ReactNode;
  endDecorator?: ReactNode;
};

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      className,
      size = '3',
      variant = 'default',
      inputClassName,
      startDecorator,
      endDecorator,
      ...props
    },
    ref
  ) => {
    const hasStartDecorator = !!startDecorator;
    const hasEndDecorator = !!endDecorator;

    return (
      <div
        className={classNames(
          styles.wrapper,
          styles[`wrapperSize-${size}`],
          hasStartDecorator && styles.hasStartDecorator,
          hasEndDecorator && styles.hasEndDecorator,
          className
        )}
      >
        {startDecorator && (
          <span className={styles.startDecorator}>{startDecorator}</span>
        )}
        <input
          ref={ref}
          className={classNames(
            styles.input,
            styles[`size-${size}`],
            styles[`variant-${variant}`],
            hasStartDecorator && styles.inputWithStartDecorator,
            hasEndDecorator && styles.inputWithEndDecorator,
            inputClassName
          )}
          {...props}
        />
        {endDecorator && (
          <span className={styles.endDecorator}>{endDecorator}</span>
        )}
      </div>
    );
  }
);

TextField.displayName = 'TextField';

