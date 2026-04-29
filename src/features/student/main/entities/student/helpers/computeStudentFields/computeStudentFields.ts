export function computeStudentFields(input: { prenom: string; nom: string }): {
  fullName: string
} {
  const fullName = `${input.prenom.trim()} ${input.nom.trim()}`
  return { fullName }
}
