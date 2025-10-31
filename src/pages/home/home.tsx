import { useNavigate } from 'react-router';
import { Text } from '@/components/ui';

import SearchForm from './components/search-form';

import styles from './home.module.css';
import ThemeToggle from '@/components/theme-toggle';

function Home() {
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.themeToggle}>
        <ThemeToggle />
      </div>
      <div className={styles.content}>
        <Text as='h1' size='8' weight='bold' color="default">
          GitHub Peek
        </Text>
        <SearchForm onSubmit={handleSearch} />
      </div>
    </div>
  );
}

export default Home;

