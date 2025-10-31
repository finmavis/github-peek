import { Button, Text } from '@/components/ui';
import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react';

import styles from './pagination.module.css';

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
  isLoading?: boolean;
};

function Pagination({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
  isLoading = false,
}: PaginationProps) {
  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={styles.container}>
      <Button
        variant='outline'
        onClick={onPrevious}
        disabled={!hasPrevious || isLoading}
        size='3'
      >
        <CaretLeftIcon size={16} />
        Prev
      </Button>
      <Text size='2'>
        Page {currentPage} of {totalPages}
      </Text>
      <Button
        variant='outline'
        onClick={onNext}
        disabled={!hasNext || isLoading}
        size='3'
      >
        Next
        <CaretRightIcon size={16} />
      </Button>
    </div>
  );
}

export default Pagination;

