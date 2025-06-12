import { useState, useCallback } from 'react';
import { GitHubUser, GitHubRepository, SearchUsersResponse, SearchState } from '../types/github';

const GITHUB_API_BASE = 'https://api.github.com';

export const useGitHub = () => {
  const [state, setState] = useState<SearchState>({
    query: '',
    users: [],
    selectedUser: null,
    repositories: [],
    loading: false,
    error: null,
    hasSearched: false,
  });

  const searchUsers = useCallback(async (query: string) => {
    if (!query.trim()) return;
    
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response = await fetch(
        `${GITHUB_API_BASE}/search/users?q=${encodeURIComponent(query)}&per_page=30`
      );
      
      if (!response.ok) {
        if (response.status === 403) {
          throw new Error('GitHub API rate limit exceeded. Please try again later.');
        }
        throw new Error(`GitHub API error: ${response.status}`);
      }
      
      const data: SearchUsersResponse = await response.json();
      
      // Debug: Log the API response
      console.log('Search API response:', data);
      console.log('First user from search:', data.items[0]);
      
      // Fetch detailed user info for each user to get complete data including created_at
      const usersWithDetails = await Promise.all(
        data.items.slice(0, 12).map(async (user) => {
          try {
            const userResponse = await fetch(`${GITHUB_API_BASE}/users/${user.login}`);
            if (userResponse.ok) {
              const detailedUser = await userResponse.json();
              console.log('Detailed user data:', detailedUser);
              return detailedUser;
            }
            return user;
          } catch (error) {
            console.error('Error fetching user details:', error);
            return user;
          }
        })
      );
      
      setState(prev => ({
        ...prev,
        users: usersWithDetails,
        loading: false,
        hasSearched: true,
        query,
      }));
    } catch (error) {
      console.error('Search error:', error);
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'An error occurred while searching',
        loading: false,
        hasSearched: true,
      }));
    }
  }, []);

  const getUserDetails = useCallback(async (username: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const userResponse = await fetch(`${GITHUB_API_BASE}/users/${username}`);
      const reposResponse = await fetch(`${GITHUB_API_BASE}/users/${username}/repos?sort=updated&per_page=6`);
      
      if (!userResponse.ok || !reposResponse.ok) {
        throw new Error('Failed to fetch user details');
      }
      
      const user: GitHubUser = await userResponse.json();
      const repositories: GitHubRepository[] = await reposResponse.json();
      
      console.log('User details:', user);
      console.log('User repositories:', repositories);
      
      setState(prev => ({
        ...prev,
        selectedUser: user,
        repositories,
        loading: false,
      }));
    } catch (error) {
      console.error('User details error:', error);
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'An error occurred while fetching user details',
        loading: false,
      }));
    }
  }, []);

  const clearSelection = useCallback(() => {
    setState(prev => ({
      ...prev,
      selectedUser: null,
      repositories: [],
    }));
  }, []);

  const clearSearch = useCallback(() => {
    setState({
      query: '',
      users: [],
      selectedUser: null,
      repositories: [],
      loading: false,
      error: null,
      hasSearched: false,
    });
  }, []);

  return {
    ...state,
    searchUsers,
    getUserDetails,
    clearSelection,
    clearSearch,
  };
};