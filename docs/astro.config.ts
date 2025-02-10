import starlight from '@astrojs/starlight'
import { defineConfig } from 'astro/config'
import starlightKbd from 'starlight-kbd'

export default defineConfig({
  integrations: [
    starlight({
      description: 'Starlight plugin to quickly and easily document keyboard shortcuts.',
      editLink: {
        baseUrl: 'https://github.com/HiDeoo/starlight-kbd/edit/main/docs/',
      },
      plugins: [
        starlightKbd({
          types: [
            { id: 'mac', label: 'macOS', default: true },
            { id: 'windows', label: 'Windows' },
            { id: 'linux', label: 'Linux' },
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
  site: 'https://starlight-kbd.netlify.app/',
})
