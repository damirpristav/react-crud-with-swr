import { useState } from 'react';

import { useContactsSwr } from './useContactsSwr';
import { useDebounce } from './useDebounce';
import { usePagination } from './usePagination';

export const useContacts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [birthDate, setBirthDate] = useState<Date | undefined>();
  const [birthDateBefore, setBirthDateBefore] = useState<Date | undefined>();
  const [sortBy, setSortBy] = useState('');
  const [sortDirection, setSortDirection] = useState<'desc' | 'asc'>('asc');
  const { debouncedValue: debouncedSearch } = useDebounce(search, {
    callback: () => {
      setCurrentPage(1);
    },
  });

  const { data, isLoading, mutate } = useContactsSwr({
    page: currentPage,
    search: debouncedSearch,
    birth_date: birthDate,
    birth_date_before: birthDateBefore,
    sort_by: sortBy,
    sort_direction: sortDirection,
  });

  const { pages } = usePagination({ total: data?.last_page, current: currentPage });

  const goToPrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const onSort = (columnId: string) => {
    setSortBy(columnId);
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  const clearFilters = () => {
    setSearch('');
    setCurrentPage(1);
    setBirthDate(undefined);
    setBirthDateBefore(undefined);
    setSortBy('');
    setSortDirection('asc');
  };

  return {
    data,
    isLoading,
    currentPage,
    search,
    debouncedSearch,
    birthDate,
    birthDateBefore,
    sortBy,
    sortDirection,
    pages,
    setCurrentPage,
    setBirthDate,
    setBirthDateBefore,
    setSearch,
    mutate,
    onSort,
    clearFilters,
    goToNextPage,
    goToPrevPage,
    onPageChange,
  };
};
