import type { FrequentationGateway } from '@frequentation/gateways/frequentation'
import type { StudentGateway } from '@student/gateways/student'
import type { DateRangeDto, JournalEntryDto } from '@frequentation-shared'
import type { UseCaseResult } from '../types/UseCaseResult'
import { formatFrequentationResponse } from '../helpers/formatFrequentationResponse'

export async function getJournalEntries(
  frequentationGateway: FrequentationGateway,
  studentGateway: StudentGateway,
  dateRange: DateRangeDto
): Promise<UseCaseResult<JournalEntryDto[]>> {
  try {
    const frequentations = await frequentationGateway.getByDateRange(
      dateRange.startDate,
      dateRange.endDate
    )

    const entries: JournalEntryDto[] = []

    for (const frequentation of frequentations) {
      const student = await studentGateway.getById(frequentation.studentId)
      const frequentationResponse = formatFrequentationResponse(frequentation)

      entries.push({
        frequentation: frequentationResponse,
        student: student
          ? {
              id: student.id,
              nom: student.nom,
              prenom: student.prenom,
              classe: student.classe,
              ine: student.ine
            }
          : {
              id: frequentation.studentId,
              nom: frequentation.studentNom,
              prenom: frequentation.studentPrenom,
              classe: frequentation.studentClasse,
              ine: frequentation.studentIne
            }
      })
    }

    return { success: true, data: entries }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return { success: false, error: message }
  }
}
