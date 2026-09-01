import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { styled } from '@mui/material/styles'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'

const PADDING_X_STEPS = 3
const PT_SPACING = 2.5
const PY_BODY_SPACING = 2.5
const PB_FOOTER_SPACING = 2.5
const FONT_WEIGHT_SEMIBOLD = 600
const TITLE_FONT_SIZE = '16px'
const TITLE_PB = 0
const FOOTER_GAP = 1

export const DialogRoot = styled(Dialog, {
  shouldForwardProp: shouldForwardStyledProp
})({
  '& .MuiPaper-root': {
    backgroundColor: 'var(--card)',
    backgroundImage: 'none',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    boxShadow: 'var(--shadow-lg)'
  }
})

export const DialogHeader = styled(DialogTitle, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingInline: theme.spacing(PADDING_X_STEPS),
  paddingTop: theme.spacing(PT_SPACING),
  paddingBottom: TITLE_PB,
  fontSize: TITLE_FONT_SIZE,
  fontWeight: FONT_WEIGHT_SEMIBOLD
}))

export const DialogBody = styled(DialogContent, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  paddingInline: theme.spacing(PADDING_X_STEPS),
  paddingBlock: theme.spacing(PY_BODY_SPACING)
}))

export const DialogFooter = styled(DialogActions, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  paddingInline: theme.spacing(PADDING_X_STEPS),
  paddingBottom: theme.spacing(PB_FOOTER_SPACING),
  gap: theme.spacing(FOOTER_GAP)
}))
