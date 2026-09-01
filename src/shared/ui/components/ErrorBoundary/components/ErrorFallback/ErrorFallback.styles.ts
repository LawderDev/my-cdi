import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'
import type { CSSProperties } from 'react'
import { theme } from '@ui/theme'
import { MONO_FONT_FAMILY } from '@ui/theme'
import { Card } from '@ui/components/Card'

const CARD_MAX_WIDTH_PX = 600
const PAGE_MIN_HEIGHT = '60vh'
const PAGE_PADDING = 3
const GAP_SMALL = 1.5
const MB_MEDIUM = 2
const MB_LARGE = 2.5
const PRE_MARGIN_TOP = 0.5

export const ICON_CSS: CSSProperties = {
  color: theme.palette.error.main,
  fontSize: theme.typography.h2.fontSize
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
  margin: 0
})

export const DescriptionText = styled(Typography, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(MB_LARGE)
}))

export const DetailsBox = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  marginBottom: theme.spacing(MB_LARGE),
  fontFamily: MONO_FONT_FAMILY,
  fontSize: theme.typography.body2.fontSize,
  color: theme.palette.text.disabled
}))

export const PreBlock = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  whiteSpace: 'pre-wrap',
  marginTop: theme.spacing(PRE_MARGIN_TOP)
}))
