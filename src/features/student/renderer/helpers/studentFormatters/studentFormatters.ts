const DISPLAY_NAME_SEPARATOR = ' '
const SINGULAR_COUNT = 1

export function formatStudentDisplayName(prenom: string, nom: string): string {
  return `${prenom.trim()}${DISPLAY_NAME_SEPARATOR}${nom.trim()}`
}

export function formatStudentClass(classe: string): string {
  return classe.trim()
}

export function formatStudentIne(ine: string): string {
  return ine.trim()
}

export function formatBatchDeleteMessage(count: number): string {
  if (count === SINGULAR_COUNT) {
    return `Voulez-vous vraiment supprimer ${count} élève ?`
  }
  return `Voulez-vous vraiment supprimer ${count} élève(s) ?`
}
