# 🏗️ Modular Architecture Plan

## 🎯 **Current Problem**

- Scattered folders: `controllers/`, `managers/`, `repositories/`, `sql/`
- SQL files causing path issues in production
- Types mixed between shared and individual files
- Hard to maintain and scale

## 🚀 **Proposed Solution**

### **New Structure**

```
src/
├── shared/
│   └── types/          # Shared types between frontend/backend ONLY
├── main/
│   └── modules/       # 🆕 NEW: Reusable business modules
│       ├── student/   # Student module
│       │   ├── types.ts     # Module-specific types
│       │   ├── models.ts     # Module models (object-based)
│       │   ├── repository.ts # Module repository
│       │   ├── manager.ts     # Module manager
│       │   ├── controller.ts  # Module controller
│       │   └── sql.ts        # SQL exports (no .sql files)
│       └── frequentation/ # Frequentation module
│           ├── types.ts
│           ├── models.ts
│           ├── repository.ts
│           ├── manager.ts
│           ├── controller.ts
│           └── sql.ts
├── main/
│   └── index.ts        # 🆕 REFACTORED: Module orchestrator
└── renderer/
    └── index.ts        # 🆕 REFACTORED: Module consumer
```

### **Module Structure Example**

#### **Student Module** (`src/shared/modules/student/`)

```typescript
// types.ts - Module-specific interfaces
export interface StudentCreateData {
  nom: string
  prenom: string
  classe: string
}

// models.ts - Object-based models
export const StudentModel = {
  create: (data: StudentEntity) => ({
    id: data.id,
    fullName: `${data.prenom} ${data.nom}`
    // ... business logic
  }),

  validate: (data: StudentCreateData) => {
    // validation logic
  }
}

// repository.ts - Data access
export const StudentRepository = {
  insert: (db: Database, data: StudentCreateData) => {
    return db.prepare('INSERT INTO students...').run(data)
  }
}

// manager.ts - Business logic
export const StudentManager = {
  create: async (data: StudentCreateData) => {
    // business logic
    return StudentRepository.insert(db, data)
  }
}

// controller.ts - IPC handlers
export const StudentController = {
  register: (ipc: IpcMain) => {
    ipc.handle('student:create', async (_, data) => {
      return StudentManager.create(data)
    })
  }
}

// sql.ts - SQL exports (no .sql files)
export const StudentSQL = {
  INSERT:
    "INSERT INTO students (nom, prenom, classe, created_at, updated_at) VALUES (?, ?, ?, datetime('now'), datetime('now'))",
  SELECT_ALL: 'SELECT * FROM students ORDER BY nom, prenom'
  // ... more queries
}
```

### **Backend Orchestrator** (`src/main/index.ts`)

```typescript
import { StudentController } from '../shared/modules/student/controller'
import { FrequentationController } from '../shared/modules/frequentation/controller'

// Initialize all modules
export function initializeModules() {
  StudentController.register(ipcMain)
  FrequentationController.register(ipcMain)
}
```

### **Frontend Consumer** (`src/renderer/index.ts`)

```typescript
import { StudentManager } from '../shared/modules/student/manager'

// Use module functionality
export const useStudentModule = () => {
  const createStudent = StudentManager.create
  // ... hooks and services
}
```

## 🎯 **Benefits**

### ✅ **Modularity**

- Each feature is self-contained
- Easy to add/remove modules
- Clear dependencies between modules
- Reusable across projects

### ✅ **No More SQL Files**

- SQL is TypeScript exports
- No path resolution issues
- Better type safety for SQL

### ✅ **Clean Dependencies**

- Internal module dependencies
- Shared types for inter-module communication
- Clear import/export patterns

### ✅ **Scalability**

- Module-based architecture
- Easy testing per module
- Plugin-like extensibility

## 🔄 **Migration Strategy**

### **Phase 1: Create Module Templates**

1. Create module folder structure
2. Migrate student module as template
3. Migrate frequentation module as template
4. Update orchestrators

### **Phase 2: Migrate Existing Code**

1. Move existing controllers to module pattern
2. Update types to module-based
3. Refactor services to use modules
4. Update frontend to use modules

### **Phase 3: Cleanup**

1. Remove old scattered folders
2. Update imports throughout
3. Fix any remaining type issues
4. Update documentation

## 🚀 **Implementation Priority**

**High Priority:**

1. `src/shared/modules/student/` - Complete student module
2. `src/shared/modules/frequentation/` - Complete frequentation module
3. `src/main/index.ts` - Module orchestrator
4. `src/renderer/index.ts` - Module consumer

**Medium Priority:**

1. Additional modules (reports, analytics, etc.)
2. Module testing framework
3. Inter-module communication utilities

## 📁 **File Organization**

### **Shared Modules** (`src/shared/modules/`)

- Each module is a complete business feature
- Contains types, models, repository, manager, controller, SQL
- Modules can depend on each other

### **Clear Boundaries**

- Frontend only imports module managers
- Backend only imports module controllers
- Types flow from shared to both sides

### **Export Strategy**

- Default export per module
- Central index exports per module
- Shared inter-module types

This architecture gives you:

- **🔧 Maintainability**: Modular, testable, scalable
- **🚀 Performance**: Tree-shaking, better imports
- **📦 Organization**: Feature-based development
- **🧪 Type Safety**: End-to-end type coverage
- **🔄 Reusability**: Cross-project module sharing

Ready to implement this modular architecture?
