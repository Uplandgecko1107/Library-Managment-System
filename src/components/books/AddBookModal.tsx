import React, { useState } from 'react';
import { X, Search, Plus, Loader2 } from 'lucide-react';
import { googleBooks } from '../../services/googleBooks';
import { Book } from '../../types/book';

interface AddBookModalProps {
  onClose: () => void;
  onAdd: (book: Partial<Book>) => void;
}

export default function AddBookModal({ onClose, onAdd }: AddBookModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Partial<Book>[]>([]);
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Add New Book</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Search by title, author, or ISBN..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Searching...
                </>
              ) : (
                'Search'
              )}
            </button>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <div className="mt-6 max-h-[60vh] overflow-y-auto">
            {searchResults.map((book, index) => (
              <div
                key={index}
                className="flex gap-4 p-4 border-b border-gray-200 hover:bg-gray-50"
              >
                {book.coverImage ? (
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-24 h-32 object-cover rounded-lg shadow-sm"
                  />
                ) : (
                  <div className="w-24 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400">No cover</span>
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
                <button
                  onClick={() => onAdd(book)}
                  className="self-center flex items-center gap-1 px-3 py-1.5 text-sm text-indigo-600 hover:bg-indigo-50 rounded-lg"
                >
                  <Plus className="h-4 w-4" />
                  Add
                </button>
              </div>
            ))}
            {searchResults.length === 0 && !isLoading && searchQuery && (
              <div className="text-center py-8 text-gray-500">
                No books found. Try a different search term.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}