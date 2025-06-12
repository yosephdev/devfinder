import React from 'react';
import { GitHubUser } from '../types/github';
import { MapPin, Calendar, Users, GitFork, Star, ExternalLink } from 'lucide-react';

interface UserCardProps {
  user: GitHubUser;
  onClick: () => void;
  isSelected?: boolean;
}

export const UserCard: React.FC<UserCardProps> = ({ user, onClick, isSelected }) => {
  const formatDate = (dateString: string) => {
    try {
      // Log the actual date string to debug
      console.log('Date string received:', dateString, typeof dateString);
      
      if (!dateString) {
        return 'Unknown';
      }
      
      const date = new Date(dateString);
      console.log('Parsed date:', date, 'Valid:', !isNaN(date.getTime()));
      
      if (isNaN(date.getTime())) {
        return 'Unknown';
      }
      
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
      });
    } catch (error) {
      console.error('Date formatting error:', error);
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

  // Debug: Log the entire user object to see what we're getting
  console.log('User object:', user);

  return (
    <div
      onClick={onClick}
      className={`group cursor-pointer rounded-2xl p-6 transition-all duration-300 transform hover:scale-[1.02]
                  ${isSelected 
                    ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-2 border-blue-500/50' 
                    : 'bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20'
                  }
                  hover:shadow-xl hover:shadow-blue-500/10`}
    >
      <div className="flex items-start space-x-4">
        <div className="relative">
          <img
            src={user.avatar_url}
            alt={`${user.login}'s avatar`}
            className="w-16 h-16 rounded-xl object-cover ring-2 ring-white/20 
                       group-hover:ring-blue-500/50 transition-all duration-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = `https://ui-avatars.com/api/?name=${user.login}&background=6366f1&color=fff&size=64`;
            }}
          />
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full 
                          border-2 border-white dark:border-gray-800"></div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white truncate">
              {user.name || user.login}
            </h3>
            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-500 
                                   transition-colors duration-200" />
          </div>
          
          <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">@{user.login}</p>
          
          {user.bio && (
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
              {user.bio}
            </p>
          )}
          
          <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
            {user.location && (
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span className="truncate">{user.location}</span>
              </div>
            )}
            
            {user.created_at && (
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>Joined {formatDate(user.created_at)}</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-6 mt-4 text-sm">
            <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-300">
              <Users className="w-4 h-4" />
              <span className="font-medium">{formatNumber(user.followers)}</span>
              <span>followers</span>
            </div>
            
            <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-300">
              <GitFork className="w-4 h-4" />
              <span className="font-medium">{formatNumber(user.public_repos)}</span>
              <span>repos</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};