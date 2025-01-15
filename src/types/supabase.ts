export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      books: {
        Row: {
          id: number
          title: string
          author: string
          isbn: string
          status: string
          total_copies: number
          available_copies: number
          created_at: string
        }
        Insert: {
          id?: number
          title: string
          author: string
          isbn: string
          status?: string
          total_copies?: number
          available_copies?: number
          created_at?: string
        }
        Update: {
          id?: number
          title?: string
          author?: string
          isbn?: string
          status?: string
          total_copies?: number
          available_copies?: number
          created_at?: string
        }
      }
      borrowings: {
        Row: {
          id: number
          user_id: string
          book_id: number
          borrow_date: string
          due_date: string
          return_date: string | null
          created_at: string
        }
        Insert: {
          id?: number
          user_id: string
          book_id: number
          borrow_date?: string
          due_date: string
          return_date?: string | null
          created_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          book_id?: number
          borrow_date?: string
          due_date?: string
          return_date?: string | null
          created_at?: string
        }
      }
    }
  }
}