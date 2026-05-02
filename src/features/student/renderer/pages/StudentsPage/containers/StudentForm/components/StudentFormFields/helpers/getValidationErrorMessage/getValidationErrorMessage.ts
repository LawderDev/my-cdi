export function getValidationErrorMessage(
  field: string,
  hasError: boolean,
  translate: (key: string, options?: Record<string, unknown>) => string
): string | undefined {
  if (!hasError) {
    return undefined
  }
  return translate('validation.required', { field: translate(`fields.${field}`) })
}
