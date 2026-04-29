import type { StudentEntity } from '@student/entities/student'
import type { CreateStudentDto, UpdateStudentDto } from '@student-shared'

export interface StudentGateway {
  create(studentData: CreateStudentDto): Promise<StudentEntity>
  getById(id: number): Promise<StudentEntity | null>
  getAll(): Promise<StudentEntity[]>
  update(id: number, dto: UpdateStudentDto): Promise<StudentEntity | null>
  delete(id: number): Promise<boolean>
  getByClass(classe: string): Promise<StudentEntity[]>
  getByIds(ids: number[]): Promise<StudentEntity[]>
}
