import { type HTMLAttributes } from 'react';
import classNames from 'classnames';

import styles from './card.module.css';

export type CardProps = HTMLAttributes<HTMLDivElement>;

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div className={classNames(styles.card, className)} {...props}>
      {children}
    </div>
  );
}


