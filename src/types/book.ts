export interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  isAvailable: boolean;
  borrowerId?: number;
  dueDate?: Date;
  description?: string;
  coverImage?: string;
  category?: string;
  publishedDate?: string;
}