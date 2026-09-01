import { useTranslation } from 'react-i18next'
import { Avatar } from '@ui/components/Avatar'
import { IconButton } from '@ui/components/IconButton'
import { ActivityChipPresenter } from '@frequentation/presenters/ActivityChipPresenter'
import {
  ACTIONS_CLASS,
  ClasseTag,
  MetaRow,
  PeriodTag,
  Row,
  RowActions,
  RowMain,
  StudentName,
  TimeText
} from './JournalEntryRowPresenter.styles'

export interface JournalEntryRowPresenterProps {
  initials: string
  avatarColorSeed: number
  displayName: string
  classe: string
  time: string
  periodLabel: string
  periodClass: string
  activityCssClass: string
  activityLabel: string
  selected: boolean
  onRowClick: (event: React.MouseEvent) => void
  onEditClick: (event: React.MouseEvent) => void
  onDeleteClick: (event: React.MouseEvent) => void
}

export function JournalEntryRowPresenter({
  initials,
  avatarColorSeed,
  displayName,
  classe,
  time,
  periodLabel,
  periodClass,
  activityCssClass,
  activityLabel,
  selected,
  onRowClick,
  onEditClick,
  onDeleteClick
}: JournalEntryRowPresenterProps) {
  const { t } = useTranslation('frequentation')

  return (
    <Row role="row" onClick={onRowClick} $isSelected={selected}>
      <Avatar initials={initials} colorSeed={avatarColorSeed} />
      <RowMain>
        <StudentName>
          {displayName}
          <ClasseTag>{classe}</ClasseTag>
        </StudentName>
        <MetaRow>
          <TimeText>{time}</TimeText>
          <PeriodTag className={periodClass}>{periodLabel}</PeriodTag>
          <ActivityChipPresenter cssClass={activityCssClass} label={activityLabel} />
        </MetaRow>
      </RowMain>
      <RowActions className={ACTIONS_CLASS}>
        <IconButton iconName="edit" aria-label={t('row.edit')} onClick={onEditClick} />
        <IconButton
          iconName="delete"
          tone="danger"
          aria-label={t('row.delete')}
          onClick={onDeleteClick}
        />
      </RowActions>
    </Row>
  )
}
