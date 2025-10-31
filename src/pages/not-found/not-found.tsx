import { useNavigate } from 'react-router';
import { Button, Text } from '@/components/ui';

import styles from './not-found.module.css';
import ThemeToggle from '@/components/theme-toggle';

function NotFound() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.themeToggle}>
        <ThemeToggle />
      </div>
      <div className={styles.content}>
        <Text as='span' size='6' weight='bold'>
          404
        </Text>
        <Text as='h1' size='8' weight='bold'>
          Uh no, look like you got lost?
        </Text>
        <Text as='p' size='4'>
          We couldn't find the page you are looking for, maybe going home will help?
        </Text>
        <Button variant='solid' size='2' onClick={handleGoHome}>
          Take me home
        </Button>
      </div>
    </div>
  );
}

export default NotFound;

