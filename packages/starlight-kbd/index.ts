import type { StarlightPlugin } from '@astrojs/starlight/types'

import { type StarlightKbdConfig, type StarlightKbdUserConfig, validateConfig } from './libs/config'
import { overrideStarlightComponent } from './libs/starlight'
import { vitePluginStarlightKbdConfig } from './libs/vite'

export type { StarlightKbdConfig, StarlightKbdUserConfig }

export default function starlightKbd(userConfig: StarlightKbdUserConfig): StarlightPlugin {
  const config = validateConfig(userConfig)

  return {
    name: 'starlight-kbd',
    hooks: {
      setup: ({ addIntegration, config: starlightConfig, logger, updateConfig: updateStarlightConfig }) => {
        updateStarlightConfig({
          components: {
            ...starlightConfig.components,
            ...overrideStarlightComponent(starlightConfig.components, logger, 'ThemeProvider', 'KbdProvider'),
            ...overrideStarlightComponent(starlightConfig.components, logger, 'ThemeSelect', 'KbdPicker'),
          },
        })

        addIntegration({
          name: 'starlight-kbd-integration',
          hooks: {
            'astro:config:setup': ({ updateConfig }) => {
              updateConfig({
                vite: {
                  plugins: [vitePluginStarlightKbdConfig(config)],
                },
              })
            },
          },
        })
      },
    },
  }
}
