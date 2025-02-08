import { expect, test } from './test'

test('change type of shortcuts with a user select', async ({ testPage }) => {
  await testPage.goto('user-select')

  await expect(testPage.getNthActiveKbd(1)).toContainText('CommandM')

  await testPage.getUserKbdSelect().selectOption('windows')

  await expect(testPage.getNthActiveKbd(1)).toContainText('ControlW')
})

test('restores user select', async ({ page, testPage }) => {
  await testPage.goto('user-select')

  await testPage.getGlobalKbdSelect().selectOption('windows')

  await page.reload()

  expect(await testPage.getGlobalKbdSelect().inputValue()).toBe('windows')
  expect(await testPage.getUserKbdSelect().inputValue()).toBe('windows')
})

test('keeps global and user selects synced', async ({ testPage }) => {
  await testPage.goto('user-select')

  expect(await testPage.getGlobalKbdSelect().inputValue()).toBe('mac')
  expect(await testPage.getUserKbdSelect().inputValue()).toBe('mac')

  await testPage.getGlobalKbdSelect().selectOption('windows')

  expect(await testPage.getGlobalKbdSelect().inputValue()).toBe('windows')
  expect(await testPage.getUserKbdSelect().inputValue()).toBe('windows')
})
