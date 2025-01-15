import { Book } from '../types/book';

const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY || '';
const BASE_URL = 'https://www.googleapis.com/books/v1';

interface GoogleBooksResponse {
  items: Array<{
    id: string;
    volumeInfo: {
      title: string;
      authors?: string[];
      industryIdentifiers?: Array<{
        type: string;
        identifier: string;
      }>;
      description?: string;
      imageLinks?: {
        thumbnail: string;
      };
      categories?: string[];
      publishedDate?: string;
    };
  }>;
}

class GoogleBooksService {
  async searchBooks(query: string): Promise<Partial<Book>[]> {
    try {
      const response = await fetch(
        `${BASE_URL}/volumes?q=${encodeURIComponent(query)}&key=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch books from Google Books API');
      }

      const data: GoogleBooksResponse = await response.json();
      
      return data.items.map(item => ({
        title: item.volumeInfo.title,
        author: item.volumeInfo.authors?.[0] || 'Unknown Author',
        isbn: item.volumeInfo.industryIdentifiers?.find(
          id => id.type === 'ISBN_13' || id.type === 'ISBN_10'
        )?.identifier || '',
        description: item.volumeInfo.description,
        coverImage: item.volumeInfo.imageLinks?.thumbnail,
        category: item.volumeInfo.categories?.[0],
        publishedDate: item.volumeInfo.publishedDate,
      }));
    } catch (error) {
      console.error('Error fetching books:', error);
      throw error;
    }
  }

  async getBookDetails(isbn: string): Promise<Partial<Book> | null> {
    try {
      const response = await fetch(
        `${BASE_URL}/volumes?q=isbn:${isbn}&key=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch book details from Google Books API');
      }

      const data: GoogleBooksResponse = await response.json();
      
      if (!data.items?.[0]) {
        return null;
      }

      const book = data.items[0];
      return {
        title: book.volumeInfo.title,
        author: book.volumeInfo.authors?.[0] || 'Unknown Author',
        isbn: book.volumeInfo.industryIdentifiers?.find(
          id => id.type === 'ISBN_13' || id.type === 'ISBN_10'
        )?.identifier || '',
        description: book.volumeInfo.description,
        coverImage: book.volumeInfo.imageLinks?.thumbnail,
        category: book.volumeInfo.categories?.[0],
        publishedDate: book.volumeInfo.publishedDate,
      };
    } catch (error) {
      console.error('Error fetching book details:', error);
      throw error;
    }
  }
}

export const googleBooks = new GoogleBooksService();