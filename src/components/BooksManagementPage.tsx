import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Book, Library, Plus, Search, Filter, Loader2 } from 'lucide-react';
import Header from './Header';
import AddBookModal from './books/AddBookModal';
import { Book as BookType } from '../types/book';
import { googleBooks } from '../services/googleBooks';

interface BooksManagementPageProps {
  userRole: 'admin' | 'member';
  onPageChange: (page: 'dashboard' | 'books') => void;
}

export default function BooksManagementPage({ userRole, onPageChange }: BooksManagementPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [books, setBooks] = useState<Partial<BookType>[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const categories = [
    'All', 'Fiction', 'Non-Fiction', 'Science', 'History', 
    'Technology', 'Arts', 'Philosophy'
  ];

  // Load initial books
  useEffect(() => {
    const loadInitialBooks = async () => {
      try {
        const results = await googleBooks.searchBooks('programming');
        setBooks(results);
      } catch (err) {
        setError('Failed to load books');
        console.error(err);
      }
    };
    loadInitialBooks();
  }, []);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery) {
        setIsLoading(true);
        setError(null);
        try {
          const results = await googleBooks.searchBooks(searchQuery);
          setBooks(results);
        } catch (err) {
          setError('Failed to search books');
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      }
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const filteredBooks = books.filter(book => {
    if (!book.category) return selectedCategory === 'all';
    return selectedCategory === 'all' || 
           book.category.toLowerCase().includes(selectedCategory.toLowerCase());
  });

  const handleAddBook = async (bookData: Partial<BookType>) => {
    console.log('Adding book:', bookData);
    setShowAddModal(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen bg-gray-50"
    >
      <Header userRole={userRole} onPageChange={onPageChange} currentPage="books" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="flex items-center mb-4 md:mb-0">
            <Library className="h-8 w-8 text-indigo-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">Books Management</h1>
          </div>

          {userRole === 'admin' && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Book
            </motion.button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="md:col-span-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search books by title, author, or ISBN..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              {isLoading && (
                <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 animate-spin" />
              )}
            </div>
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none"
            >
              {categories.map((category) => (
                <option key={category.toLowerCase()} value={category.toLowerCase()}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-50 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{book.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">by {book.author}</p>
                      </div>
                      {book.coverImage ? (
                        <img 
                          src={book.coverImage} 
                          alt={book.title} 
                          className="h-16 w-12 object-cover rounded"
                        />
                      ) : (
                        <Book className="h-6 w-6 text-indigo-600" />
                      )}
                    </div>
                    {book.description && (
                      <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                        {book.description}
                      </p>
                    )}
                    <div className="mt-4 flex items-center justify-between">
                      {book.category && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                          {book.category}
                        </span>
                      )}
                      {book.publishedDate && (
                        <div className="text-sm text-gray-500">
                          Published: {new Date(book.publishedDate).getFullYear()}
                        </div>
                      )}
                    </div>
                    {userRole === 'member' && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="mt-4 w-full px-4 py-2 rounded-md text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700"
                      >
                        Borrow Book
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-8 text-gray-500">
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Searching for books...
                  </div>
                ) : (
                  'No books found matching your search criteria.'
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      {showAddModal && (
        <AddBookModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddBook}
        />
      )}
    </motion.div>
  );
}