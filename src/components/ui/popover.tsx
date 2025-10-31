import { useState, useEffect, useRef, useCallback, type ReactNode } from 'react';
import classNames from 'classnames';

import styles from './popover.module.css';

export type PopoverProps = {
  trigger: ReactNode;
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  contentClassName?: string;
  side?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
};

export function Popover({
  trigger,
  children,
  open: controlledOpen,
  onOpenChange,
  className,
  contentClassName,
  side = 'bottom',
  align = 'start',
}: PopoverProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [actualSide, setActualSide] = useState(side);
  const [maxHeight, setMaxHeight] = useState<number | undefined>(undefined);
  const [maxWidth, setMaxWidth] = useState<number | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const handleOpenChange = (newOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        handleOpenChange(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        handleOpenChange(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen]);

  // Position content relative to trigger with smart placement
  const updatePosition = useCallback(() => {
    if (!isOpen || !containerRef.current || !contentRef.current) return;

    const trigger = containerRef.current.querySelector('[data-popover-trigger]');
    if (!trigger) return;

    const triggerRect = trigger.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    const padding = 16; // Minimum padding from viewport edges
    const gap = 8; // Gap between trigger and popover

    // Calculate available space in each direction
    const spaceBelow = viewportHeight - triggerRect.bottom - padding;
    const spaceAbove = triggerRect.top - padding;
    const spaceRight = viewportWidth - triggerRect.right - padding;
    const spaceLeft = triggerRect.left - padding;

    // Determine best side based on available space
    let actualSideToUse = side;
    if (side === 'bottom' || side === 'top') {
      // If preferred side doesn't have enough space, flip to opposite
      if (side === 'bottom' && spaceBelow < 200 && spaceAbove > spaceBelow) {
        actualSideToUse = 'top';
      } else if (side === 'top' && spaceAbove < 200 && spaceBelow > spaceAbove) {
        actualSideToUse = 'bottom';
      }
    }

    setActualSide(actualSideToUse);

    // Calculate max height based on available space
    let calculatedMaxHeight: number;
    if (actualSideToUse === 'bottom' || actualSideToUse === 'top') {
      const availableSpace = actualSideToUse === 'bottom' ? spaceBelow : spaceAbove;
      calculatedMaxHeight = Math.max(200, availableSpace - gap);
    } else {
      const availableSpace = actualSideToUse === 'right' ? spaceRight : spaceLeft;
      calculatedMaxHeight = Math.max(200, Math.min(viewportHeight - padding * 2, availableSpace - gap));
    }

    // Ensure we don't exceed a reasonable max height
    const finalMaxHeight = Math.min(calculatedMaxHeight, viewportHeight - padding * 2);
    setMaxHeight(finalMaxHeight);

    // Calculate max width based on available space and alignment
    let calculatedMaxWidth: number;
    if (actualSideToUse === 'bottom' || actualSideToUse === 'top') {
      if (align === 'start') {
        // Popover starts at trigger left, can extend to viewport right
        calculatedMaxWidth = viewportWidth - triggerRect.left - padding;
      } else if (align === 'end') {
        // Popover ends at trigger right, can extend from viewport left
        calculatedMaxWidth = triggerRect.right - padding;
      } else {
        // Center alignment - use space available from trigger center to both edges
        const spaceLeft = triggerRect.left + (triggerRect.width / 2) - padding;
        const spaceRight = viewportWidth - (triggerRect.left + triggerRect.width / 2) - padding;
        calculatedMaxWidth = Math.min(
          (Math.min(spaceLeft, spaceRight) * 2),
          viewportWidth - padding * 2
        );
      }
    } else {
      // For left/right sides, width is constrained by viewport width
      // but also by available space in the direction we're placing
      if (actualSideToUse === 'left') {
        // Can extend from trigger left to viewport left edge
        calculatedMaxWidth = triggerRect.left - padding;
      } else {
        // Can extend from trigger right to viewport right edge
        calculatedMaxWidth = viewportWidth - triggerRect.right - padding;
      }
      // Still respect viewport width overall
      calculatedMaxWidth = Math.min(calculatedMaxWidth, viewportWidth - padding * 2);
    }

    // Ensure we respect minimum and maximum width constraints from CSS
    const minWidth = 300; // From CSS min-width
    const cssMaxWidth = 600; // From CSS max-width
    const finalMaxWidth = Math.max(minWidth, Math.min(calculatedMaxWidth, cssMaxWidth));
    setMaxWidth(finalMaxWidth);

    // Use requestAnimationFrame to ensure content is laid out before measuring
    requestAnimationFrame(() => {
      if (!contentRef.current) return;

      const contentRect = contentRef.current.getBoundingClientRect();
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;

      let top = 0;
      let left = 0;

      if (actualSideToUse === 'bottom') {
        top = triggerRect.bottom + scrollY + gap;
        left = align === 'start' 
          ? triggerRect.left + scrollX
          : align === 'end' 
          ? triggerRect.right + scrollX - contentRect.width 
          : triggerRect.left + scrollX + (triggerRect.width - contentRect.width) / 2;
      } else if (actualSideToUse === 'top') {
        top = triggerRect.top + scrollY - contentRect.height - gap;
        left = align === 'start' 
          ? triggerRect.left + scrollX
          : align === 'end' 
          ? triggerRect.right + scrollX - contentRect.width 
          : triggerRect.left + scrollX + (triggerRect.width - contentRect.width) / 2;
      } else if (actualSideToUse === 'right') {
        left = triggerRect.right + scrollX + gap;
        top = align === 'start' 
          ? triggerRect.top + scrollY
          : align === 'end' 
          ? triggerRect.bottom + scrollY - contentRect.height 
          : triggerRect.top + scrollY + (triggerRect.height - contentRect.height) / 2;
      } else if (actualSideToUse === 'left') {
        left = triggerRect.left + scrollX - contentRect.width - gap;
        top = align === 'start' 
          ? triggerRect.top + scrollY
          : align === 'end' 
          ? triggerRect.bottom + scrollY - contentRect.height 
          : triggerRect.top + scrollY + (triggerRect.height - contentRect.height) / 2;
      }

      // Ensure content stays within viewport bounds
      const maxTop = viewportHeight + scrollY - finalMaxHeight - padding;
      const minTop = padding + scrollY;
      top = Math.max(minTop, Math.min(maxTop, top));

      const maxLeft = viewportWidth + scrollX - contentRect.width - padding;
      const minLeft = padding + scrollX;
      left = Math.max(minLeft, Math.min(maxLeft, left));

      if (contentRef.current) {
        contentRef.current.style.top = `${top}px`;
        contentRef.current.style.left = `${left}px`;
        contentRef.current.style.maxHeight = `${finalMaxHeight}px`;
        contentRef.current.style.maxWidth = `${finalMaxWidth}px`;
      }
    });
  }, [isOpen, side, align]);

  useEffect(() => {
    if (isOpen) {
      // Initial positioning - use a small delay to ensure content is rendered
      const timeoutId = setTimeout(() => {
        updatePosition();
      }, 0);

      // Update on resize and scroll
      window.addEventListener('resize', updatePosition);
      window.addEventListener('scroll', updatePosition, true);

      return () => {
        clearTimeout(timeoutId);
        window.removeEventListener('resize', updatePosition);
        window.removeEventListener('scroll', updatePosition, true);
      };
    }
  }, [isOpen, updatePosition]);

  // Reset side when open changes
  useEffect(() => {
    if (!isOpen) {
      setActualSide(side);
      setMaxHeight(undefined);
      setMaxWidth(undefined);
    }
  }, [isOpen, side]);

  return (
    <div ref={containerRef} className={classNames(styles.root, className)}>
      <div
        data-popover-trigger
        onClick={() => handleOpenChange(!isOpen)}
        className={styles.trigger}
      >
        {trigger}
      </div>
      {isOpen && (
        <div
          ref={contentRef}
          className={classNames(styles.content, contentClassName)}
          data-side={actualSide}
          data-align={align}
          style={{
            maxHeight: maxHeight ? `${maxHeight}px` : undefined,
            maxWidth: maxWidth ? `${maxWidth}px` : undefined,
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}

