const FIRST_CHAR_INDEX = 0

export function buildInitials(prenom: string, nom: string): string {
  return `${prenom.charAt(FIRST_CHAR_INDEX)}${nom.charAt(FIRST_CHAR_INDEX)}`.toUpperCase()
}
