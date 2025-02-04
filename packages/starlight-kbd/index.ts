import type { StarlightPlugin } from '@astrojs/starlight/types'

// TODO(HiDeoo) casing
export default function starlightKbd(): StarlightPlugin {
  return {
    name: 'starlight-kbd',
    hooks: {
      setup: ({ logger }) => {
        logger.info('starlight-kbd plugin loaded')
      },
    },
  }
}
