import { useState } from 'react';
import { TextField, Button, Text, Skeleton } from '@radix-ui/themes';
import { useNavigate, useSearchParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';

import { searchUsers, type SearchUserResponse } from './api/search';
import UserDetail from './components/user-detail';

import styles from './explorer.module.css';

function Explorer() {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('q');
  const searchUsersQuery = useQuery<SearchUserResponse>({
    queryKey: ['searchUsers', searchTerm],
    queryFn: () => searchUsers({ q: searchTerm ?? '', per_page: 5 }),
    enabled: !!searchTerm,
  });
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState(searchTerm ?? '');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    navigate({
      pathname: '/',
      search: `?q=${formData.get('q')}`,
    });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <TextField.Root
          placeholder='Enter username'
          defaultValue={searchTerm ?? ''}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          name='q'
          required
        />
        <Button type='submit' disabled={searchUsersQuery.isLoading || !searchValue}>
          {searchUsersQuery.isLoading ? 'Searching...' : 'Search'}
        </Button>
      </form>
      <div className={styles.result}>
        {searchUsersQuery.isLoading && (
          <>
            <Skeleton width='100%' height='46px' />
            <Skeleton width='100%' height='46px' />
            <Skeleton width='100%' height='46px' />
          </>
        )}
        {searchUsersQuery.isSuccess && (
          <div className={styles.resultContainer}>
            <div className={styles.resultHeader}>
              {searchUsersQuery.data.items.length === 0 && (
                <Text as='p' weight='bold' align='center' color='gray'>
                  No users found for "{searchTerm}"
                </Text>
              )}
              {searchUsersQuery.data.items.length > 0 && (
                <Text as='p'>Showing user for "{searchTerm}"</Text>
              )}
            </div>
            <div className={styles.resultList}>
              {searchUsersQuery.data.items.map((user) => (
                <UserDetail key={user.id} id={user.id} login={user.login} />
              ))}
            </div>
          </div>
        )}
        {searchUsersQuery.isError && (
          <Text as='p' weight='bold' align='center' color='gray'>
            Error searching users
          </Text>
        )}
      </div>
    </div>
  );
}

export default Explorer;
