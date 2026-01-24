import type { Student } from '../types/student'

export const StudentService = {
  async fetchStudentsWithoutFrequentationAt(
    date: string
  ): Promise<{ success: boolean; data?: Student[]; error?: string }> {
    const result = await window.electronAPI.fetchStudentsWithoutFrequentationAt(date)
    return result
  }
}

export default StudentService
