import type { SortValue, SortAndOrder } from '@/pages/search/types';

export function getSortAndOrder(value: SortValue | undefined): SortAndOrder {
  if (!value) {
    return { sort: undefined, order: 'desc' };
  }

  switch (value) {
    case 'most-stars':
      return { sort: 'stars', order: 'desc' };
    case 'fewest-stars':
      return { sort: 'stars', order: 'asc' };
    case 'most-forks':
      return { sort: 'forks', order: 'desc' };
    case 'fewest-forks':
      return { sort: 'forks', order: 'asc' };
    case 'recently-updated':
      return { sort: 'updated', order: 'desc' };
    case 'least-recently-updated':
      return { sort: 'updated', order: 'asc' };
    case 'help-wanted-issues':
      return { sort: 'help-wanted-issues', order: 'desc' };
    default:
      return { sort: undefined, order: 'desc' };
  }
}
