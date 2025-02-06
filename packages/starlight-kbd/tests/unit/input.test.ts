import { expect, test } from 'vitest'

import { getKbdFromString } from '../../libs/kbd'

test('parses basic keyboard input', () => {
  expect(getKbdFromString('a')).toEqual([['a']])
  expect(getKbdFromString('A')).toEqual([['A']])

  expect(getKbdFromString('Ctrl+a')).toEqual([['Ctrl', 'a']])
  expect(getKbdFromString('Ctrl+Shift+a')).toEqual([['Ctrl', 'Shift', 'a']])
  expect(getKbdFromString('Ctrl+Shift+')).toEqual([['Ctrl', 'Shift']])
  expect(getKbdFromString('Ctrl+Shift++')).toEqual([['Ctrl', 'Shift', '+']])

  expect(getKbdFromString('a B')).toEqual([['a'], ['B']])
  expect(getKbdFromString('Ctrl+a b')).toEqual([['Ctrl', 'a'], ['b']])
  expect(getKbdFromString('Ctrl+a Ctrl+b')).toEqual([
    ['Ctrl', 'a'],
    ['Ctrl', 'b'],
  ])
})
