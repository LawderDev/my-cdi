import {
  FrequentationResponseDto,
  CreateFrequentationDto,
  UpdateFrequentationDto,
  FrequentationApiResponseDto,
  BulkFrequentationResponseDto,
  JournalEntryDto
} from '@shared/types'

export const FrequentationService = {
  async getAll(): Promise<{ success: boolean; data?: FrequentationResponseDto[]; error?: string }> {
    return (await window.electronAPI.invoke('frequentation:getAll')) as {
      success: boolean
      data?: FrequentationResponseDto[]
      error?: string
    }
  },

  async getById(id: number): Promise<FrequentationApiResponseDto> {
    return (await window.electronAPI.invoke(
      'frequentation:getById',
      id
    )) as FrequentationApiResponseDto
  },

  async create(frequentationData: CreateFrequentationDto): Promise<FrequentationApiResponseDto> {
    return (await window.electronAPI.invoke(
      'frequentation:create',
      frequentationData
    )) as FrequentationApiResponseDto
  },

  async update(
    id: number,
    updateData: UpdateFrequentationDto
  ): Promise<FrequentationApiResponseDto> {
    return (await window.electronAPI.invoke(
      'frequentation:update',
      id,
      updateData
    )) as FrequentationApiResponseDto
  },

  async delete(id: number): Promise<{ success: boolean; error?: string }> {
    return (await window.electronAPI.invoke('frequentation:delete', id)) as {
      success: boolean
      error?: string
    }
  },

  async getByDateRange(
    startDate: string,
    endDate: string
  ): Promise<{ success: boolean; data?: FrequentationResponseDto[]; error?: string }> {
    return (await window.electronAPI.invoke(
      'frequentation:getByDateRange',
      startDate,
      endDate
    )) as {
      success: boolean
      data?: FrequentationResponseDto[]
      error?: string
    }
  },

  async getByStudent(
    studentId: number
  ): Promise<{ success: boolean; data?: FrequentationResponseDto[]; error?: string }> {
    return (await window.electronAPI.invoke('frequentation:getByStudent', studentId)) as {
      success: boolean
      data?: FrequentationResponseDto[]
      error?: string
    }
  },

  async getByActivity(
    activity: string
  ): Promise<{ success: boolean; data?: FrequentationResponseDto[]; error?: string }> {
    return (await window.electronAPI.invoke('frequentation:getByActivity', activity)) as {
      success: boolean
      data?: FrequentationResponseDto[]
      error?: string
    }
  },

  async createBatch(
    frequentations: CreateFrequentationDto[]
  ): Promise<BulkFrequentationResponseDto> {
    return (await window.electronAPI.invoke(
      'frequentation:createBatch',
      frequentations
    )) as BulkFrequentationResponseDto
  },

  async getJournal(
    startDate: string,
    endDate: string
  ): Promise<{ success: boolean; data?: JournalEntryDto[]; error?: string }> {
    return (await window.electronAPI.invoke('frequentation:getJournal', startDate, endDate)) as {
      success: boolean
      data?: JournalEntryDto[]
      error?: string
    }
  },

  async getStats(
    startDate?: string,
    endDate?: string
  ): Promise<{
    total: number
    byActivity: Record<string, number>
    byStudent: Record<string, number>
    averageDuration?: string
  }> {
    return (await window.electronAPI.invoke('frequentation:getStats', startDate, endDate)) as {
      total: number
      byActivity: Record<string, number>
      byStudent: Record<string, number>
      averageDuration?: string
    }
  },

  async validate(
    frequentationData: CreateFrequentationDto | UpdateFrequentationDto
  ): Promise<{ isValid: boolean; errors: string[] }> {
    return (await window.electronAPI.invoke('frequentation:validate', frequentationData)) as {
      isValid: boolean
      errors: string[]
    }
  },

  // Compatibility methods for existing frontend code - gradually migrate away from these
  async fetchFrequentationsAt(
    date: string
  ): Promise<{ success: boolean; data?: FrequentationResponseDto[]; error?: string }> {
    return (await window.electronAPI.invoke('frequentation:getByDate', date)) as {
      success: boolean
      data?: FrequentationResponseDto[]
      error?: string
    }
  },

  async createFrequentations(
    payload: CreateFrequentationDto[]
  ): Promise<{ success: boolean; data?: FrequentationResponseDto[]; error?: string }> {
    const result = await this.createBatch(payload)
    return {
      success: result.success,
      data: result.created ? [] : undefined,
      error: result.errors?.join(', ')
    }
  },

  async deleteFrequentations(
    ids: number[]
  ): Promise<{ success: boolean; ids?: number[]; error?: string }> {
    try {
      const results = await Promise.all(ids.map((id) => this.delete(id)))
      const failures = results.filter((r) => !r.success)

      if (failures.length > 0) {
        return {
          success: false,
          ids: ids,
          error: `Failed to delete ${failures.length} frequentation(s): ${failures.map((f) => f.error).join(', ')}`
        }
      }

      return {
        success: true,
        ids: ids
      }
    } catch (error) {
      return {
        success: false,
        ids: ids,
        error: `Error deleting frequentations: ${error}`
      }
    }
  }
}

// Helper functions moved to ../helpers/frequentation.helpers.ts

export default FrequentationService
