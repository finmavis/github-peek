import { forwardRef, type ComponentRef } from 'react';
import { Collapsible } from 'radix-ui';
import classNames from 'classnames';
import type {
  CollapsibleContentProps,
  CollapsibleProps,
  CollapsibleTriggerProps,
} from '@radix-ui/react-collapsible';

import styles from './collapsible.module.css';

export const CollapsibleRoot = forwardRef<
  ComponentRef<typeof Collapsible.Root>,
  CollapsibleProps
>(({ children, className, ...props }, forwardedRef) => (
  <Collapsible.Root
    className={classNames(styles.Root, className)}
    ref={forwardedRef}
    {...props}
  >
    {children}
  </Collapsible.Root>
));

export const CollapsibleTrigger = forwardRef<
  ComponentRef<typeof Collapsible.Trigger>,
  CollapsibleTriggerProps
>(({ children, ...props }, forwardedRef) => (
  <Collapsible.Trigger ref={forwardedRef} {...props}>
    {children}
  </Collapsible.Trigger>
));

export const CollapsibleContent = forwardRef<
  ComponentRef<typeof Collapsible.Content>,
  CollapsibleContentProps
>(({ children, className, ...props }, forwardedRef) => (
  <Collapsible.Content
    className={classNames(styles.Content, className)}
    ref={forwardedRef}
    {...props}
  >
    {children}
  </Collapsible.Content>
));
