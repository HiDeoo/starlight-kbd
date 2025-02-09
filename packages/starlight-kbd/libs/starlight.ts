import type { StarlightUserConfig } from '@astrojs/starlight/types'
import type { AstroIntegrationLogger } from 'astro'

export function overrideStarlightComponent(
  components: StarlightUserConfig['components'],
  logger: AstroIntegrationLogger,
  override: keyof NonNullable<StarlightUserConfig['components']>,
  component: string,
) {
  if (components?.[override]) {
    logger.warn(`It looks like you already have a \`${override}\` component override in your Starlight configuration.`)
    logger.warn(
      `To use \`starlight-kbd\`, either remove your override or update it to render the content from \`starlight-kbd/components/${component}.astro\`.`,
    )
    if (component === 'KbdPicker') {
      logger.warn(
        'You can also disable the global picker by setting the `globalPicker` configuration option to `false` in your `starlight-kbd` configuration.',
      )
    }

    return {}
  }

  return {
    [override]: `starlight-kbd/overrides/${override}.astro`,
  }
}
