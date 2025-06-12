import React from 'react';
import { GitHubUser, GitHubRepository } from '../types/github';
import { 
  MapPin, Calendar, Users, GitFork, Star, ExternalLink, 
  Globe, Mail, Twitter, Building, ArrowLeft 
} from 'lucide-react';

interface UserDetailsProps {
  user: GitHubUser;
  repositories: GitHubRepository[];
  onBack: () => void;
}

export const UserDetails: React.FC<UserDetailsProps> = ({ user, repositories, onBack }) => {
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Unknown';
      }
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch (error) {
      return 'Unknown';
    }
  };

  const formatNumber = (num: number | null | undefined) => {
    if (num === null || num === undefined) return '0';
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const getLanguageColor = (language: string | null) => {
    const colors: Record<string, string> = {
      JavaScript: '#f1e05a',
      TypeScript: '#2b7489',
      Python: '#3572A5',
      Java: '#b07219',
      'C++': '#f34b7d',
      'C#': '#239120',
      PHP: '#4F5D95',
      Ruby: '#701516',
      Go: '#00ADD8',
      Rust: '#dea584',
      Swift: '#ffac45',
      Kotlin: '#F18E33',
      HTML: '#e34c26',
      CSS: '#1572B6',
      Vue: '#4FC08D',
      React: '#61DAFB',
    };
    return colors[language || ''] || '#8b5cf6';
  };

  const formatUrl = (url: string | null) => {
    if (!url) return null;
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return `https://${url}`;
  };

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 
                   hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to search results</span>
      </button>

      {/* User Profile Header */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
          <div className="relative">
            <img
              src={user.avatar_url}
              alt={`${user.login}'s avatar`}
              className="w-32 h-32 rounded-2xl object-cover ring-4 ring-white/20"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `https://ui-avatars.com/api/?name=${user.login}&background=6366f1&color=fff&size=128`;
              }}
            />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full 
                            border-4 border-white dark:border-gray-800"></div>
          </div>
          
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {user.name || user.login}
                </h1>
                <p className="text-xl text-blue-600 dark:text-blue-400 font-medium">
                  @{user.login}
                </p>
              </div>
              
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r 
                           from-blue-600 to-purple-600 text-white rounded-xl font-medium
                           hover:from-blue-700 hover:to-purple-700 transition-all duration-200
                           transform hover:scale-105"
              >
                <span>View on GitHub</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            
            {user.bio && (
              <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">{user.bio}</p>
            )}
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-white/5 rounded-xl">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatNumber(user.followers)}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Followers</div>
              </div>
              
              <div className="text-center p-4 bg-white/5 rounded-xl">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatNumber(user.following)}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Following</div>
              </div>
              
              <div className="text-center p-4 bg-white/5 rounded-xl">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatNumber(user.public_repos)}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Repositories</div>
              </div>
              
              <div className="text-center p-4 bg-white/5 rounded-xl">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatNumber(user.public_gists)}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Gists</div>
              </div>
            </div>
            
            {/* Contact Info */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
              {user.location && (
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>{user.location}</span>
                </div>
              )}
              
              {user.company && (
                <div className="flex items-center space-x-2">
                  <Building className="w-4 h-4" />
                  <span>{user.company}</span>
                </div>
              )}
              
              {user.blog && (
                <a
                  href={formatUrl(user.blog)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  <span>{user.blog}</span>
                </a>
              )}
              
              {user.email && (
                <a
                  href={`mailto:${user.email}`}
                  className="flex items-center space-x-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>{user.email}</span>
                </a>
              )}
              
              {user.twitter_username && (
                <a
                  href={`https://twitter.com/${user.twitter_username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                  <span>@{user.twitter_username}</span>
                </a>
              )}
              
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Joined {formatDate(user.created_at)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Repositories */}
      {repositories.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Recent Repositories
          </h2>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {repositories.map((repo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-6 bg-white/10 backdrop-blur-sm border border-white/20 
                           rounded-2xl hover:bg-white/20 transition-all duration-300 
                           transform hover:scale-[1.02] hover:shadow-lg"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 
                                 dark:group-hover:text-blue-400 transition-colors truncate">
                    {repo.name}
                  </h3>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-500 
                                         transition-colors flex-shrink-0 ml-2" />
                </div>
                
                {repo.description && (
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                    {repo.description}
                  </p>
                )}
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4">
                    {repo.language && (
                      <div className="flex items-center space-x-1">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: getLanguageColor(repo.language) }}
                        ></div>
                        <span className="text-gray-600 dark:text-gray-300">{repo.language}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                      <Star className="w-4 h-4" />
                      <span>{formatNumber(repo.stargazers_count)}</span>
                    </div>
                    
                    <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                      <GitFork className="w-4 h-4" />
                      <span>{formatNumber(repo.forks)}</span>
                    </div>
                  </div>
                  
                  <span className="text-gray-400 text-xs">
                    Updated {formatDate(repo.updated_at)}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};