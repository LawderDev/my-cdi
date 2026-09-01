import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { styled } from '@mui/material/styles'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'
import {
  LABEL_FONT_SIZE_PX,
  LABEL_FONT_WEIGHT,
  INPUT_HEIGHT_PX,
  INPUT_FONT_SIZE_PX,
  ERROR_FONT_SIZE_PX
} from './components/StudentFormFieldsPresenter/StudentFormFieldsPresenter.styles'

export const FieldRow = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})({
  mb: 2
})

export const FieldLabel = styled('label', {
  shouldForwardProp: shouldForwardStyledProp
})({
  display: 'block',
  fontSize: `${LABEL_FONT_SIZE_PX}px`,
  fontWeight: LABEL_FONT_WEIGHT,
  color: 'var(--text-dim)',
  textTransform: 'uppercase',
  letterSpacing: '0.8px',
  mb: 0.75
})

export const FieldError = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})({
  mt: 0.5,
  fontSize: `${ERROR_FONT_SIZE_PX}px`,
  color: 'var(--danger)'
})

export const FieldInput = styled(TextField, {
  shouldForwardProp: shouldForwardStyledProp
})({
  '& .MuiOutlinedInput-root': {
    height: `${INPUT_HEIGHT_PX}px`,
    fontSize: `${INPUT_FONT_SIZE_PX}px`,
    bgcolor: 'var(--surface)',
    color: 'var(--title)',
    borderRadius: 'var(--radius-sm)',
    transition: 'border-color 0.2s'
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'var(--border)'
  },
  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'var(--border-light)'
  },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: 'var(--accent)',
    boxShadow: '0 0 0 3px var(--accent-bg)'
  },
  '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
    borderColor: 'var(--danger)'
  },
  '& .MuiOutlinedInput-root.Mui-error:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'var(--danger)'
  },
  '& .MuiOutlinedInput-root.Mui-error.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: 'var(--danger)',
    boxShadow: 'none'
  }
})
