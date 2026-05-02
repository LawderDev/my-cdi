import type { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3'
import { eq, and, gte, lte } from 'drizzle-orm'
import type { FrequentationGateway } from './frequentation.gateway'
import type {
  FrequentationEntity,
  FrequentationWithStudentEntity
} from '@frequentation/entities/frequentation'
import type { CreateFrequentationDto, UpdateFrequentationDto } from '@frequentation-shared'
import { frequentationTable } from '@frequentation/entities/frequentation'
import { mapFrequentationRow, mapFrequentationWithStudentRow } from './helpers/mapFrequentationRow'
import { studentTable } from '@shared/db/schema'

const ISO_DATE_LENGTH = 10

export class FrequentationGatewayDrizzle implements FrequentationGateway {
  constructor(private db: BetterSQLite3Database<Record<string, unknown>>) {}

  async create(dto: CreateFrequentationDto): Promise<FrequentationEntity> {
    const now = new Date().toISOString()
    const result = await this.db
      .insert(frequentationTable)
      .values({
        startsAt: dto.startsAt,
        activity: dto.activity,
        studentId: dto.studentId,
        createdAt: now,
        updatedAt: now
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
    const startOfDay = startDate.length === ISO_DATE_LENGTH ? `${startDate}T00:00:00` : startDate
    const endOfDay = endDate.length === ISO_DATE_LENGTH ? `${endDate}T23:59:59` : endDate

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

  async update(id: number, dto: UpdateFrequentationDto): Promise<FrequentationEntity | null> {
    const existingFrequentation = await this.getById(id)
    if (!existingFrequentation) {
      return null
    }

    const now = new Date().toISOString()
    await this.db
      .update(frequentationTable)
      .set({
        ...(dto.startsAt !== undefined && { startsAt: dto.startsAt }),
        ...(dto.activity !== undefined && { activity: dto.activity }),
        ...(dto.studentId !== undefined && { studentId: dto.studentId }),
        updatedAt: now
      })
      .where(eq(frequentationTable.id, id))

    return this.getById(id)
  }

  async delete(id: number): Promise<boolean> {
    const existingFrequentation = await this.getById(id)
    if (!existingFrequentation) {
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
