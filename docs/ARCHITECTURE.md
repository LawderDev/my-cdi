# My-CDI Architecture & Guidelines

> Living document. Every line of code in this repo follows these rules.

---

## 1. Overview

My-CDI is a French school library (CDI) attendance tracking Electron desktop application.

| Layer     | Technology                           |
| --------- | ------------------------------------ |
| Framework | React 19 + Electron 40               |
| Build     | electron-vite 5 + Vite 7             |
| Language  | TypeScript 5.9                       |
| Database  | better-sqlite3 + Drizzle ORM         |
| State     | TanStack Query 5 + React Compiler    |
| Routing   | React Router 7                       |
| Forms     | React Hook Form + Zod                |
| UI        | MUI 7                                |
| i18n      | i18next + react-i18next              |
| Testing   | Vitest + React Testing Library       |

---

## 2. Feature-Vertical Architecture

Each feature is a self-contained vertical slice spanning both Electron processes.

```
src/
├── features/
│   ├── student/
│   │   ├── main/        # Backend clean arch
│   │   ├── renderer/    # Frontend
│   │   └── shared/      # Types shared main ↔ renderer
│   ├── frequentation/
│   └── statistics/
├── shared/              # Cross-cutting concerns
├── main/                # Electron entry + module wiring
├── preload/             # Context bridge
└── renderer/            # React root + routes
```

---

## 3. Backend Clean Architecture

Dependency direction:

```
controllers → use-cases → entities ← gateways (interface)
                                   ↓
                          gateways (implementation, injected at wiring time)
```

Rules:
- **Use-cases depend on gateway interfaces only** — never implementations
- **Gateway implementations are injected** in `features/X/main/index.ts`
- **Controllers are thin IPC orchestration** — no business logic
- Cross-feature dependencies: `frequentation` use-cases may depend on `student` gateway **interface**, not implementation

```
features/student/main/
├── entities/student/           # Drizzle schema + Zod schemas
├── use-cases/createStudent/      # Business logic
├── gateways/student/             # Interface + Drizzle implementation
└── controllers/student/         # IPC wiring
```

---

## 4. Frontend Container/Presenter Pattern

### Containers
- Import hooks, manage state, pass data to presenters via props
- May nest other containers
- **All logic lives here**

### Presenters
- Pure `props → JSX` components
- **Zero hooks** except `useTranslation` (read-only context consumer)
- **Zero state, zero logic, zero inline functions**
- Every presenter has a dedicated `.styles.ts` file

```tsx
// ✅ Container — hooks, state, logic
export function JournalEntryForm() {
  const form = useJournalEntryForm()
  return <JournalEntryFormView form={form} />
}

// ✅ Presenter — pure display
export function JournalEntryFormView({ form }: JournalEntryFormViewProps) {
  return <Box>...</Box>
}
```

---

## 5. React Quality Rules

### No Manual Memoization
React Compiler handles automatic memoization. **Zero** `useMemo` / `useCallback` in the codebase.

### No `useWatch`
Use `form.formState.isValid` or derived values during render instead of watching fields.

### `useEffect` Only for External System Sync
Per [React docs](https://react.dev/learn/you-might-not-need-an-effect), `useEffect` is **only** allowed for synchronizing with external systems:

- `useClock` — syncs with browser `setInterval`
- `usePageTitle` — syncs with `document.title`
- `useKeyboardShortcuts` — syncs with `document` key events
- `useAutoUpdater` — syncs with Electron auto-updater

**Forbidden in all other cases** — derive state during render, not in effects.

### Hooks Location
- **Containers** and **hooks/** folders only
- **Presenters** must have zero hooks (except `useTranslation`)
- **Helpers** must have zero React imports

### No Inline Components
Never define a component inside another component. Extract to its own folder with `index.ts` + `.styles.ts`.

---

## 6. Code Quality Rules

### No Type Casting
No `as Type`, no `as unknown`, no `as never`, no non-null assertions (`!.`).

Allowed: `as const` (readonly literal narrowing).

```ts
// ❌
const student = row as StudentEntity
const name = data!.nom

// ✅
const student = StudentEntitySchema.parse(row)
const result = studentGateway.getById(id) // returns StudentEntity | null
```

### No Magic Strings
Every concept-string is a named constant:

| String type    | Mechanism              | Location                   |
| -------------- | ---------------------- | -------------------------- |
| Query keys     | Query key factory      | `features/X/api/XKeys.ts`  |
| Activity types | `ActivityType` enum    | `shared/types/index.ts`    |
| Route paths    | `ROUTES` constants     | `shared/lib/routes/`       |
| Error codes    | `ErrorCode` enum       | `shared/lib/errors/`       |
| i18n keys      | Type-safe `Resources`  | `shared/i18n/config.ts`    |

### No Magic Numbers
Every numeric value is a named `const`:

```ts
// ❌
if (students.length > 1000) { ... }

// ✅
const MAX_CSV_IMPORT_ROWS = 1000
if (students.length > MAX_CSV_IMPORT_ROWS) { ... }
```

Exception: MUI spacing values `0–12` are theme-relative and don't need constants.

### No Bracketless One-Line If
Every `if`, `else if`, `else` uses curly braces:

```ts
// ❌
if (!student) return null

// ✅
if (!student) {
  return null
}
```

### Prefer Early Return
Flatten nested conditionals with guard clauses:

```ts
// ❌ nested
if (entry) {
  if (entry.isValid) {
    doWork(entry)
  }
}

// ✅ early return
if (!entry) {
  return
}
if (!entry.isValid) {
  return
}
doWork(entry)
```

### Single Responsibility Per Function
Each function does exactly one thing. If you need "and" to describe it, split it.

### Self-Documented Code — No Comments
Code must explain itself through clear names. Comments are **only** for explaining **why**, never **what** or **how**.

```ts
// ❌
const MAX_RETRIES = 3 // maximum number of retries

// ✅
const MAX_RETRIES = 3

// ✅ acceptable — explains why
const CACHE_TTL_MS = 5 * 60 * 1000 // SQLite WAL mode plan cache invalidates after 5min
```

### No Abbreviations
Use full words. `v` → `version`, `num` → `number`, `msg` → `message`.

---

## 7. File Structure Rules

1. **Every named unit is a folder** with `moduleName.ts`/`moduleName.tsx` + `index.ts` re-export
2. **Every folder with logic has `__tests__/`** co-located
3. **Types and query key factories are flat files** — no subfolders, no tests
4. **`.tsx` for JSX, `.ts` for everything else** — applies to `index` files too
5. **Gateway exception**: two coordinated files (`*.gateway.ts` + `*.gateway.drizzle.ts`) + `index.ts`
6. **No barrel files**: `index.ts` only re-exports from its single sibling implementation

---

## 8. Co-Location Rules

Every artifact lives as close as possible to its consumer. Only hoist when shared by 2+ consumers at the same level.

| Artifact   | 1 consumer                   | Multiple at same level   | Cross-feature             |
| ---------- | ---------------------------- | ------------------------ | ------------------------- |
| Component  | `containers/X/components/Y/` | `renderer/components/`     | `shared/ui/components/`   |
| Container  | `pages/X/containers/Y/`      | N/A (nest deeper)        | N/A                       |
| Hook       | `containers/X/hooks/`        | `renderer/hooks/`          | `shared/ui/hooks/`        |
| Helper     | `containers/X/helpers/`        | `renderer/helpers/`        | `shared/ui/helpers/`      |
| Validation | `containers/X/validations/`    | `renderer/validations/`    | `shared/ui/validations/`  |
| Type       | `containers/X/types/`          | `renderer/types/`          | `shared/types/`           |

---

## 9. Import Rules & Path Aliases

| Scenario                      | Style    | Example                                                              |
| ----------------------------- | -------- | -------------------------------------------------------------------- |
| Same folder or subfolders       | Relative | `import { useBatchDelete } from './hooks/useBatchDelete'`            |
| Same feature, different level   | Alias    | `import { useStudentQueries } from '@student/api/useStudentQueries'`   |
| Different feature               | Shared   | `import type { StudentGateway } from '@student-shared'`                |
| Cross-cutting shared            | Alias    | `import { useDialog } from '@shared/ui/hooks/useDialog'`             |
| Design system                   | Short    | `import { Button } from '@ui/components/Button'`                       |
| Utilities                       | Short    | `import { AppError } from '@lib/errors'`                             |

### Path Aliases

| Alias                   | Resolves to (Renderer)                  | Resolves to (Main)              |
| ----------------------- | --------------------------------------- | ------------------------------- |
| `@student/*`            | `src/features/student/renderer/*`       | `src/features/student/main/*`   |
| `@frequentation/*`      | `src/features/frequentation/renderer/*` | `src/features/frequentation/main/*` |
| `@statistics/*`         | `src/features/statistics/renderer/*`    | `src/features/statistics/main/*` |
| `@student-shared`       | `src/features/student/shared`           | `src/features/student/shared` |
| `@frequentation-shared` | `src/features/frequentation/shared`     | `src/features/frequentation/shared` |
| `@statistics-shared`    | `src/features/statistics/shared`        | `src/features/statistics/shared` |
| `@shared/*`             | `src/shared/*`                          | `src/shared/*`                |
| `@ui/*`                 | `src/shared/ui/*`                       | N/A                             |
| `@lib`                  | `src/shared/lib`                        | `src/shared/lib`                |
| `@types`                | `src/shared/types`                      | `src/shared/types`              |

---

## 10. Testing Strategy

| File type                  | Test type     | Location                          | What it tests                          |
| -------------------------- | ------------- | --------------------------------- | -------------------------------------- |
| `hooks/`                   | Unit          | `hooks/unitName/__tests__/`       | Hook logic in isolation                |
| `helpers/`                 | Unit          | `helpers/unitName/__tests__/`     | Pure function I/O                      |
| `validations/`             | Unit          | `validations/unitName/__tests__/` | Zod schema pass/fail                   |
| Use-case `index.ts`        | Unit          | `use-cases/unitName/__tests__/`   | Business logic with mock gateway       |
| Entity `index.ts`          | Unit          | `entities/unitName/__tests__/`    | Drizzle schema + Zod validation        |
| Gateway implementation     | Unit          | `gateways/unitName/__tests__/`    | Drizzle queries against in-memory DB   |
| `api/` (React Query hooks) | Unit          | `api/unitName/__tests__/`         | Query keys, mutation calls             |
| Container components       | Integration   | `containers/X/__tests__/`         | Renders, data flows, callbacks         |
| Presenter components       | Integration   | `components/X/__tests__/`         | Props render correctly, interactions     |
| Page components            | Integration   | `pages/X/__tests__/`              | Page renders, routes work                |

**Rule:** Every folder with logic has `__tests__/` co-located. No empty test directories.

---

## 11. Data Flow

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

---

## 12. i18n Strategy

Namespaced JSON files at `shared/i18n/locales/fr/`:

```
shared/i18n/
├── config.ts
└── locales/
    └── fr/
        ├── common.json        # Shared UI strings
        ├── student.json       # Student feature strings
        └── frequentation.json # Attendance strings
```

- French-only for now, but extensible
- Type-safe via i18next `Resources` interface

---

## 13. Exceptions

The following patterns are explicitly allowed as exceptions to the rules above:

### `as const` Readonly Narrowing
Allowed for literal type narrowing. All other `as` assertions are forbidden.

### `useTranslation` in Presenters
`useTranslation('namespace')` is allowed in presenter components. It is a read-only context hook and does not introduce logic or state.

### MUI Spacing Values
MUI `sx` prop spacing values (`mt`, `mb`, `gap`, `p`, etc.) in the range `0–12` are theme-relative and do not need named constants. Values outside this range and all other numeric values must still be named constants.

---

## 14. Compliance Checklist

When adding or modifying code, verify:

- [ ] No `useMemo` / `useCallback`
- [ ] No `useWatch`
- [ ] `useEffect` only in external-system-sync hooks
- [ ] No hooks in presenters (except `useTranslation`)
- [ ] No inline functions/components inside components
- [ ] Dedicated `.styles.ts` for every JSX file
- [ ] No `as` assertions (except `as const`)
- [ ] No non-null assertions (`!.`)
- [ ] No magic strings in `invalidateQueries` — use query key factories
- [ ] No magic numbers — named constants
- [ ] No bracketless `if`
- [ ] Prefer early return over nesting
- [ ] Single responsibility per function
- [ ] No comments explaining "what" or "how"
- [ ] No abbreviations
- [ ] `__tests__/` co-located with every logic folder
- [ ] Build passes (`npm run typecheck`)
- [ ] All tests pass (`npx vitest run`)
