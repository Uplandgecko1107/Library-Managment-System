# Library Management System Documentation

## Overview
The Library Management System is a modern web application for managing library resources, user accounts, and book transactions. This comprehensive system provides both administrative and member interfaces for efficient library operations.

## Features

### 1. Authentication System
- Secure email/password authentication
- Role-based access control (Admin/Member)
- Protected routes and API endpoints
- Session management
- Account settings and preferences

### 2. Book Management
- Comprehensive book catalog
- Real-time availability tracking
- Advanced search capabilities:
  - Title search
  - Author search
  - ISBN lookup
  - Category filtering
- Google Books API integration
- Cover image display
- Detailed book information

### 3. User Management
- User registration and profiles
- Role assignment (Admin/Member)
- Account status tracking
- Borrowing history
- Due date notifications
- Account settings

### 4. Borrowing System
- Book checkout process
- Due date tracking
- Return processing
- Availability updates
- Borrowing limits
- Overdue notifications

### 5. Administrative Features
- User management dashboard
- Book inventory control
- Transaction monitoring
- System statistics
- Report generation

## Technical Architecture

### Frontend (React + TypeScript)
- Component Structure:
  ```
  src/
  ├── components/
  │   ├── auth/         # Authentication components
  │   ├── books/        # Book-related components
  │   ├── common/       # Shared components
  │   └── users/        # User management components
  ├── contexts/         # React contexts
  ├── services/         # API services
  ├── types/           # TypeScript types
  └── utils/           # Utility functions
  ```

### Backend (Java)
- Package Structure:
  ```
  com.library/
  ├── model/           # Domain models
  ├── service/         # Business logic
  ├── repository/      # Data access
  ├── controller/      # REST endpoints
  └── util/           # Utilities
  ```

### Database (PostgreSQL)
- Tables:
  - users
  - books
  - borrowings
  - profiles

## Setup Instructions

### Prerequisites
- Node.js 18+
- Java JDK 11+
- PostgreSQL 14+
- Docker (optional)

### Frontend Setup
```bash
# Install dependencies
cd frontend
npm install

# Start development server
npm run dev
```

### Backend Setup
```bash
# Build project
cd backend
./mvnw clean install

# Run application
./mvnw spring-boot:run
```

### Database Setup
```bash
# Using Docker
docker-compose up -d db

# Manual setup
cd database
# Run migrations using your preferred tool
```

## Development Guidelines

### Code Style
- Follow ESLint configuration
- Use TypeScript strictly
- Implement proper error handling
- Write comprehensive tests
- Document complex logic

### Git Workflow
1. Create feature branch
2. Implement changes
3. Write/update tests
4. Submit pull request
5. Code review
6. Merge to main

### Testing
- Unit tests for business logic
- Integration tests for API
- End-to-end tests for critical flows
- Test coverage requirements: 80%+

## API Documentation

### Authentication Endpoints
```
POST /api/auth/login
POST /api/auth/register
POST /api/auth/logout
GET  /api/auth/user
```

### Book Endpoints
```
GET    /api/books
GET    /api/books/:id
POST   /api/books
PUT    /api/books/:id
DELETE /api/books/:id
```

### User Endpoints
```
GET    /api/users
GET    /api/users/:id
POST   /api/users
PUT    /api/users/:id
DELETE /api/users/:id
```

### Borrowing Endpoints
```
POST   /api/borrow
POST   /api/return
GET    /api/borrowings
GET    /api/borrowings/:id
```

## Security Measures

### Authentication
- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting on auth endpoints
- Session timeout handling

### Authorization
- Role-based access control
- Resource-level permissions
- API endpoint protection
- SQL injection prevention

### Data Protection
- Input validation
- XSS prevention
- CSRF protection
- Secure password storage

## Deployment

### Production Requirements
- Node.js production server
- Java application server
- PostgreSQL database
- Redis (optional, for caching)
- SSL certificate

### Environment Variables
```
DATABASE_URL=postgresql://user:pass@host:5432/dbname
JWT_SECRET=your-secret-key
GOOGLE_BOOKS_API_KEY=your-api-key
```

### Deployment Steps
1. Build frontend assets
2. Build backend application
3. Run database migrations
4. Configure environment variables
5. Start application servers
6. Configure reverse proxy

## Maintenance

### Regular Tasks
- Monitor error logs
- Check system performance
- Update dependencies
- Backup database
- Review security measures

### Troubleshooting
- Check application logs
- Verify database connectivity
- Confirm API responses
- Test authentication flow
- Validate data integrity

## Support

### Contact Information
- Technical Support: support@library.com
- Bug Reports: bugs@library.com
- Feature Requests: features@library.com

### Resources
- GitHub Repository
- API Documentation
- User Guide
- Admin Manual
