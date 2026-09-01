const DISPLAY_NAME_SEPARATOR = ' '
const SINGULAR_COUNT = 1
const FIRST_CHAR_INDEX = 0

export function buildStudentInitials(prenom: string, nom: string): string {
  return `${prenom.charAt(FIRST_CHAR_INDEX)}${nom.charAt(FIRST_CHAR_INDEX)}`.toUpperCase()
}

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
