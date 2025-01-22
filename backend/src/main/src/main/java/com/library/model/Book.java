package com.library.model;

import java.time.LocalDate;

public class Book {
    private Long id;
    private String title;
    private String author;
    private String isbn;
    private BookStatus status;
    private LocalDate publishedDate;
    private String category;
    private int totalCopies;
    private int availableCopies;

    public enum BookStatus {
        AVAILABLE,
        BORROWED,
        RESERVED,
        MAINTENANCE
    }

    // Constructor
    public Book(Long id, String title, String author, String isbn) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.status = BookStatus.AVAILABLE;
        this.availableCopies = totalCopies;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }

    public String getIsbn() { return isbn; }
    public void setIsbn(String isbn) { this.isbn = isbn; }

    public BookStatus getStatus() { return status; }
    public void setStatus(BookStatus status) { this.status = status; }

    public LocalDate getPublishedDate() { return publishedDate; }
    public void setPublishedDate(LocalDate publishedDate) { this.publishedDate = publishedDate; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public int getTotalCopies() { return totalCopies; }
    public void setTotalCopies(int totalCopies) { this.totalCopies = totalCopies; }

    public int getAvailableCopies() { return availableCopies; }
    public void setAvailableCopies(int availableCopies) { this.availableCopies = availableCopies; }

    // Business logic methods
    public boolean isAvailable() {
        return status == BookStatus.AVAILABLE && availableCopies > 0;
    }

    public void borrowBook() {
        if (isAvailable()) {
            availableCopies--;
            if (availableCopies == 0) {
                status = BookStatus.BORROWED;
            }
        } else {
            throw new IllegalStateException("Book is not available for borrowing");
        }
    }

    public void returnBook() {
        if (availableCopies < totalCopies) {
            availableCopies++;
            if (status == BookStatus.BORROWED) {
                status = BookStatus.AVAILABLE;
            }
        } else {
            throw new IllegalStateException("All copies are already returned");
        }
    }
}