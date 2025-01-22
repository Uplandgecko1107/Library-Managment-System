package com.library.service;

import com.library.model.Book;
import com.library.model.User;
import java.util.*;
import java.util.stream.Collectors;

public class LibraryServiceImpl implements LibraryService {
    private Map<Long, Book> books = new HashMap<>();
    private Map<Long, User> users = new HashMap<>();
    private Long bookIdCounter = 1L;
    private Long userIdCounter = 1L;

    @Override
    public Book addBook(Book book) {
        book.setId(bookIdCounter++);
        books.put(book.getId(), book);
        return book;
    }

    @Override
    public Book updateBook(Book book) {
        if (!books.containsKey(book.getId())) {
            throw new IllegalArgumentException("Book not found");
        }
        books.put(book.getId(), book);
        return book;
    }

    @Override
    public void removeBook(Long bookId) {
        if (!books.containsKey(bookId)) {
            throw new IllegalArgumentException("Book not found");
        }
        books.remove(bookId);
    }

    @Override
    public Book findBookById(Long bookId) {
        Book book = books.get(bookId);
        if (book == null) {
            throw new IllegalArgumentException("Book not found");
        }
        return book;
    }

    @Override
    public List<Book> findAllBooks() {
        return new ArrayList<>(books.values());
    }

    @Override
    public List<Book> findAvailableBooks() {
        return books.values().stream()
                .filter(Book::isAvailable)
                .collect(Collectors.toList());
    }

    @Override
    public List<Book> searchBooks(String query) {
        String lowercaseQuery = query.toLowerCase();
        return books.values().stream()
                .filter(book -> 
                    book.getTitle().toLowerCase().contains(lowercaseQuery) ||
                    book.getAuthor().toLowerCase().contains(lowercaseQuery) ||
                    book.getIsbn().toLowerCase().contains(lowercaseQuery))
                .collect(Collectors.toList());
    }

    @Override
    public User registerUser(User user) {
        user.setId(userIdCounter++);
        users.put(user.getId(), user);
        return user;
    }

    @Override
    public User updateUser(User user) {
        if (!users.containsKey(user.getId())) {
            throw new IllegalArgumentException("User not found");
        }
        users.put(user.getId(), user);
        return user;
    }

    @Override
    public void deactivateUser(Long userId) {
        User user = users.get(userId);
        if (user == null) {
            throw new IllegalArgumentException("User not found");
        }
        user.setActive(false);
    }

    @Override
    public User findUserById(Long userId) {
        User user = users.get(userId);
        if (user == null) {
            throw new IllegalArgumentException("User not found");
        }
        return user;
    }

    @Override
    public List<User> findAllUsers() {
        return new ArrayList<>(users.values());
    }

    @Override
    public void borrowBook(Long userId, Long bookId) {
        User user = findUserById(userId);
        Book book = findBookById(bookId);
        user.borrowBook(book);
    }

    @Override
    public void returnBook(Long userId, Long bookId) {
        User user = findUserById(userId);
        Book book = findBookById(bookId);
        user.returnBook(book);
    }

    @Override
    public List<Book> getBorrowedBooks(Long userId) {
        User user = findUserById(userId);
        return new ArrayList<>(user.getBorrowedBooks());
    }
}