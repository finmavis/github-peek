import apiClient from '@/lib/api-client';

export type SearchUserQuery = {
  q: string;
  sort?: string;
  order?: 'asc' | 'desc';
  per_page?: number;
  page?: number;
};

export type User = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  received_events_url: string;
  type: string;
  score: number;
  following_url: string;
  gists_url: string;
  starred_url: string;
  events_url: string;
  site_admin: boolean;
};

export type SearchUserResponse = {
  total_count: number;
  incomplete_results: boolean;
  items: User[];
};

export const searchUsers = async (params: SearchUserQuery) => {
  const response = await apiClient.get('/search/users', {
    params,
  });
  return response.data;
};
