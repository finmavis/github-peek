import { useState } from 'react';
import { Card, Skeleton, Text, ScrollArea, Flex } from '@radix-ui/themes';
import {
  CollapsibleRoot,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@/components/collapsible';
import { useQuery } from '@tanstack/react-query';
import { CaretDownIcon, StarIcon } from '@phosphor-icons/react';

import {
  getUserRepos,
  type GetUserReposResponse,
} from '@/features/explorer/api/users';

import styles from './user-detail.module.css';

export type UserDetailProps = {
  id: number;
  login: string;
};

function UserDetail({ login }: UserDetailProps) {
  const [isOpen, setOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
  };

  const reposQuery = useQuery<GetUserReposResponse>({
    queryKey: ['user-repos', login],
    queryFn: () => getUserRepos(login),
    enabled: isOpen,
  });

  return (
    <CollapsibleRoot open={isOpen} onOpenChange={handleOpenChange}>
      <CollapsibleTrigger asChild>
        <Card className={styles.trigger}>
          <Flex align='center' gap='2' justify='between'>
            <Text as='p'>{login}</Text>
            <CaretDownIcon
              size={16}
              weight='bold'
              className={styles.caretIcon}
            />
          </Flex>
        </Card>
      </CollapsibleTrigger>
      <CollapsibleContent className={styles.content}>
        {reposQuery.isLoading && <Skeleton width='100%' height='178px' />}
        {reposQuery.isError && (
          <Flex align='center' justify='center' height='100%'>
            <Text as='p' weight='bold' align='center' color='gray'>
              Error fetching repos for {login}
            </Text>
          </Flex>
        )}
        {reposQuery.isSuccess && (
          <ScrollArea type='auto' scrollbars='vertical' style={{ height: 180 }}>
            {reposQuery.data.length === 0 && (
              <Flex align='center' justify='center' height='100%'>
                <Text as='p' weight='bold' align='center' color='gray'>
                  No repos for this user
                </Text>
              </Flex>
            )}
            {reposQuery.data.length > 0 && (
              <>
                <Flex direction='column' gap='2'>
                  {reposQuery.data.map((repo) => (
                    <Card key={repo.id} className={styles.repoCard}>
                      <Flex justify='between' align='center'>
                        <Text as='p' weight='bold'>
                          {repo.name}
                        </Text>
                        <Flex align='center' gap='2'>
                          <Text as='span' weight='bold'>
                            {repo.stargazers_count}
                          </Text>
                          <StarIcon size={16} weight='fill' />
                        </Flex>
                      </Flex>
                      <Text as='p'>
                        {repo.description
                          ? repo.description.length > 100
                            ? repo.description.slice(0, 100) + '...'
                            : repo.description
                          : '-'}
                      </Text>
                    </Card>
                  ))}
                </Flex>
              </>
            )}
          </ScrollArea>
        )}
      </CollapsibleContent>
    </CollapsibleRoot>
  );
}

export default UserDetail;
