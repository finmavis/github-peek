export function parsePage(
  pageParam: string | undefined,
  defaultPage: number = 1
): number {
  if (!pageParam) {
    return defaultPage;
  }
  const parsed = Number.parseInt(pageParam);
  return Number.isNaN(parsed) ? defaultPage : parsed;
}

export type PaginationConfig = {
  totalCount: number;
  perPage: number;
  maxResults: number;
};

export function calculateTotalPages(config: PaginationConfig): number {
  const { totalCount, perPage, maxResults } = config;
  const effectiveTotalCount = Math.min(totalCount, maxResults);
  const calculatedTotalPages = Math.ceil(effectiveTotalCount / perPage);
  const maxPages = Math.ceil(maxResults / perPage);
  return Math.min(calculatedTotalPages, maxPages);
}
