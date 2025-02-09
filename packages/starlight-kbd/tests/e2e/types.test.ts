import { expect, test } from './test'

test('change type of shortcuts with a single chord', async ({ testPage }) => {
  await testPage.goto('basics')

  await expect(testPage.getNthActiveKbd(1)).toContainText('CommandM')

  await testPage.getGlobalKbdPicker().selectOption('windows')

  await expect(testPage.getNthActiveKbd(1)).toContainText('ControlW')
})

test('change type of shortcuts with multiple chords', async ({ testPage }) => {
  await testPage.goto('basics')

  await expect(testPage.getNthActiveKbdNthChord(2, 1)).toHaveText('CommandK')
  await expect(testPage.getNthActiveKbdNthChord(2, 2)).toHaveText('CommandM')

  await testPage.getGlobalKbdPicker().selectOption('linux')

  await expect(testPage.getNthActiveKbdNthChord(2, 1)).toHaveText('ControlK')
  await expect(testPage.getNthActiveKbdNthChord(2, 2)).toHaveText('ControlL')
})

test('change type of shortcuts with only a default type', async ({ testPage }) => {
  await testPage.goto('basics')

  await expect(testPage.getNthActiveKbd(3)).toContainText('CommandM')

  await testPage.getGlobalKbdPicker().selectOption('windows')

  await expect(testPage.getNthActiveKbd(3)).toContainText('CommandM')
})

test('change type of shortcuts with not all types defined', async ({ testPage }) => {
  await testPage.goto('basics')

  await expect(testPage.getNthActiveKbd(4)).toContainText('CommandM')

  await testPage.getGlobalKbdPicker().selectOption('windows')

  await expect(testPage.getNthActiveKbd(4)).toContainText('ControlW')

  await testPage.getGlobalKbdPicker().selectOption('linux')

  await expect(testPage.getNthActiveKbd(4)).toContainText('CommandM')
})
