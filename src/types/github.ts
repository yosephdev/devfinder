/**
 * Represents a GitHub user profile with all associated data
 * from the GitHub API
 */
export interface GitHubUser {
  /** The username of the GitHub user */
  login: string;
  /** Unique identifier for the user */
  id: number;
  /** GraphQL node identifier */
  node_id: string;
  /** URL to the user's avatar image */
  avatar_url: string;
  gravatar_id: string;
  /** API URL for this user */
  url: string;
  /** Web URL to the user's GitHub profile */
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  /** The account type (usually "User") */
  type: string;
  /** Whether the user is a GitHub staff member */
  site_admin: boolean;
  /** The user's full name */
  name: string | null;
  /** The user's company or organization */
  company: string | null;
  /** The user's website or blog URL */
  blog: string | null;
  /** The user's geographical location */
  location: string | null;
  /** The user's public email address */
  email: string | null;
  /** Whether the user is available for hire */
  hireable: boolean | null;
  /** The user's profile biography */
  bio: string | null;
  /** The user's Twitter username */
  twitter_username: string | null;
  /** Number of public repositories */
  public_repos: number;
  /** Number of public gists */
  public_gists: number;
  /** Number of followers */
  followers: number;
  /** Number of users this user follows */
  following: number;
  /** ISO 8601 date string when the account was created */
  created_at: string;
  /** ISO 8601 date string when the account was last updated */
  updated_at: string;
}

export interface GitHubRepository {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;
  };
  html_url: string;
  description: string | null;
  fork: boolean;
  url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  git_url: string;
  ssh_url: string;
  clone_url: string;
  svn_url: string;
  homepage: string | null;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string | null;
  has_issues: boolean;
  has_projects: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  has_downloads: boolean;
  archived: boolean;
  disabled: boolean;
  open_issues_count: number;
  license: {
    key: string;
    name: string;
    spdx_id: string;
    url: string;
  } | null;
  allow_forking: boolean;
  is_template: boolean;
  topics: string[];
  visibility: string;
  forks: number;
  open_issues: number;
  watchers: number;
  default_branch: string;
}

export interface SearchUsersResponse {
  total_count: number;
  incomplete_results: boolean;
  items: GitHubUser[];
}

export interface SearchState {
  query: string;
  users: GitHubUser[];
  selectedUser: GitHubUser | null;
  repositories: GitHubRepository[];
  loading: boolean;
  error: string | null;
  hasSearched: boolean;
}