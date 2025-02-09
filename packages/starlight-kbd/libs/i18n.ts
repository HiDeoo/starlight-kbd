import starlightConfig from 'virtual:starlight/user-config'

import type { StarlightKbdConfig } from './config'

export function getTypeLabel(locale: Locale, type: StarlightKbdConfig['types'][number]) {
  if (typeof type.label === 'string') return type.label

  let label: string
  const lang = getLangFromLocale(locale)

  if (type.label[lang]) {
    label = type.label[lang]
  } else {
    const defaultLang = starlightConfig.defaultLocale.lang ?? starlightConfig.defaultLocale.locale
    label = defaultLang ? (type.label[defaultLang] ?? '') : ''
  }

  if (label.length === 0) {
    throw new Error('A keyboard type label must have a key for the default language.')
  }

  return label
}

function getLangFromLocale(locale: Locale) {
  const lang = locale ? starlightConfig.locales?.[locale]?.lang : starlightConfig.locales?.root?.lang
  const defaultLang = starlightConfig.defaultLocale.lang ?? starlightConfig.defaultLocale.locale
  return lang ?? defaultLang ?? 'en'
}

type Locale = string | undefined
