import React from 'react';
import { Search, Users } from 'lucide-react';

interface EmptyStateProps {
  type: 'no-search' | 'no-results';
  query?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ type, query }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 
                      rounded-2xl flex items-center justify-center mb-6">
        {type === 'no-search' ? (
          <Search className="w-12 h-12 text-blue-600 dark:text-blue-400" />
        ) : (
          <Users className="w-12 h-12 text-purple-600 dark:text-purple-400" />
        )}
      </div>
      
      {type === 'no-search' ? (
        <>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Discover Amazing Developers
          </h3>
          <p className="text-gray-600 dark:text-gray-300 max-w-md">
            Search for developers on GitHub and explore their profiles, repositories, and contributions to the open source community.
          </p>
        </>
      ) : (
        <>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            No developers found
          </h3>
          <p className="text-gray-600 dark:text-gray-300 max-w-md">
            We couldn't find any developers matching "{query}". Try searching with different keywords or check your spelling.
          </p>
        </>
      )}
    </div>
  );
};