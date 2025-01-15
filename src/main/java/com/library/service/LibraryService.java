package com.library.service;

import com.library.model.Book;
import com.library.model.User;
import java.util.List;

public interface LibraryService {
    // Book management
    Book addBook(Book book);
    Book updateBook(Book book);
    void removeBook(Long bookId);
    Book findBookById(Long bookId);
    List<Book> findAllBooks();
    List<Book> findAvailableBooks();
    List<Book> searchBooks(String query);

    // User management
    User registerUser(User user);
    User updateUser(User user);
    void deactivateUser(Long userId);
    User findUserById(Long userId);
    List<User> findAllUsers();

    // Borrowing operations
    void borrowBook(Long userId, Long bookId);
    void returnBook(Long userId, Long bookId);
    List<Book> getBorrowedBooks(Long userId);
}