import { type HTMLAttributes } from 'react';
import classNames from 'classnames';

import styles from './scroll-area.module.css';

export type ScrollAreaProps = HTMLAttributes<HTMLDivElement>;

export function ScrollArea({
  className,
  children,
  ...props
}: ScrollAreaProps) {
  return (
    <div className={classNames(styles.scrollArea, className)} {...props}>
      {children}
    </div>
  );
}


