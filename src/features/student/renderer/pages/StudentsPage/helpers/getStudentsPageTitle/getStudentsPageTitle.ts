const ZERO_COUNT = 0

export function getStudentsPageTitle(baseTitle: string, count: number): string {
  if (count <= ZERO_COUNT) {
    return baseTitle
  }
  return `${baseTitle} (${count})`
}
