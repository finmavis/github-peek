import { useState, useRef, useEffect, type ReactNode } from 'react';
import { CaretDownIcon } from '@phosphor-icons/react';
import classNames from 'classnames';

import styles from './select.module.css';

export type SelectItem = {
  value: string;
  label: string;
};

export type SelectProps = {
  value?: string;
  onValueChange?: (value: string) => void;
  items: SelectItem[];
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  children?: ReactNode;
};

export function SelectRoot({
  value,
  onValueChange,
  items,
  placeholder = 'Select...',
  className,
  disabled,
  children,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<SelectItem | null>(
    () => items.find((item) => item.value === value) || null
  );
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const item = items.find((item) => item.value === value);
    setSelectedItem(item || null);
  }, [value, items]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen]);

  const handleSelect = (item: SelectItem) => {
    setSelectedItem(item);
    onValueChange?.(item.value);
    setIsOpen(false);
  };

  if (children) {
    return <div className={classNames(styles.root, className)}>{children}</div>;
  }

  return (
    <div ref={containerRef} className={classNames(styles.root, className)}>
      <button
        type='button'
        className={classNames(
          styles.trigger,
          disabled && styles.disabled
        )}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
      >
        <span>{selectedItem?.label || placeholder}</span>
        <CaretDownIcon
          size={16}
          className={classNames(styles.icon, isOpen && styles.iconOpen)}
        />
      </button>
      {isOpen && (
        <div className={styles.content}>
          {items.map((item) => (
            <button
              key={item.value}
              type='button'
              className={classNames(
                styles.item,
                selectedItem?.value === item.value && styles.itemSelected
              )}
              onClick={() => handleSelect(item)}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function SelectTrigger({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={classNames(styles.trigger, className)}
      type='button'
    >
      {children}
      <CaretDownIcon size={16} className={styles.icon} />
    </button>
  );
}

export function SelectContent({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={classNames(styles.content, className)}>{children}</div>;
}

export function SelectItem({
  children,
  value,
  className,
  onClick,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  value: string;
}) {
  return (
    <button
      {...props}
      type='button'
      className={classNames(styles.item, className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export const Select = {
  Root: SelectRoot,
  Trigger: SelectTrigger,
  Content: SelectContent,
  Item: SelectItem,
};


