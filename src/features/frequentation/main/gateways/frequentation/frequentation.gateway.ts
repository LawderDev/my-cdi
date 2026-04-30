import type {
  FrequentationEntity,
  FrequentationWithStudentEntity
} from '@frequentation/entities/frequentation'
import type { CreateFrequentationDto, UpdateFrequentationDto } from '@frequentation-shared'

export interface FrequentationGateway {
  create(frequentationData: CreateFrequentationDto): Promise<FrequentationEntity>
  getById(id: number): Promise<FrequentationEntity | null>
  getAll(): Promise<FrequentationWithStudentEntity[]>
  getByStudentId(studentId: number): Promise<FrequentationWithStudentEntity[]>
  getByDateRange(startDate: string, endDate: string): Promise<FrequentationWithStudentEntity[]>
  update(id: number, dto: UpdateFrequentationDto): Promise<FrequentationEntity | null>
  delete(id: number): Promise<boolean>
  deleteByStudentId(studentId: number): Promise<number>
  count(): Promise<number>
}
