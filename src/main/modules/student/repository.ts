// Student Module Repository
// Data access layer for student operations

import { BaseRepository } from '../../shared/base.repository'
import { StudentEntity, StudentDbRow } from '../../../main/types/entities/student.entity'
import { CreateStudentDto, UpdateStudentDto } from '../../../shared/types/dtos/student.dto'
import { StudentRepository } from './types'
import {
  INSERT_STUDENT,
  SELECT_ALL_STUDENTS,
  SELECT_STUDENT_BY_ID,
  SELECT_STUDENTS_BY_CLASS,
  UPDATE_STUDENT,
  DELETE_STUDENT,
  COUNT_STUDENTS,
  SELECT_STUDENTS_WITHOUT_FREQUENTATION_AT_DATE
} from './sql'
import {
  transformStudentDtoToEntity,
  transformStudentUpdateDtoToEntity,
  transformStudentDbRowToEntity
} from './repository.helpers'

export class StudentModuleRepository extends BaseRepository implements StudentRepository {
  constructor(db: any) {
    super(db)
  }
  async create(studentDto: CreateStudentDto): Promise<StudentEntity> {
    const entity = transformStudentDtoToEntity(studentDto)
    const params = [entity.nom, entity.prenom, entity.classe]

    const result = await this.executeRun(INSERT_STUDENT, params)
    const createdStudent = await this.findById(result.lastID)

    if (!createdStudent) {
      throw new Error('Failed to retrieve created student')
    }

    return createdStudent
  }

  async findAll(): Promise<StudentEntity[]> {
    const rows = await this.executeQuery<StudentDbRow>(SELECT_ALL_STUDENTS)
    return rows.map((row) => transformStudentDbRowToEntity(row))
  }

  async findById(id: number): Promise<StudentEntity | null> {
    const row = await this.executeGet<StudentDbRow>(SELECT_STUDENT_BY_ID, [id])

    if (!row) return null

    return transformStudentDbRowToEntity(row)
  }

  async update(id: number, updateDto: UpdateStudentDto): Promise<StudentEntity | null> {
    const entity = transformStudentUpdateDtoToEntity(updateDto)

    // Only update if there are fields to update
    if (Object.keys(entity).length === 0) {
      return this.findById(id)
    }

    const params = [entity.nom, entity.prenom, entity.classe, id]

    await this.executeRun(UPDATE_STUDENT, params)
    return this.findById(id)
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.executeRun(DELETE_STUDENT, [id])
    return result.changes > 0
  }

  async count(): Promise<number> {
    const result = await this.executeGet<{ count: number }>(COUNT_STUDENTS)
    return result?.count || 0
  }

  async findByClass(classe: string): Promise<StudentEntity[]> {
    const rows = await this.executeQuery<StudentDbRow>(SELECT_STUDENTS_BY_CLASS, [classe])
    return rows.map((row) => transformStudentDbRowToEntity(row))
  }

  async findWithoutFrequentationAtDate(date: string): Promise<StudentEntity[]> {
    const rows = await this.executeQuery<StudentDbRow>(
      SELECT_STUDENTS_WITHOUT_FREQUENTATION_AT_DATE,
      [date]
    )
    return rows.map((row) => transformStudentDbRowToEntity(row))
  }
}
