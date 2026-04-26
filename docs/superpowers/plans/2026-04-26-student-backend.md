# Student Backend Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the complete student feature backend using strict clean architecture — entities, use-cases, gateways, and controllers.

**Architecture:** Strict clean architecture with dependency direction: controllers → use-cases → entities ← gateways. Use-cases depend on gateway interfaces, not implementations. Gateway implementations are injected at wiring time in modules.ts.

**Tech Stack:** TypeScript 5.9.x (strict), Drizzle ORM, better-sqlite3, Zod, Vitest

---

## File Structure

```
src/features/student/
├── shared/
│   └── types.ts                              # Shared DTOs + Zod schemas
├── main/
│   ├── entities/
│   │   └── student/
│   │       ├── student.entity.ts             # Drizzle table + Zod schemas
│   │       ├── index.ts
│   │       ├── helpers/
│   │       │   └── computeStudentFields/
│   │       │       ├── computeStudentFields.ts
│   │       │       ├── index.ts
│   │       │       └── __tests__/
│   │       │           └── computeStudentFields.test.ts
│   │       └── __tests__/
│   │           └── student.entity.test.ts
│   ├── gateways/
│   │   └── student/
│   │       ├── student.gateway.ts            # Interface
│   │       ├── student.gateway.drizzle.ts     # Implementation
│   │       ├── index.ts
│   │       ├── helpers/
│   │       │   └── mapStudentRow/
│   │       │       ├── mapStudentRow.ts
│   │       │       ├── index.ts
│   │       │       └── __tests__/
│   │       │           └── mapStudentRow.test.ts
│   │       └── __tests__/
│   │           └── student.gateway.drizzle.test.ts
│   ├── use-cases/
│   │   ├── createStudent/
│   │   │   ├── createStudent.ts
│   │   │   ├── index.ts
│   │   │   └── __tests__/
│   │   │       └── createStudent.test.ts
│   │   ├── updateStudent/
│   │   │   ├── updateStudent.ts
│   │   │   ├── index.ts
│   │   │   └── __tests__/
│   │   │       └── updateStudent.test.ts
│   │   ├── deleteStudent/
│   │   │   ├── deleteStudent.ts
│   │   │   ├── index.ts
│   │   │   └── __tests__/
│   │   │       └── deleteStudent.test.ts
│   │   ├── getStudent/
│   │   │   ├── getStudent.ts
│   │   │   ├── index.ts
│   │   │   └── __tests__/
│   │   │       └── getStudent.test.ts
│   │   ├── listStudents/
│   │   │   ├── listStudents.ts
│   │   │   ├── index.ts
│   │   │   └── __tests__/
│   │   │       └── listStudents.test.ts
│   │   ├── importStudentsCsv/
│   │   │   ├── importStudentsCsv.ts
│   │   │   ├── index.ts
│   │   │   ├── helpers/
│   │   │   │   ├── parseStudentCsv/
│   │   │   │   │   ├── parseStudentCsv.ts
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── __tests__/
│   │   │   │   │       └── parseStudentCsv.test.ts
│   │   │   │   └── csvConstants/
│   │   │   │       ├── csvConstants.ts
│   │   │   │       └── index.ts
│   │   │   ├── validations/
│   │   │   │   └── csvRowSchema/
│   │   │   │       ├── csvRowSchema.ts
│   │   │   │       ├── index.ts
│   │   │   │       └── __tests__/
│   │   │   │           └── csvRowSchema.test.ts
│   │   │   ├── types/
│   │   │   │   └── CsvImportResult.ts
│   │   │   └── __tests__/
│   │   │       └── importStudentsCsv.test.ts
│   │   ├── helpers/
│   │   │   └── formatStudentResponse/
│   │   │       ├── formatStudentResponse.ts
│   │   │       ├── index.ts
│   │   │       └── __tests__/
│   │   │           └── formatStudentResponse.test.ts
│   │   └── types/
│   │       └── UseCaseResult.ts
│   └── controllers/
│       └── student/
│           ├── student.controller.ts
│           └── index.ts

src/shared/db/
├── schema.ts                                 # Modified: re-export student schema

src/main/
├── modules.ts                                # Modified: wire student feature
```

---

### Task 1: Student Shared Types (DTOs + Zod Schemas)

**Files:**

- Create: `src/features/student/shared/types.ts`

- [ ] **Step 1: Write the test**

Create `src/features/student/shared/__tests__/types.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import {
  createStudentSchema,
  updateStudentSchema,
  StudentResponseDto,
  StudentListResponseDto,
  BulkStudentResponseDto
} from '../types'

describe('createStudentSchema', () => {
  it('validates a valid student DTO', () => {
    const result = createStudentSchema.safeParse({
      nom: 'Dupont',
      prenom: 'Jean',
      classe: '3B',
      ine: '0123456789A'
    })
    expect(result.success).toBe(true)
  })

  it('rejects missing fields', () => {
    const result = createStudentSchema.safeParse({})
    expect(result.success).toBe(false)
  })

  it('trims whitespace from all fields', () => {
    const result = createStudentSchema.safeParse({
      nom: '  Dupont  ',
      prenom: '  Jean  ',
      classe: '  3B  ',
      ine: '  0123456789A  '
    })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.nom).toBe('Dupont')
      expect(result.data.prenom).toBe('Jean')
      expect(result.data.classe).toBe('3B')
      expect(result.data.ine).toBe('0123456789A')
    }
  })

  it('rejects empty strings after trim', () => {
    const result = createStudentSchema.safeParse({
      nom: '   ',
      prenom: 'Jean',
      classe: '3B',
      ine: '0123456789A'
    })
    expect(result.success).toBe(false)
  })

  it('rejects strings exceeding max length', () => {
    const result = createStudentSchema.safeParse({
      nom: 'x'.repeat(101),
      prenom: 'Jean',
      classe: '3B',
      ine: '0123456789A'
    })
    expect(result.success).toBe(false)
  })
})

describe('updateStudentSchema', () => {
  it('allows partial updates', () => {
    const result = updateStudentSchema.safeParse({ nom: 'Martin' })
    expect(result.success).toBe(true)
  })

  it('allows empty object', () => {
    const result = updateStudentSchema.safeParse({})
    expect(result.success).toBe(true)
  })

  it('rejects empty strings after trim', () => {
    const result = updateStudentSchema.safeParse({ nom: '   ' })
    expect(result.success).toBe(false)
  })

  it('trims whitespace from provided fields', () => {
    const result = updateStudentSchema.safeParse({ nom: '  Martin  ' })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.nom).toBe('Martin')
    }
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/features/student/shared`
Expected: FAIL — cannot resolve `../types`

- [ ] **Step 3: Write the implementation**

Create `src/features/student/shared/types.ts`:

```ts
import { z } from 'zod'

const NOM_MAX_LENGTH = 100
const PRENOM_MAX_LENGTH = 100
const CLASSE_MAX_LENGTH = 50
const INE_MAX_LENGTH = 50

export const createStudentSchema = z.object({
  nom: z.string().trim().min(1, 'Le nom est obligatoire').max(NOM_MAX_LENGTH),
  prenom: z.string().trim().min(1, 'Le prénom est obligatoire').max(PRENOM_MAX_LENGTH),
  classe: z.string().trim().min(1, 'La classe est obligatoire').max(CLASSE_MAX_LENGTH),
  ine: z.string().trim().min(1, "L'INE est obligatoire").max(INE_MAX_LENGTH)
})

export const updateStudentSchema = z.object({
  nom: z.string().trim().min(1).max(NOM_MAX_LENGTH).optional(),
  prenom: z.string().trim().min(1).max(PRENOM_MAX_LENGTH).optional(),
  classe: z.string().trim().min(1).max(CLASSE_MAX_LENGTH).optional(),
  ine: z.string().trim().min(1).max(INE_MAX_LENGTH).optional()
})

export type CreateStudentDto = z.infer<typeof createStudentSchema>

export type UpdateStudentDto = z.infer<typeof updateStudentSchema>

export interface StudentResponseDto {
  id: number
  nom: string
  prenom: string
  classe: string
  ine: string
  fullName: string
  createdAt: string
  updatedAt: string
}

export interface StudentListResponseDto {
  students: StudentResponseDto[]
}

export interface BulkStudentResponseDto {
  created: number
  errors: number
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/features/student/shared`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/features/student/shared && git commit -m "feat(student): add shared DTOs with Zod schemas"
```

---

### Task 2: Student Entity (Drizzle Schema + Zod + Helpers)

**Files:**

- Create: `src/features/student/main/entities/student/student.entity.ts`
- Create: `src/features/student/main/entities/student/index.ts`
- Create: `src/features/student/main/entities/student/helpers/computeStudentFields/computeStudentFields.ts`
- Create: `src/features/student/main/entities/student/helpers/computeStudentFields/index.ts`
- Create: `src/features/student/main/entities/student/helpers/computeStudentFields/__tests__/computeStudentFields.test.ts`
- Create: `src/features/student/main/entities/student/__tests__/student.entity.test.ts`

- [ ] **Step 1: Write the failing test for computeStudentFields**

Create `src/features/student/main/entities/student/helpers/computeStudentFields/__tests__/computeStudentFields.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { computeStudentFields } from '../computeStudentFields'

describe('computeStudentFields', () => {
  it('computes fullName as "prenom nom"', () => {
    const result = computeStudentFields({ prenom: 'Jean', nom: 'Dupont' })
    expect(result.fullName).toBe('Jean Dupont')
  })

  it('trims whitespace in fullName', () => {
    const result = computeStudentFields({ prenom: '  Jean  ', nom: '  Dupont  ' })
    expect(result.fullName).toBe('Jean Dupont')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/features/student/main/entities/student/helpers/computeStudentFields`
Expected: FAIL

- [ ] **Step 3: Write the implementation for computeStudentFields**

Create `src/features/student/main/entities/student/helpers/computeStudentFields/computeStudentFields.ts`:

```ts
export function computeStudentFields(input: { prenom: string; nom: string }): {
  fullName: string
} {
  const fullName = `${input.prenom.trim()} ${input.nom.trim()}`
  return { fullName }
}
```

Create `src/features/student/main/entities/student/helpers/computeStudentFields/index.ts`:

```ts
export { computeStudentFields } from './computeStudentFields'
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/features/student/main/entities/student/helpers/computeStudentFields`
Expected: PASS

- [ ] **Step 5: Write the failing test for student entity**

Create `src/features/student/main/entities/student/__tests__/student.entity.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { students, studentEntitySchema } from '../student.entity'

describe('students table', () => {
  it('has correct table name', () => {
    expect(students).toBeDefined()
  })
})

describe('studentEntitySchema', () => {
  it('validates a complete student entity row', () => {
    const row = {
      id: 1,
      nom: 'Dupont',
      prenom: 'Jean',
      classe: '3B',
      ine: '0123456789A',
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z'
    }
    const result = studentEntitySchema.safeParse(row)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.id).toBe(1)
      expect(result.data.nom).toBe('Dupont')
    }
  })

  it('rejects a row with missing fields', () => {
    const row = { id: 1 }
    const result = studentEntitySchema.safeParse(row)
    expect(result.success).toBe(false)
  })

  it('rejects a row with wrong types', () => {
    const row = {
      id: 'not-a-number',
      nom: 'Dupont',
      prenom: 'Jean',
      classe: '3B',
      ine: '0123456789A',
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z'
    }
    const result = studentEntitySchema.safeParse(row)
    expect(result.success).toBe(false)
  })
})
```

- [ ] **Step 6: Run test to verify it fails**

Run: `npx vitest run src/features/student/main/entities/student`
Expected: FAIL

- [ ] **Step 7: Write the student entity implementation**

Create `src/features/student/main/entities/student/student.entity.ts`:

```ts
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { z } from 'zod'

export const students = sqliteTable('students', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  nom: text('nom').notNull(),
  prenom: text('prenom').notNull(),
  classe: text('classe').notNull(),
  ine: text('ine').notNull(),
  createdAt: text('created_at')
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
  updatedAt: text('updated_at')
    .notNull()
    .$defaultFn(() => new Date().toISOString())
})

export const studentEntitySchema = z.object({
  id: z.number().int().positive(),
  nom: z.string().min(1),
  prenom: z.string().min(1),
  classe: z.string().min(1),
  ine: z.string().min(1),
  createdAt: z.string(),
  updatedAt: z.string()
})

export type StudentEntity = z.infer<typeof studentEntitySchema>

export type InsertStudentEntity = typeof students.$inferInsert

export type SelectStudentEntity = typeof students.$inferSelect
```

Create `src/features/student/main/entities/student/index.ts`:

```ts
export { students, studentEntitySchema } from './student.entity'
export type { StudentEntity, InsertStudentEntity, SelectStudentEntity } from './student.entity'
export { computeStudentFields } from './helpers/computeStudentFields'
```

- [ ] **Step 8: Run test to verify it passes**

Run: `npx vitest run src/features/student/main/entities/student`
Expected: PASS

- [ ] **Step 9: Commit**

```bash
git add src/features/student/main/entities && git commit -m "feat(student): add student entity with Drizzle schema + Zod + computeStudentFields"
```

---

### Task 3: Student Gateway Interface

**Files:**

- Create: `src/features/student/main/gateways/student/student.gateway.ts`
- Create: `src/features/student/main/gateways/student/index.ts`

- [ ] **Step 1: Write the implementation**

Create `src/features/student/main/gateways/student/student.gateway.ts`:

```ts
import type { StudentEntity } from '@student/entities/student'
import type { CreateStudentDto, UpdateStudentDto } from '@student-shared'

export interface StudentGateway {
  create(dto: CreateStudentDto): Promise<StudentEntity>
  getById(id: number): Promise<StudentEntity | null>
  getAll(): Promise<StudentEntity[]>
  update(id: number, dto: UpdateStudentDto): Promise<StudentEntity | null>
  delete(id: number): Promise<boolean>
  getByClass(classe: string): Promise<StudentEntity[]>
  getByIds(ids: number[]): Promise<StudentEntity[]>
}
```

Create `src/features/student/main/gateways/student/index.ts`:

```ts
export type { StudentGateway } from './student.gateway'
```

- [ ] **Step 2: Verify types resolve**

Run: `npx tsc --noEmit -p tsconfig.node.json`
Expected: No errors related to student gateway

- [ ] **Step 3: Commit**

```bash
git add src/features/student/main/gateways && git commit -m "feat(student): add StudentGateway interface"
```

---

### Task 4: Student Gateway Implementation (Drizzle)

**Files:**

- Create: `src/features/student/main/gateways/student/helpers/mapStudentRow/mapStudentRow.ts`
- Create: `src/features/student/main/gateways/student/helpers/mapStudentRow/index.ts`
- Create: `src/features/student/main/gateways/student/helpers/mapStudentRow/__tests__/mapStudentRow.test.ts`
- Create: `src/features/student/main/gateways/student/student.gateway.drizzle.ts`
- Create: `src/features/student/main/gateways/student/__tests__/student.gateway.drizzle.test.ts`

- [ ] **Step 1: Write the failing test for mapStudentRow**

Create `src/features/student/main/gateways/student/helpers/mapStudentRow/__tests__/mapStudentRow.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { mapStudentRow } from '../mapStudentRow'

describe('mapStudentRow', () => {
  it('maps a Drizzle row to a StudentEntity', () => {
    const row = {
      id: 1,
      nom: 'Dupont',
      prenom: 'Jean',
      classe: '3B',
      ine: '0123456789A',
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z'
    }
    const entity = mapStudentRow(row)
    expect(entity.id).toBe(1)
    expect(entity.nom).toBe('Dupont')
    expect(entity.prenom).toBe('Jean')
    expect(entity.classe).toBe('3B')
    expect(entity.ine).toBe('0123456789A')
    expect(entity.createdAt).toBe('2024-01-01T00:00:00.000Z')
  })

  it('throws on invalid row data', () => {
    const row = {
      id: 1,
      nom: '',
      prenom: 'Jean',
      classe: '3B',
      ine: '0123456789A',
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z'
    }
    expect(() => mapStudentRow(row)).toThrow()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/features/student/main/gateways/student/helpers/mapStudentRow`
Expected: FAIL

- [ ] **Step 3: Write mapStudentRow implementation**

Create `src/features/student/main/gateways/student/helpers/mapStudentRow/mapStudentRow.ts`:

```ts
import { studentEntitySchema } from '@student/entities/student'
import type { StudentEntity } from '@student/entities/student'

export function mapStudentRow(row: Record<string, unknown>): StudentEntity {
  return studentEntitySchema.parse(row)
}
```

Create `src/features/student/main/gateways/student/helpers/mapStudentRow/index.ts`:

```ts
export { mapStudentRow } from './mapStudentRow'
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/features/student/main/gateways/student/helpers/mapStudentRow`
Expected: PASS

- [ ] **Step 5: Write the failing test for gateway implementation**

Create `src/features/student/main/gateways/student/__tests__/student.gateway.drizzle.test.ts`:

```ts
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { StudentGatewayDrizzle } from '../student.gateway.drizzle'
import { students } from '@student/entities/student'

function createTestDb() {
  const sqlite = new Database(':memory:')
  sqlite.pragma('journal_mode = WAL')
  sqlite.pragma('foreign_keys = ON')
  const db = drizzle(sqlite)

  sqlite.exec(`
    CREATE TABLE students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nom TEXT NOT NULL,
      prenom TEXT NOT NULL,
      classe TEXT NOT NULL,
      ine TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    CREATE INDEX idx_students_nom ON students(nom, prenom);
    CREATE INDEX idx_students_classe ON students(classe);
  `)

  return { db, sqlite }
}

describe('StudentGatewayDrizzle', () => {
  let gateway: StudentGatewayDrizzle
  let sqlite: Database.Database

  beforeEach(() => {
    const { db, sqlite: sql } = createTestDb()
    sqlite = sql
    gateway = new StudentGatewayDrizzle(db)
  })

  afterEach(() => {
    sqlite.close()
  })

  describe('create', () => {
    it('creates a student and returns entity', async () => {
      const entity = await gateway.create({
        nom: 'Dupont',
        prenom: 'Jean',
        classe: '3B',
        ine: '0123456789A'
      })
      expect(entity.id).toBeGreaterThan(0)
      expect(entity.nom).toBe('Dupont')
      expect(entity.prenom).toBe('Jean')
      expect(entity.classe).toBe('3B')
      expect(entity.ine).toBe('0123456789A')
    })
  })

  describe('getById', () => {
    it('returns student by id', async () => {
      const created = await gateway.create({
        nom: 'Dupont',
        prenom: 'Jean',
        classe: '3B',
        ine: '0123456789A'
      })
      const found = await gateway.getById(created.id)
      expect(found).not.toBeNull()
      expect(found?.id).toBe(created.id)
      expect(found?.nom).toBe('Dupont')
    })

    it('returns null for nonexistent id', async () => {
      const found = await gateway.getById(9999)
      expect(found).toBeNull()
    })
  })

  describe('getAll', () => {
    it('returns all students', async () => {
      await gateway.create({ nom: 'A', prenom: 'B', classe: '1A', ine: 'INE1' })
      await gateway.create({ nom: 'C', prenom: 'D', classe: '1A', ine: 'INE2' })
      const all = await gateway.getAll()
      expect(all).toHaveLength(2)
    })

    it('returns empty array when no students', async () => {
      const all = await gateway.getAll()
      expect(all).toHaveLength(0)
    })
  })

  describe('update', () => {
    it('updates specified fields', async () => {
      const created = await gateway.create({
        nom: 'Dupont',
        prenom: 'Jean',
        classe: '3B',
        ine: '0123456789A'
      })
      const updated = await gateway.update(created.id, { nom: 'Martin' })
      expect(updated).not.toBeNull()
      expect(updated?.nom).toBe('Martin')
      expect(updated?.prenom).toBe('Jean')
    })

    it('returns null for nonexistent id', async () => {
      const updated = await gateway.update(9999, { nom: 'Martin' })
      expect(updated).toBeNull()
    })
  })

  describe('delete', () => {
    it('deletes a student and returns true', async () => {
      const created = await gateway.create({
        nom: 'Dupont',
        prenom: 'Jean',
        classe: '3B',
        ine: '0123456789A'
      })
      const deleted = await gateway.delete(created.id)
      expect(deleted).toBe(true)
      const found = await gateway.getById(created.id)
      expect(found).toBeNull()
    })

    it('returns false for nonexistent id', async () => {
      const deleted = await gateway.delete(9999)
      expect(deleted).toBe(false)
    })
  })

  describe('getByClass', () => {
    it('returns students of a specific class', async () => {
      await gateway.create({ nom: 'A', prenom: 'B', classe: '3B', ine: 'INE1' })
      await gateway.create({ nom: 'C', prenom: 'D', classe: '3A', ine: 'INE2' })
      const result = await gateway.getByClass('3B')
      expect(result).toHaveLength(1)
      expect(result[0].classe).toBe('3B')
    })

    it('returns empty array for class with no students', async () => {
      const result = await gateway.getByClass('ZZZ')
      expect(result).toHaveLength(0)
    })
  })

  describe('getByIds', () => {
    it('returns students matching given ids', async () => {
      const s1 = await gateway.create({ nom: 'A', prenom: 'B', classe: '3B', ine: 'INE1' })
      const s2 = await gateway.create({ nom: 'C', prenom: 'D', classe: '3A', ine: 'INE2' })
      const result = await gateway.getByIds([s1.id, s2.id])
      expect(result).toHaveLength(2)
    })

    it('returns empty array for empty ids', async () => {
      const result = await gateway.getByIds([])
      expect(result).toHaveLength(0)
    })
  })
})
```

- [ ] **Step 6: Run test to verify it fails**

Run: `npx vitest run src/features/student/main/gateways/student/__tests__`
Expected: FAIL

- [ ] **Step 7: Write the gateway implementation**

Create `src/features/student/main/gateways/student/student.gateway.drizzle.ts`:

```ts
import { eq, inArray } from 'drizzle-orm'
import type { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3'
import type { StudentGateway } from './student.gateway'
import type { StudentEntity } from '@student/entities/student'
import { students } from '@student/entities/student'
import type { CreateStudentDto, UpdateStudentDto } from '@student-shared'
import { mapStudentRow } from './helpers/mapStudentRow'

export class StudentGatewayDrizzle implements StudentGateway {
  constructor(private db: BetterSQLite3Database) {}

  async create(dto: CreateStudentDto): Promise<StudentEntity> {
    const now = new Date().toISOString()
    const result = await this.db
      .insert(students)
      .values({
        nom: dto.nom,
        prenom: dto.prenom,
        classe: dto.classe,
        ine: dto.ine,
        createdAt: now,
        updatedAt: now
      })
      .returning()

    const row = result[0]
    if (!row) {
      throw new Error('Failed to create student')
    }
    return mapStudentRow(row)
  }

  async getById(id: number): Promise<StudentEntity | null> {
    const result = await this.db.select().from(students).where(eq(students.id, id))
    const row = result[0]
    if (!row) {
      return null
    }
    return mapStudentRow(row)
  }

  async getAll(): Promise<StudentEntity[]> {
    const rows = await this.db.select().from(students)
    return rows.map(mapStudentRow)
  }

  async update(id: number, dto: UpdateStudentDto): Promise<StudentEntity | null> {
    const existing = await this.getById(id)
    if (!existing) {
      return null
    }

    const now = new Date().toISOString()
    await this.db
      .update(students)
      .set({
        ...(dto.nom !== undefined && { nom: dto.nom }),
        ...(dto.prenom !== undefined && { prenom: dto.prenom }),
        ...(dto.classe !== undefined && { classe: dto.classe }),
        ...(dto.ine !== undefined && { ine: dto.ine }),
        updatedAt: now
      })
      .where(eq(students.id, id))

    return this.getById(id)
  }

  async delete(id: number): Promise<boolean> {
    const existing = await this.getById(id)
    if (!existing) {
      return false
    }
    await this.db.delete(students).where(eq(students.id, id))
    return true
  }

  async getByClass(classe: string): Promise<StudentEntity[]> {
    const rows = await this.db.select().from(students).where(eq(students.classe, classe))
    return rows.map(mapStudentRow)
  }

  async getByIds(ids: number[]): Promise<StudentEntity[]> {
    if (ids.length === 0) {
      return []
    }
    const rows = await this.db.select().from(students).where(inArray(students.id, ids))
    return rows.map(mapStudentRow)
  }
}
```

- [ ] **Step 8: Run test to verify it passes**

Run: `npx vitest run src/features/student/main/gateways/student/__tests__`
Expected: PASS

- [ ] **Step 9: Commit**

```bash
git add src/features/student/main/gateways && git commit -m "feat(student): add StudentGateway Drizzle implementation with tests"
```

---

### Task 5: Use Case — createStudent

**Files:**

- Create: `src/features/student/main/use-cases/createStudent/createStudent.ts`
- Create: `src/features/student/main/use-cases/createStudent/index.ts`
- Create: `src/features/student/main/use-cases/createStudent/__tests__/createStudent.test.ts`

**Prerequisite:** Task 11 (shared use-case helpers) must be implemented first. The steps below reference `formatStudentResponse` and `UseCaseResult` defined in Task 11.

> **Note:** Implement Task 11 before this task. The code below depends on those types.

- [ ] **Step 1: Write the failing test**

Create `src/features/student/main/use-cases/createStudent/__tests__/createStudent.test.ts`:

```ts
import { describe, it, expect, vi } from 'vitest'
import { createStudent } from '../createStudent'
import type { StudentGateway } from '@student/gateways/student'
import type { StudentEntity } from '@student/entities/student'

const SAMPLE_ENTITY: StudentEntity = {
  id: 1,
  nom: 'Dupont',
  prenom: 'Jean',
  classe: '3B',
  ine: '0123456789A',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z'
}

function createMockGateway(overrides: Partial<StudentGateway> = {}): StudentGateway {
  return {
    create: vi.fn().mockResolvedValue(SAMPLE_ENTITY),
    getById: vi.fn().mockResolvedValue(null),
    getAll: vi.fn().mockResolvedValue([]),
    update: vi.fn().mockResolvedValue(null),
    delete: vi.fn().mockResolvedValue(false),
    getByClass: vi.fn().mockResolvedValue([]),
    getByIds: vi.fn().mockResolvedValue([]),
    ...overrides
  }
}

describe('createStudent', () => {
  it('creates a student and returns success response', async () => {
    const gateway = createMockGateway()
    const result = await createStudent(
      { gateway },
      { nom: 'Dupont', prenom: 'Jean', classe: '3B', ine: '0123456789A' }
    )
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.id).toBe(1)
      expect(result.data.nom).toBe('Dupont')
      expect(result.data.fullName).toBe('Jean Dupont')
    }
  })

  it('rejects duplicate INE', async () => {
    const gateway = createMockGateway({
      getByClass: vi.fn().mockResolvedValue([]),
      getAll: vi.fn().mockResolvedValue([{ ...SAMPLE_ENTITY, ine: '0123456789A' }])
    })
    const result = await createStudent(
      { gateway },
      { nom: 'Martin', prenom: 'Pierre', classe: '3A', ine: '0123456789A' }
    )
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error).toBeDefined()
    }
  })

  it('rejects invalid input', async () => {
    const gateway = createMockGateway()
    const result = await createStudent(
      { gateway },
      { nom: '', prenom: 'Jean', classe: '3B', ine: '0123456789A' }
    )
    expect(result.success).toBe(false)
  })

  it('calls gateway.create with trimmed values', async () => {
    const gateway = createMockGateway()
    await createStudent(
      { gateway },
      { nom: '  Dupont  ', prenom: '  Jean  ', classe: '  3B  ', ine: '  INE1  ' }
    )
    expect(gateway.create).toHaveBeenCalledWith({
      nom: 'Dupont',
      prenom: 'Jean',
      classe: '3B',
      ine: 'INE1'
    })
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/features/student/main/use-cases/createStudent`
Expected: FAIL

- [ ] **Step 3: Write the implementation**

Create `src/features/student/main/use-cases/createStudent/createStudent.ts`:

```ts
import { createStudentSchema } from '@student-shared'
import { formatStudentResponse } from '../helpers/formatStudentResponse'
import type { UseCaseResult } from '../types/UseCaseResult'
import type { StudentGateway } from '@student/gateways/student'
import type { StudentResponseDto } from '@student-shared'
import type { CreateStudentDto } from '@student-shared'

interface CreateStudentDeps {
  gateway: StudentGateway
}

export async function createStudent(
  deps: CreateStudentDeps,
  input: CreateStudentDto
): Promise<UseCaseResult<StudentResponseDto>> {
  const parsed = createStudentSchema.safeParse(input)
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]
    const message = firstError?.message ?? 'Validation error'
    return { success: false, error: message }
  }

  const existing = await deps.gateway.getAll()
  const duplicateIne = existing.find(
    (s) => s.ine.trim().toLowerCase() === parsed.data.ine.trim().toLowerCase()
  )
  if (duplicateIne) {
    return { success: false, error: 'Un élève avec cet INE existe déjà' }
  }

  const entity = await deps.gateway.create(parsed.data)
  return { success: true, data: formatStudentResponse(entity) }
}
```

Create `src/features/student/main/use-cases/createStudent/index.ts`:

```ts
export { createStudent } from './createStudent'
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/features/student/main/use-cases/createStudent`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/features/student/main/use-cases/createStudent && git commit -m "feat(student): add createStudent use case"
```

---

### Task 6: Use Case — updateStudent

**Files:**

- Create: `src/features/student/main/use-cases/updateStudent/updateStudent.ts`
- Create: `src/features/student/main/use-cases/updateStudent/index.ts`
- Create: `src/features/student/main/use-cases/updateStudent/__tests__/updateStudent.test.ts`

- [ ] **Step 1: Write the failing test**

Create `src/features/student/main/use-cases/updateStudent/__tests__/updateStudent.test.ts`:

```ts
import { describe, it, expect, vi } from 'vitest'
import { updateStudent } from '../updateStudent'
import type { StudentGateway } from '@student/gateways/student'
import type { StudentEntity } from '@student/entities/student'

const UPDATED_ENTITY: StudentEntity = {
  id: 1,
  nom: 'Martin',
  prenom: 'Jean',
  classe: '3B',
  ine: '0123456789A',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-06-01T00:00:00.000Z'
}

function createMockGateway(overrides: Partial<StudentGateway> = {}): StudentGateway {
  return {
    create: vi.fn().mockResolvedValue(null),
    getById: vi.fn().mockResolvedValue(UPDATED_ENTITY),
    getAll: vi.fn().mockResolvedValue([]),
    update: vi.fn().mockResolvedValue(UPDATED_ENTITY),
    delete: vi.fn().mockResolvedValue(false),
    getByClass: vi.fn().mockResolvedValue([]),
    getByIds: vi.fn().mockResolvedValue([]),
    ...overrides
  }
}

describe('updateStudent', () => {
  it('updates a student and returns success response', async () => {
    const gateway = createMockGateway({
      update: vi.fn().mockResolvedValue(UPDATED_ENTITY)
    })
    const result = await updateStudent({ gateway }, { id: 1, dto: { nom: 'Martin' } })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.nom).toBe('Martin')
      expect(result.data.fullName).toBe('Jean Martin')
    }
  })

  it('returns error when student not found', async () => {
    const gateway = createMockGateway({
      getById: vi.fn().mockResolvedValue(null)
    })
    const result = await updateStudent({ gateway }, { id: 9999, dto: { nom: 'Martin' } })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error).toContain('introuvable')
    }
  })

  it('rejects duplicate INE from another student', async () => {
    const gateway = createMockGateway({
      getAll: vi.fn().mockResolvedValue([
        {
          id: 2,
          nom: 'Autre',
          prenom: 'Eleve',
          classe: '3A',
          ine: 'DUPLICATE_INE',
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-01T00:00:00.000Z'
        }
      ])
    })
    const result = await updateStudent({ gateway }, { id: 1, dto: { ine: 'DUPLICATE_INE' } })
    expect(result.success).toBe(false)
  })

  it('rejects empty string values', async () => {
    const gateway = createMockGateway()
    const result = await updateStudent({ gateway }, { id: 1, dto: { nom: '   ' } })
    expect(result.success).toBe(false)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/features/student/main/use-cases/updateStudent`
Expected: FAIL

- [ ] **Step 3: Write the implementation**

Create `src/features/student/main/use-cases/updateStudent/updateStudent.ts`:

```ts
import { updateStudentSchema } from '@student-shared'
import { formatStudentResponse } from '../helpers/formatStudentResponse'
import type { UseCaseResult } from '../types/UseCaseResult'
import type { StudentGateway } from '@student/gateways/student'
import type { StudentResponseDto, UpdateStudentDto } from '@student-shared'

interface UpdateStudentDeps {
  gateway: StudentGateway
}

interface UpdateStudentInput {
  id: number
  dto: UpdateStudentDto
}

export async function updateStudent(
  deps: UpdateStudentDeps,
  input: UpdateStudentInput
): Promise<UseCaseResult<StudentResponseDto>> {
  const parsed = updateStudentSchema.safeParse(input.dto)
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]
    const message = firstError?.message ?? 'Validation error'
    return { success: false, error: message }
  }

  const existing = await deps.gateway.getById(input.id)
  if (!existing) {
    return { success: false, error: 'Élève introuvable' }
  }

  if (parsed.data.ine !== undefined) {
    const newIne = parsed.data.ine
    const allStudents = await deps.gateway.getAll()
    const duplicate = allStudents.find(
      (s) => s.id !== input.id && s.ine.trim().toLowerCase() === newIne.trim().toLowerCase()
    )
    if (duplicate) {
      return { success: false, error: 'Un élève avec cet INE existe déjà' }
    }
  }

  const entity = await deps.gateway.update(input.id, parsed.data)
  if (!entity) {
    return { success: false, error: 'Erreur lors de la mise à jour' }
  }

  return { success: true, data: formatStudentResponse(entity) }
}
```

Create `src/features/student/main/use-cases/updateStudent/index.ts`:

```ts
export { updateStudent } from './updateStudent'
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/features/student/main/use-cases/updateStudent`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/features/student/main/use-cases/updateStudent && git commit -m "feat(student): add updateStudent use case"
```

---

### Task 7: Use Case — deleteStudent

**Files:**

- Create: `src/features/student/main/use-cases/deleteStudent/deleteStudent.ts`
- Create: `src/features/student/main/use-cases/deleteStudent/index.ts`
- Create: `src/features/student/main/use-cases/deleteStudent/__tests__/deleteStudent.test.ts`

- [ ] **Step 1: Write the failing test**

Create `src/features/student/main/use-cases/deleteStudent/__tests__/deleteStudent.test.ts`:

```ts
import { describe, it, expect, vi } from 'vitest'
import { deleteStudent } from '../deleteStudent'
import type { StudentGateway } from '@student/gateways/student'
import type { StudentEntity } from '@student/entities/student'

const SAMPLE_ENTITY: StudentEntity = {
  id: 1,
  nom: 'Dupont',
  prenom: 'Jean',
  classe: '3B',
  ine: '0123456789A',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z'
}

function createMockGateway(overrides: Partial<StudentGateway> = {}): StudentGateway {
  return {
    create: vi.fn().mockResolvedValue(SAMPLE_ENTITY),
    getById: vi.fn().mockResolvedValue(SAMPLE_ENTITY),
    getAll: vi.fn().mockResolvedValue([SAMPLE_ENTITY]),
    update: vi.fn().mockResolvedValue(SAMPLE_ENTITY),
    delete: vi.fn().mockResolvedValue(true),
    getByClass: vi.fn().mockResolvedValue([]),
    getByIds: vi.fn().mockResolvedValue([]),
    ...overrides
  }
}

describe('deleteStudent', () => {
  it('deletes a student by id', async () => {
    const gateway = createMockGateway()
    const result = await deleteStudent({ gateway }, { id: 1 })
    expect(result.success).toBe(true)
    expect(gateway.delete).toHaveBeenCalledWith(1)
  })

  it('returns error when student not found', async () => {
    const gateway = createMockGateway({
      getById: vi.fn().mockResolvedValue(null),
      delete: vi.fn().mockResolvedValue(false)
    })
    const result = await deleteStudent({ gateway }, { id: 9999 })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error).toContain('introuvable')
    }
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/features/student/main/use-cases/deleteStudent`
Expected: FAIL

- [ ] **Step 3: Write the implementation**

Create `src/features/student/main/use-cases/deleteStudent/deleteStudent.ts`:

```ts
import type { UseCaseResult } from '../types/UseCaseResult'
import type { StudentGateway } from '@student/gateways/student'

interface DeleteStudentDeps {
  gateway: StudentGateway
}

interface DeleteStudentInput {
  id: number
}

export async function deleteStudent(
  deps: DeleteStudentDeps,
  input: DeleteStudentInput
): Promise<UseCaseResult<{ id: number }>> {
  const existing = await deps.gateway.getById(input.id)
  if (!existing) {
    return { success: false, error: 'Élève introuvable' }
  }

  const deleted = await deps.gateway.delete(input.id)
  if (!deleted) {
    return { success: false, error: 'Erreur lors de la suppression' }
  }

  return { success: true, data: { id: input.id } }
}
```

Create `src/features/student/main/use-cases/deleteStudent/index.ts`:

```ts
export { deleteStudent } from './deleteStudent'
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/features/student/main/use-cases/deleteStudent`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/features/student/main/use-cases/deleteStudent && git commit -m "feat(student): add deleteStudent use case"
```

---

### Task 8: Use Case — getStudent (by ID)

**Files:**

- Create: `src/features/student/main/use-cases/getStudent/getStudent.ts`
- Create: `src/features/student/main/use-cases/getStudent/index.ts`
- Create: `src/features/student/main/use-cases/getStudent/__tests__/getStudent.test.ts`

- [ ] **Step 1: Write the failing test**

Create `src/features/student/main/use-cases/getStudent/__tests__/getStudent.test.ts`:

```ts
import { describe, it, expect, vi } from 'vitest'
import { getStudent } from '../getStudent'
import type { StudentGateway } from '@student/gateways/student'
import type { StudentEntity } from '@student/entities/student'

const SAMPLE_ENTITY: StudentEntity = {
  id: 1,
  nom: 'Dupont',
  prenom: 'Jean',
  classe: '3B',
  ine: '0123456789A',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z'
}

function createMockGateway(overrides: Partial<StudentGateway> = {}): StudentGateway {
  return {
    create: vi.fn().mockResolvedValue(SAMPLE_ENTITY),
    getById: vi.fn().mockResolvedValue(SAMPLE_ENTITY),
    getAll: vi.fn().mockResolvedValue([SAMPLE_ENTITY]),
    update: vi.fn().mockResolvedValue(SAMPLE_ENTITY),
    delete: vi.fn().mockResolvedValue(true),
    getByClass: vi.fn().mockResolvedValue([]),
    getByIds: vi.fn().mockResolvedValue([]),
    ...overrides
  }
}

describe('getStudent', () => {
  it('returns a student by id', async () => {
    const gateway = createMockGateway()
    const result = await getStudent({ gateway }, { id: 1 })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.id).toBe(1)
      expect(result.data.fullName).toBe('Jean Dupont')
    }
  })

  it('returns error when student not found', async () => {
    const gateway = createMockGateway({
      getById: vi.fn().mockResolvedValue(null)
    })
    const result = await getStudent({ gateway }, { id: 9999 })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error).toContain('introuvable')
    }
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/features/student/main/use-cases/getStudent`
Expected: FAIL

- [ ] **Step 3: Write the implementation**

Create `src/features/student/main/use-cases/getStudent/getStudent.ts`:

```ts
import { formatStudentResponse } from '../helpers/formatStudentResponse'
import type { UseCaseResult } from '../types/UseCaseResult'
import type { StudentGateway } from '@student/gateways/student'
import type { StudentResponseDto } from '@student-shared'

interface GetStudentDeps {
  gateway: StudentGateway
}

interface GetStudentInput {
  id: number
}

export async function getStudent(
  deps: GetStudentDeps,
  input: GetStudentInput
): Promise<UseCaseResult<StudentResponseDto>> {
  const entity = await deps.gateway.getById(input.id)
  if (!entity) {
    return { success: false, error: 'Élève introuvable' }
  }

  return { success: true, data: formatStudentResponse(entity) }
}
```

Create `src/features/student/main/use-cases/getStudent/index.ts`:

```ts
export { getStudent } from './getStudent'
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/features/student/main/use-cases/getStudent`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/features/student/main/use-cases/getStudent && git commit -m "feat(student): add getStudent use case"
```

---

### Task 9: Use Case — listStudents

**Files:**

- Create: `src/features/student/main/use-cases/listStudents/listStudents.ts`
- Create: `src/features/student/main/use-cases/listStudents/index.ts`
- Create: `src/features/student/main/use-cases/listStudents/__tests__/listStudents.test.ts`

- [ ] **Step 1: Write the failing test**

Create `src/features/student/main/use-cases/listStudents/__tests__/listStudents.test.ts`:

```ts
import { describe, it, expect, vi } from 'vitest'
import { listStudents } from '../listStudents'
import type { StudentGateway } from '@student/gateways/student'
import type { StudentEntity } from '@student/entities/student'

const STUDENT_A: StudentEntity = {
  id: 1,
  nom: 'Dupont',
  prenom: 'Jean',
  classe: '3B',
  ine: 'INE1',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z'
}

const STUDENT_B: StudentEntity = {
  id: 2,
  nom: 'Martin',
  prenom: 'Pierre',
  classe: '3A',
  ine: 'INE2',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z'
}

function createMockGateway(overrides: Partial<StudentGateway> = {}): StudentGateway {
  return {
    create: vi.fn().mockResolvedValue(STUDENT_A),
    getById: vi.fn().mockResolvedValue(STUDENT_A),
    getAll: vi.fn().mockResolvedValue([STUDENT_A, STUDENT_B]),
    update: vi.fn().mockResolvedValue(STUDENT_A),
    delete: vi.fn().mockResolvedValue(true),
    getByClass: vi.fn().mockResolvedValue([STUDENT_A]),
    getByIds: vi.fn().mockResolvedValue([]),
    ...overrides
  }
}

describe('listStudents', () => {
  it('returns all students when no filter', async () => {
    const gateway = createMockGateway()
    const result = await listStudents({ gateway }, {})
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.students).toHaveLength(2)
    }
  })

  it('filters by class', async () => {
    const gateway = createMockGateway()
    const result = await listStudents({ gateway }, { classe: '3B' })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.students).toHaveLength(1)
      expect(result.data.students[0].classe).toBe('3B')
    }
    expect(gateway.getByClass).toHaveBeenCalledWith('3B')
  })

  it('returns empty list when no students', async () => {
    const gateway = createMockGateway({
      getAll: vi.fn().mockResolvedValue([])
    })
    const result = await listStudents({ gateway }, {})
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.students).toHaveLength(0)
    }
  })

  it('includes fullName in response', async () => {
    const gateway = createMockGateway()
    const result = await listStudents({ gateway }, {})
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.students[0].fullName).toBe('Jean Dupont')
    }
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/features/student/main/use-cases/listStudents`
Expected: FAIL

- [ ] **Step 3: Write the implementation**

Create `src/features/student/main/use-cases/listStudents/listStudents.ts`:

```ts
import { formatStudentResponse } from '../helpers/formatStudentResponse'
import type { UseCaseResult } from '../types/UseCaseResult'
import type { StudentGateway } from '@student/gateways/student'
import type { StudentListResponseDto } from '@student-shared'

interface ListStudentsDeps {
  gateway: StudentGateway
}

interface ListStudentsInput {
  classe?: string
}

export async function listStudents(
  deps: ListStudentsDeps,
  input: ListStudentsInput
): Promise<UseCaseResult<StudentListResponseDto>> {
  const entities = input.classe
    ? await deps.gateway.getByClass(input.classe)
    : await deps.gateway.getAll()

  const students = entities.map(formatStudentResponse)

  return { success: true, data: { students } }
}
```

Create `src/features/student/main/use-cases/listStudents/index.ts`:

```ts
export { listStudents } from './listStudents'
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/features/student/main/use-cases/listStudents`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/features/student/main/use-cases/listStudents && git commit -m "feat(student): add listStudents use case"
```

---

### Task 10: Use Case — importStudentsCsv

**Files:**

- Create: `src/features/student/main/use-cases/importStudentsCsv/helpers/csvConstants/csvConstants.ts`
- Create: `src/features/student/main/use-cases/importStudentsCsv/helpers/csvConstants/index.ts`
- Create: `src/features/student/main/use-cases/importStudentsCsv/validations/csvRowSchema/csvRowSchema.ts`
- Create: `src/features/student/main/use-cases/importStudentsCsv/validations/csvRowSchema/index.ts`
- Create: `src/features/student/main/use-cases/importStudentsCsv/validations/csvRowSchema/__tests__/csvRowSchema.test.ts`
- Create: `src/features/student/main/use-cases/importStudentsCsv/helpers/parseStudentCsv/parseStudentCsv.ts`
- Create: `src/features/student/main/use-cases/importStudentsCsv/helpers/parseStudentCsv/index.ts`
- Create: `src/features/student/main/use-cases/importStudentsCsv/helpers/parseStudentCsv/__tests__/parseStudentCsv.test.ts`
- Create: `src/features/student/main/use-cases/importStudentsCsv/types/CsvImportResult.ts`
- Create: `src/features/student/main/use-cases/importStudentsCsv/importStudentsCsv.ts`
- Create: `src/features/student/main/use-cases/importStudentsCsv/index.ts`
- Create: `src/features/student/main/use-cases/importStudentsCsv/__tests__/importStudentsCsv.test.ts`

- [ ] **Step 1: Write csvConstants**

Create `src/features/student/main/use-cases/importStudentsCsv/helpers/csvConstants/csvConstants.ts`:

```ts
export const MAX_CSV_IMPORT_ROWS = 500
export const CSV_COLUMN_NOM = 'nom'
export const CSV_COLUMN_PRENOM = 'prenom'
export const CSV_COLUMN_CLASSE = 'classe'
export const CSV_COLUMN_INE = 'ine'
export const CSV_REQUIRED_COLUMNS = [
  CSV_COLUMN_NOM,
  CSV_COLUMN_PRENOM,
  CSV_COLUMN_CLASSE,
  CSV_COLUMN_INE
] as const
```

Create `src/features/student/main/use-cases/importStudentsCsv/helpers/csvConstants/index.ts`:

```ts
export {
  MAX_CSV_IMPORT_ROWS,
  CSV_COLUMN_NOM,
  CSV_COLUMN_PRENOM,
  CSV_COLUMN_CLASSE,
  CSV_COLUMN_INE,
  CSV_REQUIRED_COLUMNS
} from './csvConstants'
```

- [ ] **Step 2: Write the failing test for csvRowSchema**

Create `src/features/student/main/use-cases/importStudentsCsv/validations/csvRowSchema/__tests__/csvRowSchema.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { csvRowSchema } from '../csvRowSchema'

describe('csvRowSchema', () => {
  it('validates a valid CSV row', () => {
    const result = csvRowSchema.safeParse({
      nom: 'Dupont',
      prenom: 'Jean',
      classe: '3B',
      ine: '0123456789A'
    })
    expect(result.success).toBe(true)
  })

  it('trims whitespace from fields', () => {
    const result = csvRowSchema.safeParse({
      nom: '  Dupont  ',
      prenom: '  Jean  ',
      classe: '  3B  ',
      ine: '  0123456789A  '
    })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.nom).toBe('Dupont')
    }
  })

  it('rejects missing fields', () => {
    const result = csvRowSchema.safeParse({ nom: 'Dupont' })
    expect(result.success).toBe(false)
  })

  it('rejects empty strings after trim', () => {
    const result = csvRowSchema.safeParse({
      nom: '   ',
      prenom: 'Jean',
      classe: '3B',
      ine: 'INE1'
    })
    expect(result.success).toBe(false)
  })
})
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npx vitest run src/features/student/main/use-cases/importStudentsCsv/validations/csvRowSchema`
Expected: FAIL

- [ ] **Step 4: Write csvRowSchema implementation**

Create `src/features/student/main/use-cases/importStudentsCsv/validations/csvRowSchema/csvRowSchema.ts`:

```ts
import { z } from 'zod'
import {
  NOM_MAX_LENGTH,
  PRENOM_MAX_LENGTH,
  CLASSE_MAX_LENGTH,
  INE_MAX_LENGTH
} from '@student-shared'

export const csvRowSchema = z.object({
  nom: z.string().trim().min(1, 'Le nom est obligatoire').max(NOM_MAX_LENGTH),
  prenom: z.string().trim().min(1, 'Le prénom est obligatoire').max(PRENOM_MAX_LENGTH),
  classe: z.string().trim().min(1, 'La classe est obligatoire').max(CLASSE_MAX_LENGTH),
  ine: z.string().trim().min(1, "L'INE est obligatoire").max(INE_MAX_LENGTH)
})

export type CsvRow = z.infer<typeof csvRowSchema>
```

Create `src/features/student/main/use-cases/importStudentsCsv/validations/csvRowSchema/csvRowSchema.ts`:

```ts
import { z } from 'zod'
import { createStudentSchema } from '@student-shared'

export const csvRowSchema = createStudentSchema

export type CsvRow = z.infer<typeof csvRowSchema>
```

Create `src/features/student/main/use-cases/importStudentsCsv/validations/csvRowSchema/index.ts`:

```ts
export { csvRowSchema } from './csvRowSchema'
export type { CsvRow } from './csvRowSchema'
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run src/features/student/main/use-cases/importStudentsCsv/validations/csvRowSchema`
Expected: PASS

- [ ] **Step 6: Write the failing test for parseStudentCsv**

Create `src/features/student/main/use-cases/importStudentsCsv/helpers/parseStudentCsv/__tests__/parseStudentCsv.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { parseStudentCsv } from '../parseStudentCsv'
import { MAX_CSV_IMPORT_ROWS } from '../../csvConstants'

describe('parseStudentCsv', () => {
  it('parses a valid CSV string', () => {
    const csv = `nom,prenom,classe,ine
Dupont,Jean,3B,INE1
Martin,Pierre,3A,INE2`
    const result = parseStudentCsv(csv)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data).toHaveLength(2)
      expect(result.data[0].nom).toBe('Dupont')
    }
  })

  it('returns error for missing required columns', () => {
    const csv = `nom,prenom
Dupont,Jean`
    const result = parseStudentCsv(csv)
    expect(result.success).toBe(false)
  })

  it('returns error when exceeding max rows', () => {
    const header = 'nom,prenom,classe,ine'
    const rows = Array.from(
      { length: MAX_CSV_IMPORT_ROWS + 1 },
      (_, i) => `Nom${i},Prenom${i},3B,INE${i}`
    )
    const csv = [header, ...rows].join('\n')
    const result = parseStudentCsv(csv)
    expect(result.success).toBe(false)
  })

  it('skips rows that fail validation and collects errors', () => {
    const csv = `nom,prenom,classe,ine
Dupont,Jean,3B,INE1
, Pierre,3A,INE2
Martin, ,3B,INE3`
    const result = parseStudentCsv(csv)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data).toHaveLength(1)
      expect(result.data[0].nom).toBe('Dupont')
    }
  })
})
```

- [ ] **Step 7: Run test to verify it fails**

Run: `npx vitest run src/features/student/main/use-cases/importStudentsCsv/helpers/parseStudentCsv`
Expected: FAIL

- [ ] **Step 8: Write parseStudentCsv implementation**

Create `src/features/student/main/use-cases/importStudentsCsv/helpers/parseStudentCsv/parseStudentCsv.ts`:

```ts
import Papa from 'papaparse'
import { csvRowSchema } from '../../validations/csvRowSchema'
import { CSV_REQUIRED_COLUMNS, MAX_CSV_IMPORT_ROWS } from '../csvConstants'
import type { CsvRow } from '../../validations/csvRowSchema'

interface ParseSuccess {
  success: true
  data: CsvRow[]
  errors: string[]
}

interface ParseFailure {
  success: false
  error: string
}

type ParseResult = ParseSuccess | ParseFailure

export function parseStudentCsv(csvString: string): ParseResult {
  const parsed = Papa.parse<Record<string, string>>(csvString, {
    header: true,
    skipEmptyLines: true
  })

  const headers = parsed.meta.fields ?? []
  const missingColumns = CSV_REQUIRED_COLUMNS.filter((col) => !headers.includes(col))

  if (missingColumns.length > 0) {
    return {
      success: false,
      error: `Colonnes manquantes: ${missingColumns.join(', ')}`
    }
  }

  const dataRows = parsed.data

  if (dataRows.length > MAX_CSV_IMPORT_ROWS) {
    return {
      success: false,
      error: `Limite dépassée: ${MAX_CSV_IMPORT_ROWS} lignes maximum`
    }
  }

  const validRows: CsvRow[] = []
  const errors: string[] = []

  for (const [index, row] of dataRows.entries()) {
    const result = csvRowSchema.safeParse(row)
    if (result.success) {
      validRows.push(result.data)
    } else {
      const rowNum = index + 2
      const messages = result.error.issues.map((i) => i.message).join(', ')
      errors.push(`Ligne ${rowNum}: ${messages}`)
    }
  }

  return { success: true, data: validRows, errors }
}
```

Create `src/features/student/main/use-cases/importStudentsCsv/helpers/parseStudentCsv/index.ts`:

```ts
export { parseStudentCsv } from './parseStudentCsv'
```

- [ ] **Step 9: Run test to verify it passes**

Run: `npx vitest run src/features/student/main/use-cases/importStudentsCsv/helpers/parseStudentCsv`
Expected: PASS

- [ ] **Step 10: Write the CsvImportResult type**

Create `src/features/student/main/use-cases/importStudentsCsv/types/CsvImportResult.ts`:

```ts
export interface CsvImportResult {
  created: number
  errors: number
  errorMessages: string[]
}
```

- [ ] **Step 11: Write the failing test for importStudentsCsv**

Create `src/features/student/main/use-cases/importStudentsCsv/__tests__/importStudentsCsv.test.ts`:

```ts
import { describe, it, expect, vi } from 'vitest'
import { importStudentsCsv } from '../importStudentsCsv'
import type { StudentGateway } from '@student/gateways/student'
import type { StudentEntity } from '@student/entities/student'

const CREATED_ENTITY: StudentEntity = {
  id: 1,
  nom: 'Dupont',
  prenom: 'Jean',
  classe: '3B',
  ine: 'INE1',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z'
}

function createMockGateway(overrides: Partial<StudentGateway> = {}): StudentGateway {
  return {
    create: vi.fn().mockResolvedValue(CREATED_ENTITY),
    getById: vi.fn().mockResolvedValue(null),
    getAll: vi.fn().mockResolvedValue([]),
    update: vi.fn().mockResolvedValue(null),
    delete: vi.fn().mockResolvedValue(false),
    getByClass: vi.fn().mockResolvedValue([]),
    getByIds: vi.fn().mockResolvedValue([]),
    ...overrides
  }
}

describe('importStudentsCsv', () => {
  it('imports valid CSV and returns count', async () => {
    const gateway = createMockGateway()
    const csv = `nom,prenom,classe,ine
Dupont,Jean,3B,INE1
Martin,Pierre,3A,INE2`
    const result = await importStudentsCsv({ gateway }, { csv })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.created).toBe(2)
      expect(result.data.errors).toHaveLength(0)
    }
    expect(gateway.create).toHaveBeenCalledTimes(2)
  })

  it('skips rows with duplicate INE within the CSV', async () => {
    const gateway = createMockGateway()
    const csv = `nom,prenom,classe,ine
Dupont,Jean,3B,INE_DUP
Martin,Pierre,3A,INE_DUP`
    const result = await importStudentsCsv({ gateway }, { csv })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.created).toBe(1)
      expect(result.data.errors.length).toBeGreaterThanOrEqual(1)
    }
  })

  it('skips rows with INE that already exists in database', async () => {
    const gateway = createMockGateway({
      getAll: vi.fn().mockResolvedValue([{ ...CREATED_ENTITY, ine: 'EXISTING_INE' }])
    })
    const csv = `nom,prenom,classe,ine
Dupont,Jean,3B,EXISTING_INE`
    const result = await importStudentsCsv({ gateway }, { csv })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.created).toBe(0)
    }
  })

  it('returns error for malformed CSV', async () => {
    const gateway = createMockGateway()
    const csv = `nom,prenom
Dupont,Jean`
    const result = await importStudentsCsv({ gateway }, { csv })
    expect(result.success).toBe(false)
  })
})
```

- [ ] **Step 12: Run test to verify it fails**

Run: `npx vitest run src/features/student/main/use-cases/importStudentsCsv/__tests__`
Expected: FAIL

- [ ] **Step 13: Write importStudentsCsv implementation**

Create `src/features/student/main/use-cases/importStudentsCsv/importStudentsCsv.ts`:

```ts
import { createStudentSchema } from '@student-shared'
import type { StudentGateway } from '@student/gateways/student'
import { parseStudentCsv } from './helpers/parseStudentCsv'
import type { CsvImportResult } from './types/CsvImportResult'
import type { UseCaseResult } from '../types/UseCaseResult'

interface ImportStudentsCsvDeps {
  gateway: StudentGateway
}

interface ImportStudentsCsvInput {
  csv: string
}

export async function importStudentsCsv(
  deps: ImportStudentsCsvDeps,
  input: ImportStudentsCsvInput
): Promise<UseCaseResult<CsvImportResult>> {
  const parseResult = parseStudentCsv(input.csv)
  if (!parseResult.success) {
    return { success: false, error: parseResult.error }
  }

  const existingStudents = await deps.gateway.getAll()
  const existingInes = new Set(existingStudents.map((s) => s.ine.trim().toLowerCase()))

  const seenInes = new Set<string>()
  let created = 0
  const errorMessages: string[] = [...parseResult.errors]

  for (const row of parseResult.data) {
    const normalisedIne = row.ine.trim().toLowerCase()

    if (existingInes.has(normalisedIne) || seenInes.has(normalisedIne)) {
      errorMessages.push(`${row.prenom} ${row.nom}: INE déjà existant`)
      continue
    }

    const validated = createStudentSchema.safeParse(row)
    if (!validated.success) {
      const msg = validated.error.issues.map((i) => i.message).join(', ')
      errorMessages.push(`${row.prenom} ${row.nom}: ${msg}`)
      continue
    }

    try {
      await deps.gateway.create(validated.data)
      created += 1
      seenInes.add(normalisedIne)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur inconnue'
      errorMessages.push(`${row.prenom} ${row.nom}: ${message}`)
    }
  }

  return {
    success: true,
    data: {
      created,
      errors: errorMessages.length,
      errorMessages
    }
  }
}
```

Create `src/features/student/main/use-cases/importStudentsCsv/index.ts`:

```ts
export { importStudentsCsv } from './importStudentsCsv'
export type { CsvImportResult } from './types/CsvImportResult'
```

- [ ] **Step 14: Run test to verify it passes**

Run: `npx vitest run src/features/student/main/use-cases/importStudentsCsv`
Expected: PASS

- [ ] **Step 15: Commit**

```bash
git add src/features/student/main/use-cases/importStudentsCsv && git commit -m "feat(student): add importStudentsCsv use case with CSV parsing"
```

---

### Task 11: Shared Use-Case Helpers + Types

**Files:**

- Create: `src/features/student/main/use-cases/helpers/formatStudentResponse/formatStudentResponse.ts`
- Create: `src/features/student/main/use-cases/helpers/formatStudentResponse/index.ts`
- Create: `src/features/student/main/use-cases/helpers/formatStudentResponse/__tests__/formatStudentResponse.test.ts`
- Create: `src/features/student/main/use-cases/types/UseCaseResult.ts`

> **Note:** This task must be implemented BEFORE Tasks 5-10 since those use-cases import from here. The tasks are numbered for logical flow, but this one is a prerequisite. Execute this task first.

- [ ] **Step 1: Write the failing test for formatStudentResponse**

Create `src/features/student/main/use-cases/helpers/formatStudentResponse/__tests__/formatStudentResponse.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { formatStudentResponse } from '../formatStudentResponse'
import type { StudentEntity } from '@student/entities/student'

describe('formatStudentResponse', () => {
  it('maps entity to StudentResponseDto', () => {
    const entity: StudentEntity = {
      id: 1,
      nom: 'Dupont',
      prenom: 'Jean',
      classe: '3B',
      ine: '0123456789A',
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z'
    }
    const dto = formatStudentResponse(entity)
    expect(dto.id).toBe(1)
    expect(dto.nom).toBe('Dupont')
    expect(dto.prenom).toBe('Jean')
    expect(dto.classe).toBe('3B')
    expect(dto.ine).toBe('0123456789A')
    expect(dto.fullName).toBe('Jean Dupont')
    expect(dto.createdAt).toBe('2024-01-01T00:00:00.000Z')
    expect(dto.updatedAt).toBe('2024-01-01T00:00:00.000Z')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/features/student/main/use-cases/helpers/formatStudentResponse`
Expected: FAIL

- [ ] **Step 3: Write formatStudentResponse implementation**

Create `src/features/student/main/use-cases/helpers/formatStudentResponse/formatStudentResponse.ts`:

```ts
import type { StudentResponseDto } from '@student-shared'
import type { StudentEntity } from '@student/entities/student'
import { computeStudentFields } from '@student/entities/student'

export function formatStudentResponse(entity: StudentEntity): StudentResponseDto {
  const { fullName } = computeStudentFields(entity)
  return {
    id: entity.id,
    nom: entity.nom,
    prenom: entity.prenom,
    classe: entity.classe,
    ine: entity.ine,
    fullName,
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt
  }
}
```

Create `src/features/student/main/use-cases/helpers/formatStudentResponse/index.ts`:

```ts
export { formatStudentResponse } from './formatStudentResponse'
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/features/student/main/use-cases/helpers/formatStudentResponse`
Expected: PASS

- [ ] **Step 5: Write the UseCaseResult type**

Create `src/features/student/main/use-cases/types/UseCaseResult.ts`:

```ts
export type UseCaseResult<T> = { success: true; data: T } | { success: false; error: string }
```

- [ ] **Step 6: Commit**

```bash
git add src/features/student/main/use-cases/helpers src/features/student/main/use-cases/types && git commit -m "feat(student): add formatStudentResponse helper + UseCaseResult type"
```

---

### Task 12: Student Controller

**Files:**

- Create: `src/features/student/main/controllers/student/student.controller.ts`
- Create: `src/features/student/main/controllers/student/index.ts`

- [ ] **Step 1: Write the implementation**

Create `src/features/student/main/controllers/student/student.controller.ts`:

```ts
import type { IpcMain } from 'electron'
import { createMainRouter } from '@shared/ipc/router'
import type { StudentGateway } from '@student/gateways/student'
import { createStudent } from '@student/use-cases/createStudent'
import { updateStudent } from '@student/use-cases/updateStudent'
import { deleteStudent } from '@student/use-cases/deleteStudent'
import { getStudent } from '@student/use-cases/getStudent'
import { listStudents } from '@student/use-cases/listStudents'
import { importStudentsCsv } from '@student/use-cases/importStudentsCsv'

const IPC_CHANNEL_STUDENT_CREATE = 'student.create'
const IPC_CHANNEL_STUDENT_GET = 'student.get'
const IPC_CHANNEL_STUDENT_LIST = 'student.list'
const IPC_CHANNEL_STUDENT_UPDATE = 'student.update'
const IPC_CHANNEL_STUDENT_DELETE = 'student.delete'
const IPC_CHANNEL_STUDENT_IMPORT_CSV = 'student.importCsv'

export function registerStudentController(ipcMain: IpcMain, gateway: StudentGateway) {
  const router = createMainRouter(ipcMain)
  const deps = { gateway }

  router.procedure(
    IPC_CHANNEL_STUDENT_CREATE,
    async (input: { nom: string; prenom: string; classe: string; ine: string }) => {
      return createStudent(deps, input)
    }
  )

  router.procedure(IPC_CHANNEL_STUDENT_GET, async (input: { id: number }) => {
    return getStudent(deps, input)
  })

  router.procedure(IPC_CHANNEL_STUDENT_LIST, async (input: { classe?: string }) => {
    return listStudents(deps, input)
  })

  router.procedure(
    IPC_CHANNEL_STUDENT_UPDATE,
    async (input: { id: number; nom?: string; prenom?: string; classe?: string; ine?: string }) => {
      const { id, ...dto } = input
      return updateStudent(deps, { id, dto })
    }
  )

  router.procedure(IPC_CHANNEL_STUDENT_DELETE, async (input: { id: number }) => {
    return deleteStudent(deps, input)
  })

  router.procedure(IPC_CHANNEL_STUDENT_IMPORT_CSV, async (input: { csv: string }) => {
    return importStudentsCsv(deps, input)
  })
}
```

Create `src/features/student/main/controllers/student/index.ts`:

```ts
export { registerStudentController } from './student.controller'
```

- [ ] **Step 2: Commit**

```bash
git add src/features/student/main/controllers && git commit -m "feat(student): add student controller with IPC handlers"
```

---

### Task 13: Module Wiring

**Files:**

- Create: `src/features/student/main/index.ts`
- Modify: `src/main/modules.ts`
- Modify: `src/shared/db/schema.ts`

- [ ] **Step 1: Create student module entry point**

Create `src/features/student/main/index.ts`:

```ts
import type { IpcMain } from 'electron'
import type { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3'
import { StudentGatewayDrizzle } from './gateways/student/student.gateway.drizzle'
import { registerStudentController } from './controllers/student'

export function initializeStudentModule(db: BetterSQLite3Database, ipcMain: IpcMain) {
  const studentGateway = new StudentGatewayDrizzle(db)
  registerStudentController(ipcMain, studentGateway)
}
```

- [ ] **Step 2: Update modules.ts**

Modify `src/main/modules.ts`:

```ts
import type { IpcMain } from 'electron'
import { getDb } from '@shared/db/connection'
import { initializeStudentModule } from '@student/index'

export function initializeModules(ipcMain: IpcMain) {
  const db = getDb()
  initializeStudentModule(db, ipcMain)
}
```

- [ ] **Step 3: Update schema.ts to re-export student schema**

Modify `src/shared/db/schema.ts`:

```ts
export * from '@student/entities/student'
```

- [ ] **Step 4: Commit**

```bash
git add src/features/student/main/index.ts src/main/modules.ts src/shared/db/schema.ts && git commit -m "feat(student): wire student module in modules.ts + re-export schema"
```

---

### Task 14: Drizzle Migration

**Files:**

- Generate: `drizzle/` migration files

**Prerequisite:** `drizzle.config.ts` must exist at project root (from Foundation plan). If it doesn't, create it first.

- [ ] **Step 1: Ensure drizzle.config.ts exists**

If `drizzle.config.ts` doesn't exist, create it:

```ts
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: 'src/shared/db/schema.ts',
  out: 'drizzle',
  dialect: 'sqlite'
})
```

- [ ] **Step 2: Generate migration**

Run: `npx drizzle-kit generate`
Expected: Creates migration SQL files in `drizzle/` directory with `CREATE TABLE students` and indexes

- [ ] **Step 3: Verify migration file contains student table**

Run: `ls drizzle/`
Expected: Migration files present

Inspect the generated SQL to confirm it contains the students table definition matching:

```sql
CREATE TABLE students (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nom TEXT NOT NULL,
  prenom TEXT NOT NULL,
  classe TEXT NOT NULL,
  ine TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE INDEX idx_students_nom ON students(nom, prenom);
CREATE INDEX idx_students_classe ON students(classe);
```

- [ ] **Step 4: Commit**

```bash
git add drizzle/ drizzle.config.ts && git commit -m "chore: generate Drizzle migration for students table"
```

---

### Task 15: Final Verification

- [ ] **Step 1: Run TypeScript type checking**

Run: `pnpm run typecheck`
Expected: No errors

- [ ] **Step 2: Run ESLint**

Run: `pnpm run lint`
Expected: No errors

- [ ] **Step 3: Run all tests**

Run: `npx vitest run`
Expected: All tests pass

- [ ] **Step 4: Fix any issues and commit**

```bash
git add -A && git commit -m "chore: student backend verification fixes"
```

---

## Execution Order

While tasks are numbered 1-15, the correct build order is:

1. **Task 1** — Student shared types (DTOs)
2. **Task 2** — Student entity (Drizzle + Zod + computeStudentFields)
3. **Task 3** — Student gateway interface
4. **Task 11** — Shared use-case helpers (formatStudentResponse + UseCaseResult) ← prerequisite for use-cases
5. **Task 4** — Student gateway Drizzle implementation
6. **Task 5** — createStudent use case
7. **Task 6** — updateStudent use case
8. **Task 7** — deleteStudent use case
9. **Task 8** — getStudent use case
10. **Task 9** — listStudents use case
11. **Task 10** — importStudentsCsv use case
12. **Task 12** — Student controller
13. **Task 13** — Module wiring
14. **Task 14** — Drizzle migration
15. **Task 15** — Final verification
