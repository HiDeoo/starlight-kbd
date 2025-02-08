import { expect, test } from './test'

test('displays shortcuts with a single chord', async ({ testPage }) => {
  await testPage.goto('basics')

  await expect(testPage.getNthActiveKbd(1)).toContainText('CommandM')
})

test('displays accessible labels for shortcuts with a single chord', async ({ testPage }) => {
  await testPage.goto('basics')

  await expect(testPage.getNthActiveKbd(1)).toContainText('Command + M')
})

test('displays shortcuts with multiple chords', async ({ testPage }) => {
  await testPage.goto('basics')

  await expect(testPage.getNthActiveKbdNthChord(2, 1)).toHaveText('CommandK')
  await expect(testPage.getNthActiveKbdNthChord(2, 2)).toHaveText('CommandM')
})

test('displays accessible labels for shortcuts with multiple chords', async ({ testPage }) => {
  await testPage.goto('basics')

  await expect(testPage.getNthActiveKbd(2)).toContainText('Command + K then Command + M')
})

test('displays shortcuts with only a default type', async ({ testPage }) => {
  await testPage.goto('basics')

  await expect(testPage.getNthActiveKbd(3)).toContainText('CommandM')
})
