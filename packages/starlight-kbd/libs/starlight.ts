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
    // TODO(HiDeoo) update warning to indicate that the override can be disabled with an option when it exists
    logger.warn(
      `To use \`starlight-kbd\`, either remove your override or update it to render the content from \`starlight-kbd/components/${component}.astro\`.`,
    )

    return {}
  }

  return {
    [override]: `starlight-kbd/overrides/${override}.astro`,
  }
}
