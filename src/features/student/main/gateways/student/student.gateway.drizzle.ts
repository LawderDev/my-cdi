import { eq, inArray } from 'drizzle-orm'
import type { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3'
import type { StudentGateway } from './student.gateway'
import type { StudentEntity } from '@student/entities/student'
import { studentTable } from '@student/entities/student'
import type { CreateStudentDto, UpdateStudentDto } from '@student-shared'
import { mapStudentRow } from './helpers/mapStudentRow'

export class StudentGatewayDrizzle implements StudentGateway {
  constructor(private db: BetterSQLite3Database<Record<string, unknown>>) {}

  async create(studentData: CreateStudentDto): Promise<StudentEntity> {
    const now = new Date().toISOString()
    const result = await this.db
      .insert(studentTable)
      .values({
        nom: studentData.nom,
        prenom: studentData.prenom,
        classe: studentData.classe,
        ine: studentData.ine,
        createdAt: now,
        updatedAt: now
      })
      .returning()

    const inserted = result[0]
    if (!inserted) {
      throw new Error('Failed to create student')
    }
    return mapStudentRow(inserted)
  }

  async getById(id: number): Promise<StudentEntity | null> {
    const result = await this.db.select().from(studentTable).where(eq(studentTable.id, id))
    const row = result[0]
    if (!row) {
      return null
    }
    return mapStudentRow(row)
  }

  async getAll(): Promise<StudentEntity[]> {
    const rows = await this.db.select().from(studentTable)
    return rows.map(mapStudentRow)
  }

  async update(id: number, dto: UpdateStudentDto): Promise<StudentEntity | null> {
    const existingStudent = await this.getById(id)
    if (!existingStudent) {
      return null
    }

    const now = new Date().toISOString()
    await this.db
      .update(studentTable)
      .set({
        ...(dto.nom !== undefined && { nom: dto.nom }),
        ...(dto.prenom !== undefined && { prenom: dto.prenom }),
        ...(dto.classe !== undefined && { classe: dto.classe }),
        ...(dto.ine !== undefined && { ine: dto.ine }),
        updatedAt: now
      })
      .where(eq(studentTable.id, id))

    return this.getById(id)
  }

  async delete(id: number): Promise<boolean> {
    const existingStudent = await this.getById(id)
    if (!existingStudent) {
      return false
    }
    await this.db.delete(studentTable).where(eq(studentTable.id, id))
    return true
  }

  async getByClass(classe: string): Promise<StudentEntity[]> {
    const rows = await this.db.select().from(studentTable).where(eq(studentTable.classe, classe))
    return rows.map(mapStudentRow)
  }

  async getByIds(ids: number[]): Promise<StudentEntity[]> {
    if (ids.length === 0) {
      return []
    }
    const rows = await this.db.select().from(studentTable).where(inArray(studentTable.id, ids))
    return rows.map(mapStudentRow)
  }
}
