import { Button, TextField } from '@/components/ui';
import { MagnifyingGlassIcon } from '@phosphor-icons/react';

import styles from './search-form.module.css';

export type SearchFormProps = {
  onSubmit?: (value: string) => void;
};

function SearchForm({ onSubmit }: SearchFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const searchValue = (formData.get('search') as string) || '';
    if (searchValue.trim()) {
      onSubmit?.(searchValue.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <TextField
        name='search'
        placeholder='Search repositories...'
        className={styles.input}
        startDecorator={<MagnifyingGlassIcon size={16} />}
        size='3'
        autoFocus
      />
      <div className={styles.buttonContainer}>
        <Button type='submit' variant='outline' size='3'>
          Search
        </Button>
      </div>
    </form>
  );
}

export default SearchForm;

