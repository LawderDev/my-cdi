import type { Frequentation } from '../types/frequentation'

export const FrequentationService = {
  async fetchFrequentationsAt(
    date: string
  ): Promise<{ success: boolean; data?: Frequentation[]; error?: string }> {
    const frequentationsRes = await window.electronAPI.fetchFrequentationsAt(date)
    return frequentationsRes
  },
  async createFrequentations(
    payload: Array<Record<string, unknown>>
  ): Promise<{ success: boolean; data?: Frequentation[]; error?: string }> {
    const result = await window.electronAPI.createFrequentations(payload)
    return result
  },
  async deleteFrequentations(
    ids: number[]
  ): Promise<{ success: boolean; ids?: number[]; error?: string }> {
    const result = await window.electronAPI.deleteFrequentations(ids)
    return result
  }
}

export default FrequentationService
