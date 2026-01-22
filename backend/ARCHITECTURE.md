# Backend Architecture

## SOLID Principles Implementation

This backend follows SOLID principles and industry best practices for maintainable, scalable code.

### Architecture Overview

```
src/
├── controllers/        # Handle HTTP requests/responses
├── services/          # Business logic layer
├── repositories/      # Data access layer
├── interfaces/        # Contracts & abstractions (centralized)
├── dtos/             # Data Transfer Objects
├── middlewares/      # Express middlewares
├── routes/           # Route definitions
└── utils/            # Utility functions
```

**Why centralized `interfaces/` folder?**
- Interfaces represent contracts, not implementations
- Better adherence to Dependency Inversion Principle
- Single source of truth for all abstractions
- Easier to discover and maintain
- Supports shared interfaces across modules

### Key Design Patterns

#### 1. **Dependency Injection**
Classes receive their dependencies through constructors, making them loosely coupled and testable.

```typescript
// Route setup with DI
const issueRepository = new IssueRepository(prisma);
const issueService = new IssueService(issueRepository);
const issueController = new IssueController(issueService);
```

#### 2. **Repository Pattern**
Abstracts data access logic behind interfaces, making it easy to swap implementations.

```typescript
interface IIssueRepository {
  findAll(): Promise<IssueWithAssigned[]>;
  findById(id: number): Promise<IssueWithAssigned | null>;
  // ... more methods
}
```

#### 3. **Service Layer**
Business logic is separated from controllers and data access.

#### 4. **DTOs (Data Transfer Objects)**
Type-safe data structures for API requests/responses.

### SOLID Principles Applied

#### **S - Single Responsibility Principle**
- Controllers: Handle HTTP layer only
- Services: Contain business logic
- Repositories: Handle data access
- Each class has one reason to change

#### **O - Open/Closed Principle**
- Interfaces allow extending behavior without modifying existing code
- New repositories can be added by implementing `IIssueRepository`

#### **L - Liskov Substitution Principle**
- Any `IIssueRepository` implementation can replace another
- Service depends on interface, not concrete implementation

#### **I - Interface Segregation Principle**
- Interfaces are focused and specific
- Clients only depend on methods they use

#### **D - Dependency Inversion Principle**
- High-level modules (Service) depend on abstractions (IIssueRepository)
- Low-level modules (IssueRepository) implement abstractions
- Dependencies flow toward abstractions, not concretions

### Benefits

✅ **Testability**: Easy to mock dependencies for unit testing  
✅ **Maintainability**: Clear separation of concerns  
✅ **Scalability**: Easy to add new features  
✅ **Flexibility**: Swap implementations without changing consumers  
✅ **Type Safety**: Full TypeScript support with interfaces  

### API Endpoints

```
GET    /api/issues         # Get all issues
GET    /api/issues/:id     # Get issue by ID
POST   /api/issues         # Create new issue
PUT    /api/issues/:id     # Update issue
DELETE /api/issues/:id     # Delete issue
```

### Error Handling

Centralized error handling with custom error classes:
- `AppError`: Base error class
- `NotFoundError`: 404 errors
- `ValidationError`: 400 errors
- `DatabaseError`: 500 errors

All async errors are caught by the `asyncHandler` wrapper.

### Response Format

All API responses follow a consistent format:

```typescript
{
  "success": true,
  "data": { ... },
  "message": "Optional message"
}
```

### Testing Strategy

The architecture supports multiple testing approaches:

1. **Unit Tests**: Test services with mocked repositories
2. **Integration Tests**: Test routes with real database
3. **Repository Tests**: Test data access layer

Example unit test:
```typescript
const mockRepo = {
  findAll: jest.fn().mockResolvedValue([mockIssue])
};
const service = new IssueService(mockRepo);
// Test service logic in isolation
```
