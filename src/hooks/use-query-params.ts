import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router';

export function useQueryParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const getQuery = useCallback(
    <T extends string | undefined = string>(
      key: string,
      defaultValue?: T
    ): T | string | undefined => {
      const value = searchParams.get(key);

      if (value === null || value === undefined) {
        return defaultValue as T;
      }

      return value as T;
    },
    [searchParams]
  );

  const getAllQueries = useCallback(
    (options?: { excludeKeys?: string[] }) => {
      const result: Record<string, string> = {};

      searchParams.forEach((value, key) => {
        if (options?.excludeKeys?.includes(key)) {
          return;
        }
        result[key] = value;
      });

      return result;
    },
    [searchParams]
  );

  const setQuery = useCallback(
    (
      key: string,
      value: string | number | boolean | null | undefined,
      options?: {
        replace?: boolean;
      }
    ) => {
      setSearchParams((prev) => {
        const newParams = options?.replace
          ? new URLSearchParams()
          : new URLSearchParams(prev);

        if (value !== null && value !== undefined) {
          newParams.set(key, String(value));
        } else {
          newParams.delete(key);
        }

        return newParams;
      });
    },
    [setSearchParams]
  );

  const setQueries = useCallback(
    (
      queries: Record<string, string | number | boolean | null | undefined>,
      options?: {
        replace?: boolean;
      }
    ) => {
      setSearchParams((prev) => {
        const newParams = options?.replace
          ? new URLSearchParams()
          : new URLSearchParams(prev);

        Object.entries(queries).forEach(([key, value]) => {
          if (value !== null && value !== undefined) {
            newParams.set(key, String(value));
          } else {
            newParams.delete(key);
          }
        });

        return newParams;
      });
    },
    [setSearchParams]
  );

  const deleteQuery = useCallback(
    (keys: string | string[]) => {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        const keysArray = Array.isArray(keys) ? keys : [keys];

        keysArray.forEach((key) => {
          newParams.delete(key);
        });

        return newParams;
      });
    },
    [setSearchParams]
  );

  const clearQueries = useCallback(
    (
      keys?: string[],
      options?: {
        preserveKeys?: string[];
      }
    ) => {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams();
        if (keys) {
          prev.forEach((value, key) => {
            const shouldPreserve =
              options?.preserveKeys?.includes(key) || !keys.includes(key);
            if (shouldPreserve) {
              newParams.set(key, value);
            }
          });
        } else {
          if (options?.preserveKeys) {
            prev.forEach((value, key) => {
              if (options.preserveKeys!.includes(key)) {
                newParams.set(key, value);
              }
            });
          }
        }

        return newParams;
      });
    },
    [setSearchParams]
  );

  const hasQuery = useCallback(
    (key: string): boolean => {
      return searchParams.has(key);
    },
    [searchParams]
  );

  const queryString = useMemo(() => searchParams.toString(), [searchParams]);

  return {
    getQuery,
    getAllQueries,
    setQuery,
    setQueries,
    deleteQuery,
    clearQueries,
    hasQuery,
    queryString,
    searchParams,
  };
}

export default useQueryParams;
