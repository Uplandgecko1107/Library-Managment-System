import { User } from '../types/user';
import { Book } from '../types/book';

// Mock API service
class ApiService {
  private users: User[] = [];
  private books: Book[] = [];

  async login(email: string, password: string): Promise<User> {
    const user = this.users.find(u => u.email === email);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    return user;
  }

  async register(userData: Omit<User, 'id'>): Promise<User> {
    const newUser = {
      ...userData,
      id: this.users.length + 1,
    };
    this.users.push(newUser);
    return newUser;
  }

  async getBooks(): Promise<Book[]> {
    return this.books;
  }

  async borrowBook(userId: number, bookId: number): Promise<void> {
    const book = this.books.find(b => b.id === bookId);
    if (!book || !book.isAvailable) {
      throw new Error('Book not available');
    }
    book.isAvailable = false;
    book.borrowerId = userId;
    book.dueDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000); // 14 days from now
  }
}

export const api = new ApiService();