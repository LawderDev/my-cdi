# Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Set up the complete project foundation — configs, path aliases, shared infrastructure (IPC router, DB, errors, routes, i18n, theme), and ESLint rules — so that feature development can proceed independently.

**Architecture:** Clean rewrite from scratch. Delete all existing `src/` code. Set up electron-vite + Vite with TypeScript strict mode, path aliases, Drizzle ORM, a type-safe IPC router pattern, and shared UI/design system infrastructure.

**Tech Stack:** electron-vite 5.x, Vite 7.x, TypeScript 5.9.x (strict), React 19.x, Electron 40.x, Drizzle ORM, better-sqlite3, Vitest, ESLint 9.x, @typescript-eslint/eslint-plugin

---

## File Structure

```
my-cdi/
├── .prettierrc.yaml                    # Already exists, keep
├── .prettierignore                     # Already exists, keep
├── .editorconfig                       # Already exists, keep
├── .gitignore                          # Already exists, keep
├── .nvmrc                              # Already exists, keep
├── electron.vite.config.ts            # Modify: add path aliases
├── tsconfig.json                       # Modify: add strict + path aliases
├── tsconfig.node.json                  # Modify: add strict + path aliases for main
├── tsconfig.web.json                   # Modify: add strict + path aliases for renderer
├── vitest.config.ts                    # Create: Vitest configuration
├── drizzle.config.ts                   # Create: Drizzle Kit migration config
├── eslint.config.mjs                   # Modify: add strict rules
├── package.json                        # Modify: update dependencies
│
├── drizzle/                            # Create: migration output directory
│
├── data/                               # Keep: SQLite database location
│
└── src/
    ├── shared/
    │   ├── ipc/
    │   │   ├── router.ts              # Main-side IPC router
    │   │   ├── client.ts              # Renderer-side IPC client
    │   │   ├── router.ts              # Main-side IPC router
    │   │   ├── client.ts              # Renderer-side IPC client
    │   │   └── types.ts               # Shared inference types
    │   ├── db/
    │   │   ├── connection.ts          # better-sqlite3 singleton
    │   │   ├── schema.ts              # Re-exports all feature schemas
    │   │   └── migrate.ts            # Run Drizzle migrations on startup
    │   ├── lib/
    │   │   ├── errors/
    │   │   │   ├── errors.ts
    │   │   │   ├── index.ts
    │   │   │   └── __tests__/
    │   │   │       └── errors.test.ts
    │   │   ├── routes/
    │   │   │   ├── routes.ts
    │   │   │   └── index.ts
    │   │   └── utils/
    │   │       ├── utils.ts
    │   │       ├── index.ts
    │   │       └── __tests__/
    │   │           └── utils.test.ts
    │   ├── types/
    │   │   └── index.ts               # ActivityType, cross-feature types
    │   ├── ui/
    │   │   ├── components/             # Design system (empty initially, wrap MUI)
    │   │   ├── theme/
    │   │   │   ├── theme.ts
    │   │   │   └── index.ts
    │   │   ├── styles/
    │   │   │   └── global.css
    │   │   ├── hooks/
    │   │   │   └── useDialog/
    │   │   │       ├── useDialog.ts
    │   │   │       ├── index.ts
    │   │   │       └── __tests__/
    │   │   │           └── useDialog.test.ts
    │   │   ├── helpers/
    │   │   │   └── formatDate/
    │   │   │       ├── formatDate.ts
    │   │   │       ├── index.ts
    │   │   │       └── __tests__/
    │   │   │           └── formatDate.test.ts
    │   │   └── types/
    │   │       └── index.ts
    │   └── i18n/
    │       ├── config.ts
    │       └── locales/
    │           └── fr/
    │               ├── common.json
    │               ├── student.json
    │               └── frequentation.json
    ├── main/
    │   ├── index.ts                    # Electron entry (minimal, wiring in modules.ts)
    │   └── modules.ts                  # Feature module wiring (empty initially)
    ├── preload/
    │   └── index.ts                    # Context bridge (expose IPC client)
    └── renderer/
        ├── index.html
        ├── main.tsx                    # React root + providers
        ├── App.tsx                     # React Router setup
        └── routes/
            └── index.tsx               # Route definitions (empty pages initially)
```

---

### Task 1: Clean Slate — Remove Existing Source Code

**Files:**

- Delete: `src/main/` (all existing main process code)
- Delete: `src/renderer/` (all existing renderer code)
- Delete: `src/preload/` (all existing preload code)
- Delete: `src/shared/` (all existing shared code)
- Delete: `MODULAR_ARCHITECTURE_PLAN.md`
- Delete: `MIGRATION_GUIDE.md`
- Delete: `REFACTORING_COMPLETE.md`

- [ ] **Step 1: Delete old source directories**

```bash
rm -rf src/main src/renderer src/preload src/shared
```

- [ ] **Step 2: Delete outdated docs**

```bash
rm MODULAR_ARCHITECTURE_PLAN.md MIGRATION_GUIDE.md REFACTORING_COMPLETE.md
```

- [ ] **Step 3: Verify clean state**

Run: `git status`
Expected: Only deletions showing in working tree

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "chore: remove old source code for complete rewrite"
```

---

### Task 2: Update Dependencies

**Files:**

- Modify: `package.json`

- [ ] **Step 1: Remove old dependencies and add new ones**

Replace the `dependencies` and `devDependencies` sections in `package.json`:

```json
{
  "dependencies": {
    "@electron-toolkit/preload": "^3.0.2",
    "@electron-toolkit/utils": "^4.0.0",
    "@emotion/react": "^11.14.0",
    "@emotion/styled": "^11.14.1",
    "@mui/icons-material": "^7.3.7",
    "@mui/material": "^7.3.7",
    "@mui/utils": "^7.3.7",
    "@mui/x-date-pickers": "^8.26.0",
    "@tanstack/react-query": "^5.90.20",
    "better-sqlite3": "^12.6.2",
    "dayjs": "^1.11.19",
    "drizzle-orm": "^0.44.0",
    "electron-updater": "^6.7.3",
    "i18next": "^25.8.0",
    "papaparse": "^5.5.3",
    "react-hook-form": "^7.56.0",
    "react-i18next": "^16.5.4",
    "react-router": "^7.6.0",
    "zod": "^3.24.0"
  },
  "devDependencies": {
    "@electron-toolkit/eslint-config-prettier": "^3.0.0",
    "@electron-toolkit/eslint-config-ts": "^3.1.0",
    "@electron-toolkit/tsconfig": "^2.0.0",
    "@tanstack/react-query-devtools": "^5.91.2",
    "@testing-library/jest-dom": "^6.6.0",
    "@testing-library/react": "^16.3.0",
    "@testing-library/user-event": "^14.6.0",
    "@types/better-sqlite3": "^7.6.0",
    "@types/node": "^25.0.10",
    "@types/papaparse": "^5.3.0",
    "@types/react": "^19.2.10",
    "@types/react-dom": "^19.2.3",
    "@typescript-eslint/eslint-plugin": "^8.33.0",
    "@vitejs/plugin-react": "^5.1.2",
    "babel-plugin-react-compiler": "^1.0.0",
    "drizzle-kit": "^0.31.0",
    "electron": "^40.0.0",
    "electron-builder": "^26.4.0",
    "electron-vite": "^5.0.0",
    "eslint": "^9.39.2",
    "eslint-plugin-import": "^2.32.0",
    "eslint-plugin-react": "^7.37.5",
    "eslint-plugin-react-hooks": "^7.0.1",
    "eslint-plugin-react-refresh": "^0.4.26",
    "jsdom": "^26.0.0",
    "prettier": "^3.8.1",
    "react": "19.2.4",
    "react-dom": "19.2.4",
    "typescript": "^5.9.3",
    "vite": "^7.3.1",
    "vitest": "^3.2.0"
  }
}
```

- [ ] **Step 2: Install dependencies**

Run: `pnpm install`
Expected: All packages installed successfully

- [ ] **Step 3: Commit**

```bash
git add package.json pnpm-lock.yaml && git commit -m "chore: update dependencies for rewrite"
```

---

### Task 3: TypeScript Configuration — Strict Mode + Path Aliases

**Files:**

- Modify: `tsconfig.json`
- Modify: `tsconfig.node.json`
- Modify: `tsconfig.web.json`

- [ ] **Step 1: Update root tsconfig.json with strict mode**

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "forceConsistentCasingInFileNames": true,
    "exactOptionalPropertyTypes": false
  }
}
```

- [ ] **Step 2: Update tsconfig.web.json with renderer path aliases**

```json
{
  "extends": "@electron-toolkit/tsconfig/web",
  "include": [
    "src/renderer/**/*.ts",
    "src/renderer/**/*.tsx",
    "src/preload/*.ts",
    "src/shared/**/*.ts",
    "src/shared/**/*.tsx",
    "src/features/**/*.ts",
    "src/features/**/*.tsx"
  ],
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "forceConsistentCasingInFileNames": true,
    "composite": true,
    "baseUrl": ".",
    "paths": {
      "@student/*": ["src/features/student/renderer/*"],
      "@frequentation/*": ["src/features/frequentation/renderer/*"],
      "@student-shared": ["src/features/student/shared"],
      "@frequentation-shared": ["src/features/frequentation/shared"],
      "@shared/*": ["src/shared/*"],
      "@ui/*": ["src/shared/ui/*"],
      "@lib/*": ["src/shared/lib/*"],
      "@lib": ["src/shared/lib"],
      "@types": ["src/shared/types"]
    }
  }
}
```

- [ ] **Step 3: Update tsconfig.node.json with main process path aliases**

```json
{
  "extends": "@electron-toolkit/tsconfig/node",
  "include": ["src/main/**/*.ts", "src/preload/*.ts", "src/shared/**/*.ts", "src/features/**/*.ts"],
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "forceConsistentCasingInFileNames": true,
    "composite": true,
    "baseUrl": ".",
    "paths": {
      "@student/*": ["src/features/student/main/*"],
      "@frequentation/*": ["src/features/frequentation/main/*"],
      "@student-shared": ["src/features/student/shared"],
      "@frequentation-shared": ["src/features/frequentation/shared"],
      "@shared/*": ["src/shared/*"],
      "@lib/*": ["src/shared/lib/*"],
      "@lib": ["src/shared/lib"],
      "@types": ["src/shared/types"]
    }
  }
}
```

- [ ] **Step 4: Commit**

```bash
git add tsconfig.json tsconfig.web.json tsconfig.node.json && git commit -m "chore: add strict TS config + path aliases"
```

---

### Task 4: Vite Configuration with Path Aliases + React Compiler

**Files:**

- Modify: `electron.vite.config.ts`

- [ ] **Step 1: Update electron.vite.config.ts with path aliases and React Compiler**

```ts
import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    resolve: {
      alias: {
        '@student': resolve('src/features/student/main'),
        '@frequentation': resolve('src/features/frequentation/main'),
        '@student-shared': resolve('src/features/student/shared'),
        '@frequentation-shared': resolve('src/features/frequentation/shared'),
        '@shared': resolve('src/shared'),
        '@lib': resolve('src/shared/lib'),
        '@types': resolve('src/shared/types')
      }
    }
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@student': resolve('src/features/student/renderer'),
        '@frequentation': resolve('src/features/frequentation/renderer'),
        '@student-shared': resolve('src/features/student/shared'),
        '@frequentation-shared': resolve('src/features/frequentation/shared'),
        '@shared': resolve('src/shared'),
        '@ui': resolve('src/shared/ui'),
        '@lib': resolve('src/shared/lib'),
        '@types': resolve('src/shared/types')
      }
    },
    plugins: [
      react({
        babel: {
          plugins: [['babel-plugin-react-compiler', { target: '19' }]]
        }
      })
    ]
  }
})
```

- [ ] **Step 2: Commit**

```bash
git add electron.vite.config.ts && git commit -m "chore: add path aliases + React Compiler to Vite config"
```

---

### Task 5: ESLint Configuration — Strict Rules

**Files:**

- Modify: `eslint.config.mjs`

- [ ] **Step 1: Write failing ESLint config test (create a temp file with violations)**

Create `src/__eslint_test__/violations.ts`:

```ts
export const badCast = (input: unknown) => input as string
export const badNonNull = (data: { name?: string }) => data!.name
export const badAny = (input: any) => input
export const BAD_MAGIC_NUMBER = [1, 2, 3].length > 42
```

- [ ] **Step 2: Update eslint.config.mjs with strict rules**

```js
import js from '@eslint/js'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsparser from '@typescript-eslint/parser'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import reactRefreshPlugin from 'eslint-plugin-react-refresh'
import importPlugin from 'eslint-plugin-import'

export default tseslint.config(
  { ignores: ['dist', 'out', 'node_modules', 'drizzle'] },
  {
    extends: [js.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true }
      }
    },
    plugins: {
      '@typescript-eslint': tseslint,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'react-refresh': reactRefreshPlugin,
      import: importPlugin
    },
    rules: {
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-unsafe-call': 'error',
      '@typescript-eslint/no-unsafe-member-access': 'error',
      '@typescript-eslint/no-unsafe-return': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/switch-exhaustive-check': 'error',
      'no-magic-numbers': [
        'error',
        {
          ignore: [-1, 0, 1],
          ignoreArrayIndexes: true,
          ignoreDefaultValues: true,
          enforceConst: true,
          detectObjects: true
        }
      ],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'import/no-cycle': 'error',
      'no-restricted-syntax': [
        'error',
        {
          selector:
            "CallExpression[callee.name='invalidateQueries'] > ObjectExpression > Property[key.name='queryKey'] > ArrayExpression > Literal",
          message: 'Use query key factory constants, not inline string literals'
        }
      ]
    },
    settings: {
      react: { version: '19.0' }
    }
  }
)
```

- [ ] **Step 3: Run ESLint on the violations file**

Run: `npx eslint src/__eslint_test__/violations.ts`
Expected: FAIL with errors for `as`, `!`, `any`, and magic number 42

- [ ] **Step 4: Remove the test violations file**

```bash
rm -rf src/__eslint_test__
```

- [ ] **Step 5: Commit**

```bash
git add eslint.config.mjs && git commit -m "chore: add strict ESLint config (no type casting, no magic strings/numbers)"
```

---

### Task 6: Vitest Configuration

**Files:**

- Create: `vitest.config.ts`

- [ ] **Step 1: Create vitest.config.ts**

```ts
import { defineConfig } from 'vitest/config'
import { resolve } from 'path'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/shared/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    alias: {
      '@student': resolve('src/features/student/renderer'),
      '@frequentation': resolve('src/features/frequentation/renderer'),
      '@student-shared': resolve('src/features/student/shared'),
      '@frequentation-shared': resolve('src/features/frequentation/shared'),
      '@shared': resolve('src/shared'),
      '@ui': resolve('src/shared/ui'),
      '@lib': resolve('src/shared/lib'),
      '@types': resolve('src/shared/types')
    }
  }
})
```

- [ ] **Step 2: Create test setup file**

Create `src/shared/test/setup.ts`:

```ts
import '@testing-library/jest-dom/vitest'
```

- [ ] **Step 3: Create shared/test folder with index.ts re-export**

Create `src/shared/test/index.ts`:

```ts
export { render } from '@testing-library/react'
export { default as userEvent } from '@testing-library/user-event'
export { renderHook, act } from '@testing-library/react'
```

- [ ] **Step 4: Verify vitest runs (with no tests yet)**

Run: `npx vitest run`
Expected: "No test files found" (which is correct — no tests yet)

- [ ] **Step 5: Commit**

```bash
git add vitest.config.ts src/shared/test && git commit -m "chore: add Vitest configuration + test setup"
```

---

### Task 7: Shared Types — ActivityType + Cross-Feature Types

**Files:**

- Create: `src/shared/types/index.ts`

- [ ] **Step 1: Write the test**

Create `src/shared/types/__tests__/types.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { ActivityType, ACTIVITY_LABELS } from '../index'

describe('ActivityType', () => {
  it('has all expected values', () => {
    expect(ActivityType.WORK).toBe('work')
    expect(ActivityType.READING).toBe('reading')
    expect(ActivityType.COMPUTER).toBe('computer')
    expect(ActivityType.RELAXATION).toBe('relaxation')
    expect(ActivityType.OTHER).toBe('other')
  })

  it('has labels for all activity types', () => {
    const activityTypes = Object.values(ActivityType) as ActivityType[]
    for (const type of activityTypes) {
      expect(ACTIVITY_LABELS[type]).toBeDefined()
    }
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/shared/types`
Expected: FAIL — cannot resolve `../index`

- [ ] **Step 3: Write the implementation**

Create `src/shared/types/index.ts`:

```ts
export enum ActivityType {
  WORK = 'work',
  READING = 'reading',
  COMPUTER = 'computer',
  RELAXATION = 'relaxation',
  OTHER = 'other'
}

export const ACTIVITY_LABELS: Record<ActivityType, string> = {
  [ActivityType.WORK]: 'Travail',
  [ActivityType.READING]: 'Lecture',
  [ActivityType.COMPUTER]: 'Ordinateur',
  [ActivityType.RELAXATION]: 'Détente',
  [ActivityType.OTHER]: 'Autre'
} as const

export const ACTIVITY_TYPES = Object.values(ActivityType) as ActivityType[]
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/shared/types`
Expected: PASS — all tests green

- [ ] **Step 5: Commit**

```bash
git add src/shared/types && git commit -m "feat: add ActivityType enum with labels"
```

---

### Task 8: Shared Errors — AppError + ErrorCode

**Files:**

- Create: `src/shared/lib/errors/errors.ts`
- Create: `src/shared/lib/errors/index.ts`
- Create: `src/shared/lib/errors/__tests__/errors.test.ts`

- [ ] **Step 1: Write the test**

Create `src/shared/lib/errors/__tests__/errors.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { AppError, ErrorCode, isAppError } from '../errors'

describe('AppError', () => {
  it('creates an error with code and message', () => {
    const error = new AppError(ErrorCode.STUDENT_NOT_FOUND, 'Student 42 not found')
    expect(error.code).toBe(ErrorCode.STUDENT_NOT_FOUND)
    expect(error.message).toBe('Student 42 not found')
    expect(error.name).toBe('AppError')
    expect(error).toBeInstanceOf(Error)
    expect(error).toBeInstanceOf(AppError)
  })

  it('creates an error with cause', () => {
    const cause = new Error('DB connection failed')
    const error = new AppError(ErrorCode.DATABASE_ERROR, 'DB error', { cause })
    expect(error.cause).toBe(cause)
  })

  it('serializes to JSON with code', () => {
    const error = new AppError(ErrorCode.VALIDATION_ERROR, 'Invalid input')
    const json = error.toJSON()
    expect(json.code).toBe(ErrorCode.VALIDATION_ERROR)
    expect(json.message).toBe('Invalid input')
  })
})

describe('isAppError', () => {
  it('returns true for AppError instances', () => {
    const error = new AppError(ErrorCode.STUDENT_NOT_FOUND, 'Not found')
    expect(isAppError(error)).toBe(true)
  })

  it('returns false for regular Error', () => {
    expect(isAppError(new Error('regular'))).toBe(false)
  })

  it('returns false for non-error values', () => {
    expect(isAppError(null)).toBe(false)
    expect(isAppError(undefined)).toBe(false)
    expect(isAppError('string')).toBe(false)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/shared/lib/errors`
Expected: FAIL — cannot resolve `../errors`

- [ ] **Step 3: Write the implementation**

Create `src/shared/lib/errors/errors.ts`:

```ts
export enum ErrorCode {
  STUDENT_NOT_FOUND = 'STUDENT_NOT_FOUND',
  STUDENT_DUPLICATE_INE = 'STUDENT_DUPLICATE_INE',
  FREQUENTATION_NOT_FOUND = 'FREQUENTATION_NOT_FOUND',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  DATABASE_ERROR = 'DATABASE_ERROR',
  IPC_ERROR = 'IPC_ERROR',
  CSV_PARSE_ERROR = 'CSV_PARSE_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

export class AppError extends Error {
  readonly code: ErrorCode

  constructor(code: ErrorCode, message: string, options?: ErrorOptions) {
    super(message, options)
    this.name = 'AppError'
    this.code = code
  }

  toJSON(): { code: ErrorCode; message: string } {
    return { code: this.code, message: this.message }
  }
}

export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError
}
```

Create `src/shared/lib/errors/index.ts`:

```ts
export { AppError, ErrorCode, isAppError } from './errors'
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/shared/lib/errors`
Expected: PASS — all tests green

- [ ] **Step 5: Commit**

```bash
git add src/shared/lib/errors && git commit -m "feat: add AppError class with ErrorCode enum"
```

---

### Task 9: Shared Routes Constants

**Files:**

- Create: `src/shared/lib/routes/routes.ts`
- Create: `src/shared/lib/routes/index.ts`

- [ ] **Step 1: Write the implementation**

Create `src/shared/lib/routes/routes.ts`:

```ts
export const ROUTES = {
  JOURNAL: '/',
  STUDENTS: '/students',
  STATISTICS: '/statistics'
} as const

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES]
```

Create `src/shared/lib/routes/index.ts`:

```ts
export { ROUTES, type RoutePath } from './routes'
```

- [ ] **Step 2: Commit**

```bash
git add src/shared/lib/routes && git commit -m "feat: add route path constants"
```

---

### Task 10: Shared Utilities

**Files:**

- Create: `src/shared/lib/utils/utils.ts`
- Create: `src/shared/lib/utils/index.ts`
- Create: `src/shared/lib/utils/__tests__/utils.test.ts`

- [ ] **Step 1: Write the test**

Create `src/shared/lib/utils/__tests__/utils.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { generateId, assertNever } from '../utils'

describe('generateId', () => {
  it('returns a string', () => {
    const id = generateId()
    expect(typeof id).toBe('string')
  })

  it('returns unique values', () => {
    const ids = new Set(Array.from({ length: 100 }, generateId))
    expect(ids.size).toBe(100)
  })
})

describe('assertNever', () => {
  it('throws for any value at runtime', () => {
    expect(() => assertNever('test' as never)).toThrow()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/shared/lib/utils`
Expected: FAIL

- [ ] **Step 3: Write the implementation**

Create `src/shared/lib/utils/utils.ts`:

```ts
let idCounter = 0

export function generateId(): string {
  idCounter += 1
  return `id-${idCounter}-${Math.random().toString(36).substring(2, 9)}`
}

export function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${String(value)}`)
}
```

Create `src/shared/lib/utils/index.ts`:

```ts
export { generateId, assertNever } from './utils'
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/shared/lib/utils`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/shared/lib/utils && git commit -m "feat: add shared utility functions"
```

---

### Task 11: Shared UI — Theme

**Files:**

- Create: `src/shared/ui/theme/theme.ts`
- Create: `src/shared/ui/theme/index.ts`

- [ ] **Step 1: Write the theme (matching current app's dark theme)**

Create `src/shared/ui/theme/theme.ts`:

```ts
import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#7C4DFF'
    },
    background: {
      default: '#111936',
      paper: '#1a1f3a'
    }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
  }
})
```

Create `src/shared/ui/theme/index.ts`:

```ts
export { theme } from './theme'
```

- [ ] **Step 2: Commit**

```bash
git add src/shared/ui/theme && git commit -m "feat: add MUI dark theme configuration"
```

---

### Task 12: Shared UI — Global Styles

**Files:**

- Create: `src/shared/ui/styles/global.css`

- [ ] **Step 1: Create global CSS**

Create `src/shared/ui/styles/global.css`:

```css
body {
  margin: 0;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  box-sizing: border-box;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/shared/ui/styles && git commit -m "feat: add global CSS styles"
```

---

### Task 13: Shared UI — useDialog Hook

**Files:**

- Create: `src/shared/ui/hooks/useDialog/useDialog.ts`
- Create: `src/shared/ui/hooks/useDialog/index.ts`
- Create: `src/shared/ui/hooks/useDialog/__tests__/useDialog.test.ts`

- [ ] **Step 1: Write the test**

Create `src/shared/ui/hooks/useDialog/__tests__/useDialog.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useDialog } from '../useDialog'

describe('useDialog', () => {
  it('starts closed by default', () => {
    const { result } = renderHook(() => useDialog())
    expect(result.current.isOpen).toBe(false)
  })

  it('starts open when initialized with true', () => {
    const { result } = renderHook(() => useDialog(true))
    expect(result.current.isOpen).toBe(true)
  })

  it('opens the dialog', () => {
    const { result } = renderHook(() => useDialog())
    act(() => {
      result.current.open()
    })
    expect(result.current.isOpen).toBe(true)
  })

  it('closes the dialog', () => {
    const { result } = renderHook(() => useDialog(true))
    act(() => {
      result.current.close()
    })
    expect(result.current.isOpen).toBe(false)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/shared/ui/hooks/useDialog`
Expected: FAIL

- [ ] **Step 3: Write the implementation**

Create `src/shared/ui/hooks/useDialog/useDialog.ts`:

```ts
import { useState, useCallback } from 'react'

export function useDialog(initialOpen = false) {
  const [isOpen, setIsOpen] = useState(initialOpen)

  const open = useCallback(() => {
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
  }, [])

  return { isOpen, open, close } as const
}
```

Create `src/shared/ui/hooks/useDialog/index.ts`:

```ts
export { useDialog } from './useDialog'
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/shared/ui/hooks/useDialog`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/shared/ui/hooks && git commit -m "feat: add useDialog shared UI hook"
```

---

### Task 14: Shared UI — formatDate Helper

**Files:**

- Create: `src/shared/ui/helpers/formatDate/formatDate.ts`
- Create: `src/shared/ui/helpers/formatDate/index.ts`
- Create: `src/shared/ui/helpers/formatDate/__tests__/formatDate.test.ts`

- [ ] **Step 1: Write the test**

Create `src/shared/ui/helpers/formatDate/__tests__/formatDate.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { formatDate, formatDateTime } from '../formatDate'

describe('formatDate', () => {
  it('formats a date string in French locale', () => {
    const result = formatDate('2024-12-25')
    expect(result).toBe('25/12/2024')
  })
})

describe('formatDateTime', () => {
  it('formats a datetime with time', () => {
    const result = formatDateTime('2024-12-25T14:30:00')
    expect(result).toContain('25/12/2024')
    expect(result).toContain('14')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/shared/ui/helpers/formatDate`
Expected: FAIL

- [ ] **Step 3: Write the implementation**

Create `src/shared/ui/helpers/formatDate/formatDate.ts`:

```ts
import dayjs from 'dayjs'
import 'dayjs/locale/fr'

dayjs.locale('fr')

const DATE_FORMAT = 'DD/MM/YYYY'
const DATETIME_FORMAT = 'DD/MM/YYYY HH:mm'

export function formatDate(date: string): string {
  return dayjs(date).format(DATE_FORMAT)
}

export function formatDateTime(date: string): string {
  return dayjs(date).format(DATETIME_FORMAT)
}
```

Create `src/shared/ui/helpers/formatDate/index.ts`:

```ts
export { formatDate, formatDateTime } from './formatDate'
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/shared/ui/helpers/formatDate`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/shared/ui/helpers && git commit -m "feat: add formatDate shared UI helper"
```

---

### Task 15: Shared UI Types

**Files:**

- Create: `src/shared/ui/types/index.ts`

- [ ] **Step 1: Write shared UI types**

Create `src/shared/ui/types/index.ts`:

```ts
export type ID = number

export type Nullable<T> = T | null

export type Optional<T> = T | undefined
```

- [ ] **Step 2: Commit**

```bash
git add src/shared/ui/types && git commit -m "feat: add shared UI types"
```

---

### Task 16: i18n Configuration

**Files:**

- Create: `src/shared/i18n/config.ts`
- Create: `src/shared/i18n/locales/fr/common.json`
- Create: `src/shared/i18n/locales/fr/student.json`
- Create: `src/shared/i18n/locales/fr/frequentation.json`

- [ ] **Step 1: Create i18n config**

Create `src/shared/i18n/config.ts`:

```ts
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import commonFr from './locales/fr/common.json'
import studentFr from './locales/fr/student.json'
import frequentationFr from './locales/fr/frequentation.json'

export const defaultNS = 'common'

i18n.use(initReactI18next).init({
  resources: {
    fr: {
      common: commonFr,
      student: studentFr,
      frequentation: frequentationFr
    }
  },
  lng: 'fr',
  fallbackLng: 'fr',
  defaultNS,
  interpolation: { escapeValue: false }
})

export default i18n
```

- [ ] **Step 2: Create French locale files**

Create `src/shared/i18n/locales/fr/common.json`:

```json
{
  "app": {
    "title": "Mon CDI",
    "loading": "Chargement...",
    "error": "Une erreur est survenue",
    "confirm": "Confirmer",
    "cancel": "Annuler",
    "save": "Enregistrer",
    "delete": "Supprimer",
    "edit": "Modifier",
    "add": "Ajouter",
    "close": "Fermer",
    "search": "Rechercher",
    "noResults": "Aucun résultat",
    "selectAll": "Tout sélectionner",
    "selected": "{{count}} sélectionné(s)",
    "batchDelete": "Supprimer la sélection"
  },
  "nav": {
    "journal": "Journal",
    "students": "Élèves",
    "statistics": "Statistiques"
  }
}
```

Create `src/shared/i18n/locales/fr/student.json`:

```json
{
  "title": "Gestion des élèves",
  "add": "Ajouter un élève",
  "edit": "Modifier l'élève",
  "delete": "Supprimer l'élève",
  "import": "Importer CSV",
  "fields": {
    "nom": "Nom",
    "prenom": "Prénom",
    "classe": "Classe",
    "ine": "INE"
  },
  "deleteConfirm": "Êtes-vous sûr de vouloir supprimer {{count}} élève(s) ?",
  "duplicateIne": "Un élève avec cet INE existe déjà"
}
```

Create `src/shared/i18n/locales/fr/frequentation.json`:

```json
{
  "title": "Journal des fréquentations",
  "add": "Marquer la présence",
  "activity": {
    "work": "Travail",
    "reading": "Lecture",
    "computer": "Ordinateur",
    "relaxation": "Détente",
    "other": "Autre"
  },
  "deleteConfirm": "Êtes-vous sûr de vouloir supprimer {{count}} fréquentation(s) ?",
  "noEntries": "Aucune fréquentation pour cette date"
}
```

- [ ] **Step 3: Commit**

```bash
git add src/shared/i18n && git commit -m "feat: add i18n configuration with French locales"
```

---

### Task 17: Database Infrastructure — Drizzle Connection + Migration

**Files:**

- Create: `src/shared/db/connection.ts`
- Create: `src/shared/db/schema.ts`
- Create: `src/shared/db/migrate.ts`
- Create: `drizzle.config.ts`

- [ ] **Step 1: Create Drizzle connection singleton**

Create `src/shared/db/connection.ts`:

```ts
import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import * as schema from './schema'

const DB_PATH = 'data/database.db'

let dbInstance: ReturnType<typeof drizzle> | null = null

export function createDbConnection(dbPath: string = DB_PATH) {
  const sqlite = new Database(dbPath)
  sqlite.pragma('journal_mode = WAL')
  sqlite.pragma('foreign_keys = ON')
  dbInstance = drizzle(sqlite, { schema })
  return dbInstance
}

export function getDb() {
  if (!dbInstance) {
    throw new Error('Database not initialized. Call createDbConnection() first.')
  }
  return dbInstance
}

export function closeDbConnection() {
  dbInstance = null
}
```

- [ ] **Step 2: Create schema re-export file (empty until features are built)**

Create `src/shared/db/schema.ts`:

```ts
export {}
```

- [ ] **Step 3: Create migration runner**

Create `src/shared/db/migrate.ts`:

```ts
import { migrate } from 'drizzle-orm/better-sqlite3/migrator'
import { getDb } from './connection'

const MIGRATIONS_FOLDER = 'drizzle'

export function runMigrations() {
  const db = getDb()
  migrate(db, { migrationsFolder: MIGRATIONS_FOLDER })
}
```

- [ ] **Step 4: Create drizzle.config.ts**

Create `drizzle.config.ts`:

```ts
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: 'src/shared/db/schema.ts',
  out: 'drizzle',
  dialect: 'sqlite'
})
```

- [ ] **Step 5: Commit**

```bash
git add src/shared/db drizzle.config.ts && git commit -m "feat: add Drizzle database connection + migration infrastructure"
```

---

### Task 18: Type-Safe IPC Router

**Files:**

- Create: `src/shared/ipc/router.ts`
- Create: `src/shared/ipc/client.ts`
- Create: `src/shared/ipc/types.ts`
- Create: `src/shared/ipc/__tests__/router.test.ts`

- [ ] **Step 1: Write the test for router**

Create `src/shared/ipc/__tests__/router.test.ts`:

```ts
import { describe, it, expect, vi } from 'vitest'
import { createMainRouter } from '../router'

describe('createMainRouter', () => {
  it('registers and calls a procedure', async () => {
    const mockIpcMain = {
      handle: vi.fn(),
      removeHandler: vi.fn()
    }
    const router = createMainRouter(mockIpcMain)

    const handler = vi.fn().mockResolvedValue({ id: 1, nom: 'Test' })
    router.procedure('student.create', handler)

    expect(mockIpcMain.handle).toHaveBeenCalledWith('student.create', expect.any(Function))
  })

  it('wraps procedure calls with error handling', async () => {
    const mockIpcMain = {
      handle: vi.fn()
    }
    const router = createMainRouter(mockIpcMain)

    const handler = vi.fn().mockRejectedValue(new Error('DB error'))
    router.procedure('student.create', handler)

    const registeredHandler = mockIpcMain.handle.mock.calls[0][1]

    const result = await registeredHandler({}, { nom: 'Test' })
    expect(result.success).toBe(false)
    expect(result.error).toBeDefined()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/shared/ipc`
Expected: FAIL

- [ ] **Step 3: Write IPC types**

Create `src/shared/ipc/types.ts`:

```ts
export type IpcResult<T> =
  | { success: true; data: T }
  | { success: false; error: string; code?: string }

export type IpcProcedure<Input, Output> = (input: Input) => Promise<Output>
```

- [ ] **Step 4: Write the router**

Create `src/shared/ipc/router.ts`:

```ts
import type { IpcMain } from 'electron'
import type { IpcResult } from './types'
import { ErrorCode } from '@lib/errors'

export function createMainRouter(ipcMain: IpcMain) {
  return {
    procedure<Input, Output>(channel: string, handler: (input: Input) => Promise<Output>) {
      ipcMain.handle(channel, async (_event, input: Input): Promise<IpcResult<Output>> => {
        try {
          const data = await handler(input)
          return { success: true, data }
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Unknown error'
          const code =
            error instanceof Error && 'code' in error
              ? (error as { code: string }).code
              : ErrorCode.UNKNOWN_ERROR
          return { success: false, error: message, code: String(code) }
        }
      })
    }
  }
}
```

- [ ] **Step 5: Write the client (for preload)**

Create `src/shared/ipc/client.ts`:

```ts
import type { IpcRenderer } from 'electron'
import type { IpcResult } from './types'

export function createIpcClient(ipcRenderer: IpcRenderer) {
  return {
    async invoke<Input, Output>(channel: string, input: Input): Promise<IpcResult<Output>> {
      return ipcRenderer.invoke(channel, input)
    }
  }
}
```

- [ ] **Step 6: Run test to verify it passes**

Run: `npx vitest run src/shared/ipc`
Expected: PASS

- [ ] **Step 7: Commit**

```bash
git add src/shared/ipc && git commit -m "feat: add type-safe IPC router + client"
```

---

### Task 19: Electron Main Process Entry

**Files:**

- Create: `src/main/index.ts`
- Create: `src/main/modules.ts`

- [ ] **Step 1: Create minimal main process entry**

Create `src/main/index.ts`:

```ts
import { app, BrowserWindow } from 'electron'
import { join } from 'path'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import { createDbConnection, closeDbConnection } from '@shared/db/connection'

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      contextIsolation: true
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    require('electron').shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (process.env.ELECTRON_RENDERER_URL) {
    mainWindow.loadURL(process.env.ELECTRON_RENDERER_URL)
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.my-cdi')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  const db = createDbConnection()

  const { initializeModules } = require('./modules') as {
    initializeModules: (dbPath: string) => void
  }
  initializeModules('data/database.db')

  createWindow()
})

app.on('window-all-closed', () => {
  closeDbConnection()
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
```

Create `src/main/modules.ts`:

```ts
export function initializeModules(_dbPath: string) {
  // Will be populated as features are implemented
}
```

- [ ] **Step 2: Commit**

```bash
git add src/main && git commit -m "feat: add Electron main process entry + module wiring stub"
```

---

### Task 20: Preload — Context Bridge

**Files:**

- Create: `src/preload/index.ts`
- Create: `src/preload/index.d.ts`

- [ ] **Step 1: Create preload script**

Create `src/preload/index.ts`:

```ts
import { contextBridge, ipcRenderer } from 'electron'
import { createIpcClient } from '@shared/ipc/client'

const ipcClient = createIpcClient(ipcRenderer)

const electronAPI = {
  invoke: ipcClient.invoke.bind(ipcClient)
}

contextBridge.exposeInMainWorld('electronAPI', electronAPI)
```

- [ ] **Step 2: Create type declaration**

Create `src/preload/index.d.ts`:

```ts
import type { IpcResult } from '@shared/ipc/types'

export interface ElectronAPI {
  invoke: <Input, Output>(channel: string, input: Input) => Promise<IpcResult<Output>>
}

declare global {
  interface Window {
    electronAPI: ElectronAPI
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/preload && git commit -m "feat: add preload context bridge with typed IPC client"
```

---

### Task 21: Renderer — React Entry + Providers + Router

**Files:**

- Create: `src/renderer/index.html`
- Create: `src/renderer/main.tsx`
- Create: `src/renderer/App.tsx`
- Create: `src/renderer/routes/index.tsx`
- Create: `src/renderer/env.d.ts`

- [ ] **Step 1: Create index.html**

Create `src/renderer/index.html`:

```html
<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Mon CDI</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="./src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 2: Create main.tsx**

Create `src/renderer/main.tsx`:

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

- [ ] **Step 3: Create App.tsx with providers**

Create `src/renderer/App.tsx`:

```tsx
import { BrowserRouter } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { theme } from '@shared/ui/theme'
import { AppRoutes } from './routes'

import '@shared/i18n/config'
import '@shared/ui/styles/global.css'

const QUERY_STALE_TIME_MS = 60 * 1000
const QUERY_RETRY_COUNT = 1

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: QUERY_STALE_TIME_MS,
      retry: QUERY_RETRY_COUNT
    }
  }
})

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
```

- [ ] **Step 4: Create routes with placeholder pages**

Create `src/renderer/routes/index.tsx`:

```tsx
import { Routes, Route } from 'react-router'
import { ROUTES } from '@shared/lib/routes'
import { Layout } from './Layout'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={ROUTES.JOURNAL} element={<JournalPlaceholder />} />
        <Route path={ROUTES.STUDENTS} element={<StudentsPlaceholder />} />
        <Route path={ROUTES.STATISTICS} element={<StatisticsPlaceholder />} />
      </Route>
    </Routes>
  )
}

function JournalPlaceholder() {
  return <div>Journal — à implémenter</div>
}

function StudentsPlaceholder() {
  return <div>Élèves — à implémenter</div>
}

function StatisticsPlaceholder() {
  return <div>Statistiques — en cours de développement</div>
}
```

Create `src/renderer/routes/Layout.tsx`:

```tsx
import { Outlet } from 'react-router'
import { Box } from '@mui/material'

export function Layout() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  )
}
```

- [ ] **Step 5: Create env.d.ts**

Create `src/renderer/env.d.ts`:

```ts
/// <reference types="vite/client" />
```

- [ ] **Step 6: Verify the app boots**

Run: `pnpm dev`
Expected: Electron window opens with placeholder pages

- [ ] **Step 7: Commit**

```bash
git add src/renderer && git commit -m "feat: add renderer entry, providers, router with placeholder pages"
```

---

### Task 22: Drizzle Migration Setup

**Files:**

- Modify: `drizzle.config.ts` (if needed)

- [ ] **Step 1: Generate initial empty migration**

Run: `npx drizzle-kit generate`
Expected: Creates `drizzle/` folder with initial migration SQL files

- [ ] **Step 2: Verify migration files exist**

Run: `ls drizzle/`
Expected: Migration SQL files present

- [ ] **Step 3: Commit**

```bash
git add drizzle/ && git commit -m "chore: generate initial Drizzle migration"
```

---

### Task 23: Final Verification

- [ ] **Step 1: Run TypeScript type checking**

Run: `pnpm run typecheck`
Expected: No errors

- [ ] **Step 2: Run ESLint**

Run: `pnpm run lint`
Expected: No errors (or only warnings)

- [ ] **Step 3: Run all tests**

Run: `npx vitest run`
Expected: All tests pass

- [ ] **Step 4: Run the app**

Run: `pnpm dev`
Expected: Electron window opens, shows placeholder pages, no console errors

- [ ] **Step 5: Final commit if any fixes needed**

```bash
git add -A && git commit -m "chore: foundation verification fixes"
```
