import React, { useState, FormEvent } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onClear: () => void;
  loading: boolean;
  hasResults: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  onClear, 
  loading, 
  hasResults 
}) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleClear = () => {
    setQuery('');
    onClear();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className={`h-5 w-5 transition-colors duration-200 ${
            loading ? 'text-blue-500 animate-pulse' : 'text-gray-400 dark:text-gray-500'
          }`} />
        </div>
        
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search GitHub developers..."
          className="w-full pl-12 pr-12 py-4 text-lg rounded-2xl 
                     bg-white/10 backdrop-blur-sm border border-white/20
                     placeholder-gray-400 dark:placeholder-gray-500
                     text-gray-900 dark:text-white
                     focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50
                     transition-all duration-300"
          disabled={loading}
        />
        
        {(query || hasResults) && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-4 flex items-center
                       text-gray-400 hover:text-gray-600 dark:hover:text-gray-300
                       transition-colors duration-200"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
      
      <div className="mt-4 text-center">
        <button
          type="submit"
          disabled={!query.trim() || loading}
          className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600
                     text-white font-medium shadow-lg
                     hover:from-blue-700 hover:to-purple-700
                     focus:outline-none focus:ring-2 focus:ring-blue-500/50
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transform hover:scale-105 transition-all duration-200"
        >
          {loading ? 'Searching...' : 'Search Developers'}
        </button>
      </div>
    </form>
  );
};