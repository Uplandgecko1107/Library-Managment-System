import { supabase } from '../lib/supabase';
import { User } from '../types/user';
import { Book } from '../types/book';

class ApiService {
  async login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    // Get additional user data from profiles table
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single();

    return {
      ...data.user,
      role: profile?.role || 'member',
    };
  }

  async register(userData: { email: string; password: string; name: string; role: 'admin' | 'member' }) {
    const { data, error } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      options: {
        data: {
          name: userData.name,
          role: userData.role,
        },
      },
    });

    if (error) throw error;

    // Create profile
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([
        {
          id: data.user?.id,
          name: userData.name,
          role: userData.role,
        },
      ]);

    if (profileError) throw profileError;

    return data.user;
  }

  async getBooks() {
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  async borrowBook(userId: string, bookId: number, dueDate: string) {
    // Start a transaction
    const { data: book, error: bookError } = await supabase
      .from('books')
      .select('available_copies')
      .eq('id', bookId)
      .single();

    if (bookError) throw bookError;
    if (!book || book.available_copies <= 0) {
      throw new Error('Book not available');
    }

    // Create borrowing record
    const { error: borrowError } = await supabase
      .from('borrowings')
      .insert([
        {
          user_id: userId,
          book_id: bookId,
          due_date: dueDate,
        },
      ]);

    if (borrowError) throw borrowError;

    // Update book availability
    const { error: updateError } = await supabase
      .from('books')
      .update({ available_copies: book.available_copies - 1 })
      .eq('id', bookId);

    if (updateError) throw updateError;
  }

  async returnBook(userId: string, bookId: number) {
    const { data: borrowing, error: borrowingError } = await supabase
      .from('borrowings')
      .update({ return_date: new Date().toISOString() })
      .eq('user_id', userId)
      .eq('book_id', bookId)
      .is('return_date', null)
      .single();

    if (borrowingError) throw borrowingError;

    const { error: updateError } = await supabase
      .rpc('increment_available_copies', { book_id: bookId });

    if (updateError) throw updateError;
  }

  async getUserBorrowings(userId: string) {
    const { data, error } = await supabase
      .from('borrowings')
      .select(`
        *,
        books (
          id,
          title,
          author
        )
      `)
      .eq('user_id', userId)
      .is('return_date', null);

    if (error) throw error;
    return data;
  }
}

export const api = new ApiService();