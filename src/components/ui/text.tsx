import { createElement, type HTMLAttributes } from 'react';
import classNames from 'classnames';

import styles from './text.module.css';

export type TextProps = HTMLAttributes<HTMLElement> & {
  as?: 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  color?: 'default' | 'secondary' | 'tertiary' | 'accent' | 'success' | 'error';
  align?: 'left' | 'center' | 'right';
};

export function Text({
  as = 'p',
  size = '3',
  weight = 'normal',
  color = 'default',
  align,
  className,
  children,
  ...props
}: TextProps) {
  return createElement(
    as,
    {
      className: classNames(
        styles.text,
        styles[`size-${size}`],
        styles[`weight-${weight}`],
        styles[`color-${color}`],
        align && styles[`align-${align}`],
        className
      ),
      ...props,
    },
    children
  );
}


