package com.library.model;

import java.util.ArrayList;
import java.util.List;

public class User {
    private Long id;
    private String name;
    private String email;
    private String password;
    private UserRole role;
    private List<Book> borrowedBooks;
    private boolean isActive;

    public enum UserRole {
        ADMIN,
        MEMBER
    }

    public User(Long id, String name, String email, String password, UserRole role) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.borrowedBooks = new ArrayList<>();
        this.isActive = true;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public UserRole getRole() { return role; }
    public void setRole(UserRole role) { this.role = role; }

    public List<Book> getBorrowedBooks() { return borrowedBooks; }
    public void setBorrowedBooks(List<Book> borrowedBooks) { this.borrowedBooks = borrowedBooks; }

    public boolean isActive() { return isActive; }
    public void setActive(boolean active) { isActive = active; }

    // Business logic methods
    public void borrowBook(Book book) {
        if (borrowedBooks.size() >= 5) {
            throw new IllegalStateException("Maximum borrow limit reached");
        }
        if (!book.isAvailable()) {
            throw new IllegalStateException("Book is not available");
        }
        book.borrowBook();
        borrowedBooks.add(book);
    }

    public void returnBook(Book book) {
        if (!borrowedBooks.contains(book)) {
            throw new IllegalStateException("Book was not borrowed by this user");
        }
        book.returnBook();
        borrowedBooks.remove(book);
    }
}