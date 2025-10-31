import {
  Card,
  Text,
  Flex,
  Badge,
  Button,
} from '@/components/ui';
import { GitForkIcon, StarIcon, ArrowSquareOutIcon } from '@phosphor-icons/react';
import { Link, useNavigate } from 'react-router';

import { formatDate } from '@/lib/date';
import { formatCount } from '@/utils/formatter';
import type { Repository } from '@/pages/search/api/search-repositories';

import styles from './repository-card.module.css';

export type RepositoryCardProps = {
  repository: Repository;
};

function RepositoryCard({ repository }: RepositoryCardProps) {
  const navigate = useNavigate();

  const handleOpenRepository = () => {
    navigate(repository.html_url);
  };

  return (
    <Card>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <Link to={repository.html_url} target='_blank' rel="noopener noreferrer" className={styles.repository}>
            <Text as='h3' size='5' weight='bold'>
              {repository.name}
            </Text>
          </Link>
          <Link to={repository.owner.html_url} target='_blank' rel="noopener noreferrer" className={styles.owner}>
            <Text size='2' color='secondary'>
              {repository.owner.login}
            </Text>
          </Link>
        </div>
        <Button
          variant='outline'
          size='2'
          onClick={handleOpenRepository}
          aria-label={`Open ${repository.name} repository on GitHub`}
        >
          <ArrowSquareOutIcon size={18} />
        </Button>
      </div>
      {repository.description && (
        <Text size='2' color='secondary'>
          {repository.description}
        </Text>
      )}
      <Flex gap='3' align='center' className={styles.meta}>
        {repository.language && (
          <Badge variant='outline' color="blue" className={styles.languageBadge}>
            {repository.language}
          </Badge>
        )}
        <Flex gap='1' align='center'>
          <StarIcon size={16} weight='fill' />
          <Text size='2' color='secondary'>
            {formatCount(repository.stargazers_count)}
          </Text>
        </Flex>
        <Flex gap='1' align='center'>
          <GitForkIcon size={16} />
          <Text size='2' color='secondary'>
            {formatCount(repository.forks_count)}
          </Text>
        </Flex>
        <Text size='2' color='secondary' className={styles.updated}>
          Updated {formatDate(repository.updated_at)}
        </Text>
      </Flex>
    </Card>
  );
}

export default RepositoryCard;

