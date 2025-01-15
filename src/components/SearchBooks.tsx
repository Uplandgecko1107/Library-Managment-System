import React, { useState } from 'react';
import { Search, X, Loader2, Book } from 'lucide-react';
import { googleBooks } from '../services/googleBooks';
import { Book as BookType } from '../types/book';

export default function SearchBooks() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Partial<BookType>[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const results = await googleBooks.searchBooks(searchQuery);
      setSearchResults(results);
    } catch (err) {
      setError('Failed to fetch books. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="relative">
      {isOpen ? (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-start justify-center pt-16 px-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="text-lg font-semibold">Search Books</h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-500">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Search by title, author, or ISBN..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                {isLoading && (
                  <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 animate-spin" />
                )}
              </div>

              {error && (
                <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg">
                  {error}
                </div>
              )}

              <div className="mt-4 max-h-96 overflow-y-auto">
                {searchResults.length > 0 ? (
                  <div className="space-y-4">
                    {searchResults.map((book, index) => (
                      <div
                        key={index}
                        className="flex gap-4 p-4 border rounded-lg hover:bg-gray-50"
                      >
                        {book.coverImage ? (
                          <img
                            src={book.coverImage}
                            alt={book.title}
                            className="w-20 h-28 object-cover rounded-lg shadow-sm"
                          />
                        ) : (
                          <div className="w-20 h-28 bg-gray-100 rounded-lg flex items-center justify-center">
                            <Book className="h-8 w-8 text-gray-400" />
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="font-medium text-lg">{book.title}</h3>
                          <p className="text-gray-600">{book.author}</p>
                          {book.isbn && (
                            <p className="text-sm text-gray-500">ISBN: {book.isbn}</p>
                          )}
                          {book.description && (
                            <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                              {book.description}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Searching for books...
                      </div>
                    ) : searchQuery ? (
                      'No books found matching your search.'
                    ) : (
                      'Start typing to search for books...'
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center p-4 bg-white shadow rounded-lg hover:bg-gray-50 transition-colors duration-200 w-full"
      >
        <Search className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-600 mr-2 shrink-0" />
        <span className="text-sm font-medium text-gray-900 truncate">Search Books</span>
      </button>
    </div>
  );
}