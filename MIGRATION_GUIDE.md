# Migration Guide: New Type-Safe Architecture

## 🎯 Overview

This document shows how to migrate from the old system to the new type-safe architecture.

## 📊 Before vs After

### Old System Problems

```typescript
// ❌ Unsafe database access
static fromDbRow(row: Record<string, unknown>): Student {
  return new Student(
    row.id as number,        // Unsafe casting!
    row.nom as string,       // No runtime validation!
    // ...
  )
}

// ❌ Direct database access in controllers
const students = this.db.prepare('SELECT * FROM students').all()
```

### New System Benefits

```typescript
// ✅ Safe database access with validation
transformStudentDbRowToEntity(row: StudentDbRow): StudentEntity {
  const validation = validateDbRow(row, ['id', 'nom', 'prenom', 'classe']);
  if (!validation.isValid) {
    throw new Error(`Invalid student database row: missing ${validation.missingFields.join(', ')}`);
  }
  // Safe transformation...
}

// ✅ Clean separation of concerns
Controller → Manager → Repository → Database
```

## 🔄 API Migration

### Old API Calls → New API Calls

#### Student Operations

| Old IPC Call     | New Architecture | Usage                                                 |
| ---------------- | ---------------- | ----------------------------------------------------- |
| `student:add`    | `student:create` | `studentController.create({nom, prenom, classe})`     |
| `student:getAll` | `student:getAll` | `studentController.getAll()`                          |
| `student:update` | `student:update` | `studentController.update(id, {nom, prenom, classe})` |
| `student:delete` | `student:delete` | `studentController.delete(id)`                        |

#### Frequentation Operations

| Old IPC Call                | New Architecture               | Usage                                                |
| --------------------------- | ------------------------------ | ---------------------------------------------------- |
| `frequentation:addMultiple` | `frequentation:createBatch`    | `frequentationController.createBatch(dtos)`          |
| `frequentation:getByDate`   | `frequentation:getByDateRange` | `frequentationController.getByDateRange(start, end)` |
| `frequentation:delete`      | `frequentation:delete`         | `frequentationController.delete(id)`                 |

## 🏗️ Architecture Layers

### 1. Controllers (`src/main/controllers/`)

**Purpose**: Handle IPC requests and responses

```typescript
// New API pattern
ipcMain.handle('student:create', async (_event, createDto: CreateStudentDto) => {
  const result = await this.studentManager.create(createDto)
  return {
    success: result.success,
    data: result.success ? this.studentManager.toResponseDto(result.data!) : undefined,
    error: result.error
  }
})
```

### 2. Managers (`src/main/managers/`)

**Purpose**: Business logic and validation

```typescript
async create(createDto: CreateStudentDto): Promise<ManagerResponse<StudentModel>> {
  const validation = validateStudent(createDto);
  if (!validation.isValid) {
    return { success: false, errors: validation.errors };
  }
  // Business logic here...
}
```

### 3. Repositories (`src/main/repositories/`)

**Purpose**: Data access layer with SQL

```typescript
async create(studentDto: CreateStudentDto): Promise<StudentEntity> {
  const sql = this.loadSqlFile(this.getSqlPath('students', 'insert.sql'));
  const result = await this.executeRun(sql, [nom, prenom, classe]);
  return this.findById(result.lastID);
}
```

### 4. Transformers (`src/main/transformers/`)

**Purpose**: Safe data conversion between layers

```typescript
export function transformStudentDbRowToEntity(row: StudentDbRow): StudentEntity {
  const validation = validateDbRow(row, ['id', 'nom', 'prenom', 'classe'])
  if (!validation.isValid) {
    throw new Error(`Invalid student database row: missing ${validation.missingFields.join(', ')}`)
  }
  return {
    id: safeNumber(row.id),
    nom: safeString(row.nom),
    prenom: safeString(row.prenom),
    classe: safeString(row.classe)
    // ...
  }
}
```

## 📁 Folder Structure

```
src/
├── shared/
│   └── types/              # Shared types between backend/frontend
│       ├── dtos/           # API contracts
│       ├── models/         # Business logic types
│       └── index.ts
├── main/
│   ├── types/entities/      # Database entities (Backend only)
│   ├── controllers/        # IPC handlers
│   ├── managers/          # Business logic
│   ├── repositories/      # Data access
│   ├── transformers/      # Data conversion
│   ├── sql/              # SQL queries
│   └── services/         # Dependency injection
└── renderer/
    └── types/            # Frontend-specific types
```

## 🔧 Type Safety Improvements

### Eliminated `Record<string, unknown>`

- **Before**: 9 instances of unsafe `Record<string, unknown>`
- **After**: 0 instances - all database rows have explicit types

### Explicit Type Definitions

```typescript
// Database row type (Backend only)
export interface StudentDbRow {
  id: number
  nom: string
  prenom: string
  classe: string
  created_at: string
  updated_at: string
}

// API contract (Shared)
export interface CreateStudentDto {
  nom: string
  prenom: string
  classe: string
}

// Business model (Shared)
export interface StudentModel {
  id: number
  nom: string
  prenom: string
  classe: string
  fullName: string // Computed property
}
```

## 🚀 Benefits Achieved

✅ **Type Safety**: No more unsafe casting  
✅ **Validation**: Runtime validation for all data  
✅ **Separation**: Clear boundaries between layers  
✅ **Testability**: Each layer can be tested independently  
✅ **Maintainability**: Organized SQL queries and types  
✅ **Scalability**: Easy to add new features following the pattern

## 🔄 Migration Strategy

### Phase 1: Foundation (✅ Complete)

- [x] Create new folder structure
- [x] Define explicit types
- [x] Implement repositories and managers
- [x] Create controllers with new APIs
- [x] Add compatibility layer

### Phase 2: Gradual Migration (In Progress)

- [ ] Update frontend to use new DTOs
- [ ] Replace old IPC calls with new ones
- [ ] Update error handling to use new response format
- [ ] Add new features using the new architecture

### Phase 3: Cleanup (Pending)

- [ ] Remove old controllers and routes
- [ ] Remove old models
- [ ] Remove compatibility layer
- [ ] Update documentation

## 🎯 Next Steps

1. **Frontend Migration**: Update frontend services to use new DTOs and APIs
2. **Error Handling**: Implement consistent error handling in frontend
3. **Testing**: Add unit tests for each layer
4. **Performance**: Add caching and optimization where needed

## 📞 Support

For questions about the migration:

- Check the transformer utilities for safe data conversion
- Look at the manager implementations for business logic patterns
- Refer to SQL files for query examples
- Use the compatibility layer as a bridge during migration
