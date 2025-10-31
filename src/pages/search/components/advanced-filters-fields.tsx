import { TextField, Text, Flex, Select } from '@/components/ui';

import styles from './advanced-filters.module.css';


export type BooleanFilterFieldProps = {
  label: string;
  value: boolean | undefined;
  onChange: (value: boolean | undefined) => void;
  items: Array<{ value: string; label: string }>;
  valueMapper?: (value: boolean | undefined) => string;
};

export function BooleanFilterField({
  label,
  value,
  onChange,
  items,
  valueMapper,
}: BooleanFilterFieldProps) {
  const stringValue = valueMapper
    ? valueMapper(value)
    : value === undefined
      ? ''
      : value
        ? 'true'
        : 'false';

  const handleValueChange = (val: string) => {
    if (val === '') {
      onChange(undefined);
    } else {
      onChange(val === 'true');
    }
  };

  return (
    <div className={styles.filterGroup}>
      <Text size='2' weight='medium' className={styles.label}>
        {label}
      </Text>
      <Select.Root
        value={stringValue}
        onValueChange={handleValueChange}
        items={items}
        placeholder='All'
      />
    </div>
  );
}

export type TextFilterFieldProps = {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'date';
};

export function TextFilterField({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
}: TextFilterFieldProps) {
  return (
    <div className={styles.filterGroup}>
      <Text size='2' weight='medium' className={styles.label}>
        {label}
      </Text>
      <TextField
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        size='2'
      />
    </div>
  );
}

export type RangeFilterProps = {
  label: string;
  minValue: string;
  maxValue: string;
  onMinChange: (value: string) => void;
  onMaxChange: (value: string) => void;
};

export function RangeFilterField({
  label,
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
}: RangeFilterProps) {
  return (
    <div className={styles.filterGroup}>
      <Text size='2' weight='medium' className={styles.label}>
        {label}
      </Text>
      <Flex gap='2'>
        <TextField
          placeholder='Min'
          value={minValue}
          onChange={(e) => onMinChange(e.target.value)}
          size='2'
        />
        <TextField
          placeholder='Max'
          value={maxValue}
          onChange={(e) => onMaxChange(e.target.value)}
          size='2'
        />
      </Flex>
    </div>
  );
}

