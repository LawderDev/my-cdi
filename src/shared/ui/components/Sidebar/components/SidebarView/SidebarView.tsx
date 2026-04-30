import { useTranslation } from 'react-i18next'
import { Icon } from '../../../Icon'
import type { SidebarViewProps } from './types/SidebarViewProps'

const NAV_CLASSES =
  'w-sidebar bg-bg-nav flex flex-col items-center py-3 border-r border-border flex-shrink-0 relative z-10'

const LOGO_CLASSES =
  'w-9 h-9 rounded-[10px] flex items-center justify-center mb-6 font-bold text-[13px] text-white tracking-[-0.5px]'

const LOGO_STYLE = {
  background: 'linear-gradient(135deg, var(--accent), #b388ff)',
  boxShadow: '0 2px 8px rgba(var(--accent-rgb), 0.4)'
} as const

const NAV_LIST_CLASSES = 'flex flex-col gap-1 w-full px-2 flex-1'
const BOTTOM_CLASSES = 'flex flex-col gap-1 px-2 pb-1'

const BTN_BASE_CLASSES =
  'w-[52px] h-12 rounded-sm flex items-center justify-center relative transition-all duration-200 text-text-dim hover:bg-card hover:text-text'
const BTN_ACTIVE_CLASSES =
  'bg-accent-bg text-accent before:content-[""] before:absolute before:-left-2 before:top-1/2 before:-translate-y-1/2 before:w-[3px] before:h-5 before:bg-accent before:rounded-r-[3px]'

const ICON_CLASSES = 'text-[22px]'

const SETTINGS_ICON_NAME = 'settings'
const SETTINGS_LABEL_KEY = 'nav.settings'

export function SidebarView({ items, activePath, onNavigate, onSettingsClick }: SidebarViewProps) {
  const { t } = useTranslation('common')

  return (
    <nav className={NAV_CLASSES}>
      <div className={LOGO_CLASSES} style={LOGO_STYLE}>
        CDI
      </div>
      <div className={NAV_LIST_CLASSES}>
        {items.map((item) => {
          const isActive = item.path === activePath
          const label = t(item.labelKey)
          const finalClass = isActive
            ? `${BTN_BASE_CLASSES} ${BTN_ACTIVE_CLASSES}`
            : BTN_BASE_CLASSES
          return (
            <button
              key={item.path}
              type="button"
              className={finalClass}
              title={label}
              aria-label={label}
              aria-current={isActive ? 'page' : undefined}
              onClick={() => onNavigate(item.path)}
            >
              <Icon name={item.iconName} className={ICON_CLASSES} />
            </button>
          )
        })}
      </div>
      <div className={BOTTOM_CLASSES}>
        <button
          type="button"
          className={BTN_BASE_CLASSES}
          title={t(SETTINGS_LABEL_KEY)}
          aria-label={t(SETTINGS_LABEL_KEY)}
          onClick={onSettingsClick}
        >
          <Icon name={SETTINGS_ICON_NAME} className={ICON_CLASSES} />
        </button>
      </div>
    </nav>
  )
}
