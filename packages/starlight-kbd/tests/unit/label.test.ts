import { expect, test } from 'vitest'

import { getKbdLabel } from '../../libs/kbd'
import { Translations } from '../../translations'

test('generates labels for keyboard shortcuts', () => {
  expect(getTestKbdLabel([['a']])).toBe('a')
  expect(getTestKbdLabel([['Control', 'a']])).toBe('Control + a')
  expect(getTestKbdLabel([['Control', 'Shift', 'a']])).toBe('Control + Shift + a')
  expect(
    getTestKbdLabel([
      ['Control', 'Shift', 'a'],
      ['Control', 'c'],
    ]),
  ).toBe('Control + Shift + a then Control + c')
})

test('expands abbreviations', () => {
  expect(getTestKbdLabel([['Ctrl']])).toBe('Control')
})

test('expands special characters', () => {
  expect(getTestKbdLabel([['`']])).toBe('Backtick')
  expect(getTestKbdLabel([['^']])).toBe('Caret')
  expect(getTestKbdLabel([['\\']])).toBe('Backslash')
})

test('expands symbols', () => {
  expect(getTestKbdLabel([['⌃']])).toBe('Control')
  expect(getTestKbdLabel([['↑']])).toBe('Up Arrow')
})

function getTestKbdLabel(kbd: Parameters<typeof getKbdLabel>[0]) {
  return getKbdLabel(kbd, { then: Translations.en['starlightKbd.kbd.keywords.then'] })
}
