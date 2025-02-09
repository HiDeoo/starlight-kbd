import { expect, test } from './test'

test('restores pickers and shortcuts', async ({ page, testPage }) => {
  await testPage.goto('basics')

  expect(await testPage.getGlobalKbdPicker().inputValue()).toBe('mac')

  await expect(testPage.getNthActiveKbd(1)).toContainText('CommandM')
  await expect(testPage.getNthActiveKbdNthChord(2, 1)).toHaveText('CommandK')
  await expect(testPage.getNthActiveKbdNthChord(2, 2)).toHaveText('CommandM')

  await testPage.getGlobalKbdPicker().selectOption('windows')

  await expect(testPage.getNthActiveKbd(1)).toContainText('ControlW')
  await expect(testPage.getNthActiveKbdNthChord(2, 1)).toHaveText('ControlK')
  await expect(testPage.getNthActiveKbdNthChord(2, 2)).toHaveText('ControlW')

  await page.reload()

  expect(await testPage.getGlobalKbdPicker().inputValue()).toBe('windows')

  await expect(testPage.getNthActiveKbd(1)).toContainText('ControlW')
  await expect(testPage.getNthActiveKbdNthChord(2, 1)).toHaveText('ControlK')
  await expect(testPage.getNthActiveKbdNthChord(2, 2)).toHaveText('ControlW')
})

test('includes the kbd restore script only once per page', async ({ page, testPage }) => {
  await testPage.goto('basics')

  const content = await page.content()

  expect(content.match(/class StarlightKbdRestore extends HTMLElement/g)?.length).toBe(1)
})
