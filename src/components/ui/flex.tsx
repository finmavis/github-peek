import { type HTMLAttributes } from 'react';
import classNames from 'classnames';

import styles from './flex.module.css';

export type FlexProps = HTMLAttributes<HTMLDivElement> & {
  direction?: 'row' | 'column';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  wrap?: boolean;
  gap?: '1' | '2' | '3' | '4' | '5' | '6';
};

export function Flex({
  className,
  direction = 'row',
  align,
  justify,
  wrap = false,
  gap = '2',
  children,
  ...props
}: FlexProps) {
  return (
    <div
      className={classNames(
        styles.flex,
        styles[`direction-${direction}`],
        align && styles[`align-${align}`],
        justify && styles[`justify-${justify}`],
        wrap && styles.wrap,
        styles[`gap-${gap}`],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}


