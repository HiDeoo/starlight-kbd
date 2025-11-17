import starlight from '@astrojs/starlight'
import { defineConfig } from 'astro/config'
import starlightKbd from 'starlight-kbd'

const site =
  (process.env['CONTEXT'] === 'production' ? process.env['URL'] : process.env['DEPLOY_PRIME_URL']) ??
  'https://starlight-kbd.netlify.app/'

export default defineConfig({
  integrations: [
    starlight({
      description: 'Starlight plugin to quickly and easily document keyboard shortcuts.',
      editLink: {
        baseUrl: 'https://github.com/HiDeoo/starlight-kbd/edit/main/docs/',
      },
      head: [
        {
          tag: 'meta',
          attrs: { property: 'og:image', content: new URL('og.jpg', site).href },
        },
        {
          tag: 'meta',
          attrs: {
            property: 'og:image:alt',
            content: 'Starlight plugin to quickly and easily document keyboard shortcuts.',
          },
        },
      ],
      plugins: [
        starlightKbd({
          types: [
            { id: 'mac', label: 'macOS', default: true, detector: 'apple' },
            { id: 'windows', label: 'Windows', detector: 'windows' },
            { id: 'linux', label: 'Linux', detector: 'linux' },
          ],
        }),
      ],
      sidebar: [
        {
          label: 'Start Here',
          items: ['getting-started', 'configuration'],
        },
        {
          label: 'Guides',
          autogenerate: { directory: 'guides' },
        },
        {
          label: 'Components',
          autogenerate: { directory: 'components' },
        },
        {
          label: 'Resources',
          items: [{ label: 'Plugins and Tools', slug: 'resources/starlight' }],
        },
        'demo',
      ],
      social: {
        blueSky: 'https://bsky.app/profile/hideoo.dev',
        github: 'https://github.com/HiDeoo/starlight-kbd',
      },
      title: 'Starlight Kbd',
    }),
  ],
  site,
})
