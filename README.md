# Library Management System

## Project Structure

```
library-management-system/
├── backend/                    # Backend Java application
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/library/
│   │   │   │       ├── config/         # Configuration files
│   │   │   │       ├── controller/     # REST controllers
│   │   │   │       ├── model/          # Domain models
│   │   │   │       ├── repository/     # Data access layer
│   │   │   │       ├── service/        # Business logic
│   │   │   │       └── util/           # Utility classes
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   │       └── java/
│   │           └── com/library/
│   │               └── service/         # Unit tests
│   └── pom.xml
│
├── frontend/                   # React frontend application
│   ├── public/
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── auth/         # Authentication components
│   │   │   ├── books/        # Book-related components
│   │   │   ├── common/       # Shared components
│   │   │   └── users/        # User-related components
│   │   ├── hooks/            # Custom React hooks
│   │   ├── services/         # API services
│   │   ├── types/            # TypeScript types
│   │   ├── utils/            # Utility functions
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── tsconfig.json
│
├── database/                  # Database migrations and schemas
│   ├── migrations/
│   │   ├── V1__initial_schema.sql
│   │   └── V2__add_indexes.sql
│   └── schema/
│       └── library_schema.sql
│
└── docker/                    # Docker configuration
    ├── backend/
    │   └── Dockerfile
    ├── frontend/
    │   └── Dockerfile
    └── docker-compose.yml
```

## Setup Instructions

1. Backend Setup
```bash
cd backend
./mvnw clean install
```

2. Frontend Setup
```bash
cd frontend
npm install
```

3. Database Setup
```bash
cd database
# Run migrations using your preferred tool
```

4. Run the Application
```bash
# Using Docker
docker-compose up

# Or run services individually
cd backend && ./mvnw spring-boot:run
cd frontend && npm run dev
```

For detailed setup instructions, see the README files in each directory.