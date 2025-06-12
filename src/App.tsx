import React from 'react';
import { Github } from 'lucide-react';
import { useGitHub } from './hooks/useGitHub';
import { useTheme } from './hooks/useTheme';
import { SearchBar } from './components/SearchBar';
import { UserCard } from './components/UserCard';
import { UserDetails } from './components/UserDetails';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { EmptyState } from './components/EmptyState';
import { ThemeToggle } from './components/ThemeToggle';

function App() {
  const { theme } = useTheme();
  const {
    query,
    users,
    selectedUser,
    repositories,
    loading,
    error,
    hasSearched,
    searchUsers,
    getUserDetails,
    clearSelection,
    clearSearch,
  } = useGitHub();

  const handleUserClick = (username: string) => {
    getUserDetails(username);
  };

  const handleRetry = () => {
    if (query) {
      searchUsers(query);
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
    }`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl">
                <Github className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">DevFinder</h1>
                <p className="text-gray-600 dark:text-gray-300">Discover GitHub developers</p>
              </div>
            </div>
            <ThemeToggle />
          </div>
          
          <SearchBar
            onSearch={searchUsers}
            onClear={clearSearch}
            loading={loading}
            hasResults={hasSearched}
          />
        </header>

        {/* Main Content */}
        <main>
          {selectedUser ? (
            <UserDetails
              user={selectedUser}
              repositories={repositories}
              onBack={clearSelection}
            />
          ) : (
            <>
              {loading && <LoadingSpinner />}
              
              {error && (
                <ErrorMessage message={error} onRetry={handleRetry} />
              )}
              
              {!loading && !error && !hasSearched && (
                <EmptyState type="no-search" />
              )}
              
              {!loading && !error && hasSearched && users.length === 0 && (
                <EmptyState type="no-results" query={query} />
              )}
              
              {!loading && !error && users.length > 0 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Search Results
                    </h2>
                    <span className="text-gray-600 dark:text-gray-300">
                      {users.length} developer{users.length !== 1 ? 's' : ''} found
                    </span>
                  </div>
                  
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {users.map((user) => (
                      <UserCard
                        key={user.id}
                        user={user}
                        onClick={() => handleUserClick(user.login)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </main>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-500 dark:text-gray-400">
          <p>Built with React, TypeScript, and the GitHub API</p>
        </footer>
      </div>
    </div>
  );
}

export default App;