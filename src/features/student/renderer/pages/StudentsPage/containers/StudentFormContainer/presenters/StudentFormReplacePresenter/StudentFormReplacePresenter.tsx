import { ReplaceMessage } from './StudentFormReplacePresenter.styles'

interface StudentFormReplacePresenterProps {
  message: string
}

export function StudentFormReplacePresenter({ message }: StudentFormReplacePresenterProps) {
  return <ReplaceMessage variant="body1">{message}</ReplaceMessage>
}
