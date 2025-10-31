import { useState, useEffect, useMemo } from 'react';
import { XIcon } from '@phosphor-icons/react';

import type { FilterValues } from '@/pages/search/types';
import { Select, Text, Button } from '@/components/ui';
import { useQueryParams } from '@/hooks/use-query-params';
import { parseBoolean } from '@/utils/query-parser';
import { SEARCH_PARAMS } from '@/pages/search/constants/params';
import { ADVANCED_FILTER_PARAMS } from '@/pages/search/constants/params';
import {
  INITIAL_FILTER_VALUES, LICENSES,
  VISIBILITY_OPTIONS,
  ARCHIVED_OPTIONS,
  TEMPLATE_OPTIONS,
} from '@/pages/search/constants/filter';

import { TextFilterField, RangeFilterField, BooleanFilterField } from './advanced-filters-fields';

import styles from './advanced-filters.module.css';

export type AdvancedFiltersProps = {
  onApply?: () => void;
  isOpen?: boolean;
};

function AdvancedFilters({ onApply, isOpen }: AdvancedFiltersProps) {
  const { getQuery, setQueries, deleteQuery } = useQueryParams();

  // Get current values from query params
  const currentValues = useMemo<FilterValues>(
    () => ({
      starsMin: getQuery(SEARCH_PARAMS.STARS_MIN) || '',
      starsMax: getQuery(SEARCH_PARAMS.STARS_MAX) || '',
      forksMin: getQuery(SEARCH_PARAMS.FORKS_MIN) || '',
      forksMax: getQuery(SEARCH_PARAMS.FORKS_MAX) || '',
      user: getQuery(SEARCH_PARAMS.USER) || '',
      org: getQuery(SEARCH_PARAMS.ORG) || '',
      created: getQuery(SEARCH_PARAMS.CREATED) || '',
      pushed: getQuery(SEARCH_PARAMS.PUSHED) || '',
      topic: getQuery(SEARCH_PARAMS.TOPIC) || '',
      license: getQuery(SEARCH_PARAMS.LICENSE) || '',
      isPublic: parseBoolean(getQuery(SEARCH_PARAMS.IS_PUBLIC)),
      isArchived: parseBoolean(getQuery(SEARCH_PARAMS.IS_ARCHIVED)),
      isTemplate: parseBoolean(getQuery(SEARCH_PARAMS.IS_TEMPLATE)),
    }),
    [getQuery]
  );

  const [filterValues, setFilterValues] = useState<FilterValues>(currentValues);

  useEffect(() => {
    if (isOpen) {
      setFilterValues(currentValues);
    }
  }, [isOpen, currentValues]);

  const updateFilterValue = <K extends keyof FilterValues>(
    key: K,
    value: FilterValues[K]
  ) => {
    setFilterValues((prev) => ({ ...prev, [key]: value }));
  };

  const hasActiveFilters = useMemo(
    () =>
      Object.values(filterValues).some(
        (value) =>
          value !== undefined &&
          value !== null &&
          value !== '' &&
          String(value).trim() !== ''
      ),
    [filterValues]
  );

  const hasChanged = useMemo(
    () =>
      filterValues.starsMin !== currentValues.starsMin ||
      filterValues.starsMax !== currentValues.starsMax ||
      filterValues.forksMin !== currentValues.forksMin ||
      filterValues.forksMax !== currentValues.forksMax ||
      filterValues.user !== currentValues.user ||
      filterValues.org !== currentValues.org ||
      filterValues.created !== currentValues.created ||
      filterValues.pushed !== currentValues.pushed ||
      filterValues.topic !== currentValues.topic ||
      filterValues.license !== currentValues.license ||
      filterValues.isPublic !== currentValues.isPublic ||
      filterValues.isArchived !== currentValues.isArchived ||
      filterValues.isTemplate !== currentValues.isTemplate,
    [filterValues, currentValues]
  );

  const handleApply = () => {
    setQueries({
      [SEARCH_PARAMS.PAGE]: undefined,
      [SEARCH_PARAMS.STARS_MIN]: filterValues.starsMin?.trim() || undefined,
      [SEARCH_PARAMS.STARS_MAX]: filterValues.starsMax?.trim() || undefined,
      [SEARCH_PARAMS.FORKS_MIN]: filterValues.forksMin?.trim() || undefined,
      [SEARCH_PARAMS.FORKS_MAX]: filterValues.forksMax?.trim() || undefined,
      [SEARCH_PARAMS.USER]: filterValues.user?.trim() || undefined,
      [SEARCH_PARAMS.ORG]: filterValues.org?.trim() || undefined,
      [SEARCH_PARAMS.CREATED]: filterValues.created?.trim() || undefined,
      [SEARCH_PARAMS.PUSHED]: filterValues.pushed?.trim() || undefined,
      [SEARCH_PARAMS.TOPIC]: filterValues.topic?.trim() || undefined,
      [SEARCH_PARAMS.LICENSE]: filterValues.license?.trim() || undefined,
      [SEARCH_PARAMS.IS_PUBLIC]:
        filterValues.isPublic !== undefined ? filterValues.isPublic : undefined,
      [SEARCH_PARAMS.IS_ARCHIVED]:
        filterValues.isArchived !== undefined
          ? filterValues.isArchived
          : undefined,
      [SEARCH_PARAMS.IS_TEMPLATE]:
        filterValues.isTemplate !== undefined
          ? filterValues.isTemplate
          : undefined,
    });
    onApply?.();
  };

  const handleClear = () => {
    deleteQuery(ADVANCED_FILTER_PARAMS);
    setFilterValues(INITIAL_FILTER_VALUES);
    onApply?.();
  };

  return (
    <div className={styles.popoverContent}>
      <div className={styles.header}>
        <Text size='3' weight='medium'>
          Advanced Filters
        </Text>
        <div className={styles.headerActions}>
          {hasActiveFilters && (
            <Button
              variant='ghost'
              size='2'
              onClick={handleClear}
              className={styles.clearButton}
            >
              <XIcon size={16} />
              Clear all
            </Button>
          )}
          <Button
            variant='solid'
            size='2'
            onClick={handleApply}
            disabled={!hasChanged}
          >
            Apply
          </Button>
        </div>
      </div>
      <div className={styles.filtersGrid}>
        <RangeFilterField
          label='Stars'
          minValue={filterValues.starsMin || ''}
          maxValue={filterValues.starsMax || ''}
          onMinChange={(value) => updateFilterValue('starsMin', value)}
          onMaxChange={(value) => updateFilterValue('starsMax', value)}
        />
        <RangeFilterField
          label='Forks'
          minValue={filterValues.forksMin || ''}
          maxValue={filterValues.forksMax || ''}
          onMinChange={(value) => updateFilterValue('forksMin', value)}
          onMaxChange={(value) => updateFilterValue('forksMax', value)}
        />
        <TextFilterField
          label='User'
          placeholder='username'
          value={filterValues.user || ''}
          onChange={(value) => updateFilterValue('user', value)}
        />
        <TextFilterField
          label='Organization'
          placeholder='org-name'
          value={filterValues.org || ''}
          onChange={(value) => updateFilterValue('org', value)}
        />
        <TextFilterField
          label='Created Date'
          type='date'
          value={filterValues.created || ''}
          onChange={(value) => updateFilterValue('created', value)}
        />
        <TextFilterField
          label='Last Updated'
          type='date'
          value={filterValues.pushed || ''}
          onChange={(value) => updateFilterValue('pushed', value)}
        />
        <TextFilterField
          label='Topic'
          placeholder='topic-name'
          value={filterValues.topic || ''}
          onChange={(value) => updateFilterValue('topic', value)}
        />
        <div className={styles.filterGroup}>
          <Text size='2' weight='medium' className={styles.label}>
            License
          </Text>
          <Select.Root
            value={filterValues.license || ''}
            onValueChange={(value) => updateFilterValue('license', value)}
            items={LICENSES}
            placeholder='Select license'
          />
        </div>
        <BooleanFilterField
          label='Visibility'
          value={filterValues.isPublic}
          onChange={(value) => updateFilterValue('isPublic', value)}
          items={VISIBILITY_OPTIONS}
          valueMapper={(value) =>
            value === undefined ? '' : value ? 'public' : 'private'
          }
        />
        <BooleanFilterField
          label='Archived'
          value={filterValues.isArchived}
          onChange={(value) => updateFilterValue('isArchived', value)}
          items={ARCHIVED_OPTIONS}
        />
        <BooleanFilterField
          label='Template'
          value={filterValues.isTemplate}
          onChange={(value) => updateFilterValue('isTemplate', value)}
          items={TEMPLATE_OPTIONS}
        />
      </div>
    </div>
  );
}

export default AdvancedFilters;
