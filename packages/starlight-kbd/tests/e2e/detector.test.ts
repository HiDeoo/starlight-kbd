import { expect, test } from './test'

const platforms = ['macOS', 'Windows', 'Linux'] as const

const expectations: Record<(typeof platforms)[number], { type: string; shortcut: string }> = {
  macOS: { type: 'mac', shortcut: 'CommandM' },
  Windows: { type: 'windows', shortcut: 'ControlW' },
  Linux: { type: 'linux', shortcut: 'ControlL' },
}

for (const platform of platforms) {
  test(`detects platform: ${platform}`, async ({ testPage }) => {
    await testPage.goto('basics', { platform })

    expect(await testPage.getGlobalKbdPicker().inputValue()).toBe(expectations[platform].type)

    await expect(testPage.getNthActiveKbd(1)).toContainText(expectations[platform].shortcut)
  })
}
