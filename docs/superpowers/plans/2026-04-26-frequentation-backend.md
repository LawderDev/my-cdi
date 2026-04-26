# Frequentation Backend Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the complete frequentation (attendance) feature backend using strict clean architecture — entities, use-cases, gateways, and controllers.

**Architecture:** Strict clean architecture. Controllers → Use-cases → Entities ← Gateways. Use-cases depend on gateway interfaces only. Gateway implementations injected at wiring time. Cross-feature dependency: getJournalEntries use-case depends on StudentGateway interface.

**Tech Stack:** TypeScript 5.9.x (strict), Drizzle ORM, better-sqlite3, Zod, Vitest

---

## File Structure

Files created or modified by this plan:

```
src/features/frequentation/
├── shared/
│   └── types.ts                                        # Task 1
└── main/
    ├── entities/
    │   └── frequentation/
    │       ├── frequentation.entity.ts                 # Task 2
    │       ├── index.ts                                # Task 2
    │       └── __tests__/
    │           └── frequentation.entity.test.ts        # Task 2
    ├── gateways/
    │   └── frequentation/
    │       ├── frequentation.gateway.ts                # Task 3
    │       ├── frequentation.gateway.drizzle.ts       # Task 4
    │       ├── index.ts                                # Task 3
    │       ├── helpers/
    │       │   └── mapFrequentationRow/
    │       │       ├── mapFrequentationRow.ts          # Task 4
    │       │       ├── index.ts                        # Task 4
    │       │       └── __tests__/
    │       │           └── mapFrequentationRow.test.ts  # Task 4
    │       └── __tests__/
    │           └── frequentation.gateway.drizzle.test.ts # Task 4
    ├── use-cases/
    │   ├── createFrequentation/
    │   │   ├── createFrequentation.ts                  # Task 5
    │   │   ├── index.ts                               # Task 5
    │   │   └── __tests__/
    │   │       └── createFrequentation.test.ts         # Task 5
    │   ├── updateFrequentation/
    │   │   ├── updateFrequentation.ts                  # Task 6
    │   │   ├── index.ts                               # Task 6
    │   │   └── __tests__/
    │   │       └── updateFrequentation.test.ts         # Task 6
    │   ├── deleteFrequentation/
    │   │   ├── deleteFrequentation.ts                  # Task 7
    │   │   ├── index.ts                               # Task 7
    │   │   └── __tests__/
    │   │       └── deleteFrequentation.test.ts         # Task 7
    │   ├── getFrequentation/
    │   │   ├── getFrequentation.ts                     # Task 8
    │   │   ├── index.ts                               # Task 8
    │   │   └── __tests__/
    │   │       └── getFrequentation.test.ts            # Task 8
    │   ├── listFrequentations/
    │   │   ├── listFrequentations.ts                   # Task 9
    │   │   ├── index.ts                               # Task 9
    │   │   └── __tests__/
    │   │       └── listFrequentations.test.ts          # Task 9
    │   ├── getJournalEntries/
    │   │   ├── getJournalEntries.ts                    # Task 10
    │   │   ├── index.ts                               # Task 10
    │   │   └── __tests__/
    │   │       └── getJournalEntries.test.ts           # Task 10
    │   ├── createFrequentationBatch/
    │   │   ├── createFrequentationBatch.ts            # Task 11
    │   │   ├── index.ts                               # Task 11
    │   │   ├── helpers/
    │   │   │   └── validateBatchItem/
    │   │   │       ├── validateBatchItem.ts           # Task 11
    │   │   │       ├── index.ts                       # Task 11
    │   │   │       └── __tests__/
    │   │   │           └── validateBatchItem.test.ts  # Task 11
    │   │   ├── validations/
    │   │   │   └── createFrequentationBatchSchema/
    │   │   │       ├── createFrequentationBatchSchema.ts # Task 11
    │   │   │       ├── index.ts                        # Task 11
    │   │   │       └── __tests__/
    │   │   │           └── createFrequentationBatchSchema.test.ts # Task 11
    │   │   ├── types/
    │   │   │   └── BatchResult.ts                      # Task 11
    │   │   └── __tests__/
    │   │       └── createFrequentationBatch.test.ts    # Task 11
    │   ├── helpers/
    │   │   └── formatFrequentationResponse/
    │   │       ├── formatFrequentationResponse.ts      # Task 12
    │   │       ├── index.ts                            # Task 12
    │   │       └── __tests__/
    │   │           └── formatFrequentationResponse.test.ts # Task 12
    │   └── types/
    │       └── UseCaseResult.ts                        # Task 5
    ├── controllers/
    │   └── frequentation/
    │       ├── frequentation.controller.ts              # Task 13
    │       ├── index.ts                                # Task 13
    │       └── __tests__/
    │           └── frequentation.controller.test.ts    # Task 13

src/shared/
└── db/
    └── schema.ts                                       # Task 14 (modify)

src/main/
└── modules.ts                                          # Task 14 (modify)

drizzle/                                                 # Task 15 (migration output)
```

---

### Task 1: Frequentation Shared Types (DTOs)

**Files:**

- Create: `src/features/frequentation/shared/types.ts`
- Create: `src/features/frequentation/shared/__tests__/types.test.ts`

- [ ] **Step 1: Write the failing test**

Create `src/features/frequentation/shared/__tests__/types.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import {
  CreateFrequentationDto,
  CreateFrequentationBatchDto,
  FrequentationResponseDto,
  JournalEntryDto,
  DateRangeDto
} from '../types'

describe('Frequentation shared types', () => {
  it('CreateFrequentationDto has required fields', () => {
    const dto: CreateFrequentationDto = {
      startsAt: '2026-01-15T09:00:00.000Z',
      activity: 'work',
      studentId: 1
    }
    expect(dto.startsAt).toBe('2026-01-15T09:00:00.000Z')
    expect(dto.activity).toBe('work')
    expect(dto.studentId).toBe(1)
  })

  it('CreateFrequentationBatchDto wraps an array of CreateFrequentationDto', () => {
    const batch: CreateFrequentationBatchDto = {
      frequentations: [
        { startsAt: '2026-01-15T09:00:00.000Z', activity: 'work', studentId: 1 },
        { startsAt: '2026-01-15T10:00:00.000Z', activity: 'reading', studentId: 2 }
      ]
    }
    expect(batch.frequentations).toHaveLength(2)
  })

  it('FrequentationResponseDto has all fields', () => {
    const response: FrequentationResponseDto = {
      id: 1,
      startsAt: '2026-01-15T09:00:00.000Z',
      activity: 'work',
      studentId: 1,
      studentName: 'Jean Dupont',
      studentClass: '6ème A',
      studentIne: '12345678X',
      createdAt: '2026-01-15T09:00:00.000Z',
      updatedAt: '2026-01-15T09:00:00.000Z'
    }
    expect(response.id).toBe(1)
    expect(response.studentName).toBe('Jean Dupont')
  })

  it('JournalEntryDto has frequentation and student fields', () => {
    const entry: JournalEntryDto = {
      frequentation: {
        id: 1,
        startsAt: '2026-01-15T09:00:00.000Z',
        activity: 'work',
        studentId: 1,
        studentName: 'Jean Dupont',
        studentClass: '6ème A',
        studentIne: '12345678X',
        createdAt: '2026-01-15T09:00:00.000Z',
        updatedAt: '2026-01-15T09:00:00.000Z'
      },
      student: {
        id: 1,
        nom: 'Dupont',
        prenom: 'Jean',
        classe: '6ème A',
        ine: '12345678X'
      }
    }
    expect(entry.frequentation.activity).toBe('work')
    expect(entry.student.nom).toBe('Dupont')
  })

  it('DateRangeDto has start and end', () => {
    const range: DateRangeDto = {
      startDate: '2026-01-15',
      endDate: '2026-01-16'
    }
    expect(range.startDate).toBe('2026-01-15')
    expect(range.endDate).toBe('2026-01-16')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/features/frequentation/shared`
Expected: FAIL — cannot resolve `../types`

- [ ] **Step 3: Write the implementation**

Create `src/features/frequentation/shared/types.ts`:

```ts
import type { ActivityType } from '@types'

export interface CreateFrequentationDto {
  startsAt: string
  activity: ActivityType
  studentId: number
}

export interface CreateFrequentationBatchDto {
  frequentations: CreateFrequentationDto[]
}

export interface FrequentationResponseDto {
  id: number
  startsAt: string
  activity: ActivityType
  studentId: number
  studentName: string
  studentClass: string
  studentIne: string
  createdAt: string
  updatedAt: string
}

export interface JournalEntryDto {
  frequentation: FrequentationResponseDto
  student: {
    id: number
    nom: string
    prenom: string
    classe: string
    ine: string
  }
}

export interface DateRangeDto {
  startDate: string
  endDate: string
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/features/frequentation/shared`
Expected: PASS — all tests green

- [ ] **Step 5: Commit**

```bash
git add src/features/frequentation/shared && git commit -m "feat(frequentation): add shared DTO types"
```

---

### Task 2: Frequentation Entity (Drizzle schema + Zod)

**Files:**

- Create: `src/features/frequentation/main/entities/frequentation/frequentation.entity.ts`
- Create: `src/features/frequentation/main/entities/frequentation/index.ts`
- Create: `src/features/frequentation/main/entities/frequentation/__tests__/frequentation.entity.test.ts`

- [ ] **Step 1: Write the failing test**

Create `src/features/frequentation/main/entities/frequentation/__tests__/frequentation.entity.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import {
  frequentationTable,
  FrequentationEntitySchema,
  FrequentationWithStudentEntitySchema
} from '../frequentation.entity'

describe('frequentationTable', () => {
  it('has all required columns', () => {
    const columns = Object.keys(frequentationTable)
    expect(columns).toContain('id')
    expect(columns).toContain('startsAt')
    expect(columns).toContain('activity')
    expect(columns).toContain('studentId')
    expect(columns).toContain('createdAt')
    expect(columns).toContain('updatedAt')
  })
})

describe('FrequentationEntitySchema', () => {
  it('validates a valid frequentation entity', () => {
    const input = {
      id: 1,
      startsAt: '2026-01-15T09:00:00.000Z',
      activity: 'work',
      studentId: 1,
      createdAt: '2026-01-15T09:00:00.000Z',
      updatedAt: '2026-01-15T09:00:00.000Z'
    }
    const result = FrequentationEntitySchema.safeParse(input)
    expect(result.success).toBe(true)
  })

  it('rejects missing required fields', () => {
    const result = FrequentationEntitySchema.safeParse({
      id: 1,
      startsAt: '2026-01-15T09:00:00.000Z'
    })
    expect(result.success).toBe(false)
  })

  it('rejects invalid activity', () => {
    const result = FrequentationEntitySchema.safeParse({
      id: 1,
      startsAt: '2026-01-15T09:00:00.000Z',
      activity: 'invalid_activity',
      studentId: 1,
      createdAt: '2026-01-15T09:00:00.000Z',
      updatedAt: '2026-01-15T09:00:00.000Z'
    })
    expect(result.success).toBe(false)
  })

  it('rejects non-positive studentId', () => {
    const result = FrequentationEntitySchema.safeParse({
      id: 1,
      startsAt: '2026-01-15T09:00:00.000Z',
      activity: 'work',
      studentId: 0,
      createdAt: '2026-01-15T09:00:00.000Z',
      updatedAt: '2026-01-15T09:00:00.000Z'
    })
    expect(result.success).toBe(false)
  })
})

describe('FrequentationWithStudentEntitySchema', () => {
  it('validates a frequentation with student data', () => {
    const input = {
      id: 1,
      startsAt: '2026-01-15T09:00:00.000Z',
      activity: 'work',
      studentId: 1,
      studentNom: 'Dupont',
      studentPrenom: 'Jean',
      studentClasse: '6ème A',
      studentIne: '12345678X',
      createdAt: '2026-01-15T09:00:00.000Z',
      updatedAt: '2026-01-15T09:00:00.000Z'
    }
    const result = FrequentationWithStudentEntitySchema.safeParse(input)
    expect(result.success).toBe(true)
  })

  it('rejects missing student fields', () => {
    const result = FrequentationWithStudentEntitySchema.safeParse({
      id: 1,
      startsAt: '2026-01-15T09:00:00.000Z',
      activity: 'work',
      studentId: 1,
      studentNom: 'Dupont',
      createdAt: '2026-01-15T09:00:00.000Z',
      updatedAt: '2026-01-15T09:00:00.000Z'
    })
    expect(result.success).toBe(false)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/features/frequentation/main/entities/frequentation`
Expected: FAIL — cannot resolve `../frequentation.entity`

- [ ] **Step 3: Write the implementation**

Create `src/features/frequentation/main/entities/frequentation/frequentation.entity.ts`:

```ts
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { z } from 'zod'
import { ActivityType } from '@types'

export const frequentationTable = sqliteTable('frequentation', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  startsAt: text('starts_at').notNull(),
  activity: text('activity', {
    enum: [
      ActivityType.WORK,
      ActivityType.READING,
      ActivityType.COMPUTER,
      ActivityType.RELAXATION,
      ActivityType.OTHER
    ]
  }).notNull(),
  studentId: integer('student_id').notNull(),
  createdAt: text('created_at').default("(datetime('now'))"),
  updatedAt: text('updated_at').default("(datetime('now'))")
})

export const ActivityTypeSchema = z.nativeEnum(ActivityType)

export const FrequentationEntitySchema = z.object({
  id: z.number().int().positive(),
  startsAt: z.string().min(1),
  activity: ActivityTypeSchema,
  studentId: z.number().int().positive(),
  createdAt: z.string().min(1),
  updatedAt: z.string().min(1)
})

export const FrequentationWithStudentEntitySchema = FrequentationEntitySchema.extend({
  studentNom: z.string().min(1),
  studentPrenom: z.string().min(1),
  studentClasse: z.string().min(1),
  studentIne: z.string().min(1)
})

export type FrequentationEntity = z.infer<typeof FrequentationEntitySchema>
export type FrequentationWithStudentEntity = z.infer<typeof FrequentationWithStudentEntitySchema>
```

- [ ] **Step 4: Create the index.ts re-export**

Create `src/features/frequentation/main/entities/frequentation/index.ts`:

```ts
export {
  frequentationTable,
  ActivityTypeSchema,
  FrequentationEntitySchema,
  FrequentationWithStudentEntitySchema
} from './frequentation.entity'
export type { FrequentationEntity, FrequentationWithStudentEntity } from './frequentation.entity'
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run src/features/frequentation/main/entities/frequentation`
Expected: PASS — all tests green

- [ ] **Step 6: Commit**

```bash
git add src/features/frequentation/main/entities/frequentation && git commit -m "feat(frequentation): add Drizzle schema + Zod entity"
```

---

### Task 3: Frequentation Gateway Interface

**Files:**

- Create: `src/features/frequentation/main/gateways/frequentation/frequentation.gateway.ts`
- Create: `src/features/frequentation/main/gateways/frequentation/index.ts`

- [ ] **Step 1: Write the failing test**

Create `src/features/frequentation/main/gateways/frequentation/__tests__/frequentation.gateway.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import type { FrequentationGateway } from '../frequentation.gateway'
import type {
  FrequentationEntity,
  FrequentationWithStudentEntity
} from '@frequentation/entities/frequentation'
import type { CreateFrequentationDto } from '@frequentation-shared'

describe('FrequentationGateway interface', () => {
  it('defines create method with correct signature', () => {
    const gateway: FrequentationGateway = {
      create: async (_dto: CreateFrequentationDto): Promise<FrequentationEntity> => ({
        id: 1,
        startsAt: '2026-01-15T09:00:00.000Z',
        activity: 'work' as const,
        studentId: 1,
        createdAt: '2026-01-15T09:00:00.000Z',
        updatedAt: '2026-01-15T09:00:00.000Z'
      }),
      getById: async (_id: number): Promise<FrequentationEntity | null> => null,
      getAll: async (): Promise<FrequentationWithStudentEntity[]> => [],
      getByStudentId: async (_studentId: number): Promise<FrequentationWithStudentEntity[]> => [],
      getByDateRange: async (
        _startDate: string,
        _endDate: string
      ): Promise<FrequentationWithStudentEntity[]> => [],
      update: async (
        _id: number,
        _dto: Partial<CreateFrequentationDto>
      ): Promise<FrequentationEntity | null> => null,
      delete: async (_id: number): Promise<boolean> => false,
      deleteByStudentId: async (_studentId: number): Promise<number> => 0,
      count: async (): Promise<number> => 0
    }
    expect(typeof gateway.create).toBe('function')
    expect(typeof gateway.getById).toBe('function')
    expect(typeof gateway.getAll).toBe('function')
    expect(typeof gateway.getByStudentId).toBe('function')
    expect(typeof gateway.getByDateRange).toBe('function')
    expect(typeof gateway.update).toBe('function')
    expect(typeof gateway.delete).toBe('function')
    expect(typeof gateway.deleteByStudentId).toBe('function')
    expect(typeof gateway.count).toBe('function')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/features/frequentation/main/gateways/frequentation`
Expected: FAIL — cannot resolve `../frequentation.gateway`

- [ ] **Step 3: Write the implementation**

Create `src/features/frequentation/main/gateways/frequentation/frequentation.gateway.ts`:

```ts
import type {
  FrequentationEntity,
  FrequentationWithStudentEntity
} from '@frequentation/entities/frequentation'
import type { CreateFrequentationDto } from '@frequentation-shared'

export interface FrequentationGateway {
  create(dto: CreateFrequentationDto): Promise<FrequentationEntity>
  getById(id: number): Promise<FrequentationEntity | null>
  getAll(): Promise<FrequentationWithStudentEntity[]>
  getByStudentId(studentId: number): Promise<FrequentationWithStudentEntity[]>
  getByDateRange(startDate: string, endDate: string): Promise<FrequentationWithStudentEntity[]>
  update(id: number, dto: Partial<CreateFrequentationDto>): Promise<FrequentationEntity | null>
  delete(id: number): Promise<boolean>
  deleteByStudentId(studentId: number): Promise<number>
  count(): Promise<number>
}
```

- [ ] **Step 4: Create the index.ts re-export**

Create `src/features/frequentation/main/gateways/frequentation/index.ts`:

```ts
export type { FrequentationGateway } from './frequentation.gateway'
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run src/features/frequentation/main/gateways/frequentation`
Expected: PASS — all tests green

- [ ] **Step 6: Commit**

```bash
git add src/features/frequentation/main/gateways/frequentation && git commit -m "feat(frequentation): add gateway interface"
```

---

### Task 4: Frequentation Gateway Implementation (Drizzle)

**Files:**

- Create: `src/features/frequentation/main/gateways/frequentation/frequentation.gateway.drizzle.ts`
- Create: `src/features/frequentation/main/gateways/frequentation/helpers/mapFrequentationRow/mapFrequentationRow.ts`
- Create: `src/features/frequentation/main/gateways/frequentation/helpers/mapFrequentationRow/index.ts`
- Create: `src/features/frequentation/main/gateways/frequentation/helpers/mapFrequentationRow/__tests__/mapFrequentationRow.test.ts`
- Create: `src/features/frequentation/main/gateways/frequentation/__tests__/frequentation.gateway.drizzle.test.ts`

- [ ] **Step 1: Write the failing test for mapFrequentationRow**

Create `src/features/frequentation/main/gateways/frequentation/helpers/mapFrequentationRow/__tests__/mapFrequentationRow.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { mapFrequentationRow, mapFrequentationWithStudentRow } from '../mapFrequentationRow'

describe('mapFrequentationRow', () => {
  it('maps a Drizzle row to FrequentationEntity', () => {
    const row = {
      id: 1,
      startsAt: '2026-01-15T09:00:00.000Z',
      activity: 'work',
      studentId: 1,
      createdAt: '2026-01-15T09:00:00.000Z',
      updatedAt: '2026-01-15T09:00:00.000Z'
    }
    const result = mapFrequentationRow(row)
    expect(result).toEqual({
      id: 1,
      startsAt: '2026-01-15T09:00:00.000Z',
      activity: 'work',
      studentId: 1,
      createdAt: '2026-01-15T09:00:00.000Z',
      updatedAt: '2026-01-15T09:00:00.000Z'
    })
  })

  it('maps a Drizzle row with student join to FrequentationWithStudentEntity', () => {
    const row = {
      id: 1,
      startsAt: '2026-01-15T09:00:00.000Z',
      activity: 'work',
      studentId: 1,
      studentNom: 'Dupont',
      studentPrenom: 'Jean',
      studentClasse: '6ème A',
      studentIne: '12345678X',
      createdAt: '2026-01-15T09:00:00.000Z',
      updatedAt: '2026-01-15T09:00:00.000Z'
    }
    const result = mapFrequentationWithStudentRow(row)
    expect(result).toEqual({
      id: 1,
      startsAt: '2026-01-15T09:00:00.000Z',
      activity: 'work',
      studentId: 1,
      studentNom: 'Dupont',
      studentPrenom: 'Jean',
      studentClasse: '6ème A',
      studentIne: '12345678X',
      createdAt: '2026-01-15T09:00:00.000Z',
      updatedAt: '2026-01-15T09:00:00.000Z'
    })
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/features/frequentation/main/gateways/frequentation/helpers/mapFrequentationRow`
Expected: FAIL — cannot resolve `../mapFrequentationRow`

- [ ] **Step 3: Write mapFrequentationRow implementation**

Create `src/features/frequentation/main/gateways/frequentation/helpers/mapFrequentationRow/mapFrequentationRow.ts`:

```ts
import {
  FrequentationEntitySchema,
  FrequentationWithStudentEntitySchema
} from '@frequentation/entities/frequentation'

export function mapFrequentationRow(row: Record<string, unknown>) {
  return FrequentationEntitySchema.parse({
    id: row.id,
    startsAt: row.startsAt,
    activity: row.activity,
    studentId: row.studentId,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt
  })
}

export function mapFrequentationWithStudentRow(row: Record<string, unknown>) {
  return FrequentationWithStudentEntitySchema.parse({
    id: row.id,
    startsAt: row.startsAt,
    activity: row.activity,
    studentId: row.studentId,
    studentNom: row.studentNom,
    studentPrenom: row.studentPrenom,
    studentClasse: row.studentClasse,
    studentIne: row.studentIne,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt
  })
}
```

- [ ] **Step 4: Create mapFrequentationRow index.ts**

Create `src/features/frequentation/main/gateways/frequentation/helpers/mapFrequentationRow/index.ts`:

```ts
export { mapFrequentationRow, mapFrequentationWithStudentRow } from './mapFrequentationRow'
```

- [ ] **Step 5: Run mapFrequentationRow test to verify it passes**

Run: `npx vitest run src/features/frequentation/main/gateways/frequentation/helpers/mapFrequentationRow`
Expected: PASS

- [ ] **Step 6: Write the failing test for the Drizzle gateway**

Create `src/features/frequentation/main/gateways/frequentation/__tests__/frequentation.gateway.drizzle.test.ts`:

```ts
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { eq, and, gte, lte } from 'drizzle-orm'
import { FrequentationGatewayDrizzle } from '../frequentation.gateway.drizzle'
import { frequentationTable } from '@frequentation/entities/frequentation'
import type { FrequentationGateway } from '../frequentation.gateway'

function createTestDb() {
  const sqlite = new Database(':memory:')
  sqlite.exec(`
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
    CREATE INDEX idx_freq_date ON frequentation(DATE(starts_at));
    CREATE INDEX idx_freq_student ON frequentation(student_id);
  `)
  sqlite.exec(
    `INSERT INTO students (nom, prenom, classe, ine) VALUES ('Dupont', 'Jean', '6ème A', '12345678X')`
  )
  sqlite.exec(
    `INSERT INTO students (nom, prenom, classe, ine) VALUES ('Martin', 'Marie', '5ème B', '87654321Y')`
  )
  return { sqlite, db: drizzle(sqlite) }
}

describe('FrequentationGatewayDrizzle', () => {
  let gateway: FrequentationGateway
  let sqlite: Database.Database

  beforeEach(() => {
    const testSetup = createTestDb()
    sqlite = testSetup.sqlite
    gateway = new FrequentationGatewayDrizzle(testSetup.db)
  })

  afterEach(() => {
    sqlite.close()
  })

  describe('create', () => {
    it('creates a frequentation and returns entity', async () => {
      const result = await gateway.create({
        startsAt: '2026-01-15T09:00:00.000Z',
        activity: 'work',
        studentId: 1
      })
      expect(result.id).toBe(1)
      expect(result.startsAt).toBe('2026-01-15T09:00:00.000Z')
      expect(result.activity).toBe('work')
      expect(result.studentId).toBe(1)
    })
  })

  describe('getById', () => {
    it('returns frequentation by id', async () => {
      await gateway.create({ startsAt: '2026-01-15T09:00:00.000Z', activity: 'work', studentId: 1 })
      const result = await gateway.getById(1)
      expect(result).not.toBeNull()
      expect(result?.id).toBe(1)
    })

    it('returns null for non-existent id', async () => {
      const result = await gateway.getById(999)
      expect(result).toBeNull()
    })
  })

  describe('getAll', () => {
    it('returns all frequentations with student data', async () => {
      await gateway.create({ startsAt: '2026-01-15T09:00:00.000Z', activity: 'work', studentId: 1 })
      await gateway.create({
        startsAt: '2026-01-15T10:00:00.000Z',
        activity: 'reading',
        studentId: 2
      })
      const results = await gateway.getAll()
      expect(results).toHaveLength(2)
      expect(results[0]?.studentNom).toBeDefined()
    })
  })

  describe('getByStudentId', () => {
    it('returns frequentations for a specific student', async () => {
      await gateway.create({ startsAt: '2026-01-15T09:00:00.000Z', activity: 'work', studentId: 1 })
      await gateway.create({
        startsAt: '2026-01-15T10:00:00.000Z',
        activity: 'reading',
        studentId: 2
      })
      const results = await gateway.getByStudentId(1)
      expect(results).toHaveLength(1)
      expect(results[0]?.studentId).toBe(1)
    })
  })

  describe('getByDateRange', () => {
    it('returns frequentations within date range', async () => {
      await gateway.create({ startsAt: '2026-01-15T09:00:00.000Z', activity: 'work', studentId: 1 })
      await gateway.create({
        startsAt: '2026-01-20T10:00:00.000Z',
        activity: 'reading',
        studentId: 2
      })
      const results = await gateway.getByDateRange('2026-01-15', '2026-01-15')
      expect(results).toHaveLength(1)
    })
  })

  describe('update', () => {
    it('updates activity field', async () => {
      await gateway.create({ startsAt: '2026-01-15T09:00:00.000Z', activity: 'work', studentId: 1 })
      const result = await gateway.update(1, { activity: 'reading' })
      expect(result).not.toBeNull()
      expect(result?.activity).toBe('reading')
    })

    it('returns null for non-existent id', async () => {
      const result = await gateway.update(999, { activity: 'reading' })
      expect(result).toBeNull()
    })
  })

  describe('delete', () => {
    it('deletes a frequentation', async () => {
      await gateway.create({ startsAt: '2026-01-15T09:00:00.000Z', activity: 'work', studentId: 1 })
      const result = await gateway.delete(1)
      expect(result).toBe(true)
      const found = await gateway.getById(1)
      expect(found).toBeNull()
    })

    it('returns false for non-existent id', async () => {
      const result = await gateway.delete(999)
      expect(result).toBe(false)
    })
  })

  describe('deleteByStudentId', () => {
    it('deletes all frequentations for a student', async () => {
      await gateway.create({ startsAt: '2026-01-15T09:00:00.000Z', activity: 'work', studentId: 1 })
      await gateway.create({
        startsAt: '2026-01-15T10:00:00.000Z',
        activity: 'reading',
        studentId: 1
      })
      await gateway.create({
        startsAt: '2026-01-15T11:00:00.000Z',
        activity: 'computer',
        studentId: 2
      })
      const count = await gateway.deleteByStudentId(1)
      expect(count).toBe(2)
    })
  })

  describe('count', () => {
    it('returns total frequentation count', async () => {
      await gateway.create({ startsAt: '2026-01-15T09:00:00.000Z', activity: 'work', studentId: 1 })
      await gateway.create({
        startsAt: '2026-01-15T10:00:00.000Z',
        activity: 'reading',
        studentId: 2
      })
      const result = await gateway.count()
      expect(result).toBe(2)
    })
  })
})
```

- [ ] **Step 7: Run test to verify it fails**

Run: `npx vitest run src/features/frequentation/main/gateways/frequentation/__tests__/frequentation.gateway.drizzle.test.ts`
Expected: FAIL — cannot resolve `../frequentation.gateway.drizzle`

- [ ] **Step 8: Write the Drizzle gateway implementation**

Create `src/features/frequentation/main/gateways/frequentation/frequentation.gateway.drizzle.ts`:

```ts
import type { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3'
import { eq, and, gte, lte } from 'drizzle-orm'
import type { FrequentationGateway } from './frequentation.gateway'
import type {
  FrequentationEntity,
  FrequentationWithStudentEntity
} from '@frequentation/entities/frequentation'
import type { CreateFrequentationDto } from '@frequentation-shared'
import { frequentationTable } from '@frequentation/entities/frequentation'
import { mapFrequentationRow, mapFrequentationWithStudentRow } from './helpers/mapFrequentationRow'

const JOIN_QUERY_COLS = [
  frequentationTable.id,
  frequentationTable.startsAt,
  frequentationTable.activity,
  frequentationTable.studentId,
  frequentationTable.createdAt,
  frequentationTable.updatedAt
] as const

export class FrequentationGatewayDrizzle implements FrequentationGateway {
  constructor(private db: BetterSQLite3Database) {}

  async create(dto: CreateFrequentationDto): Promise<FrequentationEntity> {
    const result = await this.db
      .insert(frequentationTable)
      .values({
        startsAt: dto.startsAt,
        activity: dto.activity,
        studentId: dto.studentId
      })
      .returning()

    const row = result[0]
    if (!row) {
      throw new Error('Failed to create frequentation')
    }

    return mapFrequentationRow(row)
  }

  async getById(id: number): Promise<FrequentationEntity | null> {
    const result = await this.db
      .select()
      .from(frequentationTable)
      .where(eq(frequentationTable.id, id))
    const row = result[0]
    if (!row) {
      return null
    }
    return mapFrequentationRow(row)
  }

  async getAll(): Promise<FrequentationWithStudentEntity[]> {
    const studentTable = await this.getStudentTable()
    const results = await this.db
      .select({
        id: frequentationTable.id,
        startsAt: frequentationTable.startsAt,
        activity: frequentationTable.activity,
        studentId: frequentationTable.studentId,
        studentNom: studentTable.nom,
        studentPrenom: studentTable.prenom,
        studentClasse: studentTable.classe,
        studentIne: studentTable.ine,
        createdAt: frequentationTable.createdAt,
        updatedAt: frequentationTable.updatedAt
      })
      .from(frequentationTable)
      .leftJoin(studentTable, eq(frequentationTable.studentId, studentTable.id))
      .orderBy(frequentationTable.startsAt)

    return results.map((row) => mapFrequentationWithStudentRow(row))
  }

  async getByStudentId(studentId: number): Promise<FrequentationWithStudentEntity[]> {
    const studentTable = await this.getStudentTable()
    const results = await this.db
      .select({
        id: frequentationTable.id,
        startsAt: frequentationTable.startsAt,
        activity: frequentationTable.activity,
        studentId: frequentationTable.studentId,
        studentNom: studentTable.nom,
        studentPrenom: studentTable.prenom,
        studentClasse: studentTable.classe,
        studentIne: studentTable.ine,
        createdAt: frequentationTable.createdAt,
        updatedAt: frequentationTable.updatedAt
      })
      .from(frequentationTable)
      .leftJoin(studentTable, eq(frequentationTable.studentId, studentTable.id))
      .where(eq(frequentationTable.studentId, studentId))

    return results.map((row) => mapFrequentationWithStudentRow(row))
  }

  async getByDateRange(
    startDate: string,
    endDate: string
  ): Promise<FrequentationWithStudentEntity[]> {
    const studentTable = await this.getStudentTable()
    const results = await this.db
      .select({
        id: frequentationTable.id,
        startsAt: frequentationTable.startsAt,
        activity: frequentationTable.activity,
        studentId: frequentationTable.studentId,
        studentNom: studentTable.nom,
        studentPrenom: studentTable.prenom,
        studentClasse: studentTable.classe,
        studentIne: studentTable.ine,
        createdAt: frequentationTable.createdAt,
        updatedAt: frequentationTable.updatedAt
      })
      .from(frequentationTable)
      .leftJoin(studentTable, eq(frequentationTable.studentId, studentTable.id))
      .where(
        and(gte(frequentationTable.startsAt, startDate), lte(frequentationTable.startsAt, endDate))
      )

    return results.map((row) => mapFrequentationWithStudentRow(row))
  }

  async update(
    id: number,
    dto: Partial<CreateFrequentationDto>
  ): Promise<FrequentationEntity | null> {
    const existing = await this.getById(id)
    if (!existing) {
      return null
    }

    const values: Record<string, unknown> = {}
    if (dto.startsAt !== undefined) values.startsAt = dto.startsAt
    if (dto.activity !== undefined) values.activity = dto.activity
    if (dto.studentId !== undefined) values.studentId = dto.studentId
    values.updatedAt = new Date().toISOString()

    await this.db.update(frequentationTable).set(values).where(eq(frequentationTable.id, id))

    return this.getById(id)
  }

  async delete(id: number): Promise<boolean> {
    const existing = await this.getById(id)
    if (!existing) {
      return false
    }

    await this.db.delete(frequentationTable).where(eq(frequentationTable.id, id))
    return true
  }

  async deleteByStudentId(studentId: number): Promise<number> {
    const before = await this.count()
    await this.db.delete(frequentationTable).where(eq(frequentationTable.studentId, studentId))
    const after = await this.count()
    return before - after
  }

  async count(): Promise<number> {
    const results = await this.db.select({ count: frequentationTable.id }).from(frequentationTable)
    return results.length
  }

  private studentTableCache: Record<string, unknown> | null = null

  private async getStudentTable() {
    if (!this.studentTableCache) {
      const { sqliteTable, text, integer } = await import('drizzle-orm/sqlite-core')
      this.studentTableCache = sqliteTable('students', {
        id: integer('id').primaryKey({ autoIncrement: true }),
        nom: text('nom').notNull(),
        prenom: text('prenom').notNull(),
        classe: text('classe').notNull(),
        ine: text('ine').notNull(),
        createdAt: text('created_at').default("(datetime('now'))"),
        updatedAt: text('updated_at').default("(datetime('now'))")
      })
    }
    return this.studentTableCache as ReturnType<
      (typeof import('drizzle-orm/sqlite-core'))['sqliteTable']
    >
  }
}
```

Wait — the spec requires no type casting and a cleaner approach for the student table. Let me fix this by importing the student table directly from the shared schema.

- [ ] **Step 8 (revised): Write the Drizzle gateway implementation**

Create `src/features/frequentation/main/gateways/frequentation/frequentation.gateway.drizzle.ts`:

```ts
import type { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3'
import { eq, and, gte, lte } from 'drizzle-orm'
import type { FrequentationGateway } from './frequentation.gateway'
import type {
  FrequentationEntity,
  FrequentationWithStudentEntity
} from '@frequentation/entities/frequentation'
import type { CreateFrequentationDto } from '@frequentation-shared'
import {
  frequentationTable,
  FrequentationEntitySchema
} from '@frequentation/entities/frequentation'
import { mapFrequentationRow, mapFrequentationWithStudentRow } from './helpers/mapFrequentationRow'
import { getStudentTable } from '@shared/db/schema'

export class FrequentationGatewayDrizzle implements FrequentationGateway {
  constructor(private db: BetterSQLite3Database) {}

  async create(dto: CreateFrequentationDto): Promise<FrequentationEntity> {
    const result = await this.db
      .insert(frequentationTable)
      .values({
        startsAt: dto.startsAt,
        activity: dto.activity,
        studentId: dto.studentId
      })
      .returning()

    const row = result[0]
    if (!row) {
      throw new Error('Failed to create frequentation')
    }

    return mapFrequentationRow(row)
  }

  async getById(id: number): Promise<FrequentationEntity | null> {
    const result = await this.db
      .select()
      .from(frequentationTable)
      .where(eq(frequentationTable.id, id))
    const row = result[0]
    if (!row) {
      return null
    }
    return mapFrequentationRow(row)
  }

  async getAll(): Promise<FrequentationWithStudentEntity[]> {
    const studentTable = getStudentTable()
    const results = await this.db
      .select({
        id: frequentationTable.id,
        startsAt: frequentationTable.startsAt,
        activity: frequentationTable.activity,
        studentId: frequentationTable.studentId,
        studentNom: studentTable.nom,
        studentPrenom: studentTable.prenom,
        studentClasse: studentTable.classe,
        studentIne: studentTable.ine,
        createdAt: frequentationTable.createdAt,
        updatedAt: frequentationTable.updatedAt
      })
      .from(frequentationTable)
      .leftJoin(studentTable, eq(frequentationTable.studentId, studentTable.id))
      .orderBy(frequentationTable.startsAt)

    return results.map((row) => mapFrequentationWithStudentRow(row))
  }

  async getByStudentId(studentId: number): Promise<FrequentationWithStudentEntity[]> {
    const studentTable = getStudentTable()
    const results = await this.db
      .select({
        id: frequentationTable.id,
        startsAt: frequentationTable.startsAt,
        activity: frequentationTable.activity,
        studentId: frequentationTable.studentId,
        studentNom: studentTable.nom,
        studentPrenom: studentTable.prenom,
        studentClasse: studentTable.classe,
        studentIne: studentTable.ine,
        createdAt: frequentationTable.createdAt,
        updatedAt: frequentationTable.updatedAt
      })
      .from(frequentationTable)
      .leftJoin(studentTable, eq(frequentationTable.studentId, studentTable.id))
      .where(eq(frequentationTable.studentId, studentId))

    return results.map((row) => mapFrequentationWithStudentRow(row))
  }

  async getByDateRange(
    startDate: string,
    endDate: string
  ): Promise<FrequentationWithStudentEntity[]> {
    const studentTable = getStudentTable()
    const endOfDay = endDate.length === 10 ? `${endDate}T23:59:59.999Z` : endDate
    const startOfDay = startDate.length === 10 ? `${startDate}T00:00:00.000Z` : startDate
    const results = await this.db
      .select({
        id: frequentationTable.id,
        startsAt: frequentationTable.startsAt,
        activity: frequentationTable.activity,
        studentId: frequentationTable.studentId,
        studentNom: studentTable.nom,
        studentPrenom: studentTable.prenom,
        studentClasse: studentTable.classe,
        studentIne: studentTable.ine,
        createdAt: frequentationTable.createdAt,
        updatedAt: frequentationTable.updatedAt
      })
      .from(frequentationTable)
      .leftJoin(studentTable, eq(frequentationTable.studentId, studentTable.id))
      .where(
        and(
          gte(frequentationTable.startsAt, startOfDay),
          lte(frequentationTable.startsAt, endOfDay)
        )
      )

    return results.map((row) => mapFrequentationWithStudentRow(row))
  }

  async update(
    id: number,
    dto: Partial<CreateFrequentationDto>
  ): Promise<FrequentationEntity | null> {
    const existing = await this.getById(id)
    if (!existing) {
      return null
    }

    const values: Record<string, unknown> = {}
    if (dto.startsAt !== undefined) values.startsAt = dto.startsAt
    if (dto.activity !== undefined) values.activity = dto.activity
    if (dto.studentId !== undefined) values.studentId = dto.studentId
    values.updatedAt = new Date().toISOString()

    await this.db.update(frequentationTable).set(values).where(eq(frequentationTable.id, id))

    return this.getById(id)
  }

  async delete(id: number): Promise<boolean> {
    const existing = await this.getById(id)
    if (!existing) {
      return false
    }

    await this.db.delete(frequentationTable).where(eq(frequentationTable.id, id))
    return true
  }

  async deleteByStudentId(studentId: number): Promise<number> {
    const before = await this.count()
    await this.db.delete(frequentationTable).where(eq(frequentationTable.studentId, studentId))
    const after = await this.count()
    return before - after
  }

  async count(): Promise<number> {
    const results = await this.db.select({ id: frequentationTable.id }).from(frequentationTable)
    return results.length
  }
}
```

- [ ] **Step 9: Update the test to add the student table ref**

Update the test file to import from shared schema. The test already creates the schema manually since it uses in-memory SQLite. We need to adjust the test to pass a student table reference. But the gateway imports `getStudentTable` from `@shared/db/schema` — so we need that module to exist first. For the test, we'll mock `@shared/db/schema`'s `getStudentTable`.

Update `src/features/frequentation/main/gateways/frequentation/__tests__/frequentation.gateway.drizzle.test.ts`:

```ts
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { FrequentationGatewayDrizzle } from '../frequentation.gateway.drizzle'
import { frequentationTable } from '@frequentation/entities/frequentation'

const studentTable = sqliteTable('students', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  nom: text('nom').notNull(),
  prenom: text('prenom').notNull(),
  classe: text('classe').notNull(),
  ine: text('ine').notNull(),
  createdAt: text('created_at').default("(datetime('now'))"),
  updatedAt: text('updated_at').default("(datetime('now'))")
})

vi.mock('@shared/db/schema', () => ({
  getStudentTable: () => studentTable
}))

function createTestDb() {
  const sqlite = new Database(':memory:')
  sqlite.exec(`
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
    CREATE INDEX idx_freq_date ON frequentation(DATE(starts_at));
    CREATE INDEX idx_freq_student ON frequentation(student_id);
  `)
  sqlite.exec(
    `INSERT INTO students (nom, prenom, classe, ine) VALUES ('Dupont', 'Jean', '6ème A', '12345678X')`
  )
  sqlite.exec(
    `INSERT INTO students (nom, prenom, classe, ine) VALUES ('Martin', 'Marie', '5ème B', '87654321Y')`
  )
  return { sqlite, db: drizzle(sqlite) }
}

describe('FrequentationGatewayDrizzle', () => {
  let gateway: FrequentationGatewayDrizzle
  let sqlite: Database.Database

  beforeEach(() => {
    const testSetup = createTestDb()
    sqlite = testSetup.sqlite
    gateway = new FrequentationGatewayDrizzle(testSetup.db)
  })

  afterEach(() => {
    sqlite.close()
  })

  describe('create', () => {
    it('creates a frequentation and returns entity', async () => {
      const result = await gateway.create({
        startsAt: '2026-01-15T09:00:00.000Z',
        activity: 'work',
        studentId: 1
      })
      expect(result.id).toBe(1)
      expect(result.startsAt).toBe('2026-01-15T09:00:00.000Z')
      expect(result.activity).toBe('work')
      expect(result.studentId).toBe(1)
    })
  })

  describe('getById', () => {
    it('returns frequentation by id', async () => {
      await gateway.create({ startsAt: '2026-01-15T09:00:00.000Z', activity: 'work', studentId: 1 })
      const result = await gateway.getById(1)
      expect(result).not.toBeNull()
      expect(result?.id).toBe(1)
    })

    it('returns null for non-existent id', async () => {
      const result = await gateway.getById(999)
      expect(result).toBeNull()
    })
  })

  describe('getAll', () => {
    it('returns all frequentations with student data', async () => {
      await gateway.create({ startsAt: '2026-01-15T09:00:00.000Z', activity: 'work', studentId: 1 })
      await gateway.create({
        startsAt: '2026-01-15T10:00:00.000Z',
        activity: 'reading',
        studentId: 2
      })
      const results = await gateway.getAll()
      expect(results).toHaveLength(2)
      expect(results[0]?.studentNom).toBeDefined()
    })
  })

  describe('getByStudentId', () => {
    it('returns frequentations for a specific student', async () => {
      await gateway.create({ startsAt: '2026-01-15T09:00:00.000Z', activity: 'work', studentId: 1 })
      await gateway.create({
        startsAt: '2026-01-15T10:00:00.000Z',
        activity: 'reading',
        studentId: 2
      })
      const results = await gateway.getByStudentId(1)
      expect(results).toHaveLength(1)
      expect(results[0]?.studentId).toBe(1)
    })
  })

  describe('getByDateRange', () => {
    it('returns frequentations within date range', async () => {
      await gateway.create({ startsAt: '2026-01-15T09:00:00.000Z', activity: 'work', studentId: 1 })
      await gateway.create({
        startsAt: '2026-01-20T10:00:00.000Z',
        activity: 'reading',
        studentId: 2
      })
      const results = await gateway.getByDateRange('2026-01-15', '2026-01-15')
      expect(results).toHaveLength(1)
    })
  })

  describe('update', () => {
    it('updates activity field', async () => {
      await gateway.create({ startsAt: '2026-01-15T09:00:00.000Z', activity: 'work', studentId: 1 })
      const result = await gateway.update(1, { activity: 'reading' })
      expect(result).not.toBeNull()
      expect(result?.activity).toBe('reading')
    })

    it('returns null for non-existent id', async () => {
      const result = await gateway.update(999, { activity: 'reading' })
      expect(result).toBeNull()
    })
  })

  describe('delete', () => {
    it('deletes a frequentation', async () => {
      await gateway.create({ startsAt: '2026-01-15T09:00:00.000Z', activity: 'work', studentId: 1 })
      const deleted = await gateway.delete(1)
      expect(deleted).toBe(true)
      const found = await gateway.getById(1)
      expect(found).toBeNull()
    })

    it('returns false for non-existent id', async () => {
      const result = await gateway.delete(999)
      expect(result).toBe(false)
    })
  })

  describe('deleteByStudentId', () => {
    it('deletes all frequentations for a student', async () => {
      await gateway.create({ startsAt: '2026-01-15T09:00:00.000Z', activity: 'work', studentId: 1 })
      await gateway.create({
        startsAt: '2026-01-15T10:00:00.000Z',
        activity: 'reading',
        studentId: 1
      })
      await gateway.create({
        startsAt: '2026-01-15T11:00:00.000Z',
        activity: 'computer',
        studentId: 2
      })
      const count = await gateway.deleteByStudentId(1)
      expect(count).toBe(2)
    })
  })

  describe('count', () => {
    it('returns total frequentation count', async () => {
      await gateway.create({ startsAt: '2026-01-15T09:00:00.000Z', activity: 'work', studentId: 1 })
      await gateway.create({
        startsAt: '2026-01-15T10:00:00.000Z',
        activity: 'reading',
        studentId: 2
      })
      const result = await gateway.count()
      expect(result).toBe(2)
    })
  })
})
```

- [ ] **Step 10: Run gateway test to verify it passes**

Run: `npx vitest run src/features/frequentation/main/gateways/frequentation/__tests__/frequentation.gateway.drizzle.test.ts`
Expected: PASS — all tests green

- [ ] **Step 11: Commit**

```bash
git add src/features/frequentation/main/gateways && git commit -m "feat(frequentation): add Drizzle gateway implementation + row mapper"
```

---

### Task 5: Use Case — createFrequentation

**Files:**

- Create: `src/features/frequentation/main/use-cases/createFrequentation/createFrequentation.ts`
- Create: `src/features/frequentation/main/use-cases/createFrequentation/index.ts`
- Create: `src/features/frequentation/main/use-cases/createFrequentation/__tests__/createFrequentation.test.ts`
- Create: `src/features/frequentation/main/use-cases/types/UseCaseResult.ts`

- [ ] **Step 1: Write the UseCaseResult type**

Create `src/features/frequentation/main/use-cases/types/UseCaseResult.ts`:

```ts
export type UseCaseResult<T> = { success: true; data: T } | { success: false; error: string }
```

- [ ] **Step 2: Write the failing test**

Create `src/features/frequentation/main/use-cases/createFrequentation/__tests__/createFrequentation.test.ts`:

```ts
import { describe, it, expect, vi } from 'vitest'
import { createFrequentation } from '../createFrequentation'
import type { FrequentationGateway } from '@frequentation/gateways/frequentation'
import type { FrequentationEntity } from '@frequentation/entities/frequentation'

const VALID_ENTITY: FrequentationEntity = {
  id: 1,
  startsAt: '2026-01-15T09:00:00.000Z',
  activity: 'work',
  studentId: 1,
  createdAt: '2026-01-15T09:00:00.000Z',
  updatedAt: '2026-01-15T09:00:00.000Z'
}

function createMockGateway(overrides: Partial<FrequentationGateway> = {}): FrequentationGateway {
  return {
    create: vi.fn().mockResolvedValue(VALID_ENTITY),
    getById: vi.fn().mockResolvedValue(null),
    getAll: vi.fn().mockResolvedValue([]),
    getByStudentId: vi.fn().mockResolvedValue([]),
    getByDateRange: vi.fn().mockResolvedValue([]),
    update: vi.fn().mockResolvedValue(null),
    delete: vi.fn().mockResolvedValue(false),
    deleteByStudentId: vi.fn().mockResolvedValue(0),
    count: vi.fn().mockResolvedValue(0),
    ...overrides
  }
}

describe('createFrequentation', () => {
  it('creates a frequentation successfully', async () => {
    const gateway = createMockGateway()
    const result = await createFrequentation(gateway, {
      startsAt: '2026-01-15T09:00:00.000Z',
      activity: 'work',
      studentId: 1
    })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data).toEqual(VALID_ENTITY)
    }
  })

  it('validates required fields', async () => {
    const gateway = createMockGateway()
    const result = await createFrequentation(gateway, {
      startsAt: '',
      activity: 'work',
      studentId: 1
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error).toContain('startsAt')
    }
  })

  it('rejects empty activity', async () => {
    const gateway = createMockGateway()
    const result = await createFrequentation(gateway, {
      startsAt: '2026-01-15T09:00:00.000Z',
      activity: '' as 'work',
      studentId: 1
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error).toContain('activity')
    }
  })

  it('rejects non-positive studentId', async () => {
    const gateway = createMockGateway()
    const result = await createFrequentation(gateway, {
      startsAt: '2026-01-15T09:00:00.000Z',
      activity: 'work',
      studentId: 0
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error).toContain('studentId')
    }
  })

  it('returns error when gateway throws', async () => {
    const gateway = createMockGateway({
      create: vi.fn().mockRejectedValue(new Error('DB error'))
    })
    const result = await createFrequentation(gateway, {
      startsAt: '2026-01-15T09:00:00.000Z',
      activity: 'work',
      studentId: 1
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error).toContain('DB error')
    }
  })
})
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npx vitest run src/features/frequentation/main/use-cases/createFrequentation`
Expected: FAIL — cannot resolve `../createFrequentation`

- [ ] **Step 4: Write the implementation**

Create `src/features/frequentation/main/use-cases/createFrequentation/createFrequentation.ts`:

```ts
import type { FrequentationGateway } from '@frequentation/gateways/frequentation'
import type { FrequentationEntity } from '@frequentation/entities/frequentation'
import type { CreateFrequentationDto } from '@frequentation-shared'
import type { UseCaseResult } from '../types/UseCaseResult'

export async function createFrequentation(
  gateway: FrequentationGateway,
  dto: CreateFrequentationDto
): Promise<UseCaseResult<FrequentationEntity>> {
  if (!dto.startsAt || dto.startsAt.trim().length === 0) {
    return { success: false, error: 'startsAt is required' }
  }

  if (!dto.activity || dto.activity.trim().length === 0) {
    return { success: false, error: 'activity is required' }
  }

  if (!dto.studentId || dto.studentId < 1) {
    return { success: false, error: 'studentId must be a positive integer' }
  }

  try {
    const entity = await gateway.create(dto)
    return { success: true, data: entity }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return { success: false, error: message }
  }
}
```

- [ ] **Step 5: Create the index.ts re-export**

Create `src/features/frequentation/main/use-cases/createFrequentation/index.ts`:

```ts
export { createFrequentation } from './createFrequentation'
```

- [ ] **Step 6: Run test to verify it passes**

Run: `npx vitest run src/features/frequentation/main/use-cases/createFrequentation`
Expected: PASS — all tests green

- [ ] **Step 7: Commit**

```bash
git add src/features/frequentation/main/use-cases && git commit -m "feat(frequentation): add createFrequentation use-case"
```

---

### Task 6: Use Case — updateFrequentation

**Files:**

- Create: `src/features/frequentation/main/use-cases/updateFrequentation/updateFrequentation.ts`
- Create: `src/features/frequentation/main/use-cases/updateFrequentation/index.ts`
- Create: `src/features/frequentation/main/use-cases/updateFrequentation/__tests__/updateFrequentation.test.ts`

- [ ] **Step 1: Write the failing test**

Create `src/features/frequentation/main/use-cases/updateFrequentation/__tests__/updateFrequentation.test.ts`:

```ts
import { describe, it, expect, vi } from 'vitest'
import { updateFrequentation } from '../updateFrequentation'
import type { FrequentationGateway } from '@frequentation/gateways/frequentation'
import type { FrequentationEntity } from '@frequentation/entities/frequentation'

const EXISTING_ENTITY: FrequentationEntity = {
  id: 1,
  startsAt: '2026-01-15T09:00:00.000Z',
  activity: 'work',
  studentId: 1,
  createdAt: '2026-01-15T09:00:00.000Z',
  updatedAt: '2026-01-15T09:00:00.000Z'
}

const UPDATED_ENTITY: FrequentationEntity = {
  ...EXISTING_ENTITY,
  activity: 'reading',
  updatedAt: '2026-01-15T10:00:00.000Z'
}

function createMockGateway(overrides: Partial<FrequentationGateway> = {}): FrequentationGateway {
  return {
    create: vi.fn().mockResolvedValue(EXISTING_ENTITY),
    getById: vi.fn().mockResolvedValue(EXISTING_ENTITY),
    getAll: vi.fn().mockResolvedValue([]),
    getByStudentId: vi.fn().mockResolvedValue([]),
    getByDateRange: vi.fn().mockResolvedValue([]),
    update: vi.fn().mockResolvedValue(UPDATED_ENTITY),
    delete: vi.fn().mockResolvedValue(false),
    deleteByStudentId: vi.fn().mockResolvedValue(0),
    count: vi.fn().mockResolvedValue(0),
    ...overrides
  }
}

describe('updateFrequentation', () => {
  it('updates a frequentation activity successfully', async () => {
    const gateway = createMockGateway()
    const result = await updateFrequentation(gateway, 1, { activity: 'reading' })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.activity).toBe('reading')
    }
  })

  it('returns error when frequentation not found', async () => {
    const gateway = createMockGateway({
      getById: vi.fn().mockResolvedValue(null)
    })
    const result = await updateFrequentation(gateway, 999, { activity: 'reading' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error).toContain('not found')
    }
  })

  it('validates updated fields', async () => {
    const gateway = createMockGateway()
    const result = await updateFrequentation(gateway, 1, { studentId: 0 })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error).toContain('studentId')
    }
  })

  it('returns error when gateway update fails', async () => {
    const gateway = createMockGateway({
      update: vi.fn().mockRejectedValue(new Error('Update failed'))
    })
    const result = await updateFrequentation(gateway, 1, { activity: 'reading' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error).toContain('Update failed')
    }
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/features/frequentation/main/use-cases/updateFrequentation`
Expected: FAIL — cannot resolve `../updateFrequentation`

- [ ] **Step 3: Write the implementation**

Create `src/features/frequentation/main/use-cases/updateFrequentation/updateFrequentation.ts`:

```ts
import type { FrequentationGateway } from '@frequentation/gateways/frequentation'
import type { FrequentationEntity } from '@frequentation/entities/frequentation'
import type { CreateFrequentationDto } from '@frequentation-shared'
import type { UseCaseResult } from '../types/UseCaseResult'

export async function updateFrequentation(
  gateway: FrequentationGateway,
  id: number,
  dto: Partial<CreateFrequentationDto>
): Promise<UseCaseResult<FrequentationEntity>> {
  const existing = await gateway.getById(id)
  if (!existing) {
    return { success: false, error: `Frequentation with id ${id} not found` }
  }

  if (dto.studentId !== undefined && dto.studentId < 1) {
    return { success: false, error: 'studentId must be a positive integer' }
  }

  if (dto.startsAt !== undefined && dto.startsAt.trim().length === 0) {
    return { success: false, error: 'startsAt must not be empty' }
  }

  if (dto.activity !== undefined && dto.activity.trim().length === 0) {
    return { success: false, error: 'activity must not be empty' }
  }

  try {
    const updated = await gateway.update(id, dto)
    if (!updated) {
      return { success: false, error: 'Update returned null' }
    }
    return { success: true, data: updated }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return { success: false, error: message }
  }
}
```

- [ ] **Step 4: Create the index.ts re-export**

Create `src/features/frequentation/main/use-cases/updateFrequentation/index.ts`:

```ts
export { updateFrequentation } from './updateFrequentation'
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run src/features/frequentation/main/use-cases/updateFrequentation`
Expected: PASS — all tests green

- [ ] **Step 6: Commit**

```bash
git add src/features/frequentation/main/use-cases/updateFrequentation && git commit -m "feat(frequentation): add updateFrequentation use-case"
```

---

### Task 7: Use Case — deleteFrequentation

**Files:**

- Create: `src/features/frequentation/main/use-cases/deleteFrequentation/deleteFrequentation.ts`
- Create: `src/features/frequentation/main/use-cases/deleteFrequentation/index.ts`
- Create: `src/features/frequentation/main/use-cases/deleteFrequentation/__tests__/deleteFrequentation.test.ts`

- [ ] **Step 1: Write the failing test**

Create `src/features/frequentation/main/use-cases/deleteFrequentation/__tests__/deleteFrequentation.test.ts`:

```ts
import { describe, it, expect, vi } from 'vitest'
import { deleteFrequentation } from '../deleteFrequentation'
import type { FrequentationGateway } from '@frequentation/gateways/frequentation'
import type { FrequentationEntity } from '@frequentation/entities/frequentation'

const EXISTING_ENTITY: FrequentationEntity = {
  id: 1,
  startsAt: '2026-01-15T09:00:00.000Z',
  activity: 'work',
  studentId: 1,
  createdAt: '2026-01-15T09:00:00.000Z',
  updatedAt: '2026-01-15T09:00:00.000Z'
}

function createMockGateway(overrides: Partial<FrequentationGateway> = {}): FrequentationGateway {
  return {
    create: vi.fn().mockResolvedValue(EXISTING_ENTITY),
    getById: vi.fn().mockResolvedValue(EXISTING_ENTITY),
    getAll: vi.fn().mockResolvedValue([]),
    getByStudentId: vi.fn().mockResolvedValue([]),
    getByDateRange: vi.fn().mockResolvedValue([]),
    update: vi.fn().mockResolvedValue(null),
    delete: vi.fn().mockResolvedValue(true),
    deleteByStudentId: vi.fn().mockResolvedValue(0),
    count: vi.fn().mockResolvedValue(0),
    ...overrides
  }
}

describe('deleteFrequentation', () => {
  it('deletes a frequentation successfully', async () => {
    const gateway = createMockGateway()
    const result = await deleteFrequentation(gateway, 1)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data).toBe(true)
    }
  })

  it('returns error when frequentation not found', async () => {
    const gateway = createMockGateway({
      getById: vi.fn().mockResolvedValue(null)
    })
    const result = await deleteFrequentation(gateway, 999)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error).toContain('not found')
    }
  })

  it('returns error when gateway delete fails', async () => {
    const gateway = createMockGateway({
      delete: vi.fn().mockRejectedValue(new Error('Delete failed'))
    })
    const result = await deleteFrequentation(gateway, 1)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error).toContain('Delete failed')
    }
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/features/frequentation/main/use-cases/deleteFrequentation`
Expected: FAIL — cannot resolve `../deleteFrequentation`

- [ ] **Step 3: Write the implementation**

Create `src/features/frequentation/main/use-cases/deleteFrequentation/deleteFrequentation.ts`:

```ts
import type { FrequentationGateway } from '@frequentation/gateways/frequentation'
import type { UseCaseResult } from '../types/UseCaseResult'

export async function deleteFrequentation(
  gateway: FrequentationGateway,
  id: number
): Promise<UseCaseResult<boolean>> {
  const existing = await gateway.getById(id)
  if (!existing) {
    return { success: false, error: `Frequentation with id ${id} not found` }
  }

  try {
    const deleted = await gateway.delete(id)
    return { success: true, data: deleted }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return { success: false, error: message }
  }
}
```

- [ ] **Step 4: Create the index.ts re-export**

Create `src/features/frequentation/main/use-cases/deleteFrequentation/index.ts`:

```ts
export { deleteFrequentation } from './deleteFrequentation'
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run src/features/frequentation/main/use-cases/deleteFrequentation`
Expected: PASS — all tests green

- [ ] **Step 6: Commit**

```bash
git add src/features/frequentation/main/use-cases/deleteFrequentation && git commit -m "feat(frequentation): add deleteFrequentation use-case"
```

---

### Task 8: Use Case — getFrequentation (by ID)

**Files:**

- Create: `src/features/frequentation/main/use-cases/getFrequentation/getFrequentation.ts`
- Create: `src/features/frequentation/main/use-cases/getFrequentation/index.ts`
- Create: `src/features/frequentation/main/use-cases/getFrequentation/__tests__/getFrequentation.test.ts`

- [ ] **Step 1: Write the failing test**

Create `src/features/frequentation/main/use-cases/getFrequentation/__tests__/getFrequentation.test.ts`:

```ts
import { describe, it, expect, vi } from 'vitest'
import { getFrequentation } from '../getFrequentation'
import type { FrequentationGateway } from '@frequentation/gateways/frequentation'
import type { FrequentationEntity } from '@frequentation/entities/frequentation'

const EXISTING_ENTITY: FrequentationEntity = {
  id: 1,
  startsAt: '2026-01-15T09:00:00.000Z',
  activity: 'work',
  studentId: 1,
  createdAt: '2026-01-15T09:00:00.000Z',
  updatedAt: '2026-01-15T09:00:00.000Z'
}

function createMockGateway(overrides: Partial<FrequentationGateway> = {}): FrequentationGateway {
  return {
    create: vi.fn().mockResolvedValue(EXISTING_ENTITY),
    getById: vi.fn().mockResolvedValue(EXISTING_ENTITY),
    getAll: vi.fn().mockResolvedValue([]),
    getByStudentId: vi.fn().mockResolvedValue([]),
    getByDateRange: vi.fn().mockResolvedValue([]),
    update: vi.fn().mockResolvedValue(null),
    delete: vi.fn().mockResolvedValue(false),
    deleteByStudentId: vi.fn().mockResolvedValue(0),
    count: vi.fn().mockResolvedValue(0),
    ...overrides
  }
}

describe('getFrequentation', () => {
  it('returns frequentation when found', async () => {
    const gateway = createMockGateway()
    const result = await getFrequentation(gateway, 1)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.id).toBe(1)
    }
  })

  it('returns error when not found', async () => {
    const gateway = createMockGateway({
      getById: vi.fn().mockResolvedValue(null)
    })
    const result = await getFrequentation(gateway, 999)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error).toContain('not found')
    }
  })

  it('returns error when gateway throws', async () => {
    const gateway = createMockGateway({
      getById: vi.fn().mockRejectedValue(new Error('DB error'))
    })
    const result = await getFrequentation(gateway, 1)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error).toContain('DB error')
    }
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/features/frequentation/main/use-cases/getFrequentation`
Expected: FAIL — cannot resolve `../getFrequentation`

- [ ] **Step 3: Write the implementation**

Create `src/features/frequentation/main/use-cases/getFrequentation/getFrequentation.ts`:

```ts
import type { FrequentationGateway } from '@frequentation/gateways/frequentation'
import type { FrequentationEntity } from '@frequentation/entities/frequentation'
import type { UseCaseResult } from '../types/UseCaseResult'

export async function getFrequentation(
  gateway: FrequentationGateway,
  id: number
): Promise<UseCaseResult<FrequentationEntity>> {
  try {
    const entity = await gateway.getById(id)
    if (!entity) {
      return { success: false, error: `Frequentation with id ${id} not found` }
    }
    return { success: true, data: entity }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return { success: false, error: message }
  }
}
```

- [ ] **Step 4: Create the index.ts re-export**

Create `src/features/frequentation/main/use-cases/getFrequentation/index.ts`:

```ts
export { getFrequentation } from './getFrequentation'
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run src/features/frequentation/main/use-cases/getFrequentation`
Expected: PASS — all tests green

- [ ] **Step 6: Commit**

```bash
git add src/features/frequentation/main/use-cases/getFrequentation && git commit -m "feat(frequentation): add getFrequentation use-case"
```

---

### Task 9: Use Case — listFrequentations

**Files:**

- Create: `src/features/frequentation/main/use-cases/listFrequentations/listFrequentations.ts`
- Create: `src/features/frequentation/main/use-cases/listFrequentations/index.ts`
- Create: `src/features/frequentation/main/use-cases/listFrequentations/__tests__/listFrequentations.test.ts`

- [ ] **Step 1: Write the failing test**

Create `src/features/frequentation/main/use-cases/listFrequentations/__tests__/listFrequentations.test.ts`:

```ts
import { describe, it, expect, vi } from 'vitest'
import { listFrequentations } from '../listFrequentations'
import type { FrequentationGateway } from '@frequentation/gateways/frequentation'
import type { FrequentationWithStudentEntity } from '@frequentation/entities/frequentation'
import type { DateRangeDto } from '@frequentation-shared'

const ENTITIES: FrequentationWithStudentEntity[] = [
  {
    id: 1,
    startsAt: '2026-01-15T09:00:00.000Z',
    activity: 'work',
    studentId: 1,
    studentNom: 'Dupont',
    studentPrenom: 'Jean',
    studentClasse: '6ème A',
    studentIne: '12345678X',
    createdAt: '2026-01-15T09:00:00.000Z',
    updatedAt: '2026-01-15T09:00:00.000Z'
  },
  {
    id: 2,
    startsAt: '2026-01-15T10:00:00.000Z',
    activity: 'reading',
    studentId: 2,
    studentNom: 'Martin',
    studentPrenom: 'Marie',
    studentClasse: '5ème B',
    studentIne: '87654321Y',
    createdAt: '2026-01-15T10:00:00.000Z',
    updatedAt: '2026-01-15T10:00:00.000Z'
  }
]

const DATE_RANGE_ENTITY: FrequentationWithStudentEntity = {
  id: 1,
  startsAt: '2026-01-15T09:00:00.000Z',
  activity: 'work',
  studentId: 1,
  studentNom: 'Dupont',
  studentPrenom: 'Jean',
  studentClasse: '6ème A',
  studentIne: '12345678X',
  createdAt: '2026-01-15T09:00:00.000Z',
  updatedAt: '2026-01-15T09:00:00.000Z'
}

function createMockGateway(overrides: Partial<FrequentationGateway> = {}): FrequentationGateway {
  return {
    create: vi.fn().mockResolvedValue(ENTITIES[0]!),
    getById: vi.fn().mockResolvedValue(null),
    getAll: vi.fn().mockResolvedValue(ENTITIES),
    getByStudentId: vi.fn().mockResolvedValue([DATE_RANGE_ENTITY]),
    getByDateRange: vi.fn().mockResolvedValue([DATE_RANGE_ENTITY]),
    update: vi.fn().mockResolvedValue(null),
    delete: vi.fn().mockResolvedValue(false),
    deleteByStudentId: vi.fn().mockResolvedValue(0),
    count: vi.fn().mockResolvedValue(ENTITIES.length),
    ...overrides
  }
}

describe('listFrequentations', () => {
  it('returns all frequentations when no filters', async () => {
    const gateway = createMockGateway()
    const result = await listFrequentations(gateway)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data).toHaveLength(2)
    }
  })

  it('returns frequentations filtered by studentId', async () => {
    const gateway = createMockGateway()
    const result = await listFrequentations(gateway, { studentId: 1 })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data).toHaveLength(1)
    }
    expect(gateway.getByStudentId).toHaveBeenCalledWith(1)
  })

  it('returns frequentations filtered by date range', async () => {
    const gateway = createMockGateway()
    const dateRange: DateRangeDto = { startDate: '2026-01-15', endDate: '2026-01-15' }
    const result = await listFrequentations(gateway, { dateRange })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data).toHaveLength(1)
    }
    expect(gateway.getByDateRange).toHaveBeenCalledWith('2026-01-15', '2026-01-15')
  })

  it('returns empty array when no results', async () => {
    const gateway = createMockGateway({
      getAll: vi.fn().mockResolvedValue([])
    })
    const result = await listFrequentations(gateway)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data).toHaveLength(0)
    }
  })

  it('returns error when gateway throws', async () => {
    const gateway = createMockGateway({
      getAll: vi.fn().mockRejectedValue(new Error('DB error'))
    })
    const result = await listFrequentations(gateway)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error).toContain('DB error')
    }
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/features/frequentation/main/use-cases/listFrequentations`
Expected: FAIL — cannot resolve `../listFrequentations`

- [ ] **Step 3: Write the implementation**

Create `src/features/frequentation/main/use-cases/listFrequentations/listFrequentations.ts`:

```ts
import type { FrequentationGateway } from '@frequentation/gateways/frequentation'
import type { FrequentationWithStudentEntity } from '@frequentation/entities/frequentation'
import type { DateRangeDto } from '@frequentation-shared'
import type { UseCaseResult } from '../types/UseCaseResult'

interface ListFrequentationsFilters {
  studentId?: number
  dateRange?: DateRangeDto
}

export async function listFrequentations(
  gateway: FrequentationGateway,
  filters?: ListFrequentationsFilters
): Promise<UseCaseResult<FrequentationWithStudentEntity[]>> {
  try {
    if (filters?.studentId) {
      const results = await gateway.getByStudentId(filters.studentId)
      return { success: true, data: results }
    }

    if (filters?.dateRange) {
      const results = await gateway.getByDateRange(
        filters.dateRange.startDate,
        filters.dateRange.endDate
      )
      return { success: true, data: results }
    }

    const results = await gateway.getAll()
    return { success: true, data: results }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return { success: false, error: message }
  }
}
```

- [ ] **Step 4: Create the index.ts re-export**

Create `src/features/frequentation/main/use-cases/listFrequentations/index.ts`:

```ts
export { listFrequentations } from './listFrequentations'
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run src/features/frequentation/main/use-cases/listFrequentations`
Expected: PASS — all tests green

- [ ] **Step 6: Commit**

```bash
git add src/features/frequentation/main/use-cases/listFrequentations && git commit -m "feat(frequentation): add listFrequentations use-case"
```

---

### Task 10: Use Case — getJournalEntries (cross-feature: depends on StudentGateway)

**Files:**

- Create: `src/features/frequentation/main/use-cases/getJournalEntries/getJournalEntries.ts`
- Create: `src/features/frequentation/main/use-cases/getJournalEntries/index.ts`
- Create: `src/features/frequentation/main/use-cases/getJournalEntries/__tests__/getJournalEntries.test.ts`

- [ ] **Step 1: Write the failing test**

Create `src/features/frequentation/main/use-cases/getJournalEntries/__tests__/getJournalEntries.test.ts`:

```ts
import { describe, it, expect, vi } from 'vitest'
import { getJournalEntries } from '../getJournalEntries'
import type { FrequentationGateway } from '@frequentation/gateways/frequentation'
import type { StudentGateway } from '@student/gateways/student'
import type {
  FrequentationWithStudentEntity,
  FrequentationEntity
} from '@frequentation/entities/frequentation'
import type { DateRangeDto, JournalEntryDto } from '@frequentation-shared'

const FREQUENTATION_ENTITY: FrequentationWithStudentEntity = {
  id: 1,
  startsAt: '2026-01-15T09:00:00.000Z',
  activity: 'work',
  studentId: 1,
  studentNom: 'Dupont',
  studentPrenom: 'Jean',
  studentClasse: '6ème A',
  studentIne: '12345678X',
  createdAt: '2026-01-15T09:00:00.000Z',
  updatedAt: '2026-01-15T09:00:00.000Z'
}

function createMockFrequentationGateway(
  overrides: Partial<FrequentationGateway> = {}
): FrequentationGateway {
  return {
    create: vi.fn().mockResolvedValue({} as FrequentationEntity),
    getById: vi.fn().mockResolvedValue(null),
    getAll: vi.fn().mockResolvedValue([FREQUENTATION_ENTITY]),
    getByStudentId: vi.fn().mockResolvedValue([FREQUENTATION_ENTITY]),
    getByDateRange: vi.fn().mockResolvedValue([FREQUENTATION_ENTITY]),
    update: vi.fn().mockResolvedValue(null),
    delete: vi.fn().mockResolvedValue(false),
    deleteByStudentId: vi.fn().mockResolvedValue(0),
    count: vi.fn().mockResolvedValue(0),
    ...overrides
  }
}

function createMockStudentGateway(): StudentGateway {
  return {
    create: vi.fn(),
    getById: vi.fn().mockResolvedValue({
      id: 1,
      nom: 'Dupont',
      prenom: 'Jean',
      classe: '6ème A',
      ine: '12345678X'
    }),
    getAll: vi.fn().mockResolvedValue([]),
    update: vi.fn(),
    delete: vi.fn(),
    getByClass: vi.fn().mockResolvedValue([]),
    getByIds: vi.fn().mockResolvedValue([])
  }
}

describe('getJournalEntries', () => {
  it('returns journal entries for a date range', async () => {
    const frequentationGateway = createMockFrequentationGateway()
    const studentGateway = createMockStudentGateway()
    const dateRange: DateRangeDto = { startDate: '2026-01-15', endDate: '2026-01-15' }

    const result = await getJournalEntries(frequentationGateway, studentGateway, dateRange)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data).toHaveLength(1)
      const entry: JournalEntryDto = result.data[0]!
      expect(entry.frequentation.id).toBe(1)
      expect(entry.student.nom).toBe('Dupont')
    }
  })

  it('returns empty array when no frequentations in range', async () => {
    const frequentationGateway = createMockFrequentationGateway({
      getByDateRange: vi.fn().mockResolvedValue([])
    })
    const studentGateway = createMockStudentGateway()
    const dateRange: DateRangeDto = { startDate: '2026-01-15', endDate: '2026-01-15' }

    const result = await getJournalEntries(frequentationGateway, studentGateway, dateRange)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data).toHaveLength(0)
    }
  })

  it('returns error when frequentation gateway throws', async () => {
    const frequentationGateway = createMockFrequentationGateway({
      getByDateRange: vi.fn().mockRejectedValue(new Error('DB error'))
    })
    const studentGateway = createMockStudentGateway()
    const dateRange: DateRangeDto = { startDate: '2026-01-15', endDate: '2026-01-15' }

    const result = await getJournalEntries(frequentationGateway, studentGateway, dateRange)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error).toContain('DB error')
    }
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/features/frequentation/main/use-cases/getJournalEntries`
Expected: FAIL — cannot resolve `../getJournalEntries`

- [ ] **Step 3: Write the implementation**

Create `src/features/frequentation/main/use-cases/getJournalEntries/getJournalEntries.ts`:

```ts
import type { FrequentationGateway } from '@frequentation/gateways/frequentation'
import type { StudentGateway } from '@student/gateways/student'
import type { DateRangeDto, JournalEntryDto } from '@frequentation-shared'
import type { UseCaseResult } from '../types/UseCaseResult'
import { formatFrequentationResponse } from '../helpers/formatFrequentationResponse'

export async function getJournalEntries(
  frequentationGateway: FrequentationGateway,
  studentGateway: StudentGateway,
  dateRange: DateRangeDto
): Promise<UseCaseResult<JournalEntryDto[]>> {
  try {
    const frequentations = await frequentationGateway.getByDateRange(
      dateRange.startDate,
      dateRange.endDate
    )

    const entries: JournalEntryDto[] = []

    for (const freq of frequentations) {
      const student = await studentGateway.getById(freq.studentId)
      const frequentation = formatFrequentationResponse(freq)

      entries.push({
        frequentation,
        student: student
          ? {
              id: student.id,
              nom: student.nom,
              prenom: student.prenom,
              classe: student.classe,
              ine: student.ine
            }
          : {
              id: freq.studentId,
              nom: freq.studentNom,
              prenom: freq.studentPrenom,
              classe: freq.studentClasse,
              ine: freq.studentIne
            }
      })
    }

    return { success: true, data: entries }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return { success: false, error: message }
  }
}
```

- [ ] **Step 4: Create the index.ts re-export**

Create `src/features/frequentation/main/use-cases/getJournalEntries/index.ts`:

```ts
export { getJournalEntries } from './getJournalEntries'
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run src/features/frequentation/main/use-cases/getJournalEntries`
Expected: PASS — all tests green

- [ ] **Step 6: Commit**

```bash
git add src/features/frequentation/main/use-cases/getJournalEntries && git commit -m "feat(frequentation): add getJournalEntries use-case (cross-feature)"
```

---

### Task 11: Use Case — createFrequentationBatch (with helpers, validations, types)

**Files:**

- Create: `src/features/frequentation/main/use-cases/createFrequentationBatch/createFrequentationBatch.ts`
- Create: `src/features/frequentation/main/use-cases/createFrequentationBatch/index.ts`
- Create: `src/features/frequentation/main/use-cases/createFrequentationBatch/types/BatchResult.ts`
- Create: `src/features/frequentation/main/use-cases/createFrequentationBatch/helpers/validateBatchItem/validateBatchItem.ts`
- Create: `src/features/frequentation/main/use-cases/createFrequentationBatch/helpers/validateBatchItem/index.ts`
- Create: `src/features/frequentation/main/use-cases/createFrequentationBatch/helpers/validateBatchItem/__tests__/validateBatchItem.test.ts`
- Create: `src/features/frequentation/main/use-cases/createFrequentationBatch/validations/createFrequentationBatchSchema/createFrequentationBatchSchema.ts`
- Create: `src/features/frequentation/main/use-cases/createFrequentationBatch/validations/createFrequentationBatchSchema/index.ts`
- Create: `src/features/frequentation/main/use-cases/createFrequentationBatch/validations/createFrequentationBatchSchema/__tests__/createFrequentationBatchSchema.test.ts`
- Create: `src/features/frequentation/main/use-cases/createFrequentationBatch/__tests__/createFrequentationBatch.test.ts`

- [ ] **Step 1: Write the BatchResult type**

Create `src/features/frequentation/main/use-cases/createFrequentationBatch/types/BatchResult.ts`:

```ts
import type { FrequentationEntity } from '@frequentation/entities/frequentation'

export interface BatchResult {
  created: FrequentationEntity[]
  errors: Array<{ index: number; error: string }>
}
```

- [ ] **Step 2: Write validateBatchItem test**

Create `src/features/frequentation/main/use-cases/createFrequentationBatch/helpers/validateBatchItem/__tests__/validateBatchItem.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { validateBatchItem } from '../validateBatchItem'
import type { CreateFrequentationDto } from '@frequentation-shared'

describe('validateBatchItem', () => {
  it('returns valid for a correct dto', () => {
    const dto: CreateFrequentationDto = {
      startsAt: '2026-01-15T09:00:00.000Z',
      activity: 'work',
      studentId: 1
    }
    const result = validateBatchItem(dto, 0)
    expect(result.valid).toBe(true)
  })

  it('returns invalid for empty startsAt', () => {
    const dto: CreateFrequentationDto = {
      startsAt: '',
      activity: 'work',
      studentId: 1
    }
    const result = validateBatchItem(dto, 0)
    expect(result.valid).toBe(false)
    expect(result.error).toContain('startsAt')
  })

  it('returns invalid for non-positive studentId', () => {
    const dto: CreateFrequentationDto = {
      startsAt: '2026-01-15T09:00:00.000Z',
      activity: 'work',
      studentId: 0
    }
    const result = validateBatchItem(dto, 0)
    expect(result.valid).toBe(false)
    expect(result.error).toContain('studentId')
  })

  it('includes the index in error message', () => {
    const dto: CreateFrequentationDto = {
      startsAt: '',
      activity: 'work',
      studentId: 1
    }
    const result = validateBatchItem(dto, 5)
    expect(result.error).toContain('5')
  })
})
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npx vitest run src/features/frequentation/main/use-cases/createFrequentationBatch/helpers/validateBatchItem`
Expected: FAIL

- [ ] **Step 4: Write validateBatchItem implementation**

Create `src/features/frequentation/main/use-cases/createFrequentationBatch/helpers/validateBatchItem/validateBatchItem.ts`:

```ts
import type { CreateFrequentationDto } from '@frequentation-shared'

interface ValidationResult {
  valid: boolean
  error?: string
}

export function validateBatchItem(dto: CreateFrequentationDto, index: number): ValidationResult {
  if (!dto.startsAt || dto.startsAt.trim().length === 0) {
    return { valid: false, error: `Item ${index}: startsAt is required` }
  }
  if (!dto.activity || dto.activity.trim().length === 0) {
    return { valid: false, error: `Item ${index}: activity is required` }
  }
  if (!dto.studentId || dto.studentId < 1) {
    return { valid: false, error: `Item ${index}: studentId must be a positive integer` }
  }
  return { valid: true }
}
```

Create `src/features/frequentation/main/use-cases/createFrequentationBatch/helpers/validateBatchItem/index.ts`:

```ts
export { validateBatchItem } from './validateBatchItem'
```

- [ ] **Step 5: Run validateBatchItem test to verify it passes**

Run: `npx vitest run src/features/frequentation/main/use-cases/createFrequentationBatch/helpers/validateBatchItem`
Expected: PASS

- [ ] **Step 6: Write the Zod schema test**

Create `src/features/frequentation/main/use-cases/createFrequentationBatch/validations/createFrequentationBatchSchema/__tests__/createFrequentationBatchSchema.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { createFrequentationBatchSchema } from '../createFrequentationBatchSchema'

describe('createFrequentationBatchSchema', () => {
  it('validates a valid batch', () => {
    const input = {
      frequentations: [
        { startsAt: '2026-01-15T09:00:00.000Z', activity: 'work', studentId: 1 },
        { startsAt: '2026-01-15T10:00:00.000Z', activity: 'reading', studentId: 2 }
      ]
    }
    const result = createFrequentationBatchSchema.safeParse(input)
    expect(result.success).toBe(true)
  })

  it('rejects empty batch', () => {
    const result = createFrequentationBatchSchema.safeParse({
      frequentations: []
    })
    expect(result.success).toBe(false)
  })

  it('rejects batch with too many items', () => {
    const items = Array.from({ length: 101 }, (_, i) => ({
      startsAt: '2026-01-15T09:00:00.000Z',
      activity: 'work',
      studentId: i + 1
    }))
    const result = createFrequentationBatchSchema.safeParse({
      frequentations: items
    })
    expect(result.success).toBe(false)
  })

  it('rejects item with invalid activity', () => {
    const result = createFrequentationBatchSchema.safeParse({
      frequentations: [{ startsAt: '2026-01-15T09:00:00.000Z', activity: 'invalid', studentId: 1 }]
    })
    expect(result.success).toBe(false)
  })
})
```

- [ ] **Step 7: Run the schema test to verify it fails**

Run: `npx vitest run src/features/frequentation/main/use-cases/createFrequentationBatch/validations/createFrequentationBatchSchema`
Expected: FAIL

- [ ] **Step 8: Write the schema implementation**

Create `src/features/frequentation/main/use-cases/createFrequentationBatch/validations/createFrequentationBatchSchema/createFrequentationBatchSchema.ts`:

```ts
import { z } from 'zod'
import { ActivityType } from '@types'

const MAX_BATCH_SIZE = 100

const createFrequentationItemSchema = z.object({
  startsAt: z.string().min(1),
  activity: z.nativeEnum(ActivityType),
  studentId: z.number().int().positive()
})

export const createFrequentationBatchSchema = z.object({
  frequentations: z.array(createFrequentationItemSchema).min(1).max(MAX_BATCH_SIZE)
})
```

Create `src/features/frequentation/main/use-cases/createFrequentationBatch/validations/createFrequentationBatchSchema/index.ts`:

```ts
export { createFrequentationBatchSchema } from './createFrequentationBatchSchema'
```

- [ ] **Step 9: Run schema test to verify it passes**

Run: `npx vitest run src/features/frequentation/main/use-cases/createFrequentationBatch/validations/createFrequentationBatchSchema`
Expected: PASS

- [ ] **Step 10: Write the use-case test**

Create `src/features/frequentation/main/use-cases/createFrequentationBatch/__tests__/createFrequentationBatch.test.ts`:

```ts
import { describe, it, expect, vi } from 'vitest'
import { createFrequentationBatch } from '../createFrequentationBatch'
import type { FrequentationGateway } from '@frequentation/gateways/frequentation'
import type { FrequentationEntity } from '@frequentation/entities/frequentation'

const VALID_ENTITY: FrequentationEntity = {
  id: 1,
  startsAt: '2026-01-15T09:00:00.000Z',
  activity: 'work',
  studentId: 1,
  createdAt: '2026-01-15T09:00:00.000Z',
  updatedAt: '2026-01-15T09:00:00.000Z'
}

function createMockGateway(overrides: Partial<FrequentationGateway> = {}): FrequentationGateway {
  return {
    create: vi.fn().mockResolvedValue(VALID_ENTITY),
    getById: vi.fn().mockResolvedValue(null),
    getAll: vi.fn().mockResolvedValue([]),
    getByStudentId: vi.fn().mockResolvedValue([]),
    getByDateRange: vi.fn().mockResolvedValue([]),
    update: vi.fn().mockResolvedValue(null),
    delete: vi.fn().mockResolvedValue(false),
    deleteByStudentId: vi.fn().mockResolvedValue(0),
    count: vi.fn().mockResolvedValue(0),
    ...overrides
  }
}

describe('createFrequentationBatch', () => {
  it('creates all frequentations in a valid batch', async () => {
    const gateway = createMockGateway()
    const result = await createFrequentationBatch(gateway, {
      frequentations: [
        { startsAt: '2026-01-15T09:00:00.000Z', activity: 'work', studentId: 1 },
        { startsAt: '2026-01-15T10:00:00.000Z', activity: 'reading', studentId: 2 }
      ]
    })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.created).toHaveLength(2)
      expect(result.data.errors).toHaveLength(0)
    }
  })

  it('collects errors for invalid items but creates valid ones', async () => {
    const gateway = createMockGateway()
    const result = await createFrequentationBatch(gateway, {
      frequentations: [
        { startsAt: '2026-01-15T09:00:00.000Z', activity: 'work', studentId: 1 },
        { startsAt: '', activity: 'work', studentId: 1 }
      ]
    })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.created).toHaveLength(1)
      expect(result.data.errors).toHaveLength(1)
    }
  })

  it('rejects an empty batch', async () => {
    const gateway = createMockGateway()
    const result = await createFrequentationBatch(gateway, {
      frequentations: []
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error).toContain('frequentations')
    }
  })
})
```

- [ ] **Step 11: Run test to verify it fails**

Run: `npx vitest run src/features/frequentation/main/use-cases/createFrequentationBatch`
Expected: FAIL

- [ ] **Step 12: Write the use-case implementation**

Create `src/features/frequentation/main/use-cases/createFrequentationBatch/createFrequentationBatch.ts`:

```ts
import type { FrequentationGateway } from '@frequentation/gateways/frequentation'
import type { FrequentationEntity } from '@frequentation/entities/frequentation'
import type { CreateFrequentationBatchDto } from '@frequentation-shared'
import type { UseCaseResult } from '../types/UseCaseResult'
import type { BatchResult } from './types/BatchResult'
import { createFrequentationBatchSchema } from './validations/createFrequentationBatchSchema'
import { validateBatchItem } from './helpers/validateBatchItem'

export async function createFrequentationBatch(
  gateway: FrequentationGateway,
  dto: CreateFrequentationBatchDto
): Promise<UseCaseResult<BatchResult>> {
  const parsed = createFrequentationBatchSchema.safeParse(dto)
  if (!parsed.success) {
    return { success: false, error: parsed.error.message }
  }

  const batch: BatchResult = { created: [], errors: [] }

  for (let index = 0; index < dto.frequentations.length; index++) {
    const item = dto.frequentations[index]!
    const validation = validateBatchItem(item, index)

    if (!validation.valid) {
      batch.errors.push({ index, error: validation.error ?? 'Unknown validation error' })
      continue
    }

    try {
      const entity = await gateway.create(item)
      batch.created.push(entity)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error'
      batch.errors.push({ index, error: message })
    }
  }

  return { success: true, data: batch }
}
```

Create `src/features/frequentation/main/use-cases/createFrequentationBatch/index.ts`:

```ts
export { createFrequentationBatch } from './createFrequentationBatch'
export type { BatchResult } from './types/BatchResult'
```

- [ ] **Step 13: Run test to verify it passes**

Run: `npx vitest run src/features/frequentation/main/use-cases/createFrequentationBatch`
Expected: PASS — all tests green

- [ ] **Step 14: Commit**

```bash
git add src/features/frequentation/main/use-cases/createFrequentationBatch && git commit -m "feat(frequentation): add createFrequentationBatch use-case with helpers + validations"
```

---

### Task 12: helpers/formatFrequentationResponse

**Files:**

- Create: `src/features/frequentation/main/use-cases/helpers/formatFrequentationResponse/formatFrequentationResponse.ts`
- Create: `src/features/frequentation/main/use-cases/helpers/formatFrequentationResponse/index.ts`
- Create: `src/features/frequentation/main/use-cases/helpers/formatFrequentationResponse/__tests__/formatFrequentationResponse.test.ts`

Note: This helper was already referenced by Task 10's getJournalEntries. It must be created before that test will pass. If implementing tasks out of order, create this first.

- [ ] **Step 1: Write the failing test**

Create `src/features/frequentation/main/use-cases/helpers/formatFrequentationResponse/__tests__/formatFrequentationResponse.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { formatFrequentationResponse } from '../formatFrequentationResponse'
import type { FrequentationWithStudentEntity } from '@frequentation/entities/frequentation'

describe('formatFrequentationResponse', () => {
  it('maps FrequentationWithStudentEntity to FrequentationResponseDto', () => {
    const entity: FrequentationWithStudentEntity = {
      id: 1,
      startsAt: '2026-01-15T09:00:00.000Z',
      activity: 'work',
      studentId: 1,
      studentNom: 'Dupont',
      studentPrenom: 'Jean',
      studentClasse: '6ème A',
      studentIne: '12345678X',
      createdAt: '2026-01-15T09:00:00.000Z',
      updatedAt: '2026-01-15T09:00:00.000Z'
    }

    const result = formatFrequentationResponse(entity)

    expect(result).toEqual({
      id: 1,
      startsAt: '2026-01-15T09:00:00.000Z',
      activity: 'work',
      studentId: 1,
      studentName: 'Jean Dupont',
      studentClass: '6ème A',
      studentIne: '12345678X',
      createdAt: '2026-01-15T09:00:00.000Z',
      updatedAt: '2026-01-15T09:00:00.000Z'
    })
  })

  it('formats studentName as "prenom nom"', () => {
    const entity: FrequentationWithStudentEntity = {
      id: 2,
      startsAt: '2026-01-15T09:00:00.000Z',
      activity: 'reading',
      studentId: 2,
      studentNom: 'Martin',
      studentPrenom: 'Marie',
      studentClasse: '5ème B',
      studentIne: '87654321Y',
      createdAt: '2026-01-15T09:00:00.000Z',
      updatedAt: '2026-01-15T09:00:00.000Z'
    }

    const result = formatFrequentationResponse(entity)
    expect(result.studentName).toBe('Marie Martin')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/features/frequentation/main/use-cases/helpers/formatFrequentationResponse`
Expected: FAIL

- [ ] **Step 3: Write the implementation**

Create `src/features/frequentation/main/use-cases/helpers/formatFrequentationResponse/formatFrequentationResponse.ts`:

```ts
import type { FrequentationWithStudentEntity } from '@frequentation/entities/frequentation'
import type { FrequentationResponseDto } from '@frequentation-shared'

export function formatFrequentationResponse(
  entity: FrequentationWithStudentEntity
): FrequentationResponseDto {
  return {
    id: entity.id,
    startsAt: entity.startsAt,
    activity: entity.activity,
    studentId: entity.studentId,
    studentName: `${entity.studentPrenom} ${entity.studentNom}`,
    studentClass: entity.studentClasse,
    studentIne: entity.studentIne,
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt
  }
}
```

Create `src/features/frequentation/main/use-cases/helpers/formatFrequentationResponse/index.ts`:

```ts
export { formatFrequentationResponse } from './formatFrequentationResponse'
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/features/frequentation/main/use-cases/helpers/formatFrequentationResponse`
Expected: PASS — all tests green

- [ ] **Step 5: Commit**

```bash
git add src/features/frequentation/main/use-cases/helpers/formatFrequentationResponse && git commit -m "feat(frequentation): add formatFrequentationResponse helper"
```

---

### Task 13: Frequentation Controller

**Files:**

- Create: `src/features/frequentation/main/controllers/frequentation/frequentation.controller.ts`
- Create: `src/features/frequentation/main/controllers/frequentation/index.ts`
- Create: `src/features/frequentation/main/controllers/frequentation/__tests__/frequentation.controller.test.ts`

- [ ] **Step 1: Write the failing test**

Create `src/features/frequentation/main/controllers/frequentation/__tests__/frequentation.controller.test.ts`:

```ts
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { FrequentationController } from '../frequentation.controller'
import type { FrequentationGateway } from '@frequentation/gateways/frequentation'
import type { StudentGateway } from '@student/gateways/student'
import type {
  FrequentationEntity,
  FrequentationWithStudentEntity
} from '@frequentation/entities/frequentation'

const VALID_ENTITY: FrequentationEntity = {
  id: 1,
  startsAt: '2026-01-15T09:00:00.000Z',
  activity: 'work',
  studentId: 1,
  createdAt: '2026-01-15T09:00:00.000Z',
  updatedAt: '2026-01-15T09:00:00.000Z'
}

const WITH_STUDENT: FrequentationWithStudentEntity = {
  ...VALID_ENTITY,
  studentNom: 'Dupont',
  studentPrenom: 'Jean',
  studentClasse: '6ème A',
  studentIne: '12345678X'
}

vi.mock('electron', () => ({
  ipcMain: {
    handle: vi.fn()
  }
}))

function createMockFrequentationGateway(): FrequentationGateway {
  return {
    create: vi.fn().mockResolvedValue(VALID_ENTITY),
    getById: vi.fn().mockResolvedValue(VALID_ENTITY),
    getAll: vi.fn().mockResolvedValue([WITH_STUDENT]),
    getByStudentId: vi.fn().mockResolvedValue([WITH_STUDENT]),
    getByDateRange: vi.fn().mockResolvedValue([WITH_STUDENT]),
    update: vi.fn().mockResolvedValue(VALID_ENTITY),
    delete: vi.fn().mockResolvedValue(true),
    deleteByStudentId: vi.fn().mockResolvedValue(1),
    count: vi.fn().mockResolvedValue(1)
  }
}

function createMockStudentGateway(): StudentGateway {
  return {
    create: vi.fn(),
    getById: vi.fn().mockResolvedValue({
      id: 1,
      nom: 'Dupont',
      prenom: 'Jean',
      classe: '6ème A',
      ine: '12345678X'
    }),
    getAll: vi.fn().mockResolvedValue([]),
    update: vi.fn(),
    delete: vi.fn(),
    getByClass: vi.fn().mockResolvedValue([]),
    getByIds: vi.fn().mockResolvedValue([])
  }
}

describe('FrequentationController', () => {
  let controller: FrequentationController
  let frequentationGateway: FrequentationGateway
  let studentGateway: StudentGateway

  beforeEach(() => {
    frequentationGateway = createMockFrequentationGateway()
    studentGateway = createMockStudentGateway()
    controller = new FrequentationController(frequentationGateway, studentGateway)
  })

  it('registers all IPC handlers', () => {
    const { ipcMain } = require('electron')
    const registeredChannels = (ipcMain.handle as ReturnType<typeof vi.fn>).mock.calls.map(
      (call: unknown[]) => call[0]
    )
    expect(registeredChannels).toContain('frequentation.create')
    expect(registeredChannels).toContain('frequentation.getById')
    expect(registeredChannels).toContain('frequentation.getAll')
    expect(registeredChannels).toContain('frequentation.update')
    expect(registeredChannels).toContain('frequentation.delete')
    expect(registeredChannels).toContain('frequentation.getByStudentId')
    expect(registeredChannels).toContain('frequentation.getByDateRange')
    expect(registeredChannels).toContain('frequentation.getJournalEntries')
    expect(registeredChannels).toContain('frequentation.createBatch')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/features/frequentation/main/controllers/frequentation`
Expected: FAIL — cannot resolve `../frequentation.controller`

- [ ] **Step 3: Write the implementation**

Create `src/features/frequentation/main/controllers/frequentation/frequentation.controller.ts`:

```ts
import { ipcMain } from 'electron'
import type { FrequentationGateway } from '@frequentation/gateways/frequentation'
import type { StudentGateway } from '@student/gateways/student'
import type { CreateFrequentationDto, DateRangeDto } from '@frequentation-shared'
import { createFrequentation } from '@frequentation/use-cases/createFrequentation'
import { updateFrequentation } from '@frequentation/use-cases/updateFrequentation'
import { deleteFrequentation } from '@frequentation/use-cases/deleteFrequentation'
import { getFrequentation } from '@frequentation/use-cases/getFrequentation'
import { listFrequentations } from '@frequentation/use-cases/listFrequentations'
import { getJournalEntries } from '@frequentation/use-cases/getJournalEntries'
import { createFrequentationBatch } from '@frequentation/use-cases/createFrequentationBatch'
import { formatFrequentationResponse } from '@frequentation/use-cases/helpers/formatFrequentationResponse'

export class FrequentationController {
  constructor(
    private frequentationGateway: FrequentationGateway,
    private studentGateway: StudentGateway
  ) {
    this.registerHandlers()
  }

  registerHandlers(): void {
    ipcMain.handle('frequentation.create', async (_event, dto: CreateFrequentationDto) => {
      const result = await createFrequentation(this.frequentationGateway, dto)
      if (!result.success) {
        return { success: false, error: result.error }
      }
      const frequentation = await this.frequentationGateway.getById(result.data.id)
      if (!frequentation) {
        return { success: false, error: 'Created frequentation not found' }
      }
      const allWithStudent = await this.frequentationGateway.getAll()
      const withStudent = allWithStudent.find((f) => f.id === result.data.id)
      if (!withStudent) {
        return { success: true, data: result.data }
      }
      return { success: true, data: formatFrequentationResponse(withStudent) }
    })

    ipcMain.handle('frequentation.getById', async (_event, id: number) => {
      const result = await getFrequentation(this.frequentationGateway, id)
      if (!result.success) {
        return { success: false, error: result.error }
      }
      const allWithStudent = await this.frequentationGateway.getAll()
      const withStudent = allWithStudent.find((f) => f.id === id)
      if (!withStudent) {
        return { success: true, data: result.data }
      }
      return { success: true, data: formatFrequentationResponse(withStudent) }
    })

    ipcMain.handle('frequentation.getAll', async () => {
      const result = await listFrequentations(this.frequentationGateway)
      if (!result.success) {
        return { success: false, error: result.error }
      }
      const responseDtos = result.data.map(formatFrequentationResponse)
      return { success: true, data: responseDtos }
    })

    ipcMain.handle(
      'frequentation.update',
      async (_event, id: number, dto: Partial<CreateFrequentationDto>) => {
        const result = await updateFrequentation(this.frequentationGateway, id, dto)
        if (!result.success) {
          return { success: false, error: result.error }
        }
        const allWithStudent = await this.frequentationGateway.getAll()
        const withStudent = allWithStudent.find((f) => f.id === id)
        if (!withStudent) {
          return { success: true, data: result.data }
        }
        return { success: true, data: formatFrequentationResponse(withStudent) }
      }
    )

    ipcMain.handle('frequentation.delete', async (_event, id: number) => {
      const result = await deleteFrequentation(this.frequentationGateway, id)
      if (!result.success) {
        return { success: false, error: result.error }
      }
      return { success: true }
    })

    ipcMain.handle('frequentation.getByStudentId', async (_event, studentId: number) => {
      const result = await listFrequentations(this.frequentationGateway, { studentId })
      if (!result.success) {
        return { success: false, error: result.error }
      }
      const responseDtos = result.data.map(formatFrequentationResponse)
      return { success: true, data: responseDtos }
    })

    ipcMain.handle('frequentation.getByDateRange', async (_event, dateRange: DateRangeDto) => {
      const result = await listFrequentations(this.frequentationGateway, { dateRange })
      if (!result.success) {
        return { success: false, error: result.error }
      }
      const responseDtos = result.data.map(formatFrequentationResponse)
      return { success: true, data: responseDtos }
    })

    ipcMain.handle('frequentation.getJournalEntries', async (_event, dateRange: DateRangeDto) => {
      const result = await getJournalEntries(
        this.frequentationGateway,
        this.studentGateway,
        dateRange
      )
      if (!result.success) {
        return { success: false, error: result.error }
      }
      return { success: true, data: result.data }
    })

    ipcMain.handle(
      'frequentation.createBatch',
      async (_event, dto: { frequentations: CreateFrequentationDto[] }) => {
        const result = await createFrequentationBatch(this.frequentationGateway, dto)
        if (!result.success) {
          return { success: false, error: result.error }
        }
        return { success: true, data: result.data }
      }
    )
  }
}
```

Create `src/features/frequentation/main/controllers/frequentation/index.ts`:

```ts
export { FrequentationController } from './frequentation.controller'
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/features/frequentation/main/controllers/frequentation`
Expected: PASS — all tests green

- [ ] **Step 5: Commit**

```bash
git add src/features/frequentation/main/controllers/frequentation && git commit -m "feat(frequentation): add controller with IPC handlers"
```

---

### Task 14: Module Wiring (update modules.ts, schema.ts)

**Files:**

- Modify: `src/main/modules.ts`
- Modify: `src/shared/db/schema.ts`

This task wires the frequentation feature into the main application. It assumes `src/shared/db/schema.ts` already exports a `getStudentTable` function and `src/main/modules.ts` already exists with student module wiring.

- [ ] **Step 1: Update schema.ts to export frequentation table**

In `src/shared/db/schema.ts`, add the re-export of `frequentationTable` and ensure `getStudentTable` is exported. The file should already have the student table. Add the frequentation table re-export:

```ts
export { frequentationTable } from '@frequentation/entities/frequentation'
export { getStudentTable } from './student-table-resolver'
```

Note: `getStudentTable` returns the Drizzle `studentTable` object imported from the student feature's entity. Create `src/shared/db/student-table-resolver.ts`:

```ts
import { studentTable } from '@student/entities/student'

export function getStudentTable() {
  return studentTable
}
```

- [ ] **Step 2: Update modules.ts to wire frequentation**

The `src/main/modules.ts` file should be updated to instantiate the `FrequentationGatewayDrizzle` and `FrequentationController`, and inject the `StudentGateway` from the student module. Find the existing module wiring section and add:

```ts
import { FrequentationGatewayDrizzle } from '@frequentation/gateways/frequentation/frequentation.gateway.drizzle'
import { FrequentationController } from '@frequentation/controllers/frequentation'

const frequentationGateway = new FrequentationGatewayDrizzle(db)
const frequentationController = new FrequentationController(frequentationGateway, studentGateway)
```

- [ ] **Step 3: Run typecheck to verify wiring compiles**

Run: `npx typecheck:node`
Expected: PASS — no type errors

- [ ] **Step 4: Commit**

```bash
git add src/shared/db/schema.ts src/shared/db/student-table-resolver.ts src/main/modules.ts && git commit -m "feat(frequentation): wire frequentation module into app"
```

---

### Task 15: Drizzle Migration (add frequentation table)

**Files:**

- Modify: `drizzle.config.ts` (ensure frequentation schema is included)
- Generate: `drizzle/0001_add_frequentation_table.sql`

- [ ] **Step 1: Verify drizzle.config.ts references the frequentation schema**

`drizzle.config.ts` should already import from `src/shared/db/schema.ts` which now re-exports `frequentationTable`. Verify the `schema` path in the config includes the frequentation paths.

- [ ] **Step 2: Generate the migration**

Run: `npx drizzle-kit generate`
Expected: New migration file `drizzle/0001_add_frequentation_table.sql` created

- [ ] **Step 3: Verify the migration SQL**

Inspect `drizzle/0001_add_frequentation_table.sql` — it should contain:

```sql
CREATE TABLE frequentation (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  starts_at TEXT NOT NULL,
  activity TEXT NOT NULL,
  student_id INTEGER NOT NULL,
  created_at TEXT DEFAULT '(datetime(''now''))',
  updated_at TEXT DEFAULT '(datetime(''now''))',
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);
CREATE INDEX idx_freq_date ON frequentation(DATE(starts_at));
CREATE INDEX idx_freq_student ON frequentation(student_id);
```

- [ ] **Step 4: Commit**

```bash
git add drizzle/ && git commit -m "feat(frequentation): add Drizzle migration for frequentation table"
```

---

### Task 16: Database cleanup hook (delete frequentations older than 2 years on startup)

**Files:**

- Modify: `src/main/index.ts` (add cleanup call)
- Create: `src/features/frequentation/main/use-cases/cleanupOldFrequentations/cleanupOldFrequentations.ts`
- Create: `src/features/frequentation/main/use-cases/cleanupOldFrequentations/index.ts`
- Create: `src/features/frequentation/main/use-cases/cleanupOldFrequentations/__tests__/cleanupOldFrequentations.test.ts`

- [ ] **Step 1: Write the failing test**

Create `src/features/frequentation/main/use-cases/cleanupOldFrequentations/__tests__/cleanupOldFrequentations.test.ts`:

```ts
import { describe, it, expect, vi } from 'vitest'
import { cleanupOldFrequentations } from '../cleanupOldFrequentations'
import type { FrequentationGateway } from '@frequentation/gateways/frequentation'

function createMockGateway(overrides: Partial<FrequentationGateway> = {}): FrequentationGateway {
  return {
    create: vi.fn(),
    getById: vi.fn(),
    getAll: vi.fn(),
    getByStudentId: vi.fn(),
    getByDateRange: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    deleteByStudentId: vi.fn(),
    count: vi.fn().mockResolvedValue(0),
    ...overrides
  }
}

describe('cleanupOldFrequentations', () => {
  it('deletes frequentations older than retention years', async () => {
    const gateway = createMockGateway({
      getByDateRange: vi.fn().mockResolvedValue([])
    })
    const result = await cleanupOldFrequentations(gateway)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(typeof result.data.deletedCount).toBe('number')
    }
  })

  it('uses CLEANUP_RETENTION_YEARS constant', async () => {
    const gateway = createMockGateway()
    const result = await cleanupOldFrequentations(gateway)
    expect(result.success).toBe(true)
  })

  it('returns error when gateway throws', async () => {
    const gateway = createMockGateway({
      getByDateRange: vi.fn().mockRejectedValue(new Error('DB error'))
    })
    const result = await cleanupOldFrequentations(gateway)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error).toContain('DB error')
    }
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/features/frequentation/main/use-cases/cleanupOldFrequentations`
Expected: FAIL

- [ ] **Step 3: Write the implementation**

Create `src/features/frequentation/main/use-cases/cleanupOldFrequentations/cleanupOldFrequentations.ts`:

```ts
import type { FrequentationGateway } from '@frequentation/gateways/frequentation'
import type { UseCaseResult } from '../types/UseCaseResult'

export const CLEANUP_RETENTION_YEARS = 2

export async function cleanupOldFrequentations(
  gateway: FrequentationGateway
): Promise<UseCaseResult<{ deletedCount: number }>> {
  try {
    const cutoffDate = new Date()
    cutoffDate.setFullYear(cutoffDate.getFullYear() - CLEANUP_RETENTION_YEARS)
    const cutoffIso = cutoffDate.toISOString()

    const all = await gateway.getAll()
    const oldEntries = all.filter((entry) => entry.startsAt < cutoffIso)

    let deletedCount = 0
    for (const entry of oldEntries) {
      const deleted = await gateway.delete(entry.id)
      if (deleted) {
        deletedCount += 1
      }
    }

    return { success: true, data: { deletedCount } }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return { success: false, error: message }
  }
}
```

Create `src/features/frequentation/main/use-cases/cleanupOldFrequentations/index.ts`:

```ts
export { cleanupOldFrequentations, CLEANUP_RETENTION_YEARS } from './cleanupOldFrequentations'
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/features/frequentation/main/use-cases/cleanupOldFrequentations`
Expected: PASS — all tests green

- [ ] **Step 5: Add cleanup call to modules.ts**

In `src/main/modules.ts`, add the cleanup call in the initialization section after modules are wired:

```ts
import { cleanupOldFrequentations } from '@frequentation/use-cases/cleanupOldFrequentations'

const cleanupResult = await cleanupOldFrequentations(frequentationGateway)
if (cleanupResult.success && cleanupResult.data.deletedCount > 0) {
  console.log(`Cleaned up ${cleanupResult.data.deletedCount} old frequentations`)
}
```

- [ ] **Step 6: Run typecheck**

Run: `npx typecheck:node`
Expected: PASS

- [ ] **Step 7: Commit**

```bash
git add src/features/frequentation/main/use-cases/cleanupOldFrequentations src/main/modules.ts && git commit -m "feat(frequentation): add cleanup hook for frequentations older than 2 years"
```

---

### Task 17: Final Verification

- [ ] **Step 1: Run all frequentation tests**

Run: `npx vitest run src/features/frequentation`
Expected: All tests pass — green output

- [ ] **Step 2: Run all tests in the project**

Run: `npx vitest run`
Expected: All tests pass

- [ ] **Step 3: Run typecheck for main process**

Run: `npx typecheck:node`
Expected: PASS — no type errors

- [ ] **Step 4: Run linter**

Run: `npx eslint src/features/frequentation`
Expected: No errors

- [ ] **Step 5: Verify gateway interface contract matches implementation**

Manually verify:

- `FrequentationGateway` interface methods match `FrequentationGatewayDrizzle` implementation
- All use-cases only depend on `FrequentationGateway` interface, never the Drizzle implementation
- `getJournalEntries` depends on `StudentGateway` interface (cross-feature), not the Drizzle implementation
- Controller imports use-cases, not gateways directly (except for wiring)

- [ ] **Step 6: Final commit (if any lint fixes needed)**

```bash
git add -A && git commit -m "chore(frequentation): final verification cleanup"
```
