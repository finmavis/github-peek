import type {
  LanguageOption,
  SortValueOption,
  FilterValues,
} from '@/pages/search/types';

export const LANGUAGES: LanguageOption[] = [
  { value: 'All', label: 'All Languages' },
  { value: 'JavaScript', label: 'JavaScript' },
  { value: 'TypeScript', label: 'TypeScript' },
  { value: 'Python', label: 'Python' },
  { value: 'Java', label: 'Java' },
  { value: 'Go', label: 'Go' },
  { value: 'Rust', label: 'Rust' },
  { value: 'Ruby', label: 'Ruby' },
  { value: 'PHP', label: 'PHP' },
  { value: 'C++', label: 'C++' },
  { value: 'C', label: 'C' },
  { value: 'Swift', label: 'Swift' },
  { value: 'Kotlin', label: 'Kotlin' },
  { value: 'React', label: 'React' },
];

export const SORT_VALUE_OPTIONS: SortValueOption[] = [
  { value: 'best-match', label: 'Best match' },
  { value: 'most-stars', label: 'Most stars', sort: 'stars', order: 'desc' },
  { value: 'fewest-stars', label: 'Fewest stars', sort: 'stars', order: 'asc' },
  { value: 'most-forks', label: 'Most forks', sort: 'forks', order: 'desc' },
  { value: 'fewest-forks', label: 'Fewest forks', sort: 'forks', order: 'asc' },
  {
    value: 'recently-updated',
    label: 'Recently updated',
    sort: 'updated',
    order: 'desc',
  },
  {
    value: 'least-recently-updated',
    label: 'Least recently updated',
    sort: 'updated',
    order: 'asc',
  },
  {
    value: 'help-wanted-issues',
    label: 'Most help wanted issues',
    sort: 'help-wanted-issues',
    order: 'desc',
  },
];

export const INITIAL_FILTER_VALUES: FilterValues = {
  starsMin: '',
  starsMax: '',
  forksMin: '',
  forksMax: '',
  user: '',
  org: '',
  created: '',
  pushed: '',
  topic: '',
  license: '',
  isPublic: undefined,
  isArchived: undefined,
  isTemplate: undefined,
};

export const LICENSES = [
  { value: '', label: 'All Licenses' },
  { value: 'mit', label: 'MIT' },
  { value: 'apache-2.0', label: 'Apache License 2.0' },
  { value: 'gpl-3.0', label: 'GPL-3.0' },
  { value: 'gpl-2.0', label: 'GPL-2.0' },
  { value: 'bsd-3-clause', label: 'BSD-3-Clause' },
  { value: 'bsd-2-clause', label: 'BSD-2-Clause' },
  { value: 'lgpl-3.0', label: 'LGPL-3.0' },
  { value: 'agpl-3.0', label: 'AGPL-3.0' },
  { value: 'mpl-2.0', label: 'Mozilla Public License 2.0' },
  { value: 'unlicense', label: 'Unlicense' },
];

export const BOOLEAN_OPTIONS = [
  { value: '', label: 'All' },
  { value: 'true', label: 'Yes' },
  { value: 'false', label: 'No' },
];

export const VISIBILITY_OPTIONS = [
  { value: '', label: 'All' },
  { value: 'public', label: 'Public' },
  { value: 'private', label: 'Private' },
];

export const ARCHIVED_OPTIONS = [
  { value: '', label: 'All' },
  { value: 'false', label: 'Not Archived' },
  { value: 'true', label: 'Archived' },
];

export const TEMPLATE_OPTIONS = [
  { value: '', label: 'All' },
  { value: 'false', label: 'Not Template' },
  { value: 'true', label: 'Template' },
];
