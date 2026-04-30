import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import commonFr from './locales/fr/common.json'
import studentFr from './locales/fr/student.json'
import frequentationFr from './locales/fr/frequentation.json'
import statisticsFr from './locales/fr/statistics.json'

export const defaultNS = 'common'

i18n.use(initReactI18next).init({
  resources: {
    fr: {
      common: commonFr,
      student: studentFr,
      frequentation: frequentationFr,
      statistics: statisticsFr
    }
  },
  lng: 'fr',
  fallbackLng: 'fr',
  defaultNS,
  interpolation: { escapeValue: false }
})

export default i18n
