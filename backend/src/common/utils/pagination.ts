export interface PaginationQuery {
  page?: string | number;
  limit?: string | number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface ParsedPagination {
  page: number;
  limit: number;
  skip: number;
  take: number;
  orderBy: Record<string, 'asc' | 'desc'>;
}

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 100;

export function parsePagination(
  query: PaginationQuery,
  defaultSortField = 'createdAt',
): ParsedPagination {
  let page = Number(query.page) || DEFAULT_PAGE;
  let limit = Number(query.limit) || DEFAULT_LIMIT;

  if (page < 1) page = DEFAULT_PAGE;
  if (limit < 1) limit = DEFAULT_LIMIT;
  if (limit > MAX_LIMIT) limit = MAX_LIMIT;

  const sortBy = query.sortBy || defaultSortField;
  const sortOrder = query.sortOrder === 'asc' ? 'asc' : 'desc';

  return {
    page,
    limit,
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { [sortBy]: sortOrder },
  };
}
