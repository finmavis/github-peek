import type { SearchFilters } from '@/pages/search/types';

export function buildSearchQuery(filters: SearchFilters): string {
  const parts: string[] = [];

  if (filters.query) {
    parts.push(filters.query);
  }

  if (filters.language && filters.language !== 'All') {
    parts.push(`language:${filters.language}`);
  }

  if (filters.starsMin && filters.starsMax) {
    parts.push(`stars:${filters.starsMin}..${filters.starsMax}`);
  } else if (filters.starsMin) {
    parts.push(`stars:>=${filters.starsMin}`);
  } else if (filters.starsMax) {
    parts.push(`stars:<=${filters.starsMax}`);
  }

  if (filters.forksMin && filters.forksMax) {
    parts.push(`forks:${filters.forksMin}..${filters.forksMax}`);
  } else if (filters.forksMin) {
    parts.push(`forks:>=${filters.forksMin}`);
  } else if (filters.forksMax) {
    parts.push(`forks:<=${filters.forksMax}`);
  }

  if (filters.user) {
    parts.push(`user:${filters.user}`);
  }

  if (filters.org) {
    parts.push(`org:${filters.org}`);
  }

  if (filters.created) {
    parts.push(`created:${filters.created}`);
  }

  if (filters.pushed) {
    parts.push(`pushed:${filters.pushed}`);
  }

  if (filters.topic) {
    parts.push(`topic:${filters.topic}`);
  }

  if (filters.license) {
    parts.push(`license:${filters.license}`);
  }

  if (filters.isPublic === true) {
    parts.push('is:public');
  } else if (filters.isPublic === false) {
    parts.push('is:private');
  }

  if (filters.isArchived !== undefined) {
    parts.push(`archived:${filters.isArchived}`);
  }

  if (filters.isTemplate !== undefined) {
    parts.push(`template:${filters.isTemplate}`);
  }

  const finalQuery = parts.join(' ').trim();

  if (!filters.query && finalQuery) {
    return `* ${finalQuery}`;
  }

  return finalQuery;
}
