import type { HeaderViewProps } from './types/HeaderViewProps'

const HEADER_CLASSES =
  'h-header flex items-center justify-between px-7 border-b border-border flex-shrink-0 bg-bg'
const LEFT_CLASSES = 'flex items-center gap-4'
const TITLE_CLASSES = 'text-[17px] font-semibold tracking-[-0.3px]'
const SUBTITLE_CLASSES = 'text-xs text-text-dim font-normal'
const RIGHT_CLASSES = 'flex items-center gap-3'
const CLOCK_CLASSES = 'font-mono text-[13px] text-text-dim'

export function HeaderView({ title, subtitle, time }: HeaderViewProps) {
  return (
    <header className={HEADER_CLASSES}>
      <div className={LEFT_CLASSES}>
        <div>
          <div className={TITLE_CLASSES}>{title}</div>
          <div className={SUBTITLE_CLASSES}>{subtitle}</div>
        </div>
      </div>
      <div className={RIGHT_CLASSES}>
        <div className={CLOCK_CLASSES}>{time}</div>
      </div>
    </header>
  )
}
