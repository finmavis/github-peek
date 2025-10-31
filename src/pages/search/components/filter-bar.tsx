import { useState, useMemo } from 'react';
import { FunnelIcon } from '@phosphor-icons/react';

import { Select, Popover, Button } from '@/components/ui';
import { useQueryParams } from '@/hooks/use-query-params';
import type { SortValue } from '@/pages/search/types';
import { LANGUAGES, SORT_VALUE_OPTIONS } from '@/pages/search/constants/filter';
import { ADVANCED_FILTER_PARAMS } from '@/pages/search/constants/params';

import styles from './filter-bar.module.css';
import AdvancedFilters from './advanced-filters';

export type FilterBarProps = {
  language?: string;
  sortValue?: SortValue | undefined;
  onLanguageChange?: (language: string | undefined) => void;
  onSortValueChange?: (value: SortValue | undefined) => void;
};

function FilterBar({
  language,
  sortValue,
  onLanguageChange,
  onSortValueChange,
}: FilterBarProps) {
  const [isAdvancedFiltersOpen, setIsAdvancedFiltersOpen] = useState(false);
  const { hasQuery } = useQueryParams();

  const hasActiveAdvancedFilters = useMemo(
    () => ADVANCED_FILTER_PARAMS.some((param) => hasQuery(param)),
    [hasQuery]
  );

  return (
    <div className={styles.container}>
      <Select.Root
        value={language || ''}
        onValueChange={(value) => onLanguageChange?.(value === 'All' ? undefined : value)}
        items={LANGUAGES}
        placeholder='Language'
        className={styles.filterButton}
      />
      <Select.Root
        value={sortValue || 'best-match'}
        onValueChange={(value) => {
          onSortValueChange?.(value as SortValue);
        }}
        items={SORT_VALUE_OPTIONS}
        placeholder='Sort by: Best match'
        className={styles.filterButton}
      />
      <Popover
        open={isAdvancedFiltersOpen}
        onOpenChange={setIsAdvancedFiltersOpen}
        trigger={
          <Button
            variant='outline'
            size='3'
            className={styles.advancedFilterButton}
          >
            <FunnelIcon size={16} />
            Advanced Filters
            {hasActiveAdvancedFilters && (
              <span className={styles.badge} />
            )}
          </Button>
        }
        side='bottom'
        align='start'
        contentClassName={styles.popoverContent}
      >
        <AdvancedFilters
          isOpen={isAdvancedFiltersOpen}
          onApply={() => {
            setIsAdvancedFiltersOpen(false);
          }}
        />
      </Popover>
    </div>
  );
}

export default FilterBar;
