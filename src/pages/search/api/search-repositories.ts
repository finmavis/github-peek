import { AxiosError } from 'axios';

import apiClient, { type ApiError } from '@/lib/api-client';

export type SearchRepositoriesQuery = {
  q: string;
  sort?: 'stars' | 'forks' | 'help-wanted-issues' | 'updated' | undefined;
  order?: 'asc' | 'desc';
  per_page?: number;
  page?: number;
};

export type Repository = {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  owner: {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;
  };
  html_url: string;
  description: string | null;
  fork: boolean;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  default_branch: string;
};

export type SearchRepositoriesResponse = {
  total_count: number;
  incomplete_results: boolean;
  items: Repository[];
};

export type GitHubApiError = {
  message: string;
  documentation_url?: string;
};

export const searchRepositories = async (params: SearchRepositoriesQuery) => {
  try {
    const response = await apiClient.get('/search/repositories', {
      params,
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      const status = error.response.status;
      const githubError: GitHubApiError = error.response.data || {};
      const apiError: ApiError = new Error(
        githubError.message || 'An unexpected error occurred. Please try again.'
      );
      apiError.status = status;
      apiError.documentationUrl = githubError.documentation_url;
      throw apiError;
    }

    // If no response, re-throw the original error
    throw error;
  }
};
