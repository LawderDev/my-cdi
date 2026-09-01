import { styled as muiStyled } from '@mui/material/styles'
import type { CreateMUIStyled, CSSObject, Theme } from '@mui/material/styles'

/**
 * MUI v9's `styled()` serialises its style object with emotion's raw CSS
 * serializer: MUI system props (`mt`, `px`, `gap`, `bgcolor`, …) reach the
 * stylesheet unprocessed and the browser silently drops them. This wrapper
 * routes the style object through the theme's sx engine before emotion sees
 * it, restoring the exact semantics of the `sx` prop inside `styled()`.
 */
export const styled: CreateMUIStyled<Theme> = (component, options) => {
  const inner = muiStyled(component, options)
  const withSxEngine = (styleArg: CSSObject | ((props: object) => CSSObject)) =>
    inner((props: { theme: Theme }) => {
      const styles = typeof styleArg === 'function' ? styleArg(props) : styleArg
      return props.theme.unstable_sx(styles)
    })
  return Object.assign(withSxEngine, inner)
}
