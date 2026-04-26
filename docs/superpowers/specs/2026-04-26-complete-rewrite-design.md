# My-CDI Complete Rewrite Design

## Overview

Complete rewrite of My-CDI — a French school library (CDI) attendance tracking Electron desktop application. No backwards compatibility. Senior architect quality, following bulletproof-react guidelines, React Compiler, feature-driven + clean architecture on both frontend and backend.

## Technology Stack

| Layer     | Technology                                             | Version           |
| --------- | ------------------------------------------------------ | ----------------- |
| Framework | React                                                  | 19.x (latest LTS) |
| Desktop   | Electron                                               | v40.x             |
| Build     | electron-vite                                          | 5.x               |
| Language  | TypeScript                                             | 5.9.x             |
| Database  | better-sqlite3 + Drizzle ORM                           | latest            |
| State     | TanStack Query (server) + React Compiler (memoization) | 5.x               |
| Routing   | React Router                                           | 7.x               |
| Forms     | React Hook Form + Zod                                  | latest            |
| UI        | MUI (Material UI)                                      | 7.x               |
| i18n      | i18next + react-i18next                                | latest            |
| Testing   | Vitest + React Testing Library                         | latest            |
| Bundler   | Vite                                                   | 7.x               |

## Architecture Decisions

| Decision              | Choice                               | Rationale                                                              |
| --------------------- | ------------------------------------ | ---------------------------------------------------------------------- |
| Backend architecture  | Strict clean architecture            | Maximum testability, clear dependency direction, portability           |
| Frontend architecture | Feature-driven + Container/Presenter | bulletproof-react guidelines, testability, logic/UI separation         |
| State management      | TanStack Query only                  | React Compiler handles memoization. No global state library needed.    |
| React Compiler        | Strict mode                          | Automatic memoization, remove all manual useMemo/useCallback           |
| Routing               | React Router                         | Proper URL-based navigation, lazy loading, deep linking                |
| Form handling         | React Hook Form + Zod                | Type-safe schemas, runtime validation, integrates well with MUI        |
| Database              | Drizzle ORM + better-sqlite3         | Type-safe queries, lightweight, no native binaries for Electron        |
| IPC                   | Type-safe IPC router                 | End-to-end type safety, no manual channel strings, minimal boilerplate |
| Localization          | i18next                              | Keep for future extensibility, French-only currently                   |
| Testing               | Vitest + RTL                         | Fast, Vite-native, industry standard                                   |
| Design                | Current MUI design preserved         | Design migration is a separate future phase                            |

## Project Structure

### Top-Level

```
my-cdi/
├── electron.vite.config.ts
├── tsconfig.json
├── tsconfig.node.json
├── tsconfig.web.json
├── vitest.config.ts
├── drizzle.config.ts
├── package.json
├── drizzle/                              # Drizzle migration output
└── src/
```

### Feature-Vertical Architecture (Approach A)

Each feature is a self-contained vertical slice spanning both processes. Clean arch layers live inside each feature on the backend, and bulletproof-react structure lives inside each feature on the frontend.

```
src/
├── features/
│   ├── student/
│   │   ├── main/                     # Backend clean arch
│   │   ├── renderer/                 # Frontend
│   │   └── shared/                  # Types shared between main & renderer
│   └── frequentation/
│       ├── main/
│       ├── renderer/
│       └── shared/
├── shared/                           # Cross-cutting concerns
├── main/                             # Electron entry
├── preload/                          # Context bridge
└── renderer/                         # React entry + routes
```

### Backend Clean Architecture (per feature)

Dependency direction: `controllers → use-cases → entities ← gateways`

```
features/student/main/
├── entities/
│   └── student/
│       ├── student.entity.ts         # Drizzle schema + Zod schemas
│       ├── index.ts                  # Re-export
│       ├── helpers/
│       │   └── computeStudentFields/
│       │       ├── computeStudentFields.ts
│       │       ├── index.ts
│       │       └── __tests__/
│       │           └── computeStudentFields.test.ts
│       └── __tests__/
│           └── student.entity.test.ts
│
├── use-cases/
│   ├── createStudent/
│   │   ├── createStudent.ts
│   │   ├── index.ts
│   │   └── __tests__/
│   │       └── createStudent.test.ts
│   ├── updateStudent/
│   │   ├── updateStudent.ts
│   │   ├── index.ts
│   │   └── __tests__/
│   │       └── updateStudent.test.ts
│   ├── deleteStudent/
│   │   ├── deleteStudent.ts
│   │   ├── index.ts
│   │   └── __tests__/
│   │       └── deleteStudent.test.ts
│   ├── getStudent/
│   │   ├── getStudent.ts
│   │   ├── index.ts
│   │   └── __tests__/
│   │       └── getStudent.test.ts
│   ├── listStudents/
│   │   ├── listStudents.ts
│   │   ├── index.ts
│   │   └── __tests__/
│   │       └── listStudents.test.ts
│   ├── importStudentsCsv/
│   │   ├── importStudentsCsv.ts
│   │   ├── index.ts
│   │   ├── helpers/
│   │   │   └── parseStudentCsv/
│   │   │       ├── parseStudentCsv.ts
│   │   │       ├── index.ts
│   │   │       └── __tests__/
│   │   │           └── parseStudentCsv.test.ts
│   │   ├── validations/
│   │   │   └── csvRowSchema/
│   │   │       ├── csvRowSchema.ts
│   │   │       ├── index.ts
│   │   │       └── __tests__/
│   │   │           └── csvRowSchema.test.ts
│   │   ├── types/
│   │   │   └── CsvImportResult.ts       # Flat file (types exception)
│   │   └── __tests__/
│   │       └── importStudentsCsv.test.ts
│   ├── helpers/                          # Shared across use-cases
│   │   └── formatStudentResponse/
│   │       ├── formatStudentResponse.ts
│   │       ├── index.ts
│   │       └── __tests__/
│   │           └── formatStudentResponse.test.ts
│   └── types/                            # Flat files (types exception)
│       └── UseCaseResult.ts
│
├── gateways/
│   └── student/
│       ├── student.gateway.ts              # Interface
│       ├── student.gateway.drizzle.ts       # Implementation
│       ├── index.ts                         # Re-exports interface
│       ├── helpers/
│       │   └── mapStudentRow/
│       │       ├── mapStudentRow.ts
│       │       ├── index.ts
│       │       └── __tests__/
│       │           └── mapStudentRow.test.ts
│       └── __tests__/
│           └── student.gateway.drizzle.test.ts
│
└── controllers/
    └── student/
        ├── student.controller.ts
        ├── index.ts
        └── __tests__/
            └── student.controller.test.ts
```

### Frontend Structure (per feature)

```
features/student/renderer/
├── api/
│   ├── useStudentQueries/
│   │   ├── useStudentQueries.ts
│   │   ├── index.ts
│   │   └── __tests__/
│   │       └── useStudentQueries.test.ts
│   ├── useStudentMutations/
│   │   ├── useStudentMutations.ts
│   │   ├── index.ts
│   │   └── __tests__/
│   │       └── useStudentMutations.test.ts
│   └── studentKeys.ts                  # Flat file (constants exception)
│
├── pages/
│   └── StudentsPage/
│       ├── StudentsPage.tsx             # Container (page-level)
│       ├── index.tsx
│       ├── hooks/
│       │   └── useStudentsPage/
│       │       ├── useStudentsPage.ts
│       │       ├── index.ts
│       │       └── __tests__/
│       │           └── useStudentsPage.test.ts
│       ├── helpers/
│       │   └── getStudentsPageTitle/
│       │       ├── getStudentsPageTitle.ts
│       │       ├── index.ts
│       │       └── __tests__/
│       │           └── getStudentsPageTitle.test.ts
│       ├── types/
│       │   └── StudentsPageState.ts    # Flat file
│       ├── containers/
│       │   ├── StudentList/
│       │   │   ├── StudentList.tsx
│       │   │   ├── index.tsx
│       │   │   ├── hooks/
│       │   │   │   ├── useStudentSelection/
│       │   │   │   │   ├── useStudentSelection.ts
│       │   │   │   │   ├── index.ts
│       │   │   │   │   └── __tests__/
│       │   │   │   │       └── useStudentSelection.test.ts
│       │   │   │   └── useStudentListData/
│       │   │   │       ├── useStudentListData.ts
│       │   │   │       ├── index.ts
│       │   │   │       └── __tests__/
│       │   │   │           └── useStudentListData.test.ts
│       │   │   ├── helpers/
│       │   │   │   ├── filterStudentRows/
│       │   │   │   │   ├── filterStudentRows.ts
│       │   │   │   │   ├── index.ts
│       │   │   │   │   └── __tests__/
│       │   │   │   │       └── filterStudentRows.test.ts
│       │   │   │   └── sortStudentRows/
│       │   │   │       ├── sortStudentRows.ts
│       │   │   │       ├── index.ts
│       │   │   │       └── __tests__/
│       │   │   │           └── sortStudentRows.test.ts
│       │   │   ├── types/
│       │   │   │   └── StudentListProps.ts
│       │   │   ├── containers/
│       │   │   │   └── StudentBatchActions/
│       │   │   │       ├── StudentBatchActions.tsx
│       │   │   │       ├── index.tsx
│       │   │   │       ├── hooks/
│       │   │   │       │   └── useBatchDelete/
│       │   │   │       │       ├── useBatchDelete.ts
│       │   │   │       │       ├── index.ts
│       │   │   │       │       └── __tests__/
│       │   │   │       │       └── useBatchDelete.test.ts
│       │   │   │       ├── helpers/
│       │   │   │       │   └── formatBatchMessage/
│       │   │   │       │       ├── formatBatchMessage.ts
│       │   │   │       │       ├── index.ts
│       │   │   │       │       └── __tests__/
│       │   │   │       │       └── formatBatchMessage.test.ts
│       │   │   │       ├── types/
│       │   │   │       │   └── BatchAction.ts
│       │   │   │       ├── components/      # Optional — only if needed
│       │   │   │       │   └── BatchActionToolbar/
│       │   │   │       │       ├── BatchActionToolbar.tsx
│       │   │   │       │       ├── index.tsx
│       │   │   │       │       └── __tests__/
│       │   │   │       │       └── BatchActionToolbar.test.tsx
│       │   │   │       └── __tests__/
│       │   │   │           └── StudentBatchActions.test.tsx
│       │   │   ├── components/
│       │   │   │   ├── StudentTable/
│       │   │   │   │   ├── StudentTable.tsx
│       │   │   │   │   ├── index.tsx
│       │   │   │   │   ├── StudentTable.styles.ts
│       │   │   │   │   └── __tests__/
│       │   │   │   │       └── StudentTable.test.tsx
│       │   │   │   ├── StudentTableRow/
│       │   │   │   │   ├── StudentTableRow.tsx
│       │   │   │   │   └── index.tsx
│       │   │   │   └── StudentListToolbar/
│       │   │   │       ├── StudentListToolbar.tsx
│       │   │   │       └── index.tsx
│       │   │   └── __tests__/
│       │   │       └── StudentList.test.tsx
│       │   │
│       │   └── StudentForm/
│       │       ├── StudentForm.tsx
│       │       ├── index.tsx
│       │       ├── hooks/
│       │       │   └── useStudentForm/
│       │       │       ├── useStudentForm.ts
│       │       │       ├── index.ts
│       │       │       └── __tests__/
│       │       │           └── useStudentForm.test.ts
│       │       ├── helpers/
│       │       │   └── mapFormToCreateDto/
│       │       │       ├── mapFormToCreateDto.ts
│       │       │       ├── index.ts
│       │       │       └── __tests__/
│       │       │           └── mapFormToCreateDto.test.ts
│       │       ├── validations/
│       │       │   └── studentFormSchema/
│       │       │       ├── studentFormSchema.ts
│       │       │       ├── index.ts
│       │       │       └── __tests__/
│       │       │           └── studentFormSchema.test.ts
│       │       ├── types/
│       │       │   └── StudentFormData.ts
│       │       ├── components/
│       │       │   ├── StudentFormFields/
│       │       │   │   ├── StudentFormFields.tsx
│       │       │   │   ├── index.tsx
│       │       │   │   └── __tests__/
│       │       │   │       └── StudentFormFields.test.tsx
│       │       │   └── StudentFormActions/
│       │       │       ├── StudentFormActions.tsx
│       │       │       └── index.tsx
│       │       └── __tests__/
│       │           └── StudentForm.test.tsx
│       ├── components/
│       │   └── StudentsPageHeader/
│       │       ├── StudentsPageHeader.tsx
│       │       ├── index.tsx
│       │       └── __tests__/
│       │           └── StudentsPageHeader.test.tsx
│       └── __tests__/
│           └── StudentsPage.test.tsx
│
├── components/                           # Feature-level presenters (shared across pages)
│   ├── StudentCard/
│   │   ├── StudentCard.tsx
│   │   ├── index.tsx
│   │   ├── StudentCard.styles.ts
│   │   └── __tests__/
│   │       └── StudentCard.test.tsx
│   └── StudentAvatar/
│       ├── StudentAvatar.tsx
│       └── index.tsx
│
├── hooks/                               # Shared across pages
│   └── useStudentFilters/
│       ├── useStudentFilters.ts
│       ├── index.ts
│       └── __tests__/
│           └── useStudentFilters.test.ts
│
├── helpers/                             # Shared across pages
│   ├── studentTransformers/
│   │   ├── studentTransformers.ts
│   │   ├── index.ts
│   │   └── __tests__/
│   │       └── studentTransformers.test.ts
│   └── studentFormatters/
│       ├── studentFormatters.ts
│       ├── index.ts
│       └── __tests__/
│           └── studentFormatters.test.ts
│
├── validations/                          # Shared across pages
│   └── studentSchema/
│       ├── studentSchema.ts
│       ├── index.ts
│       └── __tests__/
│           └── studentSchema.test.ts
│
└── types/                               # Flat files (types exception)
    └── index.ts
```

### Shared Cross-Cutting

```
src/shared/
├── ipc/
│   ├── router.ts                          # Main-side: createRouter, procedure()
│   ├── client.ts                          # Preload: bridges router to renderer
│   └── types.ts                          # Shared inference types
│
├── db/
│   ├── connection.ts                      # better-sqlite3 singleton
│   ├── schema.ts                          # Re-exports all feature schemas
│   └── migrate.ts                         # Run Drizzle migrations on startup
│
├── ui/
│   ├── components/                        # Design system primitives
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── index.tsx
│   │   │   └── __tests__/
│   │   │       └── Button.test.tsx
│   │   ├── Dialog/
│   │   ├── TextField/
│   │   ├── DataTable/
│   │   ├── Autocomplete/
│   │   ├── DatePicker/
│   │   └── ConfirmDialog/
│   ├── theme/
│   │   ├── theme.ts
│   │   └── index.ts
│   ├── styles/
│   │   └── global.css
│   ├── hooks/                             # Global UI hooks
│   │   └── useDialog/
│   │       ├── useDialog.ts
│   │       ├── index.ts
│   │       └── __tests__/
│   │           └── useDialog.test.ts
│   ├── helpers/                           # Global UI helpers
│   │   └── formatDate/
│   │       ├── formatDate.ts
│   │       ├── index.ts
│   │       └── __tests__/
│   │           └── formatDate.test.ts
│   ├── validations/                        # Global Zod schemas
│   │   └── emailSchema/                   # Example
│   │       ├── emailSchema.ts
│   │       ├── index.ts
│   │       └── __tests__/
│   │           └── emailSchema.test.ts
│   └── types/                             # Flat files (types exception)
│       └── index.ts
│
├── lib/
│   ├── utils/
│   │   ├── utils.ts
│   │   ├── index.ts
│   │   └── __tests__/
│   │       └── utils.test.ts
│   └── errors/
│       ├── errors.ts
│       ├── index.ts
│       └── __tests__/
│           └── errors.test.ts
│
├── types/                                # Cross-feature domain types (flat)
│   └── index.ts                          # ActivityType, etc.
│
└── i18n/
    ├── config.ts
    └── locales/
        └── fr/
            ├── common.json
            ├── student.json
            └── frequentation.json
```

### Infrastructure

```
src/main/
├── index.ts                              # Electron startup, window creation
└── modules.ts                            # Wire features → DB → IPC router

src/preload/
└── index.ts                              # Expose IPC router client to renderer

src/renderer/
├── index.html
├── main.tsx                               # React root + providers
├── App.tsx                                # Router setup
└── routes/
    ├── index.tsx                           # Route definitions
    ├── JournalPage.tsx                     # Lazy: features/frequentation/renderer/pages/JournalPage/JournalPage
    ├── StudentsPage.tsx                    # Lazy: features/student/renderer/pages/StudentsPage/StudentsPage
    └── StatisticsPage.tsx                 # Lazy: placeholder stub
```

## Architectural Rules

### File Structure Rules

1. **Every named unit of code is a folder** with `moduleName.ts`/`moduleName.tsx` + `index.ts`/`index.tsx` re-export. No exceptions except types and constants.
2. **Every folder with logic has `__tests__/`** co-located.
3. **Types and query key factories are flat files** — they're declarative, never need tests or subfolders.
4. **`.tsx` for JSX, `.ts` for everything else** — applies to `index` files too.
5. **Gateway folders are the only exception**: two coordinated files (`*.gateway.ts` interface + `*.gateway.drizzle.ts` implementation) + `index.ts` re-exporting the interface.
6. **No barrel files**: `index.ts` files only re-export from their single sibling implementation file.

### Co-Location Rules

Every artifact lives as close as possible to its consumer. Only hoisted when shared by 2+ consumers at the same level.

| Artifact   | 1 consumer                   | Multiple at same level  | Cross-feature                         |
| ---------- | ---------------------------- | ----------------------- | ------------------------------------- |
| Component  | `containers/X/components/Y/` | `renderer/components/`  | `shared/ui/components/`               |
| Container  | `pages/X/containers/Y/`      | N/A (nest deeper)       | N/A                                   |
| Hook       | `containers/X/hooks/`        | `renderer/hooks/`       | `shared/ui/hooks/`                    |
| Helper     | `containers/X/helpers/`      | `renderer/helpers/`     | `shared/ui/helpers/` or `shared/lib/` |
| Validation | `containers/X/validations/`  | `renderer/validations/` | `shared/ui/validations/`              |
| Type       | `containers/X/types/`        | `renderer/types/`       | `shared/types/` or `feature/shared/`  |

### Container/Presenter Pattern

- **Containers** import hooks, manage state, pass data to presenters via props
- **Presenters** are pure props→JSX components — no hooks, no state, no logic
- **Components folder inside a container is optional** — only created when the container has its own scoped presenters
- **Containers can nest** — a container may have `containers/` subfolder with its own sub-containers

### Logic Separation

- **Zero logic in components** — all logic in hooks (state-dependent) or helpers (pure functions)
- **Hooks = state-dependent logic only** — pure functions, formatting, transforms go in `helpers/`
- **Helpers = pure functions** — no React, no state, no side effects

### Import Rules

| Scenario                      | Style            | Example                                                              |
| ----------------------------- | ---------------- | -------------------------------------------------------------------- |
| Same folder or its subfolders | Relative         | `import { useBatchDelete } from './hooks/useBatchDelete'`            |
| Same feature, different level | Alias            | `import { useStudentQueries } from '@student/api/useStudentQueries'` |
| Different feature             | Alias via shared | `import type { StudentGateway } from '@student-shared'`              |
| Cross-cutting shared          | Alias            | `import { useDialog } from '@shared/ui/hooks/useDialog'`             |
| Design system                 | Short alias      | `import { Button } from '@ui/components/Button'`                     |
| Utilities                     | Short alias      | `import { AppError } from '@lib/errors'`                             |
| Shared types                  | Short alias      | `import type { ActivityType } from '@types'`                         |

### Path Aliases

| Alias                   | Resolves to (Renderer)                  | Resolves to (Main)                  |
| ----------------------- | --------------------------------------- | ----------------------------------- |
| `@student/*`            | `src/features/student/renderer/*`       | `src/features/student/main/*`       |
| `@frequentation/*`      | `src/features/frequentation/renderer/*` | `src/features/frequentation/main/*` |
| `@student-shared`       | `src/features/student/shared`           | `src/features/student/shared`       |
| `@frequentation-shared` | `src/features/frequentation/shared`     | `src/features/frequentation/shared` |
| `@shared/*`             | `src/shared/*`                          | `src/shared/*`                      |
| `@ui/*`                 | `src/shared/ui/*`                       | N/A                                 |
| `@lib`                  | `src/shared/lib`                        | `src/shared/lib`                    |
| `@types`                | `src/shared/types`                      | `src/shared/types`                  |

### Clean Architecture Dependency Rules (Backend)

```
controllers → use-cases → entities ← gateways (interface)
                                   ↓
                          gateways (implementation, injected at wiring time)
```

- Use-cases depend on gateway **interfaces**, never implementations
- Gateway implementations are injected at wiring time in `modules.ts`
- Cross-feature dependencies: `frequentation` use-cases may depend on `student` gateway **interface**, not implementation
- Controllers are thin IPC orchestration only

### Data Flow

```
[User Action]
    ↓
[Container Component (hooks + state)]
    ↓
[React Query Mutation Hook] (renderer/api/)
    ↓
[IPC Client] (shared/ipc/client.ts)
    ↓
[Preload Bridge] (preload/index.ts — thin pass-through)
    ↓
[IPC Router] (shared/ipc/router.ts)
    ↓
[Controller] (features/X/main/controllers/)
    ↓
[Use Case] (features/X/main/use-cases/)
    ↓
[Gateway Interface] (features/X/main/gateways/X.gateway.ts)
    ↓
[Gateway Implementation] (features/X/main/gateways/X.gateway.drizzle.ts)
    ↓
[Drizzle → SQLite] (shared/db/)
```

### Testing Strategy

| File type                  | Test type   | Test location                     | What it tests                             |
| -------------------------- | ----------- | --------------------------------- | ----------------------------------------- |
| `hooks/`                   | Unit        | `hooks/unitName/__tests__/`       | Hook logic in isolation (renderHook, act) |
| `helpers/`                 | Unit        | `helpers/unitName/__tests__/`     | Pure function I/O                         |
| `validations/`             | Unit        | `validations/unitName/__tests__/` | Zod schema pass/fail                      |
| Use-case `index.ts`        | Unit        | `use-cases/unitName/__tests__/`   | Business logic with mock gateway          |
| Entity `index.ts`          | Unit        | `entities/unitName/__tests__/`    | Drizzle schema + Zod validation           |
| Gateway implementation     | Unit        | `gateways/unitName/__tests__/`    | Drizzle queries against in-memory SQLite  |
| `api/` (React Query hooks) | Unit        | `api/unitName/__tests__/`         | Query keys, mutation calls                |
| Container components       | Integration | `containers/X/__tests__/`         | Container renders, data flows, callbacks  |
| Presenter components       | Integration | `components/X/__tests__/`         | Props render correctly, user interactions |
| Page components            | Integration | `pages/X/__tests__/`              | Page renders, routes work                 |

### i18n Strategy

Namespaced JSON files at `shared/i18n/` (not per-feature). French-only for now, but extensible.

```
shared/i18n/
├── config.ts
└── locales/
    └── fr/
        ├── common.json          # Shared UI strings
        ├── student.json         # Student feature strings
        └── frequentation.json   # Journal/attendance strings
```

## Database

### Schema (Drizzle)

```sql
CREATE TABLE students (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nom TEXT NOT NULL,
  prenom TEXT NOT NULL,
  classe TEXT NOT NULL,
  ine TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE frequentation (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  starts_at DATETIME NOT NULL,
  activity TEXT NOT NULL,
  student_id INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

CREATE INDEX idx_students_nom ON students(nom, prenom);
CREATE INDEX idx_students_classe ON students(classe);
CREATE INDEX idx_freq_date ON frequentation(DATE(starts_at));
CREATE INDEX idx_freq_student ON frequentation(student_id);
```

Migrations managed by Drizzle Kit. Auto-cleanup: frequentations older than 2 years deleted on startup.

## Feature Scope

Same scope as current app, rearchitected:

1. **Student management** — CRUD, search, CSV import, batch operations
2. **Attendance journal** — Date-based attendance tracking, activity selection, batch actions
3. **Statistics** — Placeholder page (stub for future development)

## Code Quality Rules

### No Type Casting

No `as` assertions, no non-null assertions, no double casts.

```ts
// ❌ BAD
const student = row as StudentEntity
const name = data!.nom
const id = (row as unknown as { id: string }).id

// ✅ GOOD — Zod validates at boundaries
const student = StudentEntitySchema.parse(row)
const result = studentGateway.getById(id) // returns StudentEntity | null, handle null

// ✅ GOOD — Type narrowing
if (typeof value === 'string') {
  /* value is string here */
}
if ('nom' in row && typeof row.nom === 'string') {
  /* narrowed */
}

// ✅ GOOD — Discriminated union
type Result = { success: true; data: Student } | { success: false; error: string }
if (result.success) {
  /* result.data is Student */
}
```

**ESLint enforcement:**

| Rule                                               | Setting | Package                            |
| -------------------------------------------------- | ------- | ---------------------------------- |
| `@typescript-eslint/no-unnecessary-type-assertion` | `error` | `@typescript-eslint/eslint-plugin` |
| `@typescript-eslint/no-non-null-assertion`         | `error` | `@typescript-eslint/eslint-plugin` |
| `@typescript-eslint/no-unsafe-assignment`          | `error` | `@typescript-eslint/eslint-plugin` |
| `@typescript-eslint/no-unsafe-call`                | `error` | `@typescript-eslint/eslint-plugin` |
| `@typescript-eslint/no-unsafe-member-access`       | `error` | `@typescript-eslint/eslint-plugin` |
| `@typescript-eslint/no-unsafe-return`              | `error` | `@typescript-eslint/eslint-plugin` |
| `@typescript-eslint/no-explicit-any`               | `error` | `@typescript-eslint/eslint-plugin` |

### No Magic Strings

No raw strings in logic. Every string that represents a concept must be a named constant, enum, or generated value.

```ts
// ❌ BAD
ipcMain.handle('student:create', ...)
queryClient.invalidateQueries({ queryKey: ['students'] })
if (activity === 'work') { ... }
navigate('/students')
throw new Error('STUDENT_NOT_FOUND')

// ✅ GOOD
router.procedure('student.create', ...)              // auto-generated channel
queryClient.invalidateQueries({ queryKey: studentKeys.all })  // query key factory
if (activity === ActivityType.WORK) { ... }           // enum
navigate(ROUTES.STUDENTS)                             // route constant
throw new AppError(ErrorCode.STUDENT_NOT_FOUND)       // error code enum
```

**What goes where:**

| String type           | Mechanism                           | Location                     |
| --------------------- | ----------------------------------- | ---------------------------- |
| IPC channels          | Auto-generated by type-safe router  | `shared/ipc/router.ts`       |
| Query keys            | Query key factory                   | Feature `api/studentKeys.ts` |
| Activity types        | `ActivityType` enum                 | `shared/types/index.ts`      |
| Route paths           | `ROUTES` constants                  | `shared/lib/routes/index.ts` |
| Error codes           | `ErrorCode` enum + `AppError` class | `shared/lib/errors/index.ts` |
| i18n keys             | Type-safe via i18next `Resources`   | `shared/i18n/config.ts`      |
| DB table/column names | Drizzle schema (auto-typed)         | Feature `entities/*/`        |

**ESLint enforcement:**

| Rule                                         | Setting                                                 | Package                            |
| -------------------------------------------- | ------------------------------------------------------- | ---------------------------------- |
| `no-restricted-syntax`                       | `error` — disallow string literals in specific patterns | Built-in                           |
| `@typescript-eslint/switch-exhaustive-check` | `error`                                                 | `@typescript-eslint/eslint-plugin` |

Custom `no-restricted-syntax` rules to catch magic strings in common patterns:

```js
{
  "no-restricted-syntax": [
    "error",
    {
      "selector": "CallExpression[callee.name='invalidateQueries'] > ObjectExpression > Property[key.name='queryKey'] > ArrayExpression > Literal",
      "message": "Use query key factory constants, not inline string literals"
    }
  ]
}
```

### No Magic Numbers

No bare numbers in business logic. Every numeric value must be a named constant.

```ts
// ❌ BAD
if (students.length > 1000) { ... }
setTimeout(fetchData, 300)
const yearsAgo = dayjs().subtract(2, 'year')

// ✅ GOOD
const MAX_CSV_IMPORT_ROWS = 1000
const DEBOUNCE_MS = 300
const CLEANUP_RETENTION_YEARS = 2

if (students.length > MAX_CSV_IMPORT_ROWS) { ... }
setTimeout(fetchData, DEBOUNCE_MS)
const yearsAgo = dayjs().subtract(CLEANUP_RETENTION_YEARS, 'year')
```

**Rules:**

- Array indices (`arr[0]`, `arr[1]`) are acceptable when using tuple types — but prefer named destructuring
- Numeric literals in tests are acceptable when they're the expected value under test
- Constants follow the same co-location rule — live where used, hoist when shared

**ESLint enforcement:**

| Rule               | Setting | Package  |
| ------------------ | ------- | -------- |
| `no-magic-numbers` | `error` | Built-in |

Configuration:

```js
{
  "no-magic-numbers": ["error", {
    "ignore": [-1, 0, 1],           // Common array/loop indices
    "ignoreArrayIndexes": true,       // arr[i] is fine
    "ignoreDefaultValues": true,       // Function defaults like (timeout = 300) need the value
    "enforceConst": true,             // Extracted constants must be const
    "detectObjects": true             // Catches { timeout: 300 }
  }]
}
```

### Shared Constants Structure

Constants follow the same co-location rules as other artifacts:

```
shared/lib/
├── routes/                           # Route path constants
│   ├── routes.ts
│   └── index.ts
├── errors/                           # Error codes + AppError class
│   ├── errors.ts
│   ├── index.ts
│   └── __tests__/
└── utils/                            # Generic utilities
    ├── utils.ts
    ├── index.ts
    └── __tests__/

features/student/main/
├── use-cases/
│   └── importStudentsCsv/
│       ├── helpers/
│       │   └── csvConstants/         # Constants only used by this use-case
│       │       ├── csvConstants.ts
│       │       └── index.ts
```

## Migration Notes

This is a **complete rewrite** with no backwards compatibility:

- All existing code will be replaced
- No legacy IPC channels or compatibility layer
- Database schema preserved but accessed through Drizzle ORM
- Existing data will be migrated by Drizzle
- Current MUI design preserved (new design is a future phase)
