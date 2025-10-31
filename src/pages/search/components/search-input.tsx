import { useState } from 'react';
import { MagnifyingGlassIcon } from '@phosphor-icons/react';

import { TextField, Button } from '@/components/ui';

import styles from './search-input.module.css';

export type SearchInputProps = {
  value?: string;
  placeholder?: string;
  onSubmit?: (value: string) => void;
};

function SearchInput({
  value,
  placeholder = 'Search repositories...',
  onSubmit,
}: SearchInputProps) {
  const [localValue, setLocalValue] = useState(value || '');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchValue = localValue.trim();
    if (searchValue) {
      onSubmit?.(searchValue);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.searchContainer}>
        <TextField
          name='search'
          placeholder={placeholder}
          value={localValue}
          onChange={handleChange}
          className={styles.input}
          startDecorator={<MagnifyingGlassIcon size={16} />}
          size='3'
        />
        <Button
          type='submit'
          variant='outline'
          size='3'
          className={styles.searchButton}
          aria-label='Search'
        >
          Search
        </Button>
      </div>
    </form>
  );
}

export default SearchInput;

