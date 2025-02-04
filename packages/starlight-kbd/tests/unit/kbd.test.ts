import { expect, test } from 'vitest'

import { parseKbd } from '../../libs/kbd'

test('parses basic keyboard input', () => {
  expect(parseKbd('a')).toEqual([['a']])
  expect(parseKbd('A')).toEqual([['A']])

  expect(parseKbd('Ctrl+a')).toEqual([['Ctrl', 'a']])
  expect(parseKbd('Ctrl+Shift+a')).toEqual([['Ctrl', 'Shift', 'a']])
  expect(parseKbd('Ctrl+Shift+')).toEqual([['Ctrl', 'Shift']])
  expect(parseKbd('Ctrl+Shift++')).toEqual([['Ctrl', 'Shift', '+']])

  expect(parseKbd('a B')).toEqual([['a'], ['B']])
  expect(parseKbd('Ctrl+a b')).toEqual([['Ctrl', 'a'], ['b']])
  expect(parseKbd('Ctrl+a Ctrl+b')).toEqual([
    ['Ctrl', 'a'],
    ['Ctrl', 'b'],
  ])
})
