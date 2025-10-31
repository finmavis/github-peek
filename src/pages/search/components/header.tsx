import { Link } from 'react-router';

import { Text } from '@/components/ui';
import ThemeToggle from '@/components/theme-toggle';

import styles from './header.module.css';

export function SearchHeader() {
  return (
    <header className={styles.header}>
      <Link to='/' className={styles.brand}>
        <Text size='5' weight='bold'>
          GitHub Peek
        </Text>
      </Link>
      <ThemeToggle />
    </header>
  );
}

