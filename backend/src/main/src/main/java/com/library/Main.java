package com.library;

import com.library.model.Book;
import com.library.model.User;
import com.library.service.LibraryService;
import com.library.service.LibraryServiceImpl;

public class Main {
    public static void main(String[] args) {
        // Initialize the library service
        LibraryService libraryService = new LibraryServiceImpl();

        // Create and add some sample books
        Book book1 = new Book(null, "The Great Gatsby", "F. Scott Fitzgerald", "978-0743273565");
        Book book2 = new Book(null, "To Kill a Mockingbird", "Harper Lee", "978-0446310789");
        
        libraryService.addBook(book1);
        libraryService.addBook(book2);

        // Create and register a user
        User member = new User(null, "John Doe", "john@example.com", "password123", User.UserRole.MEMBER);
        libraryService.registerUser(member);

        try {
            // Demonstrate borrowing a book
            libraryService.borrowBook(member.getId(), book1.getId());
            System.out.println(member.getName() + " borrowed: " + book1.getTitle());

            // Show borrowed books
            System.out.println("\nBorrowed books for " + member.getName() + ":");
            libraryService.getBorrowedBooks(member.getId())
                .forEach(book -> System.out.println("- " + book.getTitle()));

            // Return the book
            libraryService.returnBook(member.getId(), book1.getId());
            System.out.println("\n" + member.getName() + " returned: " + book1.getTitle());

        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
        }

        // Show available books
        System.out.println("\nAvailable books in library:");
        libraryService.findAvailableBooks()
            .forEach(book -> System.out.println("- " + book.getTitle() + " by " + book.getAuthor()));
    }
}