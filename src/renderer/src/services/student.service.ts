import {
  StudentResponseDto,
  CreateStudentDto,
  UpdateStudentDto,
  StudentApiResponseDto,
  StudentListResponseDto,
  BulkStudentResponseDto
} from '@shared/types'

export const StudentService = {
  // New API methods - type safe
  async getAll(): Promise<StudentListResponseDto> {
    const result = await window.electronAPI.invoke('student:getAll')
    return result as StudentListResponseDto
  },

  async getById(id: number): Promise<StudentApiResponseDto> {
    const result = await window.electronAPI.invoke('student:getById', id)
    return result as StudentApiResponseDto
  },

  async create(studentData: CreateStudentDto): Promise<StudentApiResponseDto> {
    const result = await window.electronAPI.invoke('student:create', studentData)
    return result as StudentApiResponseDto
  },

  async update(id: number, updateData: UpdateStudentDto): Promise<StudentApiResponseDto> {
    const result = await window.electronAPI.invoke('student:update', id, updateData)
    return result as StudentApiResponseDto
  },

  async delete(id: number): Promise<{ success: boolean; error?: string }> {
    const result = await window.electronAPI.invoke('student:delete', id)
    return result as { success: boolean; error?: string }
  },

  async getByClass(classe: string): Promise<StudentListResponseDto> {
    const result = await window.electronAPI.invoke('student:getByClass', classe)
    return result as StudentListResponseDto
  },

  async createBatch(students: CreateStudentDto[]): Promise<BulkStudentResponseDto> {
    const result = await window.electronAPI.invoke('student:createBatch', students)
    return result as BulkStudentResponseDto
  },

  async getStats(): Promise<{ total: number; byClass: Record<string, number> }> {
    const result = await window.electronAPI.invoke('student:getStats')
    return result as { total: number; byClass: Record<string, number> }
  },

  async validate(
    studentData: CreateStudentDto | UpdateStudentDto
  ): Promise<{ isValid: boolean; errors: string[] }> {
    const result = await window.electronAPI.invoke('student:validate', studentData)
    return result as { isValid: boolean; errors: string[] }
  },

  // Compatibility methods for existing frontend code - gradually migrate away from these
  async fetchAll(): Promise<StudentResponseDto[]> {
    const result = await this.getAll()
    return result.students
  },

  async fetchStudentsWithoutFrequentationAt(
    date: string
  ): Promise<{ success: boolean; data?: StudentResponseDto[]; error?: string }> {
    try {
      const result: StudentListResponseDto = await window.electronAPI.invoke(
        'student:getWithoutFrequentationAt',
        date
      )
      return {
        success: true,
        data: result.students
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  },

  async importStudents(
    students: Array<{ nom: string; prenom: string; classe?: string }>
  ): Promise<{ success: boolean; count?: number; error?: string }> {
    // Transform old format to new DTO format
    const dtos: CreateStudentDto[] = students.map((s) => ({
      nom: s.nom,
      prenom: s.prenom,
      classe: s.classe || ''
    }))

    const result = await this.createBatch(dtos)
    return {
      success: result.success,
      count: result.created,
      error: result.errors?.join(', ')
    }
  },

  async updateLegacy(
    id: number,
    payload: { nom: string; prenom: string; classe?: string }
  ): Promise<{ success: boolean; changes?: number; error?: string }> {
    const updateData: UpdateStudentDto = {
      nom: payload.nom,
      prenom: payload.prenom,
      ...(payload.classe && { classe: payload.classe })
    }

    const result = await this.update(id, updateData)
    return {
      success: result.success,
      changes: result.success ? 1 : 0,
      error: result.error
    }
  },

  async deleteLegacy(ids: number[]): Promise<{ success: boolean; count?: number; error?: string }> {
    // Use old API for now
    const result = await window.electronAPI.invoke('student:delete', { ids })
    return result as { success: boolean; count?: number; error?: string }
  }
}

// Helper functions moved to ../helpers/student.helpers.ts

export default StudentService
