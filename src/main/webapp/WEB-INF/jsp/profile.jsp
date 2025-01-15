<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
    <title>User Profile</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/style.css">
</head>
<body>
    <div class="container">
        <h2>User Profile</h2>
        
        <div class="profile-info">
            <p><strong>Name:</strong> ${user.name}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Role:</strong> ${user.role}</p>
            <p><strong>Status:</strong> ${user.active ? 'Active' : 'Inactive'}</p>
        </div>
        
        <h3>Borrowed Books</h3>
        <c:choose>
            <c:when test="${empty borrowedBooks}">
                <p>No books currently borrowed.</p>
            </c:when>
            <c:otherwise>
                <ul class="book-list">
                    <c:forEach items="${borrowedBooks}" var="book">
                        <li>
                            <span class="book-title">${book.title}</span>
                            by <span class="book-author">${book.author}</span>
                        </li>
                    </c:forEach>
                </ul>
            </c:otherwise>
        </c:choose>
    </div>
</body>
</html>