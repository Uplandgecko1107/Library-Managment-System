package com.library.servlet;

import com.library.model.User;
import com.library.service.LibraryService;
import com.library.service.LibraryServiceImpl;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/user/*")
public class UserServlet extends HttpServlet {
    private LibraryService libraryService;

    @Override
    public void init() throws ServletException {
        libraryService = new LibraryServiceImpl();
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        String pathInfo = request.getPathInfo();
        
        if (pathInfo == null || pathInfo.equals("/")) {
            // Display all users
            request.setAttribute("users", libraryService.findAllUsers());
            request.getRequestDispatcher("/WEB-INF/jsp/users.jsp").forward(request, response);
        } else if (pathInfo.equals("/register")) {
            // Show registration form
            request.getRequestDispatcher("/WEB-INF/jsp/register.jsp").forward(request, response);
        } else if (pathInfo.startsWith("/profile/")) {
            // Show user profile
            try {
                Long userId = Long.parseLong(pathInfo.substring(9));
                User user = libraryService.findUserById(userId);
                request.setAttribute("user", user);
                request.setAttribute("borrowedBooks", libraryService.getBorrowedBooks(userId));
                request.getRequestDispatcher("/WEB-INF/jsp/profile.jsp").forward(request, response);
            } catch (NumberFormatException e) {
                response.sendError(HttpServletResponse.SC_BAD_REQUEST);
            }
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        String pathInfo = request.getPathInfo();

        if (pathInfo.equals("/register")) {
            // Handle user registration
            String name = request.getParameter("name");
            String email = request.getParameter("email");
            String password = request.getParameter("password");
            String role = request.getParameter("role");

            try {
                User newUser = new User(null, name, email, password, 
                    User.UserRole.valueOf(role.toUpperCase()));
                libraryService.registerUser(newUser);
                response.sendRedirect(request.getContextPath() + "/user/profile/" + newUser.getId());
            } catch (IllegalArgumentException e) {
                request.setAttribute("error", "Invalid registration data");
                request.getRequestDispatcher("/WEB-INF/jsp/register.jsp").forward(request, response);
            }
        }
    }
}