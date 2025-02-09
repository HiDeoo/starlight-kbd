import { expect, test } from './test'

test('change type of shortcuts with a user picker', async ({ testPage }) => {
  await testPage.goto('user-picker')

  await expect(testPage.getNthActiveKbd(1)).toContainText('CommandM')

  await testPage.getUserKbdPicker().selectOption('windows')

  await expect(testPage.getNthActiveKbd(1)).toContainText('ControlW')
})

test('restores user picker', async ({ page, testPage }) => {
  await testPage.goto('user-picker')

  await testPage.getGlobalKbdPicker().selectOption('windows')

  await page.reload()

  expect(await testPage.getGlobalKbdPicker().inputValue()).toBe('windows')
  expect(await testPage.getUserKbdPicker().inputValue()).toBe('windows')
})

test('keeps global and user pickers synced', async ({ testPage }) => {
  await testPage.goto('user-picker')

  expect(await testPage.getGlobalKbdPicker().inputValue()).toBe('mac')
  expect(await testPage.getUserKbdPicker().inputValue()).toBe('mac')

  await testPage.getGlobalKbdPicker().selectOption('windows')

  expect(await testPage.getGlobalKbdPicker().inputValue()).toBe('windows')
  expect(await testPage.getUserKbdPicker().inputValue()).toBe('windows')
})
