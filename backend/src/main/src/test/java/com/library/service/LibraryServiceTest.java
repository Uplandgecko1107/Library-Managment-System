package com.library.service;

import com.library.model.Book;
import com.library.model.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class LibraryServiceTest {
    private LibraryService libraryService;

    @BeforeEach
    void setUp() {
        libraryService = new LibraryServiceImpl();
    }

    @Test
    void testRegisterUser() {
        User user = new User(null, "Test User", "test@example.com", "password", User.UserRole.MEMBER);
        User registeredUser = libraryService.registerUser(user);
        
        assertNotNull(registeredUser.getId());
        assertEquals("Test User", registeredUser.getName());
        assertEquals("test@example.com", registeredUser.getEmail());
        assertEquals(User.UserRole.MEMBER, registeredUser.getRole());
        assertTrue(registeredUser.isActive());
    }

    @Test
    void testAddBook() {
        Book book = new Book(null, "Test Book", "Test Author", "1234567890");
        Book addedBook = libraryService.addBook(book);
        
        assertNotNull(addedBook.getId());
        assertEquals("Test Book", addedBook.getTitle());
        assertEquals("Test Author", addedBook.getAuthor());
        assertEquals("1234567890", addedBook.getIsbn());
        assertTrue(addedBook.isAvailable());
    }

    @Test
    void testBorrowAndReturnBook() {
        // Add a book
        Book book = new Book(null, "Test Book", "Test Author", "1234567890");
        book = libraryService.addBook(book);

        // Register a user
        User user = new User(null, "Test User", "test@example.com", "password", User.UserRole.MEMBER);
        user = libraryService.registerUser(user);

        // Borrow the book
        libraryService.borrowBook(user.getId(), book.getId());
        
        // Verify book is borrowed
        Book borrowedBook = libraryService.findBookById(book.getId());
        assertFalse(borrowedBook.isAvailable());
        
        // Verify user has the book
        var borrowedBooks = libraryService.getBorrowedBooks(user.getId());
        assertEquals(1, borrowedBooks.size());
        assertEquals(book.getId(), borrowedBooks.get(0).getId());

        // Return the book
        libraryService.returnBook(user.getId(), book.getId());
        
        // Verify book is available again
        Book returnedBook = libraryService.findBookById(book.getId());
        assertTrue(returnedBook.isAvailable());
        
        // Verify user no longer has the book
        borrowedBooks = libraryService.getBorrowedBooks(user.getId());
        assertTrue(borrowedBooks.isEmpty());
    }

    @Test
    void testFindAvailableBooks() {
        // Add two books
        Book book1 = libraryService.addBook(new Book(null, "Book 1", "Author 1", "1111111111"));
        Book book2 = libraryService.addBook(new Book(null, "Book 2", "Author 2", "2222222222"));
        
        var availableBooks = libraryService.findAvailableBooks();
        assertEquals(2, availableBooks.size());
        
        // Register a user and borrow a book
        User user = libraryService.registerUser(
            new User(null, "Test User", "test@example.com", "password", User.UserRole.MEMBER)
        );
        libraryService.borrowBook(user.getId(), book1.getId());
        
        availableBooks = libraryService.findAvailableBooks();
        assertEquals(1, availableBooks.size());
        assertEquals(book2.getId(), availableBooks.get(0).getId());
    }
}