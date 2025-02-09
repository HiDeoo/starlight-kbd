import { type Page, test as base } from '@playwright/test'

export { expect } from '@playwright/test'

process.env['ASTRO_TELEMETRY_DISABLED'] = 'true'
process.env['ASTRO_DISABLE_UPDATE_CHECK'] = 'true'

export const test = base.extend<{ testPage: TestPage }>({
  testPage: async ({ page }, use) => {
    const testPage = new TestPage(page)

    await use(testPage)
  },
})

export class TestPage {
  constructor(private readonly page: Page) {}

  goto(path: string, locale?: string) {
    return this.page.goto(`/${locale ? `${locale}/` : ''}tests/${path}`)
  }

  getNthActiveKbd(time: number) {
    return this.page.locator('[data-sl-kbd-active]').nth(time - 1)
  }

  getNthActiveKbdNthChord(kbdTime: number, chordTime: number) {
    return this.getNthActiveKbd(kbdTime)
      .locator(':scope > kbd')
      .nth(chordTime - 1)
  }

  getGlobalKbdPicker() {
    return this.page.locator('header starlight-kbd-picker select').first()
  }

  getUserKbdPicker() {
    return this.page.locator('.sl-markdown-content starlight-kbd-picker select').first()
  }
}
