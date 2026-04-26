# Student Frontend Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the complete student feature frontend — API layer, StudentsPage with StudentList and StudentForm containers, presenters, hooks, helpers, and validations.

**Architecture:** Feature-driven + Container/Presenter pattern. Containers own hooks + state. Presenters are pure props→JSX. All logic in hooks (state-dependent) or helpers (pure functions). Zero logic in components.

**Tech Stack:** React 19.x, TypeScript 5.9.x (strict), TanStack Query 5.x, React Hook Form + Zod, MUI 7.x, React Router 7.x, Vitest + React Testing Library

---

## File Structure

```
src/features/student/renderer/
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
│   └── studentKeys.ts
│
├── pages/
│   └── StudentsPage/
│       ├── StudentsPage.tsx
│       ├── index.tsx
│       ├── hooks/
│       │   └── useStudentsPage/
│       │       ├── useStudentsPage.ts
│       │       ├── index.ts
│       │       └── __tests__/
│       │           └── useStudentsPage.test.ts
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
│       │   │   │       └── sortStudentRows.test.ts
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
│       │   │   │       │           └── useBatchDelete.test.ts
│       │   │   │       └── __tests__/
│       │   │   │           └── StudentBatchActions.test.tsx
│       │   │   └── components/
│       │   │       ├── StudentTable/
│       │   │       │   ├── StudentTable.tsx
│       │   │       │   ├── index.tsx
│       │   │       │   ├── StudentTable.styles.ts
│       │   │       │   └── __tests__/
│       │   │       │       └── StudentTable.test.tsx
│       │   │       ├── StudentTableRow/
│       │   │       │   ├── StudentTableRow.tsx
│       │   │       │   └── index.tsx
│       │   │       └── StudentListToolbar/
│       │   │       ├── StudentListToolbar.tsx
│       │   │       └── index.tsx
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
│       └── __tests__/
│           └── StudentsPage.test.tsx
│
├── components/
│   └── StudentCard/
│       ├── StudentCard.tsx
│       ├── index.tsx
│       ├── StudentCard.styles.ts
│       └── __tests__/
│           └── StudentCard.test.tsx
│
├── helpers/
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
├── validations/
│   └── studentSchema/
│       ├── studentSchema.ts
│       ├── index.ts
│       └── __tests__/
│           └── studentSchema.test.ts
│
└── types/
    └── index.ts
```

---

### Task 0: Prerequisites — Path Aliases, Vitest Config, Directory Structure

**Files:**

- Modify: `tsconfig.web.json`
- Modify: `electron.vite.config.ts`
- Create: `vitest.config.ts`
- Create: `src/shared/test/setup.ts`

The current codebase does not yet have `@student/*` path aliases or Vitest configured. This task sets up the infrastructure.

- [ ] **Step 1: Add path aliases to tsconfig.web.json**

Add these paths to the existing `compilerOptions.paths` in `tsconfig.web.json`:

```json
"@student/*": ["src/features/student/renderer/*"],
"@student-shared": ["src/features/student/shared"]
```

The full `tsconfig.web.json` should become:

```json
{
  "extends": "@electron-toolkit/tsconfig/tsconfig.web.json",
  "include": [
    "src/renderer/src/env.d.ts",
    "src/renderer/src/**/*",
    "src/renderer/src/**/*.tsx",
    "src/preload/*.d.ts",
    "src/shared/**/*",
    "src/features/**/*"
  ],
  "compilerOptions": {
    "composite": false,
    "jsx": "react-jsx",
    "baseUrl": ".",
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "paths": {
      "@renderer/*": ["src/renderer/src/*"],
      "@shared/*": ["src/shared/*"],
      "@student/*": ["src/features/student/renderer/*"],
      "@student-shared": ["src/features/student/shared"]
    }
  }
}
```

- [ ] **Step 2: Add path aliases to electron.vite.config.ts**

Add student feature aliases to the `renderer.resolve.alias` section:

```ts
'@student': resolve('src/features/student/renderer'),
'@student-shared': resolve('src/features/student/shared')
```

The full `electron.vite.config.ts` should become:

```ts
import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '@shared': resolve('src/shared'),
        '@student': resolve('src/features/student/renderer'),
        '@student-shared': resolve('src/features/student/shared')
      }
    },
    plugins: [
      react({
        babel: {
          plugins: [['babel-plugin-react-compiler']]
        }
      })
    ]
  }
})
```

- [ ] **Step 3: Create vitest.config.ts**

```ts
import { defineConfig } from 'vitest/config'
import { resolve } from 'path'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/shared/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}']
  },
  resolve: {
    alias: {
      '@renderer': resolve('src/renderer/src'),
      '@shared': resolve('src/shared'),
      '@student': resolve('src/features/student/renderer'),
      '@student-shared': resolve('src/features/student/shared')
    }
  }
})
```

- [ ] **Step 4: Create test setup file**

Create `src/shared/test/setup.ts`:

```ts
import '@testing-library/jest-dom/vitest'
```

- [ ] **Step 5: Create the feature directory skeleton**

```bash
mkdir -p src/features/student/renderer/{api,helpers,validations,types,components}
mkdir -p src/features/student/renderer/pages/StudentsPage/{hooks,containers}
```

- [ ] **Step 6: Set up i18n namespaces for student feature**

The new student components use namespaced i18n (`useTranslation('student')` and `useTranslation('common')`). We need to create the namespace files and update the i18n config.

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
    "ine": "INE",
    "actions": "Actions",
    "search": "Rechercher des élèves..."
  },
  "deleteConfirm": "Êtes-vous sûr de vouloir supprimer {{count}} élève(s) ?",
  "duplicateIne": "Un élève avec cet INE existe déjà"
}
```

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

Update `src/renderer/src/lib/i18n.ts` to support namespaces:

```ts
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import commonFr from '../../../shared/i18n/locales/fr/common.json'
import studentFr from '../../../shared/i18n/locales/fr/student.json'

i18n.use(initReactI18next).init({
  resources: {
    fr: {
      common: commonFr,
      student: studentFr,
      translation: commonFr
    }
  },
  lng: 'fr',
  fallbackLng: 'fr',
  defaultNS: 'translation',
  interpolation: {
    escapeValue: false
  }
})

export default i18n
```

- [ ] **Step 7: Install missing dev dependencies**

```bash
pnpm add -D vitest@latest @testing-library/react@latest @testing-library/jest-dom@latest @testing-library/user-event@latest jsdom@latest
pnpm add react-hook-form zod @hookform/resolvers
```

- [ ] **Step 8: Verify setup**

Run: `npx vitest run`
Expected: "No test files found, exiting with code 1" — correct, no tests yet.

- [ ] **Step 9: Commit**

```bash
git add -A && git commit -m "chore: add student frontend path aliases, vitest config, test setup, i18n namespaces"
```

---

### Task 1: Query Key Factory

**Files:**

- Create: `src/features/student/renderer/api/studentKeys.ts`

- [ ] **Step 1: Write the implementation**

Create `src/features/student/renderer/api/studentKeys.ts`:

```ts
export const studentKeys = {
  all: ['students'] as const,
  lists: () => [...studentKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown>) => [...studentKeys.lists(), filters] as const,
  details: () => [...studentKeys.all, 'detail'] as const,
  detail: (id: number) => [...studentKeys.details(), id] as const
}
```

- [ ] **Step 2: Commit**

```bash
git add src/features/student/renderer/api/studentKeys.ts && git commit -m "feat(student): add React Query key factory for student"
```

---

### Task 2: Feature Types

**Files:**

- Create: `src/features/student/renderer/types/index.ts`

- [ ] **Step 1: Write the implementation**

Create `src/features/student/renderer/types/index.ts`:

```ts
import type { StudentResponseDto } from '@shared/types'

export interface StudentViewModel extends StudentResponseDto {
  displayName: string
  classLabel: string
}

export type StudentSortField = 'nom' | 'prenom' | 'classe' | 'ine'

export type SortDirection = 'asc' | 'desc'

export interface StudentSortConfig {
  field: StudentSortField
  direction: SortDirection
}

export interface StudentFilterCriteria {
  searchTerm: string
}
```

- [ ] **Step 2: Commit**

```bash
git add src/features/student/renderer/types && git commit -m "feat(student): add StudentViewModel and feature types"
```

---

### Task 3: Student Transformers

**Files:**

- Create: `src/features/student/renderer/helpers/studentTransformers/studentTransformers.ts`
- Create: `src/features/student/renderer/helpers/studentTransformers/index.ts`
- Create: `src/features/student/renderer/helpers/studentTransformers/__tests__/studentTransformers.test.ts`

- [ ] **Step 1: Write the failing test**

Create `src/features/student/renderer/helpers/studentTransformers/__tests__/studentTransformers.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { toViewModel, toViewModelList } from '../studentTransformers'
import type { StudentResponseDto } from '@shared/types'

const DTO_STUB: StudentResponseDto = {
  id: 1,
  nom: 'Dupont',
  prenom: 'Jean',
  classe: '3ème A',
  ine: '1234567890A'
}

describe('toViewModel', () => {
  it('transforms a StudentResponseDto to StudentViewModel', () => {
    const result = toViewModel(DTO_STUB)

    expect(result.id).toBe(1)
    expect(result.nom).toBe('Dupont')
    expect(result.prenom).toBe('Jean')
    expect(result.classe).toBe('3ème A')
    expect(result.ine).toBe('1234567890A')
    expect(result.displayName).toBe('Jean Dupont')
    expect(result.classLabel).toBe('3ème A')
  })

  it('handles extra whitespace in names', () => {
    const dto: StudentResponseDto = { ...DTO_STUB, nom: '  Dupont  ', prenom: '  Jean  ' }
    const result = toViewModel(dto)

    expect(result.displayName).toBe('Jean Dupont')
  })
})

describe('toViewModelList', () => {
  it('transforms an array of DTOs', () => {
    const dtos: StudentResponseDto[] = [
      DTO_STUB,
      { ...DTO_STUB, id: 2, nom: 'Martin', prenom: 'Marie' }
    ]
    const result = toViewModelList(dtos)

    expect(result).toHaveLength(2)
    expect(result[0].displayName).toBe('Jean Dupont')
    expect(result[1].displayName).toBe('Marie Martin')
  })

  it('returns empty array for empty input', () => {
    expect(toViewModelList([])).toEqual([])
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/features/student/renderer/helpers/studentTransformers`
Expected: FAIL — cannot resolve `../studentTransformers`

- [ ] **Step 3: Write the implementation**

Create `src/features/student/renderer/helpers/studentTransformers/studentTransformers.ts`:

```ts
import type { StudentResponseDto } from '@shared/types'
import type { StudentViewModel } from '@student/types'

const DISPLAY_NAME_SEPARATOR = ' '

export function toViewModel(dto: StudentResponseDto): StudentViewModel {
  return {
    ...dto,
    displayName: `${dto.prenom.trim()}${DISPLAY_NAME_SEPARATOR}${dto.nom.trim()}`,
    classLabel: dto.classe.trim()
  }
}

export function toViewModelList(dtos: StudentResponseDto[]): StudentViewModel[] {
  return dtos.map(toViewModel)
}
```

Create `src/features/student/renderer/helpers/studentTransformers/index.ts`:

```ts
export { toViewModel, toViewModelList } from './studentTransformers'
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/features/student/renderer/helpers/studentTransformers`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/features/student/renderer/helpers/studentTransformers && git commit -m "feat(student): add DTO→ViewModel transformers"
```

---

### Task 4: Student Formatters

**Files:**

- Create: `src/features/student/renderer/helpers/studentFormatters/studentFormatters.ts`
- Create: `src/features/student/renderer/helpers/studentFormatters/index.ts`
- Create: `src/features/student/renderer/helpers/studentFormatters/__tests__/studentFormatters.test.ts`

- [ ] **Step 1: Write the failing test**

Create `src/features/student/renderer/helpers/studentFormatters/__tests__/studentFormatters.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import {
  formatStudentDisplayName,
  formatStudentClass,
  formatStudentIne,
  formatBatchDeleteMessage
} from '../studentFormatters'

describe('formatStudentDisplayName', () => {
  it('formats as "prenom nom"', () => {
    expect(formatStudentDisplayName('Jean', 'Dupont')).toBe('Jean Dupont')
  })

  it('trims whitespace', () => {
    expect(formatStudentDisplayName('  Jean  ', '  Dupont  ')).toBe('Jean Dupont')
  })
})

describe('formatStudentClass', () => {
  it('returns trimmed classe', () => {
    expect(formatStudentClass('  3ème A  ')).toBe('3ème A')
  })
})

describe('formatStudentIne', () => {
  it('returns trimmed INE', () => {
    expect(formatStudentIne('  1234567890A  ')).toBe('1234567890A')
  })
})

describe('formatBatchDeleteMessage', () => {
  it('formats singular message for 1', () => {
    expect(formatBatchDeleteMessage(1)).toBe('Voulez-vous vraiment supprimer 1 élève ?')
  })

  it('formats plural message for 0', () => {
    expect(formatBatchDeleteMessage(0)).toBe('Voulez-vous vraiment supprimer 0 élève(s) ?')
  })

  it('formats plural message for 5', () => {
    expect(formatBatchDeleteMessage(5)).toBe('Voulez-vous vraiment supprimer 5 élève(s) ?')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/features/student/renderer/helpers/studentFormatters`
Expected: FAIL

- [ ] **Step 3: Write the implementation**

Create `src/features/student/renderer/helpers/studentFormatters/studentFormatters.ts`:

```ts
const DISPLAY_NAME_SEPARATOR = ' '

export function formatStudentDisplayName(prenom: string, nom: string): string {
  return `${prenom.trim()}${DISPLAY_NAME_SEPARATOR}${nom.trim()}`
}

export function formatStudentClass(classe: string): string {
  return classe.trim()
}

export function formatStudentIne(ine: string): string {
  return ine.trim()
}

export function formatBatchDeleteMessage(count: number): string {
  return `Voulez-vous vraiment supprimer ${count} élève(s) ?`
}
```

Create `src/features/student/renderer/helpers/studentFormatters/index.ts`:

```ts
export {
  formatStudentDisplayName,
  formatStudentClass,
  formatStudentIne,
  formatBatchDeleteMessage
} from './studentFormatters'
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/features/student/renderer/helpers/studentFormatters`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/features/student/renderer/helpers/studentFormatters && git commit -m "feat(student): add student display formatters"
```

---

### Task 5: Student Shared Validation Schema

**Files:**

- Create: `src/features/student/renderer/validations/studentSchema/studentSchema.ts`
- Create: `src/features/student/renderer/validations/studentSchema/index.ts`
- Create: `src/features/student/renderer/validations/studentSchema/__tests__/studentSchema.test.ts`

- [ ] **Step 1: Write the failing test**

Create `src/features/student/renderer/validations/studentSchema/__tests__/studentSchema.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { nomSchema, prenomSchema, classeSchema, ineSchema } from '../studentSchema'

describe('nomSchema', () => {
  it('accepts a valid nom', () => {
    expect(nomSchema.safeParse('Dupont').success).toBe(true)
  })

  it('rejects empty string', () => {
    expect(nomSchema.safeParse('').success).toBe(false)
  })

  it('rejects whitespace-only string', () => {
    expect(nomSchema.safeParse('   ').success).toBe(false)
  })

  it('rejects string over 100 chars', () => {
    const longNom = 'A'.repeat(101)
    expect(nomSchema.safeParse(longNom).success).toBe(false)
  })
})

describe('prenomSchema', () => {
  it('accepts a valid prenom', () => {
    expect(prenomSchema.safeParse('Jean').success).toBe(true)
  })

  it('rejects empty string', () => {
    expect(prenomSchema.safeParse('').success).toBe(false)
  })

  it('rejects whitespace-only string', () => {
    expect(prenomSchema.safeParse('   ').success).toBe(false)
  })

  it('rejects string over 100 chars', () => {
    const longPrenom = 'A'.repeat(101)
    expect(prenomSchema.safeParse(longPrenom).success).toBe(false)
  })
})

describe('classeSchema', () => {
  it('accepts a valid classe', () => {
    expect(classeSchema.safeParse('3ème A').success).toBe(true)
  })

  it('rejects empty string', () => {
    expect(classeSchema.safeParse('').success).toBe(false)
  })

  it('rejects string over 50 chars', () => {
    const longClasse = 'A'.repeat(51)
    expect(classeSchema.safeParse(longClasse).success).toBe(false)
  })
})

describe('ineSchema', () => {
  it('accepts a valid INE', () => {
    expect(ineSchema.safeParse('1234567890A').success).toBe(true)
  })

  it('rejects empty string', () => {
    expect(ineSchema.safeParse('').success).toBe(false)
  })

  it('rejects whitespace-only string', () => {
    expect(ineSchema.safeParse('   ').success).toBe(false)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/features/student/renderer/validations/studentSchema`
Expected: FAIL

- [ ] **Step 3: Write the implementation**

Create `src/features/student/renderer/validations/studentSchema/studentSchema.ts`:

```ts
import { z } from 'zod'

const NOM_MAX_LENGTH = 100
const PRENOM_MAX_LENGTH = 100
const CLASSE_MAX_LENGTH = 50

const trimmedString = z.string().trim()

export const nomSchema = trimmedString
  .min(1, 'Le nom est obligatoire')
  .max(NOM_MAX_LENGTH, `Le nom ne peut pas dépasser ${NOM_MAX_LENGTH} caractères`)

export const prenomSchema = trimmedString
  .min(1, 'Le prénom est obligatoire')
  .max(PRENOM_MAX_LENGTH, `Le prénom ne peut pas dépasser ${PRENOM_MAX_LENGTH} caractères`)

export const classeSchema = trimmedString
  .min(1, 'La classe est obligatoire')
  .max(CLASSE_MAX_LENGTH, `La classe ne peut pas dépasser ${CLASSE_MAX_LENGTH} caractères`)

export const ineSchema = trimmedString.min(1, "L'INE est obligatoire")
```

Create `src/features/student/renderer/validations/studentSchema/index.ts`:

```ts
export { nomSchema, prenomSchema, classeSchema, ineSchema } from './studentSchema'
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/features/student/renderer/validations/studentSchema`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/features/student/renderer/validations/studentSchema && git commit -m "feat(student): add shared Zod field schemas for student"
```

---

### Task 6: React Query API — useStudentQueries

**Files:**

- Create: `src/features/student/renderer/api/useStudentQueries/useStudentQueries.ts`
- Create: `src/features/student/renderer/api/useStudentQueries/index.ts`
- Create: `src/features/student/renderer/api/useStudentQueries/__tests__/useStudentQueries.test.ts`

- [ ] **Step 1: Write the failing test**

Create `src/features/student/renderer/api/useStudentQueries/__tests__/useStudentQueries.test.ts`:

```ts
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useStudentList, useStudentById } from '../useStudentQueries'
import { studentKeys } from '../../studentKeys'

const MOCK_STUDENTS: StudentResponseDto[] = [
  { id: 1, nom: 'Dupont', prenom: 'Jean', classe: '3ème A', ine: '1234567890A' },
  { id: 2, nom: 'Martin', prenom: 'Marie', classe: '3ème B', ine: '0987654321B' }
]

import type { StudentResponseDto } from '@shared/types'

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } }
  })
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    )
  }
}

describe('useStudentList', () => {
  beforeEach(() => {
    vi.stubGlobal('electronAPI', {
      student: {
        getAll: vi.fn().mockResolvedValue({ students: MOCK_STUDENTS, total: 2 })
      }
    })
  })

  it('fetches student list and transforms to view models', async () => {
    const { result } = renderHook(() => useStudentList(), { wrapper: createWrapper() })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data).toHaveLength(2)
    expect(result.current.data?.[0].displayName).toBe('Jean Dupont')
  })

  it('uses correct query key', async () => {
    const { result } = renderHook(() => useStudentList(), { wrapper: createWrapper() })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data).toBeDefined()
  })
})

describe('useStudentById', () => {
  beforeEach(() => {
    vi.stubGlobal('electronAPI', {
      student: {
        getById: vi.fn().mockResolvedValue({
          success: true,
          data: MOCK_STUDENTS[0]
        })
      }
    })
  })

  it('fetches single student by id', async () => {
    const { result } = renderHook(() => useStudentById(1), { wrapper: createWrapper() })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data?.id).toBe(1)
    expect(result.current.data?.displayName).toBe('Jean Dupont')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/features/student/renderer/api/useStudentQueries`
Expected: FAIL

- [ ] **Step 3: Write the implementation**

Create `src/features/student/renderer/api/useStudentQueries/useStudentQueries.ts`:

```ts
import { useQuery } from '@tanstack/react-query'
import { studentKeys } from '../studentKeys'
import { toViewModel, toViewModelList } from '@student/helpers/studentTransformers'
import type { StudentViewModel } from '@student/types'
import type { StudentResponseDto, StudentListResponseDto } from '@shared/types'

async function fetchStudentList(): Promise<StudentViewModel[]> {
  const result: StudentListResponseDto = await window.electronAPI.student.getAll()
  return toViewModelList(result.students)
}

async function fetchStudentById(id: number): Promise<StudentViewModel> {
  const result = await window.electronAPI.student.getById(id)
  if (!result.success || !result.data) {
    throw new Error(result.error ?? 'Étudiant non trouvé')
  }
  return toViewModel(result.data)
}

export function useStudentList() {
  return useQuery({
    queryKey: [...studentKeys.lists()],
    queryFn: fetchStudentList
  })
}

export function useStudentById(id: number) {
  return useQuery({
    queryKey: [...studentKeys.detail(id)],
    queryFn: () => fetchStudentById(id),
    enabled: id > 0
  })
}
```

Create `src/features/student/renderer/api/useStudentQueries/index.ts`:

```ts
export { useStudentList, useStudentById } from './useStudentQueries'
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/features/student/renderer/api/useStudentQueries`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/features/student/renderer/api/useStudentQueries && git commit -m "feat(student): add useStudentList and useStudentById query hooks"
```

---

### Task 7: React Query API — useStudentMutations

**Files:**

- Create: `src/features/student/renderer/api/useStudentMutations/useStudentMutations.ts`
- Create: `src/features/student/renderer/api/useStudentMutations/index.ts`
- Create: `src/features/student/renderer/api/useStudentMutations/__tests__/useStudentMutations.test.ts`

- [ ] **Step 1: Write the failing test**

Create `src/features/student/renderer/api/useStudentMutations/__tests__/useStudentMutations.test.ts`:

```ts
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor, act } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  useCreateStudent,
  useUpdateStudent,
  useDeleteStudent,
  useImportStudentsCsv
} from '../useStudentMutations'
import type { CreateStudentDto, UpdateStudentDto } from '@shared/types'

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } }
  })
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    )
  }
}

describe('useCreateStudent', () => {
  const createDto: CreateStudentDto = { nom: 'Dupont', prenom: 'Jean', classe: '3A', ine: '123A' }

  beforeEach(() => {
    vi.stubGlobal('electronAPI', {
      student: {
        create: vi.fn().mockResolvedValue({ success: true, data: { id: 1, ...createDto } })
      }
    })
  })

  it('calls student.create with correct data', async () => {
    const { result } = renderHook(() => useCreateStudent(), { wrapper: createWrapper() })

    act(() => {
      result.current.mutate(createDto)
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(window.electronAPI.student.create).toHaveBeenCalledWith(createDto)
  })
})

describe('useUpdateStudent', () => {
  const updateDto: UpdateStudentDto = { nom: 'Dupont-Updated' }

  beforeEach(() => {
    vi.stubGlobal('electronAPI', {
      student: {
        update: vi.fn().mockResolvedValue({ success: true, data: { id: 1, nom: 'Dupont-Updated', prenom: 'Jean', classe: '3A', ine: '123A' } })
      }
    })
  })

  it('calls student.update with id and data', async () => {
    const { result } = renderHook(() => useUpdateStudent(), { wrapper: createWrapper() })

    act(() => {
      result.current.mutate({ id: 1, data: updateDto })
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(window.electronAPI.student.update).toHaveBeenCalledWith(1, updateDto)
  })
})

describe('useDeleteStudent', () => {
  beforeEach(() => {
    vi.stubGlobal('electronAPI', {
      student: {
        delete: vi.fn().mockResolvedValue({ success: true })
      }
    })
  })

  it('calls student.delete with id wrapper', async () => {
    const { result } = renderHook(() => useDeleteStudent(), { wrapper: createWrapper() })

    act(() => {
      result.current.mutate({ ids: [1, 2] })
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(window.electronAPI.student.delete).toHaveBeenCalledWith({ ids: [1, 2] })
  })
})

describe('useImportStudentsCsv', () => {
  const importDtos: CreateStudentDto[] = [
    { nom: 'A', prenom: 'B', classe: '1', ine: '11' }
  ]

  beforeEach(() => {
    vi.stubGlobal('electronAPI', {
      student: {
        createBatch: vi.fn().mockResolvedValue({ success: true, created: 1 })
      }
    })
  })

  it('calls student.createBatch', async () => {
    const { result } = renderHook(() => useImportStudentsCsv(), { wrapper: createWrapper() })

    act(() => {
      result.current.mutate(importDtos)
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(window.electronAPI.student.createBatch).toHaveBeenCalledWith(importDtos)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/features/student/renderer/api/useStudentMutations`
Expected: FAIL

- [ ] **Step 3: Write the implementation**

Create `src/features/student/renderer/api/useStudentMutations/useStudentMutations.ts`:

```ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { studentKeys } from '../studentKeys'
import type { CreateStudentDto, UpdateStudentDto } from '@shared/types'

interface DeleteStudentInput {
  ids: number[]
}

interface UpdateStudentInput {
  id: number
  data: UpdateStudentDto
}

async function createStudent(dto: CreateStudentDto) {
  const result = await window.electronAPI.student.create(dto)
  if (!result.success) {
    throw new Error(result.error ?? 'Erreur lors de la création')
  }
  return result
}

async function updateStudent(input: UpdateStudentInput) {
  const result = await window.electronAPI.student.update(input.id, input.data)
  if (!result.success) {
    throw new Error(result.error ?? 'Erreur lors de la mise à jour')
  }
  return result
}

async function deleteStudents(input: DeleteStudentInput) {
  const result = await window.electronAPI.student.delete(input)
  if (!result.success) {
    throw new Error(result.error ?? 'Erreur lors de la suppression')
  }
  return result
}

async function importStudentsCsv(dtos: CreateStudentDto[]) {
  const result = await window.electronAPI.student.createBatch(dtos)
  if (!result.success) {
    throw new Error(result.errors?.join(', ') ?? "Erreur lors de l'importation")
  }
  return result
}

const INVALIDATE_STUDENT_KEYS = [studentKeys.all]

export function useCreateStudent() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: INVALIDATE_STUDENT_KEYS })
    }
  })
}

export function useUpdateStudent() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: INVALIDATE_STUDENT_KEYS })
    }
  })
}

export function useDeleteStudent() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteStudents,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: INVALIDATE_STUDENT_KEYS })
    }
  })
}

export function useImportStudentsCsv() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: importStudentsCsv,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: INVALIDATE_STUDENT_KEYS })
    }
  })
}
```

Create `src/features/student/renderer/api/useStudentMutations/index.ts`:

```ts
export {
  useCreateStudent,
  useUpdateStudent,
  useDeleteStudent,
  useImportStudentsCsv
} from './useStudentMutations'
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/features/student/renderer/api/useStudentMutations`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/features/student/renderer/api/useStudentMutations && git commit -m "feat(student): add create, update, delete, importCsv mutation hooks"
```

---

### Task 8: useStudentSelection Hook

**Files:**

- Create: `src/features/student/renderer/pages/StudentsPage/containers/StudentList/hooks/useStudentSelection/useStudentSelection.ts`
- Create: `src/features/student/renderer/pages/StudentsPage/containers/StudentList/hooks/useStudentSelection/index.ts`
- Create: `src/features/student/renderer/pages/StudentsPage/containers/StudentList/hooks/useStudentSelection/__tests__/useStudentSelection.test.ts`

- [ ] **Step 1: Write the failing test**

Create `src/features/student/renderer/pages/StudentsPage/containers/StudentList/hooks/useStudentSelection/__tests__/useStudentSelection.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useStudentSelection } from '../useStudentSelection'

describe('useStudentSelection', () => {
  it('starts with empty selection', () => {
    const { result } = renderHook(() => useStudentSelection())
    expect(result.current.selectedIds).toEqual([])
    expect(result.current.selectedCount).toBe(0)
  })

  it('toggles a student id on', () => {
    const { result } = renderHook(() => useStudentSelection())

    act(() => {
      result.current.toggle(1)
    })

    expect(result.current.selectedIds).toEqual([1])
    expect(result.current.selectedCount).toBe(1)
  })

  it('toggles a student id off', () => {
    const { result } = renderHook(() => useStudentSelection())

    act(() => {
      result.current.toggle(1)
    })
    act(() => {
      result.current.toggle(1)
    })

    expect(result.current.selectedIds).toEqual([])
  })

  it('selects all ids', () => {
    const { result } = renderHook(() => useStudentSelection())

    act(() => {
      result.current.selectAll([1, 2, 3])
    })

    expect(result.current.selectedIds).toEqual([1, 2, 3])
  })

  it('clears selection', () => {
    const { result } = renderHook(() => useStudentSelection())

    act(() => {
      result.current.selectAll([1, 2])
    })
    act(() => {
      result.current.clearSelection()
    })

    expect(result.current.selectedIds).toEqual([])
  })

  it('checks if id is selected', () => {
    const { result } = renderHook(() => useStudentSelection())

    act(() => {
      result.current.toggle(5)
    })

    expect(result.current.isSelected(5)).toBe(true)
    expect(result.current.isSelected(99)).toBe(false)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run useStudentSelection`
Expected: FAIL

- [ ] **Step 3: Write the implementation**

Create `src/features/student/renderer/pages/StudentsPage/containers/StudentList/hooks/useStudentSelection/useStudentSelection.ts`:

```ts
import { useState, useCallback } from 'react'

export function useStudentSelection() {
  const [selectedIds, setSelectedIds] = useState<number[]>([])

  const toggle = useCallback((id: number) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]))
  }, [])

  const selectAll = useCallback((ids: number[]) => {
    setSelectedIds(ids)
  }, [])

  const clearSelection = useCallback(() => {
    setSelectedIds([])
  }, [])

  const isSelected = useCallback((id: number) => selectedIds.includes(id), [selectedIds])

  const selectedCount = selectedIds.length

  return {
    selectedIds,
    selectedCount,
    toggle,
    selectAll,
    clearSelection,
    isSelected
  } as const
}
```

Create `src/features/student/renderer/pages/StudentsPage/containers/StudentList/hooks/useStudentSelection/index.ts`:

```ts
export { useStudentSelection } from './useStudentSelection'
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run useStudentSelection`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/features/student/renderer/pages/StudentsPage/containers/StudentList/hooks/useStudentSelection && git commit -m "feat(student): add useStudentSelection hook for row selection"
```

---

### Task 9: filterStudentRows Helper

**Files:**

- Create: `src/features/student/renderer/pages/StudentsPage/containers/StudentList/helpers/filterStudentRows/filterStudentRows.ts`
- Create: `src/features/student/renderer/pages/StudentsPage/containers/StudentList/helpers/filterStudentRows/index.ts`
- Create: `src/features/student/renderer/pages/StudentsPage/containers/StudentList/helpers/filterStudentRows/__tests__/filterStudentRows.test.ts`

- [ ] **Step 1: Write the failing test**

Create `src/features/student/renderer/pages/StudentsPage/containers/StudentList/helpers/filterStudentRows/__tests__/filterStudentRows.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { filterStudentRows } from '../filterStudentRows'
import type { StudentViewModel } from '@student/types'

const STUDENTS: StudentViewModel[] = [
  {
    id: 1,
    nom: 'Dupont',
    prenom: 'Jean',
    classe: '3ème A',
    ine: '111A',
    displayName: 'Jean Dupont',
    classLabel: '3ème A'
  },
  {
    id: 2,
    nom: 'Martin',
    prenom: 'Marie',
    classe: '3ème B',
    ine: '222B',
    displayName: 'Marie Martin',
    classLabel: '3ème B'
  },
  {
    id: 3,
    nom: 'Bernard',
    prenom: 'Luc',
    classe: '4ème C',
    ine: '333C',
    displayName: 'Luc Bernard',
    classLabel: '4ème C'
  }
]

describe('filterStudentRows', () => {
  it('returns all students when search term is empty', () => {
    expect(filterStudentRows(STUDENTS, '')).toHaveLength(3)
  })

  it('filters by last name (nom)', () => {
    const result = filterStudentRows(STUDENTS, 'dup')
    expect(result).toHaveLength(1)
    expect(result[0].nom).toBe('Dupont')
  })

  it('filters by first name (prenom)', () => {
    const result = filterStudentRows(STUDENTS, 'mar')
    expect(result).toHaveLength(1)
    expect(result[0].prenom).toBe('Marie')
  })

  it('filters by class (classe)', () => {
    const result = filterStudentRows(STUDENTS, '3ème')
    expect(result).toHaveLength(2)
  })

  it('filters by INE', () => {
    const result = filterStudentRows(STUDENTS, '333')
    expect(result).toHaveLength(1)
    expect(result[0].ine).toBe('333C')
  })

  it('is case-insensitive', () => {
    expect(filterStudentRows(STUDENTS, 'DUPONT')).toHaveLength(1)
    expect(filterStudentRows(STUDENTS, 'dupont')).toHaveLength(1)
  })

  it('trims search term', () => {
    expect(filterStudentRows(STUDENTS, '  dup  ')).toHaveLength(1)
  })

  it('returns empty for no matches', () => {
    expect(filterStudentRows(STUDENTS, 'zzzzz')).toHaveLength(0)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run filterStudentRows`
Expected: FAIL

- [ ] **Step 3: Write the implementation**

Create `src/features/student/renderer/pages/StudentsPage/containers/StudentList/helpers/filterStudentRows/filterStudentRows.ts`:

```ts
import type { StudentViewModel, StudentFilterCriteria } from '@student/types'

function matchesSearchTerm(student: StudentViewModel, term: string): boolean {
  const lowerTerm = term.toLowerCase()
  return (
    student.nom.toLowerCase().includes(lowerTerm) ||
    student.prenom.toLowerCase().includes(lowerTerm) ||
    student.classe.toLowerCase().includes(lowerTerm) ||
    student.ine.toLowerCase().includes(lowerTerm)
  )
}

export function filterStudentRows(
  students: StudentViewModel[],
  searchTerm: string
): StudentViewModel[] {
  const trimmedTerm = searchTerm.trim()
  if (trimmedTerm.length === 0) {
    return students
  }
  return students.filter((student) => matchesSearchTerm(student, trimmedTerm))
}
```

Create `src/features/student/renderer/pages/StudentsPage/containers/StudentList/helpers/filterStudentRows/index.ts`:

```ts
export { filterStudentRows } from './filterStudentRows'
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run filterStudentRows`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/features/student/renderer/pages/StudentsPage/containers/StudentList/helpers/filterStudentRows && git commit -m "feat(student): add filterStudentRows helper"
```

---

### Task 10: sortStudentRows Helper

**Files:**

- Create: `src/features/student/renderer/pages/StudentsPage/containers/StudentList/helpers/sortStudentRows/sortStudentRows.ts`
- Create: `src/features/student/renderer/pages/StudentsPage/containers/StudentList/helpers/sortStudentRows/index.ts`
- Create: `src/features/student/renderer/pages/StudentsPage/containers/StudentList/helpers/sortStudentRows/__tests__/sortStudentRows.test.ts`

- [ ] **Step 1: Write the failing test**

Create `src/features/student/renderer/pages/StudentsPage/containers/StudentList/helpers/sortStudentRows/__tests__/sortStudentRows.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { sortStudentRows } from '../sortStudentRows'
import type { StudentViewModel, StudentSortConfig } from '@student/types'

const STUDENTS: StudentViewModel[] = [
  {
    id: 1,
    nom: 'Dupont',
    prenom: 'Jean',
    classe: '3ème A',
    ine: '111A',
    displayName: 'Jean Dupont',
    classLabel: '3ème A'
  },
  {
    id: 2,
    nom: 'Martin',
    prenom: 'Marie',
    classe: '3ème B',
    ine: '222B',
    displayName: 'Marie Martin',
    classLabel: '3ème B'
  },
  {
    id: 3,
    nom: 'Bernard',
    prenom: 'Luc',
    classe: '4ème C',
    ine: '333C',
    displayName: 'Luc Bernard',
    classLabel: '4ème C'
  }
]

describe('sortStudentRows', () => {
  it('sorts by nom ascending', () => {
    const config: StudentSortConfig = { field: 'nom', direction: 'asc' }
    const result = sortStudentRows([...STUDENTS], config)
    expect(result[0].nom).toBe('Bernard')
    expect(result[2].nom).toBe('Martin')
  })

  it('sorts by nom descending', () => {
    const config: StudentSortConfig = { field: 'nom', direction: 'desc' }
    const result = sortStudentRows([...STUDENTS], config)
    expect(result[0].nom).toBe('Martin')
    expect(result[2].nom).toBe('Bernard')
  })

  it('sorts by prenom ascending', () => {
    const config: StudentSortConfig = { field: 'prenom', direction: 'asc' }
    const result = sortStudentRows([...STUDENTS], config)
    expect(result[0].prenom).toBe('Jean')
    expect(result[2].prenom).toBe('Marie')
  })

  it('sorts by classe ascending', () => {
    const config: StudentSortConfig = { field: 'classe', direction: 'asc' }
    const result = sortStudentRows([...STUDENTS], config)
    expect(result[0].classe).toBe('3ème A')
  })

  it('sorts by ine ascending', () => {
    const config: StudentSortConfig = { field: 'ine', direction: 'asc' }
    const result = sortStudentRows([...STUDENTS], config)
    expect(result[0].ine).toBe('111A')
  })

  it('does not mutate the original array', () => {
    const original = [...STUDENTS]
    const config: StudentSortConfig = { field: 'nom', direction: 'asc' }
    sortStudentRows(original, config)
    expect(original[0].nom).toBe('Dupont')
  })

  it('returns same order for equal values', () => {
    const same: StudentViewModel[] = [
      { id: 1, nom: 'A', prenom: 'A', classe: 'A', ine: '1', displayName: 'A A', classLabel: 'A' },
      { id: 2, nom: 'A', prenom: 'B', classe: 'A', ine: '2', displayName: 'B A', classLabel: 'A' }
    ]
    const config: StudentSortConfig = { field: 'nom', direction: 'asc' }
    const result = sortStudentRows(same, config)
    expect(result[0].id).toBe(1)
    expect(result[1].id).toBe(2)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run sortStudentRows`
Expected: FAIL

- [ ] **Step 3: Write the implementation**

Create `src/features/student/renderer/pages/StudentsPage/containers/StudentList/helpers/sortStudentRows/sortStudentRows.ts`:

```ts
import type { StudentViewModel, StudentSortConfig, StudentSortField } from '@student/types'

const COLLATOR = new Intl.Collator('fr', { sensitivity: 'base' })

function getFieldValue(student: StudentViewModel, field: StudentSortField): string {
  return student[field]
}

function compareByField(field: StudentSortField, direction: 'asc' | 'desc') {
  return (a: StudentViewModel, b: StudentViewModel): number => {
    const aValue = getFieldValue(a, field)
    const bValue = getFieldValue(b, field)
    const comparison = COLLATOR.compare(aValue, bValue)
    return direction === 'asc' ? comparison : -comparison
  }
}

export function sortStudentRows(
  students: StudentViewModel[],
  config: StudentSortConfig
): StudentViewModel[] {
  return [...students].sort(compareByField(config.field, config.direction))
}
```

Create `src/features/student/renderer/pages/StudentsPage/containers/StudentList/helpers/sortStudentRows/index.ts`:

```ts
export { sortStudentRows } from './sortStudentRows'
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run sortStudentRows`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/features/student/renderer/pages/StudentsPage/containers/StudentList/helpers/sortStudentRows && git commit -m "feat(student): add sortStudentRows helper with French collation"
```

---

### Task 11: StudentTable Presenter Component

**Files:**

- Create: `src/features/student/renderer/pages/StudentsPage/containers/StudentList/components/StudentTable/StudentTable.tsx`
- Create: `src/features/student/renderer/pages/StudentsPage/containers/StudentList/components/StudentTable/index.tsx`
- Create: `src/features/student/renderer/pages/StudentsPage/containers/StudentList/components/StudentTable/StudentTable.styles.ts`
- Create: `src/features/student/renderer/pages/StudentsPage/containers/StudentList/components/StudentTable/__tests__/StudentTable.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `src/features/student/renderer/pages/StudentsPage/containers/StudentList/components/StudentTable/__tests__/StudentTable.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StudentTable } from '../StudentTable'
import type { StudentViewModel } from '@student/types'

const STUDENTS: StudentViewModel[] = [
  {
    id: 1,
    nom: 'Dupont',
    prenom: 'Jean',
    classe: '3ème A',
    ine: '111A',
    displayName: 'Jean Dupont',
    classLabel: '3ème A'
  },
  {
    id: 2,
    nom: 'Martin',
    prenom: 'Marie',
    classe: '3ème B',
    ine: '222B',
    displayName: 'Marie Martin',
    classLabel: '3ème B'
  }
]

describe('StudentTable', () => {
  it('renders student rows', () => {
    render(
      <StudentTable
        students={STUDENTS}
        selectedIds={[]}
        onToggleSelection={vi.fn()}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        sortConfig={{ field: 'nom', direction: 'asc' }}
        onSort={vi.fn()}
      />
    )

    expect(screen.getByText('Dupont')).toBeInTheDocument()
    expect(screen.getByText('Jean')).toBeInTheDocument()
    expect(screen.getByText('Martin')).toBeInTheDocument()
    expect(screen.getByText('3ème A')).toBeInTheDocument()
  })

  it('renders column headers', () => {
    render(
      <StudentTable
        students={[]}
        selectedIds={[]}
        onToggleSelection={vi.fn()}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        sortConfig={{ field: 'nom', direction: 'asc' }}
        onSort={vi.fn()}
      />
    )

    expect(screen.getByText('Nom')).toBeInTheDocument()
    expect(screen.getByText('Prénom')).toBeInTheDocument()
    expect(screen.getByText('Classe')).toBeInTheDocument()
    expect(screen.getByText('INE')).toBeInTheDocument()
  })

  it('shows checkboxes for selected rows', () => {
    render(
      <StudentTable
        students={STUDENTS}
        selectedIds={[1]}
        onToggleSelection={vi.fn()}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        sortConfig={{ field: 'nom', direction: 'asc' }}
        onSort={vi.fn()}
      />
    )

    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes[1]).toBeChecked()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run StudentTable`
Expected: FAIL

- [ ] **Step 3: Write the styles**

Create `src/features/student/renderer/pages/StudentsPage/containers/StudentList/components/StudentTable/StudentTable.styles.ts`:

```ts
import type { SxProps, Theme } from '@mui/material'

export const tableContainerStyles: SxProps<Theme> = {
  mt: 2
}

export const headerCellStyles: SxProps<Theme> = {
  cursor: 'pointer',
  userSelect: 'none',
  fontWeight: 'bold'
}
```

- [ ] **Step 4: Write the implementation**

Create `src/features/student/renderer/pages/StudentsPage/containers/StudentList/components/StudentTable/StudentTable.tsx`:

```tsx
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
  Paper
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { StudentTableRow } from '../StudentTableRow'
import { tableContainerStyles, headerCellStyles } from './StudentTable.styles'
import type { StudentViewModel, StudentSortConfig, StudentSortField } from '@student/types'

interface StudentTableProps {
  students: StudentViewModel[]
  selectedIds: number[]
  onToggleSelection: (id: number) => void
  onEdit: (student: StudentViewModel) => void
  onDelete: (id: number) => void
  sortConfig: StudentSortConfig
  onSort: (config: StudentSortConfig) => void
}

const SORT_COLUMNS: StudentSortField[] = ['nom', 'prenom', 'classe', 'ine']

export function StudentTable({
  students,
  selectedIds,
  onToggleSelection,
  onEdit,
  onDelete,
  sortConfig,
  onSort
}: StudentTableProps) {
  const { t } = useTranslation('student')

  const handleSort = (field: StudentSortField) => {
    const isCurrentField = sortConfig.field === field
    const direction = isCurrentField && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    onSort({ field, direction })
  }

  return (
    <TableContainer component={Paper} sx={tableContainerStyles}>
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox" />
            {SORT_COLUMNS.map((field) => (
              <TableCell key={field} sx={headerCellStyles} onClick={() => handleSort(field)}>
                {t(`fields.${field}`)}
                {sortConfig.field === field ? (sortConfig.direction === 'asc' ? ' ↑' : ' ↓') : ''}
              </TableCell>
            ))}
            <TableCell align="right">{t('fields.actions', { defaultValue: 'Actions' })}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((student) => (
            <StudentTableRow
              key={student.id}
              student={student}
              selected={selectedIds.includes(student.id)}
              onToggleSelection={onToggleSelection}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
```

Create `src/features/student/renderer/pages/StudentsPage/containers/StudentList/components/StudentTable/index.tsx`:

```tsx
export { StudentTable } from './StudentTable'
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run StudentTable`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/features/student/renderer/pages/StudentsPage/containers/StudentList/components/StudentTable && git commit -m "feat(student): add StudentTable presenter component"
```

---

### Task 12: StudentTableRow Presenter Component

**Files:**

- Create: `src/features/student/renderer/pages/StudentsPage/containers/StudentList/components/StudentTableRow/StudentTableRow.tsx`
- Create: `src/features/student/renderer/pages/StudentsPage/containers/StudentList/components/StudentTableRow/index.tsx`

- [ ] **Step 1: Write the implementation**

Create `src/features/student/renderer/pages/StudentsPage/containers/StudentList/components/StudentTableRow/StudentTableRow.tsx`:

```tsx
import { TableCell, TableRow, Checkbox, IconButton } from '@mui/material'
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material'
import type { StudentViewModel } from '@student/types'

interface StudentTableRowProps {
  student: StudentViewModel
  selected: boolean
  onToggleSelection: (id: number) => void
  onEdit: (student: StudentViewModel) => void
  onDelete: (id: number) => void
}

export function StudentTableRow({
  student,
  selected,
  onToggleSelection,
  onEdit,
  onDelete
}: StudentTableRowProps) {
  const handleCheckboxChange = () => {
    onToggleSelection(student.id)
  }

  const handleRowClick = () => {
    onToggleSelection(student.id)
  }

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    onEdit(student)
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    onDelete(student.id)
  }

  return (
    <TableRow hover selected={selected} onClick={handleRowClick} sx={{ cursor: 'pointer' }}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onChange={handleCheckboxChange} size="small" />
      </TableCell>
      <TableCell>{student.nom}</TableCell>
      <TableCell>{student.prenom}</TableCell>
      <TableCell>{student.classe}</TableCell>
      <TableCell>{student.ine}</TableCell>
      <TableCell align="right">
        <IconButton size="small" onClick={handleEdit} sx={{ mr: 1 }}>
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton size="small" color="error" onClick={handleDelete}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}
```

Create `src/features/student/renderer/pages/StudentsPage/containers/StudentList/components/StudentTableRow/index.tsx`:

```tsx
export { StudentTableRow } from './StudentTableRow'
```

- [ ] **Step 2: Commit**

```bash
git add src/features/student/renderer/pages/StudentsPage/containers/StudentList/components/StudentTableRow && git commit -m "feat(student): add StudentTableRow presenter component"
```

---

### Task 13: StudentListToolbar Presenter Component

**Files:**

- Create: `src/features/student/renderer/pages/StudentsPage/containers/StudentList/components/StudentListToolbar/StudentListToolbar.tsx`
- Create: `src/features/student/renderer/pages/StudentsPage/containers/StudentList/components/StudentListToolbar/index.tsx`

- [ ] **Step 1: Write the implementation**

Create `src/features/student/renderer/pages/StudentsPage/containers/StudentList/components/StudentListToolbar/StudentListToolbar.tsx`:

```tsx
import { Box, TextField, InputAdornment, IconButton, Button } from '@mui/material'
import { Search, Clear, Add } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

interface StudentListToolbarProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  onClearSearch: () => void
  onAddStudent: () => void
  onImportCsv: () => void
}

export function StudentListToolbar({
  searchTerm,
  onSearchChange,
  onClearSearch,
  onAddStudent,
  onImportCsv
}: StudentListToolbarProps) {
  const { t } = useTranslation('student')

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
      <TextField
        placeholder={t('fields.search', { defaultValue: 'Rechercher des élèves...' })}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
          endAdornment: searchTerm ? (
            <InputAdornment position="end">
              <IconButton onClick={onClearSearch} size="small">
                <Clear />
              </IconButton>
            </InputAdornment>
          ) : null
        }}
        sx={{ flex: 1, mr: 2 }}
      />
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button variant="contained" startIcon={<Add />} onClick={onAddStudent}>
          {t('add')}
        </Button>
        <Button variant="outlined" onClick={onImportCsv}>
          {t('import')}
        </Button>
      </Box>
    </Box>
  )
}
```

Create `src/features/student/renderer/pages/StudentsPage/containers/StudentList/components/StudentListToolbar/index.tsx`:

```tsx
export { StudentListToolbar } from './StudentListToolbar'
```

- [ ] **Step 2: Commit**

```bash
git add src/features/student/renderer/pages/StudentsPage/containers/StudentList/components/StudentListToolbar && git commit -m "feat(student): add StudentListToolbar presenter component"
```

---

### Task 14: StudentBatchActions Container + useBatchDelete Hook

**Files:**

- Create: `src/features/student/renderer/pages/StudentsPage/containers/StudentList/containers/StudentBatchActions/hooks/useBatchDelete/useBatchDelete.ts`
- Create: `src/features/student/renderer/pages/StudentsPage/containers/StudentList/containers/StudentBatchActions/hooks/useBatchDelete/index.ts`
- Create: `src/features/student/renderer/pages/StudentsPage/containers/StudentList/containers/StudentBatchActions/hooks/useBatchDelete/__tests__/useBatchDelete.test.ts`
- Create: `src/features/student/renderer/pages/StudentsPage/containers/StudentList/containers/StudentBatchActions/StudentBatchActions.tsx`
- Create: `src/features/student/renderer/pages/StudentsPage/containers/StudentList/containers/StudentBatchActions/index.tsx`
- Create: `src/features/student/renderer/pages/StudentsPage/containers/StudentList/containers/StudentBatchActions/__tests__/StudentBatchActions.test.tsx`

- [ ] **Step 1: Write the failing test for useBatchDelete**

Create `src/features/student/renderer/pages/StudentsPage/containers/StudentList/containers/StudentBatchActions/hooks/useBatchDelete/__tests__/useBatchDelete.test.ts`:

```ts
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor, act } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useBatchDelete } from '../useBatchDelete'

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } }
  })
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    )
  }
}

describe('useBatchDelete', () => {
  beforeEach(() => {
    vi.stubGlobal('electronAPI', {
      student: {
        delete: vi.fn().mockResolvedValue({ success: true, count: 2 })
      }
    })
  })

  it('deletes students by ids', async () => {
    const onSuccess = vi.fn()
    const { result } = renderHook(
      () => useBatchDelete({ onSuccess }),
      { wrapper: createWrapper() }
    )

    act(() => {
      result.current.mutate([1, 2])
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(window.electronAPI.student.delete).toHaveBeenCalledWith({ ids: [1, 2] })
    expect(onSuccess).toHaveBeenCalled()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run useBatchDelete`
Expected: FAIL

- [ ] **Step 3: Write useBatchDelete implementation**

Create `src/features/student/renderer/pages/StudentsPage/containers/StudentList/containers/StudentBatchActions/hooks/useBatchDelete/useBatchDelete.ts`:

```ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { studentKeys } from '@student/api/studentKeys'

interface UseBatchDeleteOptions {
  onSuccess?: () => void
}

export function useBatchDelete({ onSuccess }: UseBatchDeleteOptions = {}) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (ids: number[]) => {
      const result = await window.electronAPI.student.delete({ ids })
      if (!result.success) {
        throw new Error(result.error ?? 'Erreur lors de la suppression')
      }
      return result
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [studentKeys.all] })
      onSuccess?.()
    }
  })
}
```

Create `src/features/student/renderer/pages/StudentsPage/containers/StudentList/containers/StudentBatchActions/hooks/useBatchDelete/index.ts`:

```ts
export { useBatchDelete } from './useBatchDelete'
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run useBatchDelete`
Expected: PASS

- [ ] **Step 5: Write the failing test for StudentBatchActions**

Create `src/features/student/renderer/pages/StudentsPage/containers/StudentList/containers/StudentBatchActions/__tests__/StudentBatchActions.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { StudentBatchActions } from '../StudentBatchActions'

describe('StudentBatchActions', () => {
  it('renders select all and delete buttons', () => {
    render(
      <StudentBatchActions
        selectedCount={2}
        totalCount={10}
        onSelectAll={vi.fn()}
        onClearSelection={vi.fn()}
        onDeleteSelected={vi.fn()}
      />
    )

    expect(screen.getByText('Tout sélectionner')).toBeInTheDocument()
    expect(screen.getByText('Supprimer la sélection')).toBeInTheDocument()
    expect(screen.getByText('2 sélectionné(s)')).toBeInTheDocument()
  })

  it('disables delete button when nothing selected', () => {
    render(
      <StudentBatchActions
        selectedCount={0}
        totalCount={10}
        onSelectAll={vi.fn()}
        onClearSelection={vi.fn()}
        onDeleteSelected={vi.fn()}
      />
    )

    const deleteButton = screen.getByText('Supprimer la sélection')
    expect(deleteButton).toBeDisabled()
  })

  it('shows confirmation dialog when delete is clicked', () => {
    render(
      <StudentBatchActions
        selectedCount={3}
        totalCount={10}
        onSelectAll={vi.fn()}
        onClearSelection={vi.fn()}
        onDeleteSelected={vi.fn()}
      />
    )

    const deleteButton = screen.getByText('Supprimer la sélection')
    fireEvent.click(deleteButton)

    expect(screen.getByText('Confirmer la suppression')).toBeInTheDocument()
  })
})
```

- [ ] **Step 6: Run test to verify it fails**

Run: `npx vitest run StudentBatchActions`
Expected: FAIL

- [ ] **Step 7: Write StudentBatchActions implementation**

Create `src/features/student/renderer/pages/StudentsPage/containers/StudentList/containers/StudentBatchActions/StudentBatchActions.tsx`:

```tsx
import { useState } from 'react'
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import { useBatchDelete } from './hooks/useBatchDelete'

interface StudentBatchActionsProps {
  selectedCount: number
  totalCount: number
  onSelectAll: () => void
  onClearSelection: () => void
  onDeleteSelected: () => void
}

const CONFIRM_TITLE = 'Confirmer la suppression'
const SELECT_ALL_LABEL = 'Tout sélectionner'
const DESELECT_ALL_LABEL = 'Tout désélectionner'
const DELETE_SELECTION_LABEL = 'Supprimer la sélection'
const SELECTED_COUNT_LABEL = 'sélectionné(s)'

export function StudentBatchActions({
  selectedCount,
  totalCount,
  onSelectAll,
  onClearSelection,
  onDeleteSelected
}: StudentBatchActionsProps) {
  const [showConfirm, setShowConfirm] = useState(false)
  const deleteMutation = useBatchDelete({
    onSuccess: () => {
      onDeleteSelected()
      setShowConfirm(false)
    }
  })

  const handleSelectToggle = () => {
    if (selectedCount === totalCount && totalCount > 0) {
      onClearSelection()
    } else {
      onSelectAll()
    }
  }

  const handleDeleteClick = () => {
    if (selectedCount > 0) {
      setShowConfirm(true)
    }
  }

  const handleConfirmDelete = () => {
    onDeleteSelected()
    setShowConfirm(false)
  }

  return (
    <>
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 1 }}>
        <Button variant="outlined" onClick={handleSelectToggle} disabled={totalCount === 0}>
          {selectedCount === totalCount && totalCount > 0 ? DESELECT_ALL_LABEL : SELECT_ALL_LABEL}
        </Button>
        <Button
          variant="outlined"
          color="error"
          disabled={selectedCount === 0}
          onClick={handleDeleteClick}
        >
          {DELETE_SELECTION_LABEL}
        </Button>
        {selectedCount > 0 && (
          <span>
            {selectedCount} {SELECTED_COUNT_LABEL}
          </span>
        )}
      </Box>

      <Dialog open={showConfirm} onClose={() => setShowConfirm(false)}>
        <DialogTitle>{CONFIRM_TITLE}</DialogTitle>
        <DialogContent>Voulez-vous vraiment supprimer {selectedCount} élève(s) ?</DialogContent>
        <DialogActions>
          <Button onClick={() => setShowConfirm(false)}>Annuler</Button>
          <Button color="error" variant="contained" onClick={handleConfirmDelete}>
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
```

Create `src/features/student/renderer/pages/StudentsPage/containers/StudentList/containers/StudentBatchActions/index.tsx`:

```tsx
export { StudentBatchActions } from './StudentBatchActions'
```

- [ ] **Step 8: Run test to verify it passes**

Run: `npx vitest run StudentBatchActions`
Expected: PASS

- [ ] **Step 9: Commit**

```bash
git add src/features/student/renderer/pages/StudentsPage/containers/StudentList/containers/StudentBatchActions && git commit -m "feat(student): add StudentBatchActions container with useBatchDelete hook"
```

---

### Task 15: StudentForm Validation Schema

**Files:**

- Create: `src/features/student/renderer/pages/StudentsPage/containers/StudentForm/validations/studentFormSchema/studentFormSchema.ts`
- Create: `src/features/student/renderer/pages/StudentsPage/containers/StudentForm/validations/studentFormSchema/index.ts`
- Create: `src/features/student/renderer/pages/StudentsPage/containers/StudentForm/validations/studentFormSchema/__tests__/studentFormSchema.test.ts`

- [ ] **Step 1: Write the failing test**

Create `src/features/student/renderer/pages/StudentsPage/containers/StudentForm/validations/studentFormSchema/__tests__/studentFormSchema.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { studentFormSchema } from '../studentFormSchema'

describe('studentFormSchema', () => {
  it('accepts valid student form data', () => {
    const result = studentFormSchema.safeParse({
      nom: 'Dupont',
      prenom: 'Jean',
      classe: '3ème A',
      ine: '1234567890A'
    })
    expect(result.success).toBe(true)
  })

  it('rejects missing nom', () => {
    const result = studentFormSchema.safeParse({
      nom: '',
      prenom: 'Jean',
      classe: '3A',
      ine: '123A'
    })
    expect(result.success).toBe(false)
  })

  it('rejects missing prenom', () => {
    const result = studentFormSchema.safeParse({
      nom: 'Dupont',
      prenom: '',
      classe: '3A',
      ine: '123A'
    })
    expect(result.success).toBe(false)
  })

  it('rejects missing classe', () => {
    const result = studentFormSchema.safeParse({
      nom: 'Dupont',
      prenom: 'Jean',
      classe: '',
      ine: '123A'
    })
    expect(result.success).toBe(false)
  })

  it('rejects missing ine', () => {
    const result = studentFormSchema.safeParse({
      nom: 'Dupont',
      prenom: 'Jean',
      classe: '3A',
      ine: ''
    })
    expect(result.success).toBe(false)
  })

  it('rejects whitespace-only fields', () => {
    const result = studentFormSchema.safeParse({
      nom: '   ',
      prenom: '   ',
      classe: '   ',
      ine: '   '
    })
    expect(result.success).toBe(false)
  })

  it('rejects nom over 100 chars', () => {
    const result = studentFormSchema.safeParse({
      nom: 'A'.repeat(101),
      prenom: 'Jean',
      classe: '3A',
      ine: '123A'
    })
    expect(result.success).toBe(false)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run studentFormSchema`
Expected: FAIL

- [ ] **Step 3: Write the implementation**

Create `src/features/student/renderer/pages/StudentsPage/containers/StudentForm/validations/studentFormSchema/studentFormSchema.ts`:

```ts
import { z } from 'zod'
import {
  nomSchema,
  prenomSchema,
  classeSchema,
  ineSchema
} from '@student/validations/studentSchema'

export const studentFormSchema = z.object({
  nom: nomSchema,
  prenom: prenomSchema,
  classe: classeSchema,
  ine: ineSchema
})

export type StudentFormValues = z.infer<typeof studentFormSchema>
```

Create `src/features/student/renderer/pages/StudentsPage/containers/StudentForm/validations/studentFormSchema/index.ts`:

```ts
export { studentFormSchema, type StudentFormValues } from './studentFormSchema'
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run studentFormSchema`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/features/student/renderer/pages/StudentsPage/containers/StudentForm/validations/studentFormSchema && git commit -m "feat(student): add StudentForm Zod validation schema"
```

---

### Task 16: mapFormToCreateDto Helper

**Files:**

- Create: `src/features/student/renderer/pages/StudentsPage/containers/StudentForm/helpers/mapFormToCreateDto/mapFormToCreateDto.ts`
- Create: `src/features/student/renderer/pages/StudentsPage/containers/StudentForm/helpers/mapFormToCreateDto/index.ts`
- Create: `src/features/student/renderer/pages/StudentsPage/containers/StudentForm/helpers/mapFormToCreateDto/__tests__/mapFormToCreateDto.test.ts`
- Create: `src/features/student/renderer/pages/StudentsPage/containers/StudentForm/types/StudentFormData.ts`

- [ ] **Step 1: Create the form data type**

Create `src/features/student/renderer/pages/StudentsPage/containers/StudentForm/types/StudentFormData.ts`:

```ts
export interface StudentFormData {
  nom: string
  prenom: string
  classe: string
  ine: string
}
```

- [ ] **Step 2: Write the failing test**

Create `src/features/student/renderer/pages/StudentsPage/containers/StudentForm/helpers/mapFormToCreateDto/__tests__/mapFormToCreateDto.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { mapFormToCreateDto, mapFormToUpdateDto } from '../mapFormToCreateDto'
import type { StudentFormData } from '../../types/StudentFormData'

describe('mapFormToCreateDto', () => {
  it('maps form data to CreateStudentDto', () => {
    const formData: StudentFormData = {
      nom: '  Dupont  ',
      prenom: '  Jean  ',
      classe: '  3ème A  ',
      ine: '  123A  '
    }
    const result = mapFormToCreateDto(formData)

    expect(result).toEqual({
      nom: 'Dupont',
      prenom: 'Jean',
      classe: '3ème A',
      ine: '123A'
    })
  })
})

describe('mapFormToUpdateDto', () => {
  it('maps form data to UpdateStudentDto (only changed fields)', () => {
    const original = { nom: 'Old', prenom: 'Jean', classe: '3A', ine: '123A' }
    const formData: StudentFormData = { nom: 'New', prenom: 'Jean', classe: '3A', ine: '123A' }
    const result = mapFormToUpdateDto(original, formData)

    expect(result).toEqual({ nom: 'New' })
  })

  it('returns empty object when nothing changed', () => {
    const original = { nom: 'Same', prenom: 'Same', classe: 'Same', ine: 'Same' }
    const formData: StudentFormData = { nom: 'Same', prenom: 'Same', classe: 'Same', ine: 'Same' }
    const result = mapFormToUpdateDto(original, formData)

    expect(result).toEqual({})
  })
})
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npx vitest run mapFormToCreateDto`
Expected: FAIL

- [ ] **Step 4: Write the implementation**

Create `src/features/student/renderer/pages/StudentsPage/containers/StudentForm/helpers/mapFormToCreateDto/mapFormToCreateDto.ts`:

```ts
import type { CreateStudentDto, UpdateStudentDto } from '@shared/types'
import type { StudentFormData } from '../../types/StudentFormData'

export function mapFormToCreateDto(formData: StudentFormData): CreateStudentDto {
  return {
    nom: formData.nom.trim(),
    prenom: formData.prenom.trim(),
    classe: formData.classe.trim(),
    ine: formData.ine.trim()
  }
}

export function mapFormToUpdateDto(
  original: { nom: string; prenom: string; classe: string; ine: string },
  formData: StudentFormData
): UpdateStudentDto {
  const result: UpdateStudentDto = {}

  if (formData.nom.trim() !== original.nom) {
    result.nom = formData.nom.trim()
  }
  if (formData.prenom.trim() !== original.prenom) {
    result.prenom = formData.prenom.trim()
  }
  if (formData.classe.trim() !== original.classe) {
    result.classe = formData.classe.trim()
  }
  if (formData.ine.trim() !== original.ine) {
    result.ine = formData.ine.trim()
  }

  return result
}
```

Create `src/features/student/renderer/pages/StudentsPage/containers/StudentForm/helpers/mapFormToCreateDto/index.ts`:

```ts
export { mapFormToCreateDto, mapFormToUpdateDto } from './mapFormToCreateDto'
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run mapFormToCreateDto`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/features/student/renderer/pages/StudentsPage/containers/StudentForm/helpers src/features/student/renderer/pages/StudentsPage/containers/StudentForm/types && git commit -m "feat(student): add mapFormToCreateDto and mapFormToUpdateDto helpers"
```

---

### Task 17: useStudentForm Hook

**Files:**

- Create: `src/features/student/renderer/pages/StudentsPage/containers/StudentForm/hooks/useStudentForm/useStudentForm.ts`
- Create: `src/features/student/renderer/pages/StudentsPage/containers/StudentForm/hooks/useStudentForm/index.ts`
- Create: `src/features/student/renderer/pages/StudentsPage/containers/StudentForm/hooks/useStudentForm/__tests__/useStudentForm.test.ts`

- [ ] **Step 1: Write the failing test**

Create `src/features/student/renderer/pages/StudentsPage/containers/StudentForm/hooks/useStudentForm/__tests__/useStudentForm.test.ts`:

```ts
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useStudentForm } from '../useStudentForm'
import type { StudentViewModel } from '@student/types'

const STUDENT: StudentViewModel = {
  id: 1,
  nom: 'Dupont',
  prenom: 'Jean',
  classe: '3ème A',
  ine: '123A',
  displayName: 'Jean Dupont',
  classLabel: '3ème A'
}

describe('useStudentForm', () => {
  const onCreateSubmit = vi.fn().mockResolvedValue(true)
  const onUpdateSubmit = vi.fn().mockResolvedValue(true)
  const onClose = vi.fn()

  it('initializes form for create mode', () => {
    const { result } = renderHook(() =>
      useStudentForm({
        mode: 'create',
        student: null,
        onCreateSubmit,
        onUpdateSubmit,
        onClose
      })
    )

    expect(result.current.formValues.nom).toBe('')
    expect(result.current.formValues.prenom).toBe('')
    expect(result.current.mode).toBe('create')
  })

  it('initializes form for edit mode', () => {
    const { result } = renderHook(() =>
      useStudentForm({
        mode: 'edit',
        student: STUDENT,
        onCreateSubmit,
        onUpdateSubmit,
        onClose
      })
    )

    expect(result.current.formValues.nom).toBe('Dupont')
    expect(result.current.formValues.prenom).toBe('Jean')
    expect(result.current.mode).toBe('edit')
  })

  it('updates form values on field change', () => {
    const { result } = renderHook(() =>
      useStudentForm({
        mode: 'create',
        student: null,
        onCreateSubmit,
        onUpdateSubmit,
        onClose
      })
    )

    act(() => {
      result.current.setFieldValue('nom', 'Martin')
    })

    expect(result.current.formValues.nom).toBe('Martin')
  })

  it('resets form', () => {
    const { result } = renderHook(() =>
      useStudentForm({
        mode: 'create',
        student: null,
        onCreateSubmit,
        onUpdateSubmit,
        onClose
      })
    )

    act(() => {
      result.current.setFieldValue('nom', 'Martin')
    })
    act(() => {
      result.current.resetForm()
    })

    expect(result.current.formValues.nom).toBe('')
  })

  it('submits create form', async () => {
    const { result } = renderHook(() =>
      useStudentForm({
        mode: 'create',
        student: null,
        onCreateSubmit,
        onUpdateSubmit,
        onClose
      })
    )

    act(() => {
      result.current.setFieldValue('nom', 'Dupont')
    })
    act(() => {
      result.current.setFieldValue('prenom', 'Jean')
    })
    act(() => {
      result.current.setFieldValue('classe', '3A')
    })
    act(() => {
      result.current.setFieldValue('ine', '123A')
    })

    await act(async () => {
      await result.current.handleSubmit()
    })

    expect(onCreateSubmit).toHaveBeenCalledWith({
      nom: 'Dupont',
      prenom: 'Jean',
      classe: '3A',
      ine: '123A'
    })
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run useStudentForm`
Expected: FAIL

- [ ] **Step 3: Write the implementation**

Create `src/features/student/renderer/pages/StudentsPage/containers/StudentForm/hooks/useStudentForm/useStudentForm.ts`:

```ts
import { useState, useCallback } from 'react'
import type { StudentViewModel } from '@student/types'
import type { StudentFormData } from '../../types/StudentFormData'
import { mapFormToCreateDto } from '../../helpers/mapFormToCreateDto'

const EMPTY_FORM: StudentFormData = {
  nom: '',
  prenom: '',
  classe: '',
  ine: ''
}

interface UseStudentFormOptions {
  mode: 'create' | 'edit'
  student: StudentViewModel | null
  onCreateSubmit: (dto: StudentFormData) => Promise<boolean>
  onUpdateSubmit: (student: StudentViewModel, data: StudentFormData) => Promise<boolean>
  onClose: () => void
}

interface UseStudentFormReturn {
  mode: 'create' | 'edit'
  formValues: StudentFormData
  setFieldValue: (field: keyof StudentFormData, value: string) => void
  resetForm: () => void
  handleSubmit: () => Promise<void>
  isSubmitting: boolean
}

export function useStudentForm({
  mode,
  student,
  onCreateSubmit,
  onUpdateSubmit,
  onClose
}: UseStudentFormOptions): UseStudentFormReturn {
  const initialForm: StudentFormData = student
    ? { nom: student.nom, prenom: student.prenom, classe: student.classe, ine: student.ine }
    : EMPTY_FORM

  const [formValues, setFormValues] = useState<StudentFormData>(initialForm)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const setFieldValue = useCallback((field: keyof StudentFormData, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }))
  }, [])

  const resetForm = useCallback(() => {
    setFormValues(initialForm)
  }, [initialForm])

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true)
    try {
      if (mode === 'create') {
        const success = await onCreateSubmit(formValues)
        if (success) {
          setFormValues(EMPTY_FORM)
          onClose()
        }
      } else if (student) {
        const success = await onUpdateSubmit(student, formValues)
        if (success) {
          onClose()
        }
      }
    } finally {
      setIsSubmitting(false)
    }
  }, [mode, formValues, student, onCreateSubmit, onUpdateSubmit, onClose])

  return {
    mode,
    formValues,
    setFieldValue,
    resetForm,
    handleSubmit,
    isSubmitting
  } as const
}
```

Create `src/features/student/renderer/pages/StudentsPage/containers/StudentForm/hooks/useStudentForm/index.ts`:

```ts
export { useStudentForm } from './useStudentForm'
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run useStudentForm`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/features/student/renderer/pages/StudentsPage/containers/StudentForm/hooks/useStudentForm && git commit -m "feat(student): add useStudentForm hook for create/edit forms"
```

---

### Task 18: StudentFormFields Presenter Component

**Files:**

- Create: `src/features/student/renderer/pages/StudentsPage/containers/StudentForm/components/StudentFormFields/StudentFormFields.tsx`
- Create: `src/features/student/renderer/pages/StudentsPage/containers/StudentForm/components/StudentFormFields/index.tsx`
- Create: `src/features/student/renderer/pages/StudentsPage/containers/StudentForm/components/StudentFormFields/__tests__/StudentFormFields.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `src/features/student/renderer/pages/StudentsPage/containers/StudentForm/components/StudentFormFields/__tests__/StudentFormFields.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StudentFormFields } from '../StudentFormFields'
import type { UseFormRegister, FieldErrors } from 'react-hook-form'
import type { StudentFormData } from '../../types/StudentFormData'

const mockRegister = vi.fn((name: keyof StudentFormData) => ({
  name,
  onChange: vi.fn(),
  onBlur: vi.fn(),
  ref: vi.fn()
})) as unknown as UseFormRegister<StudentFormData>

describe('StudentFormFields', () => {
  it('renders all form fields', () => {
    render(<StudentFormFields register={mockRegister} errors={{}} />)

    expect(screen.getByLabelText('Nom')).toBeInTheDocument()
    expect(screen.getByLabelText('Prénom')).toBeInTheDocument()
    expect(screen.getByLabelText('Classe')).toBeInTheDocument()
    expect(screen.getByLabelText('INE')).toBeInTheDocument()
  })

  it('shows error messages', () => {
    const errors: FieldErrors<StudentFormData> = {
      nom: { type: 'required', message: 'Le nom est obligatoire' }
    }
    render(<StudentFormFields register={mockRegister} errors={errors} />)

    expect(screen.getByText('Le nom est obligatoire')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run StudentFormFields`
Expected: FAIL

- [ ] **Step 3: Write the implementation**

Create `src/features/student/renderer/pages/StudentsPage/containers/StudentForm/components/StudentFormFields/StudentFormFields.tsx`:

```tsx
import { TextField, Stack } from '@mui/material'
import type { UseFormRegister, FieldErrors } from 'react-hook-form'
import type { StudentFormData } from '../../types/StudentFormData'

interface StudentFormFieldsProps {
  register: UseFormRegister<StudentFormData>
  errors: FieldErrors<StudentFormData>
}

const FIELD_CONFIGS: { key: keyof StudentFormData; label: string }[] = [
  { key: 'nom', label: 'Nom' },
  { key: 'prenom', label: 'Prénom' },
  { key: 'classe', label: 'Classe' },
  { key: 'ine', label: 'INE' }
]

export function StudentFormFields({ register, errors }: StudentFormFieldsProps) {
  return (
    <Stack spacing={2} sx={{ mt: 1 }}>
      {FIELD_CONFIGS.map(({ key, label }) => (
        <TextField
          key={key}
          label={label}
          {...register(key)}
          fullWidth
          required
          error={Boolean(errors[key])}
          helperText={errors[key]?.message ?? ''}
        />
      ))}
    </Stack>
  )
}
```

Create `src/features/student/renderer/pages/StudentsPage/containers/StudentForm/components/StudentFormFields/index.tsx`:

```tsx
export { StudentFormFields } from './StudentFormFields'
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run StudentFormFields`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/features/student/renderer/pages/StudentsPage/containers/StudentForm/components/StudentFormFields && git commit -m "feat(student): add StudentFormFields presenter component"
```

---

### Task 19: StudentFormActions Presenter Component

**Files:**

- Create: `src/features/student/renderer/pages/StudentsPage/containers/StudentForm/components/StudentFormActions/StudentFormActions.tsx`
- Create: `src/features/student/renderer/pages/StudentsPage/containers/StudentForm/components/StudentFormActions/index.tsx`

- [ ] **Step 1: Write the implementation**

Create `src/features/student/renderer/pages/StudentsPage/containers/StudentForm/components/StudentFormActions/StudentFormActions.tsx`:

```tsx
import { DialogActions, Button } from '@mui/material'
import { useTranslation } from 'react-i18next'

interface StudentFormActionsProps {
  isSubmitting: boolean
  onCancel: () => void
  submitLabel: string
}

export function StudentFormActions({
  isSubmitting,
  onCancel,
  submitLabel
}: StudentFormActionsProps) {
  const { t } = useTranslation('common')

  return (
    <DialogActions>
      <Button onClick={onCancel} disabled={isSubmitting}>
        {t('cancel', { defaultValue: 'Annuler' })}
      </Button>
      <Button type="submit" variant="contained" disabled={isSubmitting}>
        {submitLabel}
      </Button>
    </DialogActions>
  )
}
```

Create `src/features/student/renderer/pages/StudentsPage/containers/StudentForm/components/StudentFormActions/index.tsx`:

```tsx
export { StudentFormActions } from './StudentFormActions'
```

- [ ] **Step 2: Commit**

```bash
git add src/features/student/renderer/pages/StudentsPage/containers/StudentForm/components/StudentFormActions && git commit -m "feat(student): add StudentFormActions presenter component"
```

---

### Task 20: StudentForm Container

**Files:**

- Create: `src/features/student/renderer/pages/StudentsPage/containers/StudentForm/StudentForm.tsx`
- Create: `src/features/student/renderer/pages/StudentsPage/containers/StudentForm/index.tsx`
- Create: `src/features/student/renderer/pages/StudentsPage/containers/StudentForm/__tests__/StudentForm.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `src/features/student/renderer/pages/StudentsPage/containers/StudentForm/__tests__/StudentForm.test.tsx`:

```tsx
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StudentForm } from '../StudentForm'
import type { StudentViewModel } from '@student/types'

const STUDENT: StudentViewModel = {
  id: 1,
  nom: 'Dupont',
  prenom: 'Jean',
  classe: '3A',
  ine: '123A',
  displayName: 'Jean Dupont',
  classLabel: '3A'
}

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } }
  })
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  }
}

describe('StudentForm', () => {
  beforeEach(() => {
    vi.stubGlobal('electronAPI', {
      student: {
        create: vi.fn().mockResolvedValue({ success: true, data: STUDENT }),
        update: vi.fn().mockResolvedValue({ success: true, data: STUDENT })
      }
    })
  })

  it('renders in create mode', () => {
    render(<StudentForm mode="create" student={null} open onClose={vi.fn()} />, {
      wrapper: createWrapper()
    })

    expect(screen.getByText('Ajouter un élève')).toBeInTheDocument()
  })

  it('renders in edit mode with student data', () => {
    render(<StudentForm mode="edit" student={STUDENT} open onClose={vi.fn()} />, {
      wrapper: createWrapper()
    })

    expect(screen.getByText("Modifier l'élève")).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run StudentForm`
Expected: FAIL

- [ ] **Step 3: Write the implementation**

Create `src/features/student/renderer/pages/StudentsPage/containers/StudentForm/StudentForm.tsx`:

```tsx
import { useCallback } from 'react'
import { Dialog, DialogTitle, DialogContent } from '@mui/material'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateStudent, useUpdateStudent } from '@student/api/useStudentMutations'
import { studentFormSchema } from './validations/studentFormSchema'
import { mapFormToCreateDto, mapFormToUpdateDto } from './helpers/mapFormToCreateDto'
import { StudentFormFields } from './components/StudentFormFields'
import { StudentFormActions } from './components/StudentFormActions'
import type { StudentViewModel } from '@student/types'
import type { StudentFormData } from './types/StudentFormData'
import type { CreateStudentDto, UpdateStudentDto } from '@shared/types'

const CREATE_TITLE = 'Ajouter un élève'
const EDIT_TITLE = "Modifier l'élève"
const CREATE_SUBMIT_LABEL = 'Ajouter'
const EDIT_SUBMIT_LABEL = 'Enregistrer'

interface StudentFormProps {
  mode: 'create' | 'edit'
  student: StudentViewModel | null
  open: boolean
  onClose: () => void
}

export function StudentForm({ mode, student, open, onClose }: StudentFormProps) {
  const createMutation = useCreateStudent()
  const updateMutation = useUpdateStudent()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentFormSchema),
    values: student
      ? { nom: student.nom, prenom: student.prenom, classe: student.classe, ine: student.ine }
      : { nom: '', prenom: '', classe: '', ine: '' }
  })

  const handleFormSubmit = useCallback(
    (data: StudentFormData) => {
      if (mode === 'create') {
        const dto: CreateStudentDto = mapFormToCreateDto(data)
        createMutation.mutate(dto, {
          onSuccess: () => {
            reset()
            onClose()
          }
        })
      } else if (student) {
        const dto: UpdateStudentDto = mapFormToUpdateDto(student, data)
        updateMutation.mutate(
          { id: student.id, data: dto },
          {
            onSuccess: () => {
              onClose()
            }
          }
        )
      }
    },
    [mode, student, createMutation, updateMutation, reset, onClose]
  )

  const handleClose = () => {
    reset()
    onClose()
  }

  const title = mode === 'create' ? CREATE_TITLE : EDIT_TITLE
  const submitLabel = mode === 'create' ? CREATE_SUBMIT_LABEL : EDIT_SUBMIT_LABEL

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>{title}</DialogTitle>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent>
          <StudentFormFields register={register} errors={errors} />
        </DialogContent>
        <StudentFormActions
          isSubmitting={isSubmitting}
          onCancel={handleClose}
          submitLabel={submitLabel}
        />
      </form>
    </Dialog>
  )
}
```

Create `src/features/student/renderer/pages/StudentsPage/containers/StudentForm/index.tsx`:

```tsx
export { StudentForm } from './StudentForm'
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run StudentForm`
Expected: FAIL

- [ ] **Step 3: Write the implementation**

Create `src/features/student/renderer/pages/StudentsPage/containers/StudentForm/StudentForm.tsx`:

```tsx
import { useCallback } from 'react'
import { Dialog, DialogTitle, DialogContent } from '@mui/material'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateStudent, useUpdateStudent } from '@student/api/useStudentMutations'
import { studentFormSchema } from './validations/studentFormSchema'
import { mapFormToCreateDto, mapFormToUpdateDto } from './helpers/mapFormToCreateDto'
import { StudentFormFields } from './components/StudentFormFields'
import { StudentFormActions } from './components/StudentFormActions'
import type { StudentViewModel } from '@student/types'
import type { StudentFormData } from './types/StudentFormData'
import type { CreateStudentDto, UpdateStudentDto } from '@shared/types'

const CREATE_TITLE = 'Ajouter un élève'
const EDIT_TITLE = "Modifier l'élève"
const CREATE_SUBMIT_LABEL = 'Ajouter'
const EDIT_SUBMIT_LABEL = 'Enregistrer'

interface StudentFormProps {
  mode: 'create' | 'edit'
  student: StudentViewModel | null
  open: boolean
  onClose: () => void
}

export function StudentForm({ mode, student, open, onClose }: StudentFormProps) {
  const createMutation = useCreateStudent()
  const updateMutation = useUpdateStudent()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentFormSchema),
    values: student
      ? { nom: student.nom, prenom: student.prenom, classe: student.classe, ine: student.ine }
      : { nom: '', prenom: '', classe: '', ine: '' }
  })

  const handleFormSubmit = useCallback(
    (data: StudentFormData) => {
      if (mode === 'create') {
        const dto: CreateStudentDto = mapFormToCreateDto(data)
        createMutation.mutate(dto, {
          onSuccess: () => {
            reset()
            onClose()
          }
        })
      } else if (student) {
        const dto: UpdateStudentDto = mapFormToUpdateDto(student, data)
        updateMutation.mutate(
          { id: student.id, data: dto },
          {
            onSuccess: () => {
              onClose()
            }
          }
        )
      }
    },
    [mode, student, createMutation, updateMutation, reset, onClose]
  )

  const handleClose = () => {
    reset()
    onClose()
  }

  const title = mode === 'create' ? CREATE_TITLE : EDIT_TITLE
  const submitLabel = mode === 'create' ? CREATE_SUBMIT_LABEL : EDIT_SUBMIT_LABEL

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>{title}</DialogTitle>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent>
          <StudentFormFields register={register} errors={errors} />
        </DialogContent>
        <StudentFormActions
          isSubmitting={isSubmitting}
          onCancel={handleClose}
          submitLabel={submitLabel}
        />
      </form>
    </Dialog>
  )
}
```

Create `src/features/student/renderer/pages/StudentsPage/containers/StudentForm/index.tsx`:

```tsx
export { StudentForm } from './StudentForm'
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run StudentForm`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/features/student/renderer/pages/StudentsPage/containers/StudentForm && git commit -m "feat(student): add StudentForm container with React Hook Form + Zod"
```

---

### Task 21: useStudentListData Hook

**Files:**

- Create: `src/features/student/renderer/pages/StudentsPage/containers/StudentList/hooks/useStudentListData/useStudentListData.ts`
- Create: `src/features/student/renderer/pages/StudentsPage/containers/StudentList/hooks/useStudentListData/index.ts`
- Create: `src/features/student/renderer/pages/StudentsPage/containers/StudentList/hooks/useStudentListData/__tests__/useStudentListData.test.ts`

- [ ] **Step 1: Write the failing test**

Create `src/features/student/renderer/pages/StudentsPage/containers/StudentList/hooks/useStudentListData/__tests__/useStudentListData.test.ts`:

```ts
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useStudentListData } from '../useStudentListData'
import type { StudentResponseDto } from '@shared/types'

const MOCK_DTOS: StudentResponseDto[] = [
  { id: 1, nom: 'Dupont', prenom: 'Jean', classe: '3ème A', ine: '111A' },
  { id: 2, nom: 'Martin', prenom: 'Marie', classe: '3ème B', ine: '222B' },
  { id: 3, nom: 'Bernard', prenom: 'Luc', classe: '4ème C', ine: '333C' }
]

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } }
  })
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    )
  }
}

describe('useStudentListData', () => {
  beforeEach(() => {
    vi.stubGlobal('electronAPI', {
      student: {
        getAll: vi.fn().mockResolvedValue({ students: MOCK_DTOS, total: 3 })
      }
    })
  })

  it('fetches and returns students as view models', async () => {
    const { result } = renderHook(() => useStudentListData(), { wrapper: createWrapper() })

    await waitFor(() => expect(result.current.students.length).toBe(3))

    expect(result.current.students[0].displayName).toBe('Jean Dupont')
  })

  it('filters students by search term', async () => {
    const { result } = renderHook(() => useStudentListData(), { wrapper: createWrapper() })

    await waitFor(() => expect(result.current.students.length).toBeGreaterThan(0))

    act(() => {
      result.current.setSearchTerm('dup')
    })

    expect(result.current.filteredStudents.length).toBe(1)
    expect(result.current.filteredStudents[0].nom).toBe('Dupont')
  })

  it('sorts students by field', async () => {
    const { result } = renderHook(() => useStudentListData(), { wrapper: createWrapper() })

    await waitFor(() => expect(result.current.students.length).toBeGreaterThan(0))

    result.current.setSortConfig({ field: 'prenom', direction: 'asc' })

    expect(result.current.filteredStudents[0].prenom).toBe('Jean')
  })

  it('returns loading state', async () => {
    const { result } = renderHook(() => useStudentListData(), { wrapper: createWrapper() })

    expect(result.current.isLoading).toBe(true)

    await waitFor(() => expect(result.current.isLoading).toBe(false))
  })
})
```

Note: Import `act` from `@testing-library/react`:

```ts
import { renderHook, waitFor, act } from '@testing-library/react'
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run useStudentListData`
Expected: FAIL

- [ ] **Step 3: Write the implementation**

Create `src/features/student/renderer/pages/StudentsPage/containers/StudentList/hooks/useStudentListData/useStudentListData.ts`:

```ts
import { useState, useMemo, useCallback } from 'react'
import { useStudentList } from '@student/api/useStudentQueries'
import { filterStudentRows } from '../../helpers/filterStudentRows'
import { sortStudentRows } from '../../helpers/sortStudentRows'
import type { StudentViewModel, StudentSortConfig } from '@student/types'

const DEFAULT_SORT_CONFIG: StudentSortConfig = {
  field: 'nom',
  direction: 'asc'
}

const EMPTY_SEARCH_TERM = ''

export function useStudentListData() {
  const queryResult = useStudentList()
  const [searchTerm, setSearchTerm] = useState<string>(EMPTY_SEARCH_TERM)
  const [sortConfig, setSortConfig] = useState<StudentSortConfig>(DEFAULT_SORT_CONFIG)

  const students = queryResult.data ?? []

  const filteredStudents = useMemo(() => {
    const filtered = filterStudentRows(students, searchTerm)
    return sortStudentRows(filtered, sortConfig)
  }, [students, searchTerm, sortConfig])

  const clearSearch = useCallback(() => {
    setSearchTerm(EMPTY_SEARCH_TERM)
  }, [])

  return {
    students,
    filteredStudents,
    searchTerm,
    setSearchTerm,
    clearSearch,
    sortConfig,
    setSortConfig,
    isLoading: queryResult.isLoading,
    isError: queryResult.isError,
    error: queryResult.error
  } as const
}
```

Create `src/features/student/renderer/pages/StudentsPage/containers/StudentList/hooks/useStudentListData/index.ts`:

```ts
export { useStudentListData } from './useStudentListData'
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run useStudentListData`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/features/student/renderer/pages/StudentsPage/containers/StudentList/hooks/useStudentListData && git commit -m "feat(student): add useStudentListData hook (filter + sort + query)"
```

---

### Task 22: StudentList Container

**Files:**

- Create: `src/features/student/renderer/pages/StudentsPage/containers/StudentList/types/StudentListProps.ts`
- Create: `src/features/student/renderer/pages/StudentsPage/containers/StudentList/StudentList.tsx`
- Create: `src/features/student/renderer/pages/StudentsPage/containers/StudentList/index.tsx`
- Create: `src/features/student/renderer/pages/StudentsPage/containers/StudentList/__tests__/StudentList.test.tsx`

- [ ] **Step 1: Create the props type**

Create `src/features/student/renderer/pages/StudentsPage/containers/StudentList/types/StudentListProps.ts`:

```ts
import type { StudentViewModel } from '@student/types'

export interface StudentListProps {
  onEditStudent: (student: StudentViewModel) => void
  onAddStudent: () => void
  onImportCsv: () => void
}
```

- [ ] **Step 2: Write the failing test**

Create `src/features/student/renderer/pages/StudentsPage/containers/StudentList/__tests__/StudentList.test.tsx`:

```tsx
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StudentList } from '../StudentList'
import type { StudentResponseDto } from '@shared/types'

const MOCK_DTOS: StudentResponseDto[] = [
  { id: 1, nom: 'Dupont', prenom: 'Jean', classe: '3ème A', ine: '111A' }
]

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } }
  })
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  }
}

describe('StudentList', () => {
  beforeEach(() => {
    vi.stubGlobal('electronAPI', {
      student: {
        getAll: vi.fn().mockResolvedValue({ students: MOCK_DTOS, total: 1 }),
        delete: vi.fn().mockResolvedValue({ success: true })
      }
    })
  })

  it('renders the toolbar', () => {
    render(<StudentList onEditStudent={vi.fn()} onAddStudent={vi.fn()} onImportCsv={vi.fn()} />, {
      wrapper: createWrapper()
    })

    expect(screen.getByText('Ajouter un élève')).toBeInTheDocument()
  })
})
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npx vitest run StudentList`
Expected: FAIL

- [ ] **Step 4: Write the implementation**

Create `src/features/student/renderer/pages/StudentsPage/containers/StudentList/StudentList.tsx`:

```tsx
import { useStudentListData } from './hooks/useStudentListData'
import { useStudentSelection } from './hooks/useStudentSelection'
import { StudentTable } from './components/StudentTable'
import { StudentListToolbar } from './components/StudentListToolbar'
import { StudentBatchActions } from './containers/StudentBatchActions'
import type { StudentListProps } from './types/StudentListProps'
import type { StudentViewModel } from '@student/types'

export function StudentList({ onEditStudent, onAddStudent, onImportCsv }: StudentListProps) {
  const {
    filteredStudents,
    searchTerm,
    setSearchTerm,
    clearSearch,
    sortConfig,
    setSortConfig,
    isLoading
  } = useStudentListData()

  const selection = useStudentSelection()

  const handleSelectAll = () => {
    selection.selectAll(filteredStudents.map((s) => s.id))
  }

  const handleEdit = (student: StudentViewModel) => {
    onEditStudent(student)
  }

  const handleDelete = (id: number) => {
    selection.toggle(id)
  }

  if (isLoading) {
    return <div>Chargement...</div>
  }

  return (
    <div>
      <StudentListToolbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onClearSearch={clearSearch}
        onAddStudent={onAddStudent}
        onImportCsv={onImportCsv}
      />

      <StudentTable
        students={filteredStudents}
        selectedIds={selection.selectedIds}
        onToggleSelection={selection.toggle}
        onEdit={handleEdit}
        onDelete={handleDelete}
        sortConfig={sortConfig}
        onSort={setSortConfig}
      />

      <StudentBatchActions
        selectedCount={selection.selectedCount}
        totalCount={filteredStudents.length}
        onSelectAll={handleSelectAll}
        onClearSelection={selection.clearSelection}
        onDeleteSelected={selection.clearSelection}
      />
    </div>
  )
}
```

Create `src/features/student/renderer/pages/StudentsPage/containers/StudentList/index.tsx`:

```tsx
export { StudentList } from './StudentList'
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run StudentList`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/features/student/renderer/pages/StudentsPage/containers/StudentList && git commit -m "feat(student): add StudentList container wiring all sub-components"
```

---

### Task 23: StudentCard Feature-Level Presenter

**Files:**

- Create: `src/features/student/renderer/components/StudentCard/StudentCard.tsx`
- Create: `src/features/student/renderer/components/StudentCard/index.tsx`
- Create: `src/features/student/renderer/components/StudentCard/StudentCard.styles.ts`
- Create: `src/features/student/renderer/components/StudentCard/__tests__/StudentCard.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `src/features/student/renderer/components/StudentCard/__tests__/StudentCard.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StudentCard } from '../StudentCard'
import type { StudentViewModel } from '@student/types'

const STUDENT: StudentViewModel = {
  id: 1,
  nom: 'Dupont',
  prenom: 'Jean',
  classe: '3ème A',
  ine: '123A',
  displayName: 'Jean Dupont',
  classLabel: '3ème A'
}

describe('StudentCard', () => {
  it('renders student display name and class', () => {
    render(<StudentCard student={STUDENT} onClick={vi.fn()} />)

    expect(screen.getByText('Jean Dupont')).toBeInTheDocument()
    expect(screen.getByText('3ème A')).toBeInTheDocument()
  })

  it('renders INE', () => {
    render(<StudentCard student={STUDENT} onClick={vi.fn()} />)

    expect(screen.getByText('INE: 123A')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const onClick = vi.fn()
    render(<StudentCard student={STUDENT} onClick={onClick} />)

    screen.getByText('Jean Dupont').click()
    expect(onClick).toHaveBeenCalledWith(STUDENT)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run StudentCard`
Expected: FAIL

- [ ] **Step 3: Write the styles**

Create `src/features/student/renderer/components/StudentCard/StudentCard.styles.ts`:

```ts
import type { SxProps, Theme } from '@mui/material'

export const cardStyles: SxProps<Theme> = {
  cursor: 'pointer',
  p: 2,
  '&:hover': {
    backgroundColor: 'action.hover'
  }
}

export const ineLabelStyles: SxProps<Theme> = {
  fontSize: '0.75rem',
  color: 'text.secondary',
  mt: 0.5
}
```

- [ ] **Step 4: Write the implementation**

Create `src/features/student/renderer/components/StudentCard/StudentCard.tsx`:

```tsx
import { Card, CardContent, Typography } from '@mui/material'
import { cardStyles, ineLabelStyles } from './StudentCard.styles'
import type { StudentViewModel } from '@student/types'

interface StudentCardProps {
  student: StudentViewModel
  onClick: (student: StudentViewModel) => void
}

const INE_PREFIX = 'INE:'

export function StudentCard({ student, onClick }: StudentCardProps) {
  const handleClick = () => {
    onClick(student)
  }

  return (
    <Card sx={cardStyles} onClick={handleClick}>
      <CardContent>
        <Typography variant="subtitle1">{student.displayName}</Typography>
        <Typography variant="body2" color="text.secondary">
          {student.classLabel}
        </Typography>
        <Typography sx={ineLabelStyles}>
          {INE_PREFIX} {student.ine}
        </Typography>
      </CardContent>
    </Card>
  )
}
```

Create `src/features/student/renderer/components/StudentCard/index.tsx`:

```tsx
export { StudentCard } from './StudentCard'
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run StudentCard`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/features/student/renderer/components/StudentCard && git commit -m "feat(student): add StudentCard feature-level presenter"
```

---

### Task 24: StudentsPage Container

**Files:**

- Create: `src/features/student/renderer/pages/StudentsPage/hooks/useStudentsPage/useStudentsPage.ts`
- Create: `src/features/student/renderer/pages/StudentsPage/hooks/useStudentsPage/index.ts`
- Create: `src/features/student/renderer/pages/StudentsPage/hooks/useStudentsPage/__tests__/useStudentsPage.test.ts`
- Create: `src/features/student/renderer/pages/StudentsPage/StudentsPage.tsx`
- Create: `src/features/student/renderer/pages/StudentsPage/index.tsx`
- Create: `src/features/student/renderer/pages/StudentsPage/__tests__/StudentsPage.test.tsx`

- [ ] **Step 1: Write the failing test for useStudentsPage**

Create `src/features/student/renderer/pages/StudentsPage/hooks/useStudentsPage/__tests__/useStudentsPage.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useStudentsPage } from '../useStudentsPage'

describe('useStudentsPage', () => {
  it('starts with add dialog closed', () => {
    const { result } = renderHook(() => useStudentsPage())

    expect(result.current.isAddDialogOpen).toBe(false)
  })

  it('opens add dialog', () => {
    const { result } = renderHook(() => useStudentsPage())

    act(() => {
      result.current.openAddDialog()
    })

    expect(result.current.isAddDialogOpen).toBe(true)
  })

  it('closes add dialog', () => {
    const { result } = renderHook(() => useStudentsPage())

    act(() => {
      result.current.openAddDialog()
    })
    act(() => {
      result.current.closeAddDialog()
    })

    expect(result.current.isAddDialogOpen).toBe(false)
  })

  it('starts with no editing student', () => {
    const { result } = renderHook(() => useStudentsPage())

    expect(result.current.editingStudent).toBeNull()
  })

  it('sets editing student', () => {
    const student = {
      id: 1,
      nom: 'A',
      prenom: 'B',
      classe: 'C',
      ine: 'D',
      displayName: 'B A',
      classLabel: 'C'
    }
    const { result } = renderHook(() => useStudentsPage())

    act(() => {
      result.current.setEditingStudent(student)
    })

    expect(result.current.editingStudent).toEqual(student)
  })

  it('clears editing student on close', () => {
    const student = {
      id: 1,
      nom: 'A',
      prenom: 'B',
      classe: 'C',
      ine: 'D',
      displayName: 'B A',
      classLabel: 'C'
    }
    const { result } = renderHook(() => useStudentsPage())

    act(() => {
      result.current.setEditingStudent(student)
    })
    act(() => {
      result.current.closeEditDialog()
    })

    expect(result.current.editingStudent).toBeNull()
  })

  it('starts with csv import dialog closed', () => {
    const { result } = renderHook(() => useStudentsPage())

    expect(result.current.isCsvImportOpen).toBe(false)
  })

  it('opens and closes csv import dialog', () => {
    const { result } = renderHook(() => useStudentsPage())

    act(() => {
      result.current.openCsvImport()
    })
    expect(result.current.isCsvImportOpen).toBe(true)

    act(() => {
      result.current.closeCsvImport()
    })
    expect(result.current.isCsvImportOpen).toBe(false)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run useStudentsPage`
Expected: FAIL

- [ ] **Step 3: Write the implementation**

Create `src/features/student/renderer/pages/StudentsPage/hooks/useStudentsPage/useStudentsPage.ts`:

```ts
import { useState, useCallback } from 'react'
import type { StudentViewModel } from '@student/types'

export function useStudentsPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingStudent, setEditingStudent] = useState<StudentViewModel | null>(null)
  const [isCsvImportOpen, setIsCsvImportOpen] = useState(false)

  const openAddDialog = useCallback(() => {
    setIsAddDialogOpen(true)
  }, [])

  const closeAddDialog = useCallback(() => {
    setIsAddDialogOpen(false)
  }, [])

  const setEditingStudent = useCallback((student: StudentViewModel) => {
    setEditingStudent(student)
  }, [])

  const closeEditDialog = useCallback(() => {
    setEditingStudent(null)
  }, [])

  const openCsvImport = useCallback(() => {
    setIsCsvImportOpen(true)
  }, [])

  const closeCsvImport = useCallback(() => {
    setIsCsvImportOpen(false)
  }, [])

  return {
    isAddDialogOpen,
    openAddDialog,
    closeAddDialog,
    editingStudent,
    setEditingStudent,
    closeEditDialog,
    isCsvImportOpen,
    openCsvImport,
    closeCsvImport
  } as const
}
```

Create `src/features/student/renderer/pages/StudentsPage/hooks/useStudentsPage/index.ts`:

```ts
export { useStudentsPage } from './useStudentsPage'
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run useStudentsPage`
Expected: PASS

- [ ] **Step 5: Write the StudentsPage container**

Create `src/features/student/renderer/pages/StudentsPage/StudentsPage.tsx`:

```tsx
import { Container, Typography, Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useStudentsPage } from './hooks/useStudentsPage'
import { StudentList } from './containers/StudentList'
import { StudentForm } from './containers/StudentForm'
import type { StudentViewModel } from '@student/types'

export function StudentsPage() {
  const { t } = useTranslation('student')
  const pageState = useStudentsPage()

  const handleEditStudent = (student: StudentViewModel) => {
    pageState.setEditingStudent(student)
  }

  return (
    <Container sx={{ mt: 3 }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h4">{t('title')}</Typography>
      </Box>

      <StudentList
        onEditStudent={handleEditStudent}
        onAddStudent={pageState.openAddDialog}
        onImportCsv={pageState.openCsvImport}
      />

      <StudentForm
        mode="create"
        student={null}
        open={pageState.isAddDialogOpen}
        onClose={pageState.closeAddDialog}
      />

      <StudentForm
        mode="edit"
        student={pageState.editingStudent}
        open={pageState.editingStudent !== null}
        onClose={pageState.closeEditDialog}
      />
    </Container>
  )
}
```

Create `src/features/student/renderer/pages/StudentsPage/index.tsx`:

```tsx
export { StudentsPage } from './StudentsPage'
```

- [ ] **Step 6: Write the failing test for StudentsPage**

Create `src/features/student/renderer/pages/StudentsPage/__tests__/StudentsPage.test.tsx`:

```tsx
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StudentsPage } from '../StudentsPage'
import type { StudentResponseDto } from '@shared/types'

const MOCK_DTOS: StudentResponseDto[] = [
  { id: 1, nom: 'Dupont', prenom: 'Jean', classe: '3ème A', ine: '111A' }
]

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } }
  })
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  }
}

describe('StudentsPage', () => {
  beforeEach(() => {
    vi.stubGlobal('electronAPI', {
      student: {
        getAll: vi.fn().mockResolvedValue({ students: MOCK_DTOS, total: 1 }),
        delete: vi.fn().mockResolvedValue({ success: true }),
        create: vi.fn().mockResolvedValue({ success: true, data: MOCK_DTOS[0] }),
        update: vi.fn().mockResolvedValue({ success: true, data: MOCK_DTOS[0] })
      }
    })
  })

  it('renders the page title', () => {
    render(<StudentsPage />, { wrapper: createWrapper() })

    expect(screen.getByText('Gestion des élèves')).toBeInTheDocument()
  })

  it('renders the add student button', () => {
    render(<StudentsPage />, { wrapper: createWrapper() })

    expect(screen.getByText('Ajouter un élève')).toBeInTheDocument()
  })
})
```

- [ ] **Step 7: Run test to verify it passes**

Run: `npx vitest run StudentsPage`
Expected: PASS

- [ ] **Step 8: Commit**

```bash
git add src/features/student/renderer/pages/StudentsPage && git commit -m "feat(student): add StudentsPage container orchestrating StudentList + StudentForm"
```

---

### Task 25: Update Routes to Use Real StudentsPage

**Files:**

- Modify: `src/renderer/src/app/routes/StudentsPage.tsx`

- [ ] **Step 1: Replace the old StudentsPage with the new feature StudentsPage**

Replace the contents of `src/renderer/src/app/routes/StudentsPage.tsx`:

```tsx
export { StudentsPage } from '@student/pages/StudentsPage'
```

- [ ] **Step 2: Verify the app compiles**

Run: `pnpm run typecheck:web`
Expected: May have type errors to fix — fix them one by one.

Note: Since the old `StudentsPage` imported many components and hooks from the old renderer structure, this simple re-export will replace all those imports with the new feature-based StudentsPage. The Navbar still references the old StudentsPage via `../routes/StudentsPage`, so this should work transparently.

- [ ] **Step 3: Commit**

```bash
git add src/renderer/src/app/routes/StudentsPage.tsx && git commit -m "feat(student): wire new StudentsPage into app routes"
```

---

### Task 26: CSV Import Button Integration

**Files:**

- Modify: `src/features/student/renderer/pages/StudentsPage/StudentsPage.tsx`
- Create: `src/features/student/renderer/pages/StudentsPage/containers/StudentList/components/StudentCsvImportButton/StudentCsvImportButton.tsx`
- Create: `src/features/student/renderer/pages/StudentsPage/containers/StudentList/components/StudentCsvImportButton/index.tsx`

- [ ] **Step 1: Write the CSV import button component**

Create `src/features/student/renderer/pages/StudentsPage/containers/StudentList/components/StudentCsvImportButton/StudentCsvImportButton.tsx`:

```tsx
import { useRef } from 'react'
import { Button } from '@mui/material'
import Papa from 'papaparse'
import { useImportStudentsCsv } from '@student/api/useStudentMutations'
import type { CreateStudentDto } from '@shared/types'

const CSV_DELIMITER = ';'
const CSV_ACCEPT = '.csv'

interface StudentCsvImportButtonProps {
  onImported?: () => void
}

const HEADER_MAPPINGS: Record<string, keyof CreateStudentDto> = {
  'Nom de famille': 'nom',
  nom: 'nom',
  NOM: 'nom',
  'Prénom 1': 'prenom',
  prenom: 'prenom',
  PRENOM: 'prenom',
  Division: 'classe',
  classe: 'classe',
  INE: 'ine',
  ine: 'ine'
}

function mapCsvRow(row: Record<string, string>): CreateStudentDto | null {
  const dto: Partial<CreateStudentDto> = {}
  for (const [header, value] of Object.entries(row)) {
    const field = HEADER_MAPPINGS[header]
    if (field) {
      dto[field] = value.trim()
    }
  }
  if (dto.nom && dto.prenom && dto.ine) {
    return dto as CreateStudentDto
  }
  return null
}

export function StudentCsvImportButton({ onImported }: StudentCsvImportButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const importMutation = useImportStudentsCsv()

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    Papa.parse(file, {
      header: true,
      delimiter: CSV_DELIMITER,
      complete: (results) => {
        const rows = results.data as Array<Record<string, string>>
        const validDtos: CreateStudentDto[] = []
        for (const row of rows) {
          const dto = mapCsvRow(row)
          if (dto) {
            validDtos.push(dto)
          }
        }
        if (validDtos.length > 0) {
          importMutation.mutate(validDtos, {
            onSuccess: () => {
              onImported?.()
            }
          })
        }
      }
    })
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept={CSV_ACCEPT}
        onChange={handleFile}
        style={{ display: 'none' }}
      />
      <Button variant="outlined" onClick={() => inputRef.current?.click()}>
        Importer CSV
      </Button>
    </>
  )
}
```

Create `src/features/student/renderer/pages/StudentsPage/containers/StudentList/components/StudentCsvImportButton/index.tsx`:

```tsx
export { StudentCsvImportButton } from './StudentCsvImportButton'
```

- [ ] **Step 2: Update StudentListToolbar to use StudentCsvImportButton**

Update `src/features/student/renderer/pages/StudentsPage/containers/StudentList/components/StudentListToolbar/StudentListToolbar.tsx`:

```tsx
import { Box, TextField, InputAdornment, IconButton, Button } from '@mui/material'
import { Search, Clear, Add } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { StudentCsvImportButton } from '../StudentCsvImportButton'

interface StudentListToolbarProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  onClearSearch: () => void
  onAddStudent: () => void
  onImported?: () => void
}

export function StudentListToolbar({
  searchTerm,
  onSearchChange,
  onClearSearch,
  onAddStudent,
  onImported
}: StudentListToolbarProps) {
  const { t } = useTranslation('student')

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
      <TextField
        placeholder={t('fields.search', { defaultValue: 'Rechercher des élèves...' })}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
          endAdornment: searchTerm ? (
            <InputAdornment position="end">
              <IconButton onClick={onClearSearch} size="small">
                <Clear />
              </IconButton>
            </InputAdornment>
          ) : null
        }}
        sx={{ flex: 1, mr: 2 }}
      />
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button variant="contained" startIcon={<Add />} onClick={onAddStudent}>
          {t('add')}
        </Button>
        <StudentCsvImportButton onImported={onImported} />
      </Box>
    </Box>
  )
}
```

- [ ] **Step 3: Update StudentList to pass onImported to toolbar**

Update `src/features/student/renderer/pages/StudentsPage/containers/StudentList/StudentList.tsx` — change the `onImportCsv` prop to `onImported` and pass it to toolbar:

Replace the `StudentListToolbar` call in `StudentList.tsx`:

```tsx
<StudentListToolbar
  searchTerm={searchTerm}
  onSearchChange={setSearchTerm}
  onClearSearch={clearSearch}
  onAddStudent={onAddStudent}
  onImported={onImportCsv}
/>
```

- [ ] **Step 4: Commit**

```bash
git add src/features/student/renderer/pages/StudentsPage/containers/StudentList/components/StudentCsvImportButton src/features/student/renderer/pages/StudentsPage/containers/StudentList/components/StudentListToolbar src/features/student/renderer/pages/StudentsPage/containers/StudentList/StudentList.tsx && git commit -m "feat(student): add CSV import button with papaparse parsing"
```

---

### Task 27: Final Verification

- [ ] **Step 1: Run all student feature tests**

Run: `npx vitest run src/features/student`
Expected: All tests PASS

- [ ] **Step 2: Run type checking**

Run: `pnpm run typecheck:web`
Expected: No errors

- [ ] **Step 3: Run linting**

Run: `pnpm run lint`
Expected: No errors (or fix any that appear)

- [ ] **Step 4: Run the app**

Run: `pnpm dev`
Expected: Electron window opens, students page loads, you can add/edit/delete students

- [ ] **Step 5: Final commit if any fixes needed**

```bash
git add -A && git commit -m "chore: student frontend verification fixes"
```
