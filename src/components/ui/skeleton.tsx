import { type HTMLAttributes } from 'react';
import classNames from 'classnames';

import styles from './skeleton.module.css';

export type SkeletonProps = HTMLAttributes<HTMLDivElement> & {
  width?: string | number;
  height?: string | number;
  circle?: boolean;
};

export function Skeleton({
  className,
  width,
  height,
  circle = false,
  style,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={classNames(styles.skeleton, circle && styles.circle, className)}
      style={{
        width: width || '100%',
        height: height || '1rem',
        ...style,
      }}
      {...props}
    />
  );
}


