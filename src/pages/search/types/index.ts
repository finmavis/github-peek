export type SortAndOrder = {
  sort: SortOption | undefined;
  order: 'asc' | 'desc';
};

export type SortValue =
  | 'best-match'
  | 'most-stars'
  | 'fewest-stars'
  | 'most-forks'
  | 'fewest-forks'
  | 'recently-updated'
  | 'least-recently-updated'
  | 'help-wanted-issues';

export type SortOption = 'stars' | 'forks' | 'help-wanted-issues' | 'updated';

export type SortValueOption = {
  value: SortValue;
  label: string;
  sort?: SortOption;
  order?: 'asc' | 'desc';
};

export type LanguageOption = {
  value: string;
  label: string;
};

export type FilterValues = Omit<SearchFilters, 'query' | 'language'>;

export type SearchFilters = {
  query?: string;
  language?: string;
  starsMin?: string;
  starsMax?: string;
  forksMin?: string;
  forksMax?: string;
  user?: string;
  org?: string;
  created?: string;
  pushed?: string;
  topic?: string;
  license?: string;
  isPublic?: boolean;
  isArchived?: boolean;
  isTemplate?: boolean;
};
