const ZERO = 0

export function getJournalPageTitle(baseTitle: string, count: number): string {
  if (count <= ZERO) {
    return baseTitle
  }
  return `${baseTitle} (${count})`
}
