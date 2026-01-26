// Frequentation Module Repository
// Data access layer for frequentation operations

import { BaseRepository } from '../../shared/base.repository'
import {
  FrequentationEntity,
  FrequentationWithStudentEntity,
  FrequentationDbRow,
  FrequentationWithStudentDbRow
} from '../../../main/types/entities/frequentation.entity'
import {
  CreateFrequentationDto,
  UpdateFrequentationDto
} from '../../../shared/types/dtos/frequentation.dto'
import { FrequentationRepository } from './types'
import {
  INSERT_FREQUENTATION,
  SELECT_ALL_FREQUENTATIONS,
  SELECT_FREQUENTATION_BY_ID,
  SELECT_FREQUENTATIONS_BY_STUDENT_ID,
  SELECT_FREQUENTATIONS_BY_DATE_RANGE,
  SELECT_ALL_FREQUENTATIONS_WITH_STUDENT,
  DELETE_FREQUENTATION,
  DELETE_FREQUENTATIONS_BY_STUDENT_ID,
  COUNT_FREQUENTATIONS
} from './sql'
import {
  transformFrequentationDtoToEntity,
  transformFrequentationUpdateDtoToEntity,
  transformFrequentationDbRowToEntity,
  transformFrequentationWithStudentDbRowToEntity
} from './repository.helpers'

export class FrequentationModuleRepository
  extends BaseRepository
  implements FrequentationRepository
{
  constructor(db: any) {
    super(db)
  }

  async create(frequentationDto: CreateFrequentationDto): Promise<FrequentationEntity> {
    const entity = transformFrequentationDtoToEntity(frequentationDto)
    const params = [entity.starts_at, entity.activity, entity.student_id]

    const result = await this.executeRun(INSERT_FREQUENTATION, params)
    const createdFrequentation = await this.findById(result.lastID)

    if (!createdFrequentation) {
      throw new Error('Failed to retrieve created frequentation')
    }

    return createdFrequentation
  }

  async findAll(): Promise<FrequentationEntity[]> {
    const rows = await this.executeQuery<FrequentationDbRow>(SELECT_ALL_FREQUENTATIONS)
    return rows.map((row) => transformFrequentationDbRowToEntity(row))
  }

  async findById(id: number): Promise<FrequentationEntity | null> {
    const row = await this.executeGet<FrequentationDbRow>(SELECT_FREQUENTATION_BY_ID, [id])

    if (!row) return null

    return transformFrequentationDbRowToEntity(row)
  }

  async update(id: number, updateDto: UpdateFrequentationDto): Promise<FrequentationEntity | null> {
    console.log('[REPO] Checking if frequentation exists:', id)
    const existing = await this.findById(id)
    if (!existing) {
      return null
    }

    const entity = transformFrequentationUpdateDtoToEntity(updateDto)

    // Only update if there are fields to update
    if (Object.keys(entity).length === 0) {
      return this.findById(id)
    }

    const setParts: string[] = []
    const params: any[] = []

    if (entity.starts_at !== undefined) {
      setParts.push('starts_at = ?')
      params.push(entity.starts_at)
    }
    if (entity.activity !== undefined) {
      setParts.push('activity = ?')
      params.push(entity.activity)
    }
    if (entity.student_id !== undefined) {
      setParts.push('student_id = ?')
      params.push(entity.student_id)
    }

    // Always update updated_at
    setParts.push("updated_at = datetime('now')")

    const sql = `UPDATE frequentation SET ${setParts.join(', ')} WHERE id = ?`
    params.push(id)

    try {
      const result = await this.executeRun(sql, params)

      if (result.changes === 0) {
        console.warn(
          'No rows updated. Possible causes: ID not found, value unchanged, or SQL error'
        )
      }
    } catch (error) {
      console.error('SQL execution failed:', error)
      throw error
    }

    const after = await this.findById(id)

    return after
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.executeRun(DELETE_FREQUENTATION, [id])
    return result.changes > 0
  }

  async findByStudentId(studentId: number): Promise<FrequentationEntity[]> {
    const rows = await this.executeQuery<FrequentationDbRow>(SELECT_FREQUENTATIONS_BY_STUDENT_ID, [
      studentId
    ])
    return rows.map((row) => transformFrequentationDbRowToEntity(row))
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<FrequentationWithStudentEntity[]> {
    const rows = await this.executeQuery<FrequentationWithStudentDbRow>(
      SELECT_FREQUENTATIONS_BY_DATE_RANGE,
      [startDate.toISOString(), endDate.toISOString()]
    )
    return rows.map((row) => transformFrequentationWithStudentDbRowToEntity(row))
  }

  async findAllWithStudent(): Promise<FrequentationWithStudentEntity[]> {
    const rows = await this.executeQuery<FrequentationWithStudentDbRow>(
      SELECT_ALL_FREQUENTATIONS_WITH_STUDENT
    )
    return rows.map((row) => transformFrequentationWithStudentDbRowToEntity(row))
  }

  async count(): Promise<number> {
    const result = await this.executeGet<{ count: number }>(COUNT_FREQUENTATIONS)
    return result?.count || 0
  }

  async deleteByStudentId(studentId: number): Promise<number> {
    const result = await this.executeRun(DELETE_FREQUENTATIONS_BY_STUDENT_ID, [studentId])
    return result.changes
  }
}
