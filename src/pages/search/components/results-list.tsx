import { Link, useNavigate } from 'react-router';

import { Button, Text, Skeleton } from '@/components/ui';
import type { Repository } from '@/pages/search/api/search-repositories';

import RepositoryCard from './repository-card';
import styles from './results-list.module.css';

export type ResultsListProps = {
  query?: string;
  repositories?: Repository[];
  isLoading?: boolean;
  isEmpty?: boolean;
  error?: Error;
  onRetry?: () => void;
};

function ResultsList({
  query,
  repositories = [],
  isLoading,
  isEmpty,
  error,
  onRetry,
}: ResultsListProps) {
  const navigate = useNavigate();
  if (isLoading) {
    return (
      <div className={styles.container}>
        <Skeleton width='100%' height='8rem' />
        <Skeleton width='100%' height='8rem' />
        <Skeleton width='100%' height='8rem' />
      </div>
    );
  }

  if (isEmpty && !error) {
    return (
      <div className={styles.container}>
        <Text as='p' weight='bold' align='center' color='secondary'>
          No repositories found {query ? `for "${query}"` : ''}
        </Text>
      </div>
    );
  }

  if (!repositories.length && !error) {
    return null;
  }

  return (
    <div className={styles.container}>
      {query && (
        <Text as='p' weight='bold' size='4' className={styles.header}>
          Showing results for: "{query}"
        </Text>
      )}
      {error && (
        <div className={styles.errorBanner}>
          <Text as='p' size='2' weight='medium'>
            {error?.message || 'An error occurred while fetching repositories'}
          </Text>
          {'documentationUrl' in error && (
            <Text as='p' size='2' color='secondary'>
              <Link
                to={error.documentationUrl as string}
                target='_blank'
                rel='noopener noreferrer'
              >
                Learn more
              </Link>
            </Text>
          )}
          <div className={styles.errorActions}>
            {onRetry && (
              <Button variant='outline' size='2' onClick={onRetry} disabled={isLoading}>
                Retry
              </Button>
            )}
            <Button variant='outline' size='2' onClick={() => navigate('/')}>
              Home
            </Button>
          </div>
        </div>
      )}
      {repositories.length > 0 && (
        <div className={styles.list}>
          {repositories.map((repo) => (
            <RepositoryCard key={repo.id} repository={repo} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ResultsList;

