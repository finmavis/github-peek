import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import { useQueryParams } from '@/hooks/use-query-params';
import { parseBoolean } from '@/utils/query-parser';
import type { SortValue } from '@/pages/search/types';

import SearchInput from './components/search-input';
import FilterBar from './components/filter-bar';
import ResultsList from './components/results-list';
import Pagination from './components/pagination';
import { SearchHeader } from './components/header';
import {
  searchRepositories,
  type SearchRepositoriesResponse,
} from './api/search-repositories';
import { SEARCH_PARAMS } from './constants/params';
import { buildSearchQuery } from './utils/filter';
import { getSortAndOrder } from './utils/sort';
import { parsePage, calculateTotalPages } from './utils/pagination';
import { PER_PAGE, MAX_RESULTS } from './constants/pagination';

import styles from './search.module.css';

function Search() {
  const { getQuery, setQueries } = useQueryParams();

  const query = getQuery<string>(SEARCH_PARAMS.QUERY, '');
  const language = getQuery<string>(SEARCH_PARAMS.LANGUAGE);
  const sortValueParam = getQuery<string>(SEARCH_PARAMS.SORT_VALUE);
  const sortValue = sortValueParam as SortValue | undefined;

  const { sort: sortBy, order } = getSortAndOrder(sortValue);

  const pageParam = getQuery<string>(SEARCH_PARAMS.PAGE, '1');
  const currentPage = parsePage(pageParam);
  const starsMin = getQuery<string>(SEARCH_PARAMS.STARS_MIN);
  const starsMax = getQuery<string>(SEARCH_PARAMS.STARS_MAX);
  const forksMin = getQuery<string>(SEARCH_PARAMS.FORKS_MIN);
  const forksMax = getQuery<string>(SEARCH_PARAMS.FORKS_MAX);
  const user = getQuery<string>(SEARCH_PARAMS.USER);
  const org = getQuery<string>(SEARCH_PARAMS.ORG);
  const created = getQuery<string>(SEARCH_PARAMS.CREATED);
  const pushed = getQuery<string>(SEARCH_PARAMS.PUSHED);
  const topic = getQuery<string>(SEARCH_PARAMS.TOPIC);
  const license = getQuery<string>(SEARCH_PARAMS.LICENSE);
  const isPublicValue = parseBoolean(getQuery<string>(SEARCH_PARAMS.IS_PUBLIC));
  const isArchivedValue = parseBoolean(getQuery<string>(SEARCH_PARAMS.IS_ARCHIVED));
  const isTemplateValue = parseBoolean(getQuery<string>(SEARCH_PARAMS.IS_TEMPLATE));

  const searchQuery = useMemo(() => {
    return buildSearchQuery({
      query,
      language,
      starsMin,
      starsMax,
      forksMin,
      forksMax,
      user,
      org,
      created,
      pushed,
      topic,
      license,
      isPublic: isPublicValue,
      isArchived: isArchivedValue,
      isTemplate: isTemplateValue,
    });
  }, [
    query,
    language,
    starsMin,
    starsMax,
    forksMin,
    forksMax,
    user,
    org,
    created,
    pushed,
    topic,
    license,
    isPublicValue,
    isArchivedValue,
    isTemplateValue,
  ]);

  const searchRepositoriesQuery = useQuery<SearchRepositoriesResponse>({
    queryKey: ['searchRepositories', searchQuery, sortBy, order, currentPage],
    queryFn: () =>
      searchRepositories({
        q: searchQuery,
        sort: sortBy,
        order,
        per_page: PER_PAGE,
        page: currentPage,
      }),
    enabled: !!searchQuery && searchQuery.trim().length > 0,
  });

  const repositories = searchRepositoriesQuery.data?.items || [];
  const error = searchRepositoriesQuery.error as Error | undefined;

  const totalCount = searchRepositoriesQuery.data?.total_count || 0;
  const totalPages = calculateTotalPages({
    totalCount,
    perPage: PER_PAGE,
    maxResults: MAX_RESULTS,
  });

  const handleSearch = (searchValue: string) => {
    if (!searchValue || !searchValue.trim()) {
      return;
    }

    setQueries({
      [SEARCH_PARAMS.QUERY]: searchValue.trim(),
      [SEARCH_PARAMS.PAGE]: undefined,
    });
  };

  const handleLanguageChange = (newLanguage: string | undefined) => {
    setQueries({
      [SEARCH_PARAMS.LANGUAGE]: newLanguage,
      [SEARCH_PARAMS.PAGE]: undefined,
    });
  };

  const handleSortValueChange = (value: string | undefined) => {
    setQueries({
      [SEARCH_PARAMS.SORT_VALUE]: value,
      [SEARCH_PARAMS.PAGE]: undefined,
    });
  };

  const handlePreviousPage = () => {
    const prevPage = currentPage - 1;
    if (prevPage < 1) {
      return;
    }
    setQueries({
      [SEARCH_PARAMS.PAGE]: prevPage === 1 ? undefined : prevPage,
    });
  };

  const handleNextPage = () => {
    const nextPage = currentPage + 1;
    if (nextPage > totalPages) {
      return;
    }
    setQueries({
      [SEARCH_PARAMS.PAGE]: nextPage,
    });
  };

  return (
    <>
      <SearchHeader />
      <div className={styles.container}>
        <SearchInput value={query} onSubmit={handleSearch} />
        {query && (
          <>
            <FilterBar
              language={language}
              sortValue={sortValue}
              onLanguageChange={handleLanguageChange}
              onSortValueChange={handleSortValueChange}
            />
            <ResultsList
              query={query}
              repositories={repositories}
              isLoading={searchRepositoriesQuery.isLoading}
              isEmpty={
                !searchRepositoriesQuery.isLoading &&
                searchRepositoriesQuery.isSuccess &&
                repositories.length === 0
              }
              error={error}
              onRetry={() => searchRepositoriesQuery.refetch()}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPrevious={handlePreviousPage}
              onNext={handleNextPage}
              isLoading={searchRepositoriesQuery.isFetching}
            />
          </>
        )}
      </div>
    </>
  );
}

export default Search;

