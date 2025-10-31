import { type HTMLAttributes } from 'react';
import classNames from 'classnames';

import styles from './badge.module.css';

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: 'solid' | 'soft' | 'outline';
  color?: 'blue' | 'green' | 'red' | 'gray' | 'yellow';
  size?: '1' | '2';
};

export function Badge({
  className,
  variant = 'soft',
  color = 'blue',
  size = '2',
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={classNames(
        styles.badge,
        styles[`variant-${variant}`],
        styles[`color-${color}`],
        styles[`size-${size}`],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}


