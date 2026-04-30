const SINGULAR_THRESHOLD = 1

export function formatBatchMessage(count: number): string {
  const isPlural = count > SINGULAR_THRESHOLD
  if (isPlural) {
    return `${count} élèves sélectionnés`
  }
  return `${count} élève sélectionné`
}
