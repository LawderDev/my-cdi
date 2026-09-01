import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'
import type { CSSProperties } from 'react'
import { MONO_FONT_FAMILY } from '@ui/theme'
import { Card } from '@ui/components/Card'

const CARD_MAX_WIDTH_PX = 600
const ICON_FONT_SIZE_PX = 48
const FONT_WEIGHT_SEMIBOLD = 600
const TITLE_FONT_SIZE = '20px'
const PAGE_MIN_HEIGHT = '60vh'
const PAGE_PADDING = 3
const GAP_SMALL = 1.5
const MB_MEDIUM = 2
const MB_LARGE = 2.5
const DETAILS_FONT_SIZE = '12px'
const PRE_MARGIN_TOP = 0.5

export const ICON_CSS: CSSProperties = {
  color: 'var(--danger)',
  fontSize: `${ICON_FONT_SIZE_PX}px`
}

export const PageRoot = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: PAGE_MIN_HEIGHT,
  padding: theme.spacing(PAGE_PADDING)
}))

export const FallbackCard = styled(Card, {
  shouldForwardProp: shouldForwardStyledProp
})({
  maxWidth: `${CARD_MAX_WIDTH_PX}px`,
  width: '100%'
})

export const TitleRow = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(GAP_SMALL),
  marginBottom: theme.spacing(MB_MEDIUM)
}))

export const Heading = styled(Typography, {
  shouldForwardProp: shouldForwardStyledProp
})({
  margin: 0,
  lineHeight: 1.5,
  fontSize: TITLE_FONT_SIZE,
  fontWeight: FONT_WEIGHT_SEMIBOLD
})

export const DescriptionText = styled(Typography, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  color: 'var(--text)',
  marginBottom: theme.spacing(MB_LARGE)
}))

export const DetailsBox = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  marginBottom: theme.spacing(MB_LARGE),
  fontFamily: MONO_FONT_FAMILY,
  fontSize: DETAILS_FONT_SIZE,
  color: 'var(--text-dim)'
}))

export const PreBlock = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  whiteSpace: 'pre-wrap',
  marginTop: theme.spacing(PRE_MARGIN_TOP)
}))
