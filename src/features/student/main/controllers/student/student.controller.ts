import type { IpcMain } from 'electron'
import { createMainRouter } from '@shared/ipc/router'
import { STUDENT_CHANNELS } from '@shared/ipc/channels'
import { unwrap } from '@shared/lib/use-case'
import type { StudentGateway } from '@student/gateways/student'
import { createStudent } from '@student/use-cases/createStudent'
import { updateStudent } from '@student/use-cases/updateStudent'
import { deleteStudent } from '@student/use-cases/deleteStudent'
import { getStudent } from '@student/use-cases/getStudent'
import { listStudents } from '@student/use-cases/listStudents'
import { importStudentsCsv } from '@student/use-cases/importStudentsCsv'
import type { ImportStudentsCsvPayload } from '@student-shared'

interface CreateStudentInput {
  nom: string
  prenom: string
  classe: string
  ine: string
}

interface GetStudentInput {
  id: number
}

interface ListStudentsInput {
  classe?: string
}

interface UpdateStudentInput {
  id: number
  nom?: string
  prenom?: string
  classe?: string
  ine?: string
}

interface DeleteStudentInput {
  id: number
}

export type IpcMainHandle = Pick<IpcMain, 'handle'>

export function registerStudentController(ipcMain: IpcMainHandle, gateway: StudentGateway): void {
  const router = createMainRouter(ipcMain)
  const deps = { gateway }

  router.procedure(STUDENT_CHANNELS.CREATE, async (input: CreateStudentInput) => {
    return unwrap(await createStudent(deps, input))
  })

  router.procedure(STUDENT_CHANNELS.GET, async (input: GetStudentInput) => {
    return unwrap(await getStudent(deps, input))
  })

  router.procedure(STUDENT_CHANNELS.LIST, async (input: ListStudentsInput) => {
    return unwrap(await listStudents(deps, input))
  })

  router.procedure(STUDENT_CHANNELS.UPDATE, async (input: UpdateStudentInput) => {
    const { id, ...dto } = input
    return unwrap(await updateStudent(deps, { id, dto }))
  })

  router.procedure(STUDENT_CHANNELS.DELETE, async (input: DeleteStudentInput) => {
    return unwrap(await deleteStudent(deps, input))
  })

  router.procedure(STUDENT_CHANNELS.IMPORT_CSV, async (input: ImportStudentsCsvPayload) => {
    return unwrap(await importStudentsCsv(deps, input))
  })
}
