import { expect, test } from 'vitest'

import { getKbdLabel } from '../../libs/kbd'

test('generates labels for keyboard shortcuts', () => {
  expect(getKbdLabel([['a']])).toBe('a')
  expect(getKbdLabel([['Control', 'a']])).toBe('Control + a')
  expect(getKbdLabel([['Control', 'Shift', 'a']])).toBe('Control + Shift + a')
  expect(
    getKbdLabel([
      ['Control', 'Shift', 'a'],
      ['Control', 'c'],
    ]),
  ).toBe('Control + Shift + a then Control + c')
})

test('expands abbreviations', () => {
  expect(getKbdLabel([['Ctrl']])).toBe('Control')
})

test('expands special characters', () => {
  expect(getKbdLabel([['`']])).toBe('Backtick')
  expect(getKbdLabel([['^']])).toBe('Caret')
  expect(getKbdLabel([['\\']])).toBe('Backslash')
})

test('expands symbols', () => {
  expect(getKbdLabel([['⌃']])).toBe('Control')
  expect(getKbdLabel([['↑']])).toBe('Up Arrow')
})
